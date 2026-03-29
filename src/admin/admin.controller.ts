import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { CurrentUser, CurrentUserPayload } from '../auth/decorators/current-user.decorator.js';
import { NotificationsService } from '../notifications/notifications.service.js';
import {
  ParticulierStatut,
  PrestataireWalletStatut,
  Prisma,
  Role,
  StatutDocument,
  StatutPrestation,
  StatutVerificationPrestataire,
  TransactionType,
  WalletType,
  WithdrawalMethod,
  WithdrawalStatus,
} from '../../generated/prisma/client.js';

function metaWithdrawalAmount(meta: unknown): number | null {
  if (!meta || typeof meta !== 'object') return null;
  const m = meta as Record<string, unknown>;
  const a = m.amount;
  if (typeof a === 'number' && !Number.isNaN(a) && a >= 0) return a;
  return null;
}

function withdrawalMethodLabel(method: WithdrawalMethod): string {
  switch (method) {
    case WithdrawalMethod.ORANGE_MONEY:
      return 'Orange money';
    case WithdrawalMethod.WAVE:
      return 'Wave';
    case WithdrawalMethod.FREE_MONEY:
      return 'Free money';
    case WithdrawalMethod.RIB:
      return 'Carte bancaire';
    default:
      return method;
  }
}

function statutPrestationLabelFr(statut: StatutPrestation): string {
  switch (statut) {
    case StatutPrestation.EN_ATTENTE:
      return 'En attente';
    case StatutPrestation.ACCEPTEE:
      return 'Acceptée';
    case StatutPrestation.REFUSEE:
      return 'Refusée';
    case StatutPrestation.EN_COURS:
      return 'En cours';
    case StatutPrestation.TERMINEE:
      return 'Terminée';
    case StatutPrestation.ANNULEE:
      return 'Annulée';
    case StatutPrestation.PAYEE:
      return 'Payée';
    default:
      return statut;
  }
}

/** Base sans migration `particuliers.statut` (P2022 ou message colonne statut). */
function isParticulierStatutMissingError(err: unknown): boolean {
  if (!(err instanceof Prisma.PrismaClientKnownRequestError)) return false;
  if (err.code === 'P2022') return true;
  const msg = String((err as { message?: string }).message ?? '');
  return msg.includes('statut') && msg.toLowerCase().includes('particulier');
}

/** Select détail admin : wallet limité au solde (colonnes plafond/statut chargées à part si la migration est appliquée). */
function prestataireAdminDetailSelect() {
  return {
    id: true,
    nom: true,
    telephone: true,
    adresse: true,
    bio: true,
    avatarUrl: true,
    actif: true,
    statutVerification: true,
    createdAt: true,
    user: { select: { email: true } },
    avis: { select: { note: true } },
    wallet: { select: { balance: true } },
    servicesProposes: {
      where: { actif: true },
      select: {
        id: true,
        service: { select: { libelle: true } },
      },
    },
    documents: {
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        fichierUrl: true,
        nomFichier: true,
        statut: true,
        motifRefus: true,
        updatedAt: true,
        typeDocument: {
          select: {
            code: true,
            libelle: true,
            obligatoire: true,
          },
        },
      },
    },
  } as const;
}

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class AdminController {
  private readonly logger = new Logger(AdminController.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly notifications: NotificationsService,
  ) {}

  /**
   * KPIs dashboard admin:
   * - clients actifs = nb particuliers
   * - prestataires actifs = nb prestataires avec actif=true
   * - crédit = solde wallet général
   * - métiers = nb services enregistrés
   */
  @Get('stats')
  async getStats() {
    try {
      const [clientsActifs, prestatairesActifs, metiersCount, generalWallet] =
        await Promise.all([
          this.prisma.particulier.count({ where: { statut: ParticulierStatut.ACTIF } }),
          this.prisma.prestataire.count({ where: { actif: true } }),
          this.prisma.service.count(),
          this.prisma.wallet.findFirst({
            where: { type: WalletType.GENERAL },
            select: { balance: true },
          }),
        ]);

      return {
        clientsActifs,
        prestatairesActifs,
        credit: generalWallet ? Number(generalWallet.balance) : 0,
        metiers: metiersCount,
      };
    } catch (err) {
      if (!isParticulierStatutMissingError(err)) throw err;
      this.logger.warn(
        'KPI clients : colonne particuliers.statut absente — repli sur email vérifié. Exécutez: npx prisma migrate deploy',
      );
      const [clientsActifs, prestatairesActifs, metiersCount, generalWallet] =
        await Promise.all([
          this.prisma.particulier.count({
            where: { user: { emailVerified: true } },
          }),
          this.prisma.prestataire.count({ where: { actif: true } }),
          this.prisma.service.count(),
          this.prisma.wallet.findFirst({
            where: { type: WalletType.GENERAL },
            select: { balance: true },
          }),
        ]);
      return {
        clientsActifs,
        prestatairesActifs,
        credit: generalWallet ? Number(generalWallet.balance) : 0,
        metiers: metiersCount,
      };
    }
  }

  /**
   * Notifications admin :
   * - générale : envoie une notification à tous les utilisateurs (PARTICULIER + PRESTATAIRE)
   * - ciblée : envoie une notification à un utilisateur (userId)
   */
  @Post('notifications/general')
  async createGeneralNotification(
    @Body()
    body: {
      title: string;
      body?: string;
      type?: string;
      data?: Record<string, unknown>;
      audience?: 'TOUT' | 'ALL' | 'PARTICULIER' | 'PRESTATAIRE';
    },
  ) {
    const title = String(body?.title ?? '').trim();
    if (!title) {
      throw new BadRequestException('title requis');
    }

    const audience = body?.audience ?? 'TOUT';
    const roleFilter =
      audience === 'PARTICULIER'
        ? { role: Role.PARTICULIER }
        : audience === 'PRESTATAIRE'
          ? { role: Role.PRESTATAIRE }
          : { role: { in: [Role.PARTICULIER, Role.PRESTATAIRE] } };

    const users = await this.prisma.user.findMany({
      where: roleFilter,
      select: { id: true },
    });

    const sent = users.length;
    this.logger.log(
      `[FCM trace] admin POST notifications/general audience=${audience} destinataires=${sent} title="${title.slice(0, 80)}"`,
    );
    await Promise.all(
      users.map((u) =>
        this.notifications.sendToUser(u.id, {
          title,
          body: body.body ?? undefined,
          type: body.type ?? undefined,
          data: body.data,
        }),
      ),
    );

    this.logger.log(
      `[FCM trace] admin notifications/general terminé (sendToUser × ${sent})`,
    );
    return { ok: true, sent };
  }

  @Post('notifications/targeted')
  async createTargetedNotification(
    @Body()
    body: {
      userId: string;
      title: string;
      body?: string;
      type?: string;
      data?: Record<string, unknown>;
    },
  ) {
    const userId = String(body?.userId ?? '').trim();
    const title = String(body?.title ?? '').trim();
    if (!userId) throw new BadRequestException('userId requis');
    if (!title) throw new BadRequestException('title requis');

    this.logger.log(
      `[FCM trace] admin POST notifications/targeted userId=${userId} title="${title.slice(0, 80)}"`,
    );
    await this.notifications.sendToUser(userId, {
      title,
      body: body.body ?? undefined,
      type: body.type ?? undefined,
      data: body.data,
    });

    this.logger.log(
      `[FCM trace] admin notifications/targeted terminé userId=${userId}`,
    );
    return { ok: true };
  }

  /**
   * Liste admin des notifications envoyées (pour audit / support).
   * audience = "TOUT" | "PARTICULIER" | "PRESTATAIRE"
   */
  @Get('notifications')
  async listAdminNotifications(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
    @Query('audience') audience?: string,
    @Query('unreadOnly') unreadOnly?: string,
    @Query('type') type?: string,
    @Query('search') search?: string,
  ) {
    const take = Math.min(Math.max(Number(limit ?? 14), 1), 100);
    const skip = Math.max(Number(offset ?? 0), 0);

    const aud = (audience ?? 'TOUT').toUpperCase();
    const roleFilter =
      aud === 'PARTICULIER'
        ? { role: Role.PARTICULIER }
        : aud === 'PRESTATAIRE'
          ? { role: Role.PRESTATAIRE }
          : aud === 'ALL'
            ? { role: { in: [Role.PARTICULIER, Role.PRESTATAIRE] } }
            : { role: { in: [Role.PARTICULIER, Role.PRESTATAIRE] } };

    const q = search?.trim();

    const where: Prisma.NotificationWhereInput = {
      user: roleFilter,
      ...(unreadOnly === 'true' ? { lu: false } : {}),
      ...(type?.trim() ? { type: type.trim() } : {}),
      ...(q
        ? {
            OR: [
              { title: { contains: q, mode: 'insensitive' } },
              { body: q ? { contains: q, mode: 'insensitive' } : undefined },
              { type: { contains: q, mode: 'insensitive' } },
              { user: { email: { contains: q, mode: 'insensitive' } } },
            ],
          }
        : {}),
    };

    const [total, rows] = await Promise.all([
      this.prisma.notification.count({ where }),
      this.prisma.notification.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take,
        skip,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              role: true,
              particulier: { select: { nom: true, prenom: true } },
              prestataire: { select: { nom: true } },
            },
          },
        },
      }),
    ]);

    return {
      total,
      items: rows.map((n) => {
        const u = n.user;
        const displayName =
          u.role === Role.PARTICULIER
            ? [u.particulier?.prenom, u.particulier?.nom].filter(Boolean).join(' ')
            : u.role === Role.PRESTATAIRE
              ? u.prestataire?.nom ?? u.email
              : u.email;

        return {
          id: n.id,
          createdAt: n.createdAt.toISOString(),
          lu: n.lu,
          title: n.title,
          body: n.body,
          type: n.type,
          userId: n.userId,
          userEmail: u.email,
          userRole: u.role,
          displayName,
        };
      }),
    };
  }

  /**
   * Evolution mensuelle cumulée sur N mois
   * - prestataires (vert)
   * - clients (jaune)
   */
  @Get('evolution')
  async getEvolution(@Query('months') months?: string) {
    const allowed = new Set([1, 3, 6, 12]);
    const parsed = Number(months ?? 12);
    const periodMonths = allowed.has(parsed) ? parsed : 12;

    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth() - (periodMonths - 1), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const [
      baseClients,
      basePrestataires,
      clientRows,
      prestataireRows,
    ] = await Promise.all([
      this.prisma.particulier.count({ where: { createdAt: { lt: start } } }),
      this.prisma.prestataire.count({ where: { createdAt: { lt: start } } }),
      this.prisma.particulier.findMany({
        where: { createdAt: { gte: start, lt: end } },
        select: { createdAt: true },
      }),
      this.prisma.prestataire.findMany({
        where: { createdAt: { gte: start, lt: end } },
        select: { createdAt: true },
      }),
    ]);

    const monthKey = (d: Date) => `${d.getFullYear()}-${d.getMonth()}`;
    const clientNewByMonth = new Map<string, number>();
    const prestataireNewByMonth = new Map<string, number>();

    for (const row of clientRows) {
      const k = monthKey(row.createdAt);
      clientNewByMonth.set(k, (clientNewByMonth.get(k) ?? 0) + 1);
    }
    for (const row of prestataireRows) {
      const k = monthKey(row.createdAt);
      prestataireNewByMonth.set(k, (prestataireNewByMonth.get(k) ?? 0) + 1);
    }

    const labels: string[] = [];
    const clients: number[] = [];
    const prestataires: number[] = [];

    let runningClients = baseClients;
    let runningPrestataires = basePrestataires;

    for (let i = 0; i < periodMonths; i += 1) {
      const d = new Date(start.getFullYear(), start.getMonth() + i, 1);
      const k = monthKey(d);
      runningClients += clientNewByMonth.get(k) ?? 0;
      runningPrestataires += prestataireNewByMonth.get(k) ?? 0;

      labels.push(
        d.toLocaleString('fr-FR', { month: 'short' }).replace('.', ''),
      );
      clients.push(runningClients);
      prestataires.push(runningPrestataires);
    }

    return {
      months: periodMonths,
      labels,
      clients,
      prestataires,
    };
  }

  /** Soldes agrégés pour l’écran admin Wallet. */
  @Get('wallet/summary')
  async getWalletSummary() {
    const [generalRow, prestataireAgg] = await Promise.all([
      this.prisma.wallet.findFirst({
        where: { type: WalletType.GENERAL },
        select: { balance: true },
      }),
      this.prisma.wallet.aggregate({
        where: { prestataireId: { not: null } },
        _sum: { balance: true },
      }),
    ]);

    const soldeMilleServices = generalRow ? Number(generalRow.balance) : 0;
    const soldesPrestataires = Number(prestataireAgg._sum.balance ?? 0);
    const totalSolde = soldeMilleServices + soldesPrestataires;

    return {
      totalSolde,
      credit: soldeMilleServices,
      soldeMilleServices,
      soldesPrestataires,
      retraitTotal: 0,
    };
  }

  /** Demandes de retrait (admin) : en attente, acceptées et rejetées. */
  @Get('wallet/withdrawal-requests')
  async listWithdrawalRequests(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    const take = Math.min(Math.max(Number(limit ?? 14), 1), 100);
    const skip = Math.max(Number(offset ?? 0), 0);
    const [total, rows] = await Promise.all([
      this.prisma.withdrawalRequest.count({}),
      this.prisma.withdrawalRequest.findMany({
        orderBy: { createdAt: 'desc' },
        take,
        skip,
        include: {
          prestataire: { select: { id: true, nom: true } },
        },
      }),
    ]);
    return {
      total,
      items: rows.map((r) => ({
        id: r.id,
        date: r.createdAt.toISOString(),
        prestataireId: r.prestataireId,
        prestataireNom: r.prestataire.nom,
        montant: metaWithdrawalAmount(r.meta),
        wallet: withdrawalMethodLabel(r.method),
        method: r.method,
        status: r.status,
      })),
    };
  }

  @Patch('wallet/withdrawal-requests/:id')
  async decisionWithdrawalRequest(
    @Param('id') id: string,
    @Body()
    body: {
      decision?: string;
      /** Moyen utilisé par l’admin pour effectuer le versement (modal Paiement). */
      payoutMethod?: WithdrawalMethod;
    },
  ) {
    const decision = body.decision;
    if (decision !== 'accept' && decision !== 'reject') {
      throw new BadRequestException('decision invalide (accept ou reject)');
    }
    const row = await this.prisma.withdrawalRequest.findUnique({
      where: { id },
      select: {
        id: true,
        status: true,
        prestataireId: true,
        meta: true,
      },
    });
    if (!row) {
      throw new BadRequestException('Demande introuvable');
    }
    if (row.status !== WithdrawalStatus.EN_ATTENTE) {
      throw new BadRequestException('Cette demande a déjà été traitée');
    }
    if (decision === 'reject') {
      await this.prisma.withdrawalRequest.update({
        where: { id: row.id },
        data: { status: WithdrawalStatus.REFUSE },
      });
      return { ok: true, status: WithdrawalStatus.REFUSE };
    }
    if (
      body.payoutMethod != null &&
      !Object.values(WithdrawalMethod).includes(body.payoutMethod)
    ) {
      throw new BadRequestException('Moyen de paiement invalide');
    }
    const metaBase =
      row.meta && typeof row.meta === 'object' && !Array.isArray(row.meta)
        ? { ...(row.meta as Record<string, unknown>) }
        : {};
    if (body.payoutMethod != null) {
      metaBase.adminPayoutMethod = body.payoutMethod;
    }
    metaBase.adminProcessedAt = new Date().toISOString();
    const metaPayload = metaBase as Prisma.InputJsonValue;

    const amount = metaWithdrawalAmount(row.meta);
    const wallet = await this.prisma.wallet.findUnique({
      where: { prestataireId: row.prestataireId },
      select: { id: true, balance: true },
    });
    if (!wallet) {
      throw new BadRequestException('Wallet du prestataire introuvable');
    }
    if (amount != null && amount > 0) {
      const bal = Number(wallet.balance);
      if (amount > bal) {
        throw new BadRequestException('Solde insuffisant pour valider ce montant');
      }
      await this.prisma.$transaction([
        this.prisma.wallet.update({
          where: { id: wallet.id },
          data: { balance: { decrement: amount } },
        }),
        this.prisma.withdrawalRequest.update({
          where: { id: row.id },
          data: {
            status: WithdrawalStatus.TRAITE,
            meta: metaPayload,
          },
        }),
      ]);
    } else {
      await this.prisma.withdrawalRequest.update({
        where: { id: row.id },
        data: {
          status: WithdrawalStatus.TRAITE,
          meta: metaPayload,
        },
      });
    }
    return { ok: true, status: WithdrawalStatus.TRAITE };
  }

  /**
   * Liste mixte des transactions dashboard:
   * - paiements de prestations (wallet général)
   * - paiements d'abonnements prestataires (wallet général)
   * - retraits des prestataires (demandes de retrait)
   */
  @Get('transactions')
  async getTransactions(@Query('limit') limit?: string) {
    const take = Math.min(Math.max(Number(limit ?? 20), 1), 100);

    const generalWallet = await this.prisma.wallet.findFirst({
      where: { type: WalletType.GENERAL },
      select: { id: true },
    });

    const [walletRows, withdrawalRows] = await Promise.all([
      generalWallet
        ? this.prisma.walletTransaction.findMany({
            where: {
              walletId: generalWallet.id,
              type: { in: [TransactionType.PRESTATION, TransactionType.ABONNEMENT] },
            },
            take,
            orderBy: { createdAt: 'desc' },
            include: {
              prestation: {
                select: {
                  prestataire: { select: { nom: true } },
                },
              },
              abonnement: {
                select: {
                  prestataire: { select: { nom: true } },
                },
              },
              offre: { select: { libelle: true } },
            },
          })
        : Promise.resolve([]),
      this.prisma.withdrawalRequest.findMany({
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          prestataire: { select: { nom: true } },
        },
      }),
    ]);

    const walletTxs = walletRows.map((row) => {
      if (row.type === TransactionType.ABONNEMENT) {
        const nom = row.abonnement?.prestataire?.nom ?? 'Prestataire';
        const offreLib = row.offre?.libelle?.trim();
        const prestataireNom = offreLib
          ? `${nom} — Abonnement (${offreLib})`
          : `${nom} — Abonnement`;
        return {
          id: row.id,
          date: row.createdAt,
          prestataireNom,
          montant: Number(row.amount),
          wallet: 'Wallet Général',
          statut: 'Depot',
          category: 'PAIEMENT_ABONNEMENT' as const,
        };
      }
      return {
        id: row.id,
        date: row.createdAt,
        prestataireNom: row.prestation?.prestataire?.nom ?? 'Prestataire',
        montant: Number(row.amount),
        wallet: 'Wallet Général',
        statut: 'Depot',
        category: 'PAIEMENT_PRESTATION' as const,
      };
    });

    const withdrawals = withdrawalRows.map((row) => ({
      id: row.id,
      date: row.createdAt,
      prestataireNom: row.prestataire?.nom ?? 'Prestataire',
      montant: null as number | null,
      wallet:
        row.method === 'ORANGE_MONEY'
          ? 'Orange Money'
          : row.method === 'FREE_MONEY'
            ? 'Free Money'
            : row.method === 'RIB'
              ? 'RIB'
              : 'Wave',
      statut:
        row.status === WithdrawalStatus.TRAITE
          ? 'Retrait'
          : row.status === WithdrawalStatus.REFUSE
            ? 'Refuse'
            : 'En attente',
      category: 'RETRAIT_PRESTATAIRE' as const,
    }));

    return [...walletTxs, ...withdrawals]
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, take);
  }

  /**
   * Liste admin des clients (particuliers) + stats globales.
   * Actif / inactif : champ `particuliers.statut` (ACTIF / INACTIF).
   */
  @Get('clients')
  async getClients(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
    @Query('search') search?: string,
  ) {
    const take = Math.min(Math.max(Number(limit ?? 10), 1), 100);
    const skip = Math.max(Number(offset ?? 0), 0);
    const q = search?.trim();

    const searchFilter = q
      ? {
          OR: [
            { nom: { contains: q, mode: 'insensitive' as const } },
            { prenom: { contains: q, mode: 'insensitive' as const } },
            { user: { email: { contains: q, mode: 'insensitive' as const } } },
          ],
        }
      : {};

    try {
      const [globalTotal, actifsCount, inactifsCount, filteredTotal, rows] =
        await Promise.all([
          this.prisma.particulier.count(),
          this.prisma.particulier.count({
            where: { statut: ParticulierStatut.ACTIF },
          }),
          this.prisma.particulier.count({
            where: { statut: ParticulierStatut.INACTIF },
          }),
          this.prisma.particulier.count({ where: searchFilter }),
          this.prisma.particulier.findMany({
            where: searchFilter,
            take,
            skip,
            orderBy: { createdAt: 'desc' },
            select: {
              id: true,
              nom: true,
              prenom: true,
              telephone: true,
              adresse: true,
              avatarUrl: true,
              statut: true,
              createdAt: true,
              user: {
                select: {
                  id: true,
                  email: true,
                  emailVerified: true,
                },
              },
            },
          }),
        ]);

      return {
        stats: {
          total: globalTotal,
          actifs: actifsCount,
          inactifs: inactifsCount,
        },
        total: filteredTotal,
        items: rows.map((p) => {
          const actif = p.statut === ParticulierStatut.ACTIF;
          return {
            id: p.id,
            userId: p.user.id,
            prenom: p.prenom,
            nom: p.nom,
            nomComplet: `${p.prenom} ${p.nom}`.trim(),
            email: p.user.email,
            telephone: p.telephone ?? '',
            adresse: p.adresse ?? '',
            avatarUrl: p.avatarUrl,
            dateAdhesion: p.createdAt.toISOString(),
            actif,
            statut: actif ? 'Actif' : 'Inactif',
          };
        }),
      };
    } catch (err) {
      if (!isParticulierStatutMissingError(err)) throw err;
      this.logger.warn(
        'Liste clients : colonne particuliers.statut absente — repli sur email vérifié. Exécutez: npx prisma migrate deploy',
      );
      const [globalTotal, actifsCount, inactifsCount, filteredTotal, rows] =
        await Promise.all([
          this.prisma.particulier.count(),
          this.prisma.particulier.count({
            where: { user: { emailVerified: true } },
          }),
          this.prisma.particulier.count({
            where: { user: { emailVerified: false } },
          }),
          this.prisma.particulier.count({ where: searchFilter }),
          this.prisma.particulier.findMany({
            where: searchFilter,
            take,
            skip,
            orderBy: { createdAt: 'desc' },
            select: {
              id: true,
              nom: true,
              prenom: true,
              telephone: true,
              adresse: true,
              avatarUrl: true,
              createdAt: true,
              user: {
                select: {
                  id: true,
                  email: true,
                  emailVerified: true,
                },
              },
            },
          }),
        ]);

      return {
        stats: {
          total: globalTotal,
          actifs: actifsCount,
          inactifs: inactifsCount,
        },
        total: filteredTotal,
        items: rows.map((p) => {
          const actif = p.user.emailVerified;
          return {
            id: p.id,
            userId: p.user.id,
            prenom: p.prenom,
            nom: p.nom,
            nomComplet: `${p.prenom} ${p.nom}`.trim(),
            email: p.user.email,
            telephone: p.telephone ?? '',
            adresse: p.adresse ?? '',
            avatarUrl: p.avatarUrl,
            dateAdhesion: p.createdAt.toISOString(),
            actif,
            statut: actif ? 'Actif' : 'Inactif',
          };
        }),
      };
    }
  }

  @Get('clients/:id')
  async getClientDetails(@Param('id') particulierId: string) {
    let p: {
      id: string;
      nom: string;
      prenom: string;
      telephone: string | null;
      adresse: string | null;
      avatarUrl: string | null;
      statut?: ParticulierStatut;
      createdAt: Date;
      updatedAt: Date;
      user: {
        id: string;
        email: string;
        emailVerified: boolean;
        createdAt: Date;
      };
    } | null;

    try {
      p = await this.prisma.particulier.findUnique({
        where: { id: particulierId },
        select: {
          id: true,
          nom: true,
          prenom: true,
          telephone: true,
          adresse: true,
          avatarUrl: true,
          statut: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              id: true,
              email: true,
              emailVerified: true,
              createdAt: true,
            },
          },
        },
      });
    } catch (err) {
      if (!isParticulierStatutMissingError(err)) throw err;
      this.logger.warn(
        'Détail client : colonne particuliers.statut absente — repli sur email vérifié. Exécutez: npx prisma migrate deploy',
      );
      p = await this.prisma.particulier.findUnique({
        where: { id: particulierId },
        select: {
          id: true,
          nom: true,
          prenom: true,
          telephone: true,
          adresse: true,
          avatarUrl: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              id: true,
              email: true,
              emailVerified: true,
              createdAt: true,
            },
          },
        },
      });
    }

    if (!p) {
      throw new BadRequestException('Client introuvable');
    }

    const [prestationsTotal, prestationsAnnulees] = await Promise.all([
      this.prisma.prestation.count({ where: { particulierId } }),
      this.prisma.prestation.count({
        where: { particulierId, statut: StatutPrestation.ANNULEE },
      }),
    ]);

    const actif =
      p.statut !== undefined
        ? p.statut === ParticulierStatut.ACTIF
        : p.user.emailVerified;
    return {
      id: p.id,
      userId: p.user.id,
      prenom: p.prenom,
      nom: p.nom,
      nomComplet: `${p.prenom} ${p.nom}`.trim(),
      email: p.user.email,
      telephone: p.telephone ?? '',
      adresse: p.adresse ?? '',
      avatarUrl: p.avatarUrl,
      dateAdhesion: p.createdAt.toISOString(),
      compteCreeLe: p.user.createdAt.toISOString(),
      misAJourLe: p.updatedAt.toISOString(),
      prestationsTotal,
      prestationsAnnulees,
      actif,
      statut: actif ? 'Actif' : 'Inactif',
    };
  }

  /**
   * Active / désactive le compte client (`particuliers.statut`).
   */
  @Patch('clients/:id/statut')
  async setClientActif(
    @Param('id') particulierId: string,
    @Body() body: { actif?: boolean },
  ) {
    const actif = Boolean(body?.actif);
    const p = await this.prisma.particulier.findUnique({
      where: { id: particulierId },
      select: { id: true, userId: true },
    });
    if (!p) {
      throw new BadRequestException('Client introuvable');
    }
    try {
      await this.prisma.particulier.update({
        where: { id: p.id },
        data: {
          statut: actif ? ParticulierStatut.ACTIF : ParticulierStatut.INACTIF,
        },
      });
    } catch (err) {
      if (!isParticulierStatutMissingError(err)) throw err;
      this.logger.warn(
        'Mise à jour statut client : colonne particuliers.statut absente — repli sur users.email_verified. Exécutez: npx prisma migrate deploy',
      );
      await this.prisma.user.update({
        where: { id: p.userId },
        data: { emailVerified: actif },
      });
    }
    return { actif, statut: actif ? 'Actif' : 'Inactif' };
  }

  @Delete('clients/:id')
  async deleteClient(@Param('id') particulierId: string) {
    const particulier = await this.prisma.particulier.findUnique({
      where: { id: particulierId },
      select: {
        userId: true,
        user: { select: { role: true } },
      },
    });
    if (!particulier) {
      throw new BadRequestException('Client introuvable');
    }
    if (particulier.user.role !== Role.PARTICULIER) {
      throw new BadRequestException('Utilisateur invalide');
    }
    await this.prisma.user.delete({ where: { id: particulier.userId } });
    return { success: true };
  }

  /**
   * Vue admin prestataires:
   * - compteurs total / actifs / inactifs
   * - liste prestataires (email, tel, métier principal, statut)
   */
  @Get('prestataires')
  async getPrestataires(@Query('limit') limit?: string) {
    const take = Math.min(Math.max(Number(limit ?? 200), 1), 1000);

    const [totalPrestataires, actifsCount, inactifsCount, rows] = await Promise.all([
      this.prisma.prestataire.count(),
      this.prisma.prestataire.count({ where: { actif: true } }),
      this.prisma.prestataire.count({ where: { actif: false } }),
      this.prisma.prestataire.findMany({
        take,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          userId: true,
          nom: true,
          telephone: true,
          actif: true,
          statutVerification: true,
          user: {
            select: { email: true },
          },
          avis: {
            select: { note: true },
          },
          documents: {
            select: { id: true, statut: true },
          },
          servicesProposes: {
            where: { actif: true },
            orderBy: { createdAt: 'asc' },
            select: {
              service: {
                select: { id: true, libelle: true },
              },
            },
          },
        },
      }),
    ]);

    return {
      stats: {
        total: totalPrestataires,
        actifs: actifsCount,
        inactifs: inactifsCount,
      },
      items: rows.map((p) => {
        const notes = p.avis.map((a) => a.note);
        const noteMoyenne =
          notes.length > 0
            ? Math.round(
                (notes.reduce((sum, n) => sum + n, 0) / notes.length) * 10,
              ) / 10
            : 0;
        const documentsTotal = p.documents.length;
        const documentsValides = p.documents.filter(
          (d) => d.statut === StatutDocument.VALIDE,
        ).length;

        return {
          id: p.id,
          userId: p.userId,
          nom: p.nom,
          email: p.user?.email ?? '',
          telephone: p.telephone ?? '',
          metier: p.servicesProposes[0]?.service?.libelle ?? '—',
          serviceIds: p.servicesProposes.map((ps) => ps.service.id),
          statut: p.actif ? 'Actif' : 'Inactif',
          actif: p.actif,
          statutVerification: p.statutVerification,
          noteMoyenne,
          nbAvis: notes.length,
          documentsTotal,
          documentsValides,
        };
      }),
    };
  }

  /**
   * Active ou désactive un prestataire.
   * L’activation n’est autorisée que si statutVerification = VERIFIE.
   */
  @Patch('prestataires/:id/actif')
  async setPrestataireActif(
    @Param('id') prestataireId: string,
    @Body() body: { actif?: boolean },
  ) {
    const actif = Boolean(body?.actif);
    const existing = await this.prisma.prestataire.findUnique({
      where: { id: prestataireId },
      select: { id: true, statutVerification: true },
    });
    if (!existing) {
      throw new BadRequestException('Prestataire introuvable');
    }
    if (actif && existing.statutVerification !== StatutVerificationPrestataire.VERIFIE) {
      throw new BadRequestException(
        'Un prestataire ne peut être activé que lorsque son statut de vérification est « Vérifié ».',
      );
    }

    const updated = await this.prisma.prestataire.update({
      where: { id: prestataireId },
      data: { actif },
      select: { id: true, actif: true },
    });

    return { id: updated.id, actif: updated.actif };
  }

  /**
   * Paiements des particuliers vers ce prestataire uniquement
   * (écritures PRESTATION sur le wallet prestataire, liées à une prestation).
   */
  @Get('prestataires/:id/transactions')
  async getPrestatairePaiementsParticuliers(
    @Param('id') prestataireId: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    const take = Math.min(Math.max(Number(limit ?? 50), 1), 200);
    const skip = Math.max(Number(offset ?? 0), 0);

    const exists = await this.prisma.prestataire.findUnique({
      where: { id: prestataireId },
      select: { id: true },
    });
    if (!exists) {
      throw new BadRequestException('Prestataire introuvable');
    }

    const prestWallet = await this.prisma.wallet.findUnique({
      where: { prestataireId },
      select: { id: true },
    });
    if (!prestWallet) {
      return { total: 0, items: [] };
    }

    const where = {
      walletId: prestWallet.id,
      type: TransactionType.PRESTATION,
    };

    const [total, rows] = await Promise.all([
      this.prisma.walletTransaction.count({ where }),
      this.prisma.walletTransaction.findMany({
        where,
        take,
        skip,
        orderBy: { createdAt: 'desc' },
        include: {
          prestation: {
            select: {
              id: true,
              budget: true,
              particulier: { select: { prenom: true, nom: true } },
              prestataireService: {
                select: { service: { select: { libelle: true } } },
              },
            },
          },
        },
      }),
    ]);

    const items = rows.map((row) => {
      const meta = row.meta as
        | { gross?: number; fee?: number; net?: number }
        | null
        | undefined;
      const grossFromMeta =
        meta &&
        typeof meta.gross === 'number' &&
        !Number.isNaN(meta.gross)
          ? meta.gross
          : null;
      const budget = row.prestation?.budget;
      const grossFromBudget =
        budget != null ? Number(budget) : null;
      const montantPayeParClient =
        grossFromMeta ??
        (grossFromBudget != null && !Number.isNaN(grossFromBudget)
          ? grossFromBudget
          : Number(row.amount));

      const particulier = row.prestation?.particulier;
      const clientNom = particulier
        ? `${particulier.prenom} ${particulier.nom}`.trim()
        : '—';

      const serviceLibelle =
        row.prestation?.prestataireService?.service?.libelle ?? '—';

      return {
        id: row.id,
        date: row.createdAt.toISOString(),
        montant: montantPayeParClient,
        montantNetPrestataire: Number(row.amount),
        clientNom,
        serviceLibelle,
        prestationId: row.prestationId,
        statut: 'Payé',
      };
    });

    return { total, items };
  }

  @Get('prestataires/:id')
  async getPrestataireDetails(@Param('id') prestataireId: string) {
    /** Toujours solde seul sur le include : évite l’erreur Prisma si `balance_plafond` / `statut_prestataire_wallet` ne sont pas encore migrés. */
    const prestataire = await this.prisma.prestataire.findUnique({
      where: { id: prestataireId },
      select: prestataireAdminDetailSelect(),
    });

    if (!prestataire) {
      throw new BadRequestException('Prestataire introuvable');
    }

    let walletStatutPrestataire: PrestataireWalletStatut = PrestataireWalletStatut.ACTIF;
    let walletBalancePlafond: number | null = null;
    try {
      const wExtra = await this.prisma.wallet.findUnique({
        where: { prestataireId },
        select: { balancePlafond: true, statutPrestataire: true },
      });
      if (wExtra) {
        if (wExtra.statutPrestataire != null) {
          walletStatutPrestataire = wExtra.statutPrestataire;
        }
        if (wExtra.balancePlafond != null) {
          walletBalancePlafond = Number(wExtra.balancePlafond);
        }
      }
    } catch (err) {
      this.logger.debug(
        `Wallet plafond/statut non disponibles en base (migrate ?) — ${err instanceof Error ? err.message : String(err)}`,
      );
    }

    const notes = prestataire.avis.map((a) => a.note);
    const noteMoyenne =
      notes.length > 0
        ? Math.round(
            (notes.reduce((sum, n) => sum + n, 0) / notes.length) * 10,
          ) / 10
        : 0;
    const libelles = prestataire.servicesProposes.map((s) => s.service.libelle);
    const metier =
      libelles.length === 0 ? '—' : libelles.length === 1 ? libelles[0]! : libelles.join(', ');

    return {
      id: prestataire.id,
      nom: prestataire.nom,
      email: prestataire.user?.email ?? '',
      telephone: prestataire.telephone ?? '',
      adresse: prestataire.adresse ?? '',
      bio: prestataire.bio ?? '',
      avatarUrl: prestataire.avatarUrl,
      actif: prestataire.actif,
      statutVerification: prestataire.statutVerification,
      dateAdhesion: prestataire.createdAt.toISOString(),
      metier,
      noteMoyenne,
      nbAvis: notes.length,
      walletBalance: prestataire.wallet ? Number(prestataire.wallet.balance) : 0,
      walletStatutPrestataire,
      walletBalancePlafond,
      services: prestataire.servicesProposes.map((s) => ({
        id: s.id,
        libelle: s.service.libelle,
      })),
      documents: prestataire.documents.map((d) => ({
        id: d.id,
        typeCode: d.typeDocument.code,
        typeLibelle: d.typeDocument.libelle,
        obligatoire: d.typeDocument.obligatoire,
        statut: d.statut,
        motifRefus: d.motifRefus,
        fichierUrl: d.fichierUrl,
        nomFichier: d.nomFichier,
        updatedAt: d.updatedAt,
      })),
    };
  }

  @Patch('prestataires/:id/wallet/statut')
  async patchPrestataireWalletStatut(
    @Param('id') prestataireId: string,
    @Body() body: { statut?: string },
  ) {
    const s = body.statut;
    if (s !== 'ACTIF' && s !== 'BLOQUE') {
      throw new BadRequestException('statut doit être ACTIF ou BLOQUE');
    }
    const exists = await this.prisma.prestataire.findUnique({
      where: { id: prestataireId },
      select: { id: true },
    });
    if (!exists) {
      throw new BadRequestException('Prestataire introuvable');
    }
    let wallet = await this.prisma.wallet.findUnique({ where: { prestataireId } });
    if (!wallet) {
      wallet = await this.prisma.wallet.create({
        data: {
          type: WalletType.PRESTATAIRE,
          prestataireId,
          statutPrestataire: s as PrestataireWalletStatut,
        },
      });
    } else {
      wallet = await this.prisma.wallet.update({
        where: { id: wallet.id },
        data: { statutPrestataire: s as PrestataireWalletStatut },
      });
    }
    return { statutPrestataire: wallet.statutPrestataire };
  }

  @Patch('prestataires/:id/wallet/plafond')
  async patchPrestataireWalletPlafond(
    @Param('id') prestataireId: string,
    @Body() body: { montantMax?: number | null },
  ) {
    if (!('montantMax' in body)) {
      throw new BadRequestException(
        'montantMax requis (nombre positif ou null pour retirer le plafond)',
      );
    }
    const raw = body.montantMax;
    let balancePlafond: number | null;
    if (raw === null) {
      balancePlafond = null;
    } else {
      const n = Number(raw);
      if (!Number.isFinite(n) || n < 0) {
        throw new BadRequestException('montantMax invalide');
      }
      balancePlafond = n;
    }
    const exists = await this.prisma.prestataire.findUnique({
      where: { id: prestataireId },
      select: { id: true },
    });
    if (!exists) {
      throw new BadRequestException('Prestataire introuvable');
    }
    let wallet = await this.prisma.wallet.findUnique({ where: { prestataireId } });
    if (!wallet) {
      wallet = await this.prisma.wallet.create({
        data: {
          type: WalletType.PRESTATAIRE,
          prestataireId,
          balancePlafond,
        },
      });
    } else {
      if (balancePlafond != null) {
        const bal = Math.round(Number(wallet.balance) * 100) / 100;
        const max = Math.round(balancePlafond * 100) / 100;
        if (bal > max) {
          throw new BadRequestException(
            `Le solde actuel (${bal} FCFA) est déjà supérieur au plafond choisi. Le solde maximal doit être au moins égal au solde actuel.`,
          );
        }
      }
      wallet = await this.prisma.wallet.update({
        where: { id: wallet.id },
        data: { balancePlafond },
      });
    }
    return {
      balancePlafond:
        wallet.balancePlafond != null ? Number(wallet.balancePlafond) : null,
    };
  }

  @Delete('prestataires/:prestataireId/documents/:documentId')
  async deletePrestataireDocument(
    @Param('prestataireId') prestataireId: string,
    @Param('documentId') documentId: string,
  ) {
    const existing = await this.prisma.prestataireDocument.findFirst({
      where: { id: documentId, prestataireId },
      select: { id: true },
    });
    if (!existing) {
      throw new BadRequestException('Document introuvable pour ce prestataire');
    }
    await this.prisma.prestataireDocument.delete({ where: { id: existing.id } });
    return { success: true };
  }

  @Patch('prestataires/:prestataireId/documents/:documentId/validate')
  async validatePrestataireDocument(
    @Param('prestataireId') prestataireId: string,
    @Param('documentId') documentId: string,
    @CurrentUser() admin: CurrentUserPayload,
  ) {
    const existing = await this.prisma.prestataireDocument.findFirst({
      where: { id: documentId, prestataireId },
      select: { id: true, prestataireId: true },
    });

    if (!existing) {
      throw new BadRequestException('Document introuvable pour ce prestataire');
    }

    const now = new Date();
    await this.prisma.prestataireDocument.update({
      where: { id: existing.id },
      data: {
        statut: StatutDocument.VALIDE,
        validePar: admin.userId,
        valideAt: now,
        motifRefus: null,
      },
    });

    const [requiredTypesCount, validatedRequiredDocsCount] = await Promise.all([
      this.prisma.typeDocument.count({
        where: { actif: true, obligatoire: true },
      }),
      this.prisma.prestataireDocument.count({
        where: {
          prestataireId,
          statut: StatutDocument.VALIDE,
          typeDocument: { actif: true, obligatoire: true },
        },
      }),
    ]);

    const nextStatus =
      requiredTypesCount > 0 && validatedRequiredDocsCount >= requiredTypesCount
        ? StatutVerificationPrestataire.VERIFIE
        : StatutVerificationPrestataire.EN_ATTENTE;

    await this.prisma.prestataire.update({
      where: { id: prestataireId },
      data: { statutVerification: nextStatus },
    });

    return {
      ok: true,
      documentId: existing.id,
      prestataireId,
      statutVerification: nextStatus,
    };
  }

  @Patch('prestataires/:prestataireId/documents/:documentId/reject')
  async rejectPrestataireDocument(
    @Param('prestataireId') prestataireId: string,
    @Param('documentId') documentId: string,
    @Body() body: { motif?: string },
  ) {
    const motif = (body?.motif ?? '').trim();
    if (motif.length < 3) {
      throw new BadRequestException(
        'Merci d’indiquer un motif de refus (au moins 3 caractères).',
      );
    }

    const existing = await this.prisma.prestataireDocument.findFirst({
      where: { id: documentId, prestataireId },
      select: { id: true },
    });

    if (!existing) {
      throw new BadRequestException('Document introuvable pour ce prestataire');
    }

    await this.prisma.prestataireDocument.update({
      where: { id: existing.id },
      data: {
        statut: StatutDocument.REFUSE,
        motifRefus: motif,
        validePar: null,
        valideAt: null,
      },
    });

    await this.prisma.prestataire.update({
      where: { id: prestataireId },
      data: { statutVerification: StatutVerificationPrestataire.REFUSE },
    });

    return {
      ok: true,
      documentId: existing.id,
      prestataireId,
      statutVerification: StatutVerificationPrestataire.REFUSE,
    };
  }

  /**
   * Demandes Mille Services : KPIs sur les prestations + liste paginée avec statut.
   * Query optionnelle `statut` : filtre sur la liste (valeur enum, ex. EN_ATTENTE).
   */
  @Get('demandes-mille-services')
  async getDemandesMilleServices(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
    @Query('statut') statutFilter?: string,
  ) {
    const take = Math.min(Math.max(Number(limit ?? 20), 1), 100);
    const skip = Math.max(Number(offset ?? 0), 0);

    const allowed = new Set<string>(Object.values(StatutPrestation));
    const listWhere =
      statutFilter && allowed.has(statutFilter)
        ? { statut: statutFilter as StatutPrestation }
        : {};

    const [
      total,
      enAttente,
      acceptee,
      enCours,
      terminee,
      payee,
      refusee,
      annulee,
      filteredTotal,
      rows,
    ] = await Promise.all([
      this.prisma.prestation.count(),
      this.prisma.prestation.count({
        where: { statut: StatutPrestation.EN_ATTENTE },
      }),
      this.prisma.prestation.count({
        where: { statut: StatutPrestation.ACCEPTEE },
      }),
      this.prisma.prestation.count({
        where: { statut: StatutPrestation.EN_COURS },
      }),
      this.prisma.prestation.count({
        where: { statut: StatutPrestation.TERMINEE },
      }),
      this.prisma.prestation.count({
        where: { statut: StatutPrestation.PAYEE },
      }),
      this.prisma.prestation.count({
        where: { statut: StatutPrestation.REFUSEE },
      }),
      this.prisma.prestation.count({
        where: { statut: StatutPrestation.ANNULEE },
      }),
      this.prisma.prestation.count({ where: listWhere }),
      this.prisma.prestation.findMany({
        where: listWhere,
        take,
        skip,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          statut: true,
          typeDeTache: true,
          description: true,
          budget: true,
          adresse: true,
          createdAt: true,
          updatedAt: true,
          particulier: {
            select: { id: true, nom: true, prenom: true, telephone: true },
          },
          prestataire: { select: { id: true, nom: true, telephone: true } },
          prestataireService: {
            select: {
              service: { select: { libelle: true, slug: true } },
            },
          },
        },
      }),
    ]);

    return {
      stats: {
        total,
        enAttente,
        acceptee,
        enCours,
        terminee,
        payee,
        refusee,
        annulee,
      },
      total: filteredTotal,
      items: rows.map((r) => ({
        id: r.id,
        statut: r.statut,
        statutLabel: statutPrestationLabelFr(r.statut),
        typeDeTache: r.typeDeTache ?? null,
        description: r.description ?? null,
        budget:
          r.budget != null ? Number(r.budget) : null,
        adresse: r.adresse ?? null,
        createdAt: r.createdAt.toISOString(),
        updatedAt: r.updatedAt.toISOString(),
        serviceLibelle: r.prestataireService?.service?.libelle ?? null,
        particulier: {
          id: r.particulier.id,
          nomComplet: `${r.particulier.prenom} ${r.particulier.nom}`.trim(),
          telephone: r.particulier.telephone ?? null,
        },
        prestataire: {
          id: r.prestataire.id,
          nom: r.prestataire.nom,
          telephone: r.prestataire.telephone ?? null,
        },
      })),
    };
  }

  /** Liste des métiers (services) avec nombre de prestataires liés (ligne PrestataireService). */
  @Get('services')
  async getServicesForAdmin() {
    const rows = await this.prisma.service.findMany({
      orderBy: { libelle: 'asc' },
      select: {
        id: true,
        libelle: true,
        slug: true,
        actif: true,
        createdAt: true,
        _count: {
          select: { prestataires: true },
        },
      },
    });
    return {
      items: rows.map((s) => ({
        id: s.id,
        libelle: s.libelle,
        slug: s.slug,
        actif: s.actif,
        createdAt: s.createdAt.toISOString(),
        prestatairesCount: s._count.prestataires,
      })),
    };
  }

  @Post('services')
  async createService(@Body() body: { libelle?: string }) {
    const libelle = body?.libelle?.trim();
    if (!libelle) {
      throw new BadRequestException('Libellé requis');
    }
    const base = this.slugifyServiceLabel(libelle);
    const slug = await this.ensureUniqueServiceSlug(base);
    const created = await this.prisma.service.create({
      data: { libelle, slug, actif: true },
      select: {
        id: true,
        libelle: true,
        slug: true,
        actif: true,
        createdAt: true,
        _count: { select: { prestataires: true } },
      },
    });
    return {
      id: created.id,
      libelle: created.libelle,
      slug: created.slug,
      actif: created.actif,
      createdAt: created.createdAt.toISOString(),
      prestatairesCount: created._count.prestataires,
    };
  }

  @Patch('services/:serviceId')
  async updateService(
    @Param('serviceId') serviceId: string,
    @Body() body: { actif?: boolean; libelle?: string },
  ) {
    const existing = await this.prisma.service.findUnique({
      where: { id: serviceId },
      select: { id: true },
    });
    if (!existing) {
      throw new BadRequestException('Métier introuvable');
    }
    if (body.actif === false) {
      const rattaches = await this.prisma.prestataireService.count({
        where: { serviceId },
      });
      if (rattaches > 0) {
        throw new BadRequestException(
          `Impossible de désactiver ce service : ${rattaches} prestataire(s) encore rattaché(s). Retirez les rattachements avant.`,
        );
      }
    }
    const data: { actif?: boolean; libelle?: string; slug?: string } = {};
    if (typeof body.actif === 'boolean') {
      data.actif = body.actif;
    }
    if (body.libelle !== undefined) {
      const libelle = body.libelle.trim();
      if (!libelle) {
        throw new BadRequestException('Libellé invalide');
      }
      data.libelle = libelle;
      const base = this.slugifyServiceLabel(libelle);
      data.slug = await this.ensureUniqueServiceSlug(base, serviceId);
    }
    if (Object.keys(data).length === 0) {
      throw new BadRequestException('Aucune modification');
    }
    const updated = await this.prisma.service.update({
      where: { id: serviceId },
      data,
      select: {
        id: true,
        libelle: true,
        slug: true,
        actif: true,
        createdAt: true,
        _count: { select: { prestataires: true } },
      },
    });
    return {
      id: updated.id,
      libelle: updated.libelle,
      slug: updated.slug,
      actif: updated.actif,
      createdAt: updated.createdAt.toISOString(),
      prestatairesCount: updated._count.prestataires,
    };
  }

  private slugifyServiceLabel(input: string): string {
    const s = input
      .normalize('NFD')
      .replace(/\p{M}/gu, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    return s || 'service';
  }

  private async ensureUniqueServiceSlug(
    base: string,
    excludeServiceId?: string,
  ): Promise<string> {
    let slug = base;
    let n = 0;
    while (true) {
      const row = await this.prisma.service.findUnique({
        where: { slug },
        select: { id: true },
      });
      if (!row || row.id === excludeServiceId) {
        return slug;
      }
      n += 1;
      slug = `${base}-${n}`;
    }
  }

  /** Prestataires inscrits sur un métier (service). */
  @Get('services/:serviceId/prestataires')
  async getPrestatairesByService(@Param('serviceId') serviceId: string) {
    const service = await this.prisma.service.findUnique({
      where: { id: serviceId },
      select: { id: true, libelle: true },
    });
    if (!service) {
      throw new BadRequestException('Métier (service) introuvable');
    }

    const links = await this.prisma.prestataireService.findMany({
      where: { serviceId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        actif: true,
        prestataire: {
          select: {
            id: true,
            nom: true,
            telephone: true,
            actif: true,
            statutVerification: true,
            user: { select: { email: true } },
          },
        },
      },
    });

    return {
      service: { id: service.id, libelle: service.libelle },
      items: links.map((l) => ({
        id: l.prestataire.id,
        nom: l.prestataire.nom,
        email: l.prestataire.user?.email ?? '',
        telephone: l.prestataire.telephone ?? '',
        actif: l.prestataire.actif,
        offreActive: l.actif,
        statutVerification: l.prestataire.statutVerification,
      })),
    };
  }

  /** Supprime un métier uniquement si aucun prestataire n’y est rattaché. */
  @Delete('services/:serviceId')
  async deleteService(@Param('serviceId') serviceId: string) {
    const count = await this.prisma.prestataireService.count({
      where: { serviceId },
    });
    if (count > 0) {
      throw new BadRequestException(
        'Impossible de supprimer : des prestataires sont encore inscrits à ce métier.',
      );
    }
    await this.prisma.service.delete({ where: { id: serviceId } });
    return { ok: true, id: serviceId };
  }

  /** Liste des offres d'abonnement (admin). */
  @Get('offres')
  async getOffresForAdmin() {
    const rows = await this.prisma.offre.findMany({
      orderBy: [{ ordre: 'asc' }, { createdAt: 'desc' }],
      select: {
        id: true,
        code: true,
        libelle: true,
        description: true,
        prix: true,
        dureeMois: true,
        actif: true,
        ordre: true,
        createdAt: true,
      },
    });
    return {
      items: rows.map((o) => ({
        id: o.id,
        code: o.code,
        libelle: o.libelle,
        description: o.description ?? '',
        prix: Number(o.prix),
        dureeMois: o.dureeMois,
        actif: o.actif,
        ordre: o.ordre,
        createdAt: o.createdAt.toISOString(),
      })),
    };
  }

  /** Crée une offre d'abonnement (admin). */
  @Post('offres')
  async createOffre(
    @Body()
    body: {
      code?: string;
      libelle?: string;
      description?: string;
      prix?: number;
      dureeMois?: number;
      ordre?: number;
    },
  ) {
    const libelle = (body?.libelle ?? '').trim();
    if (!libelle) throw new BadRequestException('Libellé requis');

    const prix = Number(body?.prix);
    if (!Number.isFinite(prix) || prix < 0) {
      throw new BadRequestException('Prix invalide');
    }

    const dureeMois = Number(body?.dureeMois);
    if (!Number.isInteger(dureeMois) || dureeMois <= 0) {
      throw new BadRequestException('Durée (mois) invalide');
    }

    const ordreRaw = body?.ordre;
    const ordre =
      ordreRaw == null ? 0 : Number.isFinite(Number(ordreRaw)) ? Number(ordreRaw) : 0;

    const rawCode = (body?.code ?? '').trim();
    const baseCode = rawCode || this.slugifyServiceLabel(libelle);
    const code = await this.ensureUniqueOffreCode(baseCode);

    const created = await this.prisma.offre.create({
      data: {
        code,
        libelle,
        description: body?.description?.trim() || null,
        prix,
        dureeMois,
        ordre,
        actif: true,
      },
      select: {
        id: true,
        code: true,
        libelle: true,
        description: true,
        prix: true,
        dureeMois: true,
        actif: true,
        ordre: true,
        createdAt: true,
      },
    });

    return {
      id: created.id,
      code: created.code,
      libelle: created.libelle,
      description: created.description ?? '',
      prix: Number(created.prix),
      dureeMois: created.dureeMois,
      actif: created.actif,
      ordre: created.ordre,
      createdAt: created.createdAt.toISOString(),
    };
  }

  /** Active/désactive une offre d'abonnement (admin). */
  @Patch('offres/:offreId')
  async updateOffre(
    @Param('offreId') offreId: string,
    @Body()
    body: {
      actif?: boolean;
      code?: string;
      libelle?: string;
      description?: string;
      prix?: number;
      dureeMois?: number;
      ordre?: number;
    },
  ) {
    const existing = await this.prisma.offre.findUnique({
      where: { id: offreId },
      select: { id: true, code: true, libelle: true, description: true, prix: true, dureeMois: true, ordre: true, actif: true },
    });
    if (!existing) throw new BadRequestException('Offre introuvable');

    const data: {
      actif?: boolean;
      code?: string;
      libelle?: string;
      description?: string | null;
      prix?: number;
      dureeMois?: number;
      ordre?: number;
    } = {};

    if (typeof body?.actif === 'boolean') data.actif = body.actif;

    if (body.code !== undefined) {
      const rawCode = body.code.trim();
      const base = rawCode || this.slugifyServiceLabel(body.libelle?.trim() || existing.libelle);
      data.code = await this.ensureUniqueOffreCode(base, existing.id);
    }
    if (body.libelle !== undefined) {
      const libelle = body.libelle.trim();
      if (!libelle) throw new BadRequestException('Libellé requis');
      data.libelle = libelle;
      if (body.code === undefined) {
        data.code = await this.ensureUniqueOffreCode(this.slugifyServiceLabel(libelle), existing.id);
      }
    }
    if (body.description !== undefined) {
      data.description = body.description.trim() || null;
    }
    if (body.prix !== undefined) {
      const prix = Number(body.prix);
      if (!Number.isFinite(prix) || prix < 0) throw new BadRequestException('Prix invalide');
      data.prix = prix;
    }
    if (body.dureeMois !== undefined) {
      const dureeMois = Number(body.dureeMois);
      if (!Number.isInteger(dureeMois) || dureeMois <= 0) {
        throw new BadRequestException('Durée (mois) invalide');
      }
      data.dureeMois = dureeMois;
    }
    if (body.ordre !== undefined) {
      const ordre = Number(body.ordre);
      if (!Number.isFinite(ordre)) throw new BadRequestException('Ordre invalide');
      data.ordre = ordre;
    }
    if (Object.keys(data).length === 0) {
      throw new BadRequestException('Aucune modification');
    }

    const updated = await this.prisma.offre.update({
      where: { id: offreId },
      data,
      select: {
        id: true,
        code: true,
        libelle: true,
        description: true,
        prix: true,
        dureeMois: true,
        actif: true,
        ordre: true,
        createdAt: true,
      },
    });

    return {
      id: updated.id,
      code: updated.code,
      libelle: updated.libelle,
      description: updated.description ?? '',
      prix: Number(updated.prix),
      dureeMois: updated.dureeMois,
      actif: updated.actif,
      ordre: updated.ordre,
      createdAt: updated.createdAt.toISOString(),
    };
  }

  private async ensureUniqueOffreCode(
    base: string,
    excludeOffreId?: string,
  ): Promise<string> {
    let code = base;
    let n = 0;
    while (true) {
      const row = await this.prisma.offre.findUnique({
        where: { code },
        select: { id: true },
      });
      if (!row || row.id === excludeOffreId) return code;
      n += 1;
      code = `${base}-${n}`;
    }
  }
}
