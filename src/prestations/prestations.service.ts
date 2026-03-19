import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { StatutPrestation, TransactionType } from '../../generated/prisma/client.js';
import { NotificationsService } from '../notifications/notifications.service.js';
import { WalletsService } from '../wallets/wallets.service.js';

@Injectable()
export class PrestationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notifications: NotificationsService,
    private readonly wallets: WalletsService,
  ) {}

  /**
   * Créer une prestation (particulier choisit le prestataire).
   * Statut initial : EN_ATTENTE.
   * Le prestataire reçoit une notification push.
   */
  async create(particulierUserId: string, dto: {
    prestataireId: string;
    prestataireServiceId: string;
    typeDeTache?: string;
    description?: string;
    imageUrl?: string;
    budget?: number;
    adresse?: string;
    codePostal?: string;
    ville?: string;
    noteParticulier?: string;
  }) {
    const particulier = await this.prisma.particulier.findUnique({
      where: { userId: particulierUserId },
      select: { id: true, prenom: true, nom: true },
    });
    if (!particulier) {
      throw new BadRequestException('Profil particulier introuvable');
    }

    const prestataire = await this.prisma.prestataire.findUnique({
      where: { id: dto.prestataireId },
      include: { user: { select: { id: true } } },
    });
    if (!prestataire) {
      throw new BadRequestException('Prestataire introuvable');
    }
    if (!prestataire.actif) {
      throw new BadRequestException('Ce prestataire n\'est plus actif');
    }

    const service = await this.prisma.prestataireService.findFirst({
      where: {
        id: dto.prestataireServiceId,
        prestataireId: dto.prestataireId,
        actif: true,
      },
      include: { service: true },
    });
    if (!service) {
      throw new BadRequestException('Service introuvable ou inactif pour ce prestataire');
    }

    // Éviter les doublons : même particulier, prestataire, type de tâche, service et même date de création
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    const typeDeTacheValue = dto.typeDeTache?.trim() || null;
    const existing = await this.prisma.prestation.findFirst({
      where: {
        particulierId: particulier.id,
        prestataireId: prestataire.id,
        prestataireServiceId: service.id,
        typeDeTache: typeDeTacheValue,
        createdAt: { gte: startOfDay, lte: endOfDay },
      },
      include: {
        particulier: { select: { prenom: true, nom: true } },
        prestataire: { select: { nom: true, avatarUrl: true } },
        prestataireService: { include: { service: true } },
      },
    });
    if (existing) {
      return this.formatPrestation(existing);
    }

    const prestation = await this.prisma.prestation.create({
      data: {
        particulierId: particulier.id,
        prestataireId: prestataire.id,
        prestataireServiceId: service.id,
        typeDeTache: dto.typeDeTache ?? null,
        description: dto.description ?? null,
        imageUrl: dto.imageUrl ?? null,
        budget: dto.budget != null ? dto.budget : null,
        adresse: dto.adresse ?? null,
        codePostal: dto.codePostal ?? null,
        ville: dto.ville ?? null,
        noteParticulier: dto.noteParticulier ?? null,
        statut: StatutPrestation.EN_ATTENTE,
      },
      include: {
        particulier: { select: { prenom: true, nom: true } },
        prestataire: { select: { nom: true } },
        prestataireService: { include: { service: true } },
      },
    });

    const nomClient = [particulier.prenom, particulier.nom].filter(Boolean).join(' ').trim() || 'Un client';
    await this.notifications.sendToUser(prestataire.user.id, {
      title: 'Nouvelle demande de prestation',
      body: `${nomClient} vous a demandé une prestation (${service.service.libelle}).`,
      type: 'prestation_created',
      data: { prestationId: prestation.id },
    });

    return this.formatPrestation(prestation);
  }

  /**
   * Accepter une prestation (prestataire). Passe le statut en ACCEPTEE.
   * Le particulier est notifié.
   */
  async accepter(prestataireUserId: string, prestationId: string) {
    const prestataire = await this.prisma.prestataire.findUnique({
      where: { userId: prestataireUserId },
      select: { id: true },
    });
    if (!prestataire) {
      throw new BadRequestException('Profil prestataire introuvable');
    }

    const prestation = await this.prisma.prestation.findFirst({
      where: { id: prestationId, prestataireId: prestataire.id },
      include: {
        particulier: { select: { userId: true } },
        prestataire: { select: { nom: true } },
        prestataireService: { include: { service: true } },
      },
    });
    if (!prestation) {
      throw new BadRequestException('Prestation introuvable');
    }
    if (prestation.statut !== StatutPrestation.EN_ATTENTE) {
      throw new BadRequestException('Cette prestation n\'est plus en attente d\'acceptation');
    }

    const updated = await this.prisma.prestation.update({
      where: { id: prestationId },
      data: {
        statut: StatutPrestation.ACCEPTEE,
        acceptedAt: new Date(),
      },
      include: {
        particulier: { select: { prenom: true, nom: true, userId: true } },
        prestataire: { select: { nom: true } },
        prestataireService: { include: { service: true } },
      },
    });

    await this.notifications.sendToUser(updated.particulier.userId, {
      title: 'Prestation acceptée',
      body: `${updated.prestataire.nom} a accepté votre demande (${updated.prestataireService.service.libelle}).`,
      type: 'prestation_accepted',
      data: { prestationId: updated.id },
    });

    return this.formatPrestation(updated);
  }

  /**
   * Démarrer une prestation (prestataire arrivé chez le client).
   * Passe le statut en EN_COURS.
   */
  async demarrer(prestataireUserId: string, prestationId: string) {
    const prestataire = await this.prisma.prestataire.findUnique({
      where: { userId: prestataireUserId },
      select: { id: true },
    });
    if (!prestataire) {
      throw new BadRequestException('Profil prestataire introuvable');
    }

    const prestation = await this.prisma.prestation.findFirst({
      where: { id: prestationId, prestataireId: prestataire.id },
    });
    if (!prestation) {
      throw new BadRequestException('Prestation introuvable');
    }
    if (prestation.statut !== StatutPrestation.ACCEPTEE) {
      throw new BadRequestException('Seule une prestation acceptée peut être démarrée');
    }

    const updated = await this.prisma.prestation.update({
      where: { id: prestationId },
      data: { statut: StatutPrestation.EN_COURS },
    });

    return this.formatPrestation(updated);
  }

  /**
   * Refuser une prestation (prestataire). Passe le statut en REFUSEE.
   * Le particulier est notifié.
   */
  async refuser(prestataireUserId: string, prestationId: string) {
    const prestataire = await this.prisma.prestataire.findUnique({
      where: { userId: prestataireUserId },
      select: { id: true },
    });
    if (!prestataire) {
      throw new BadRequestException('Profil prestataire introuvable');
    }

    const prestation = await this.prisma.prestation.findFirst({
      where: { id: prestationId, prestataireId: prestataire.id },
      include: {
        particulier: { select: { userId: true } },
        prestataire: { select: { nom: true } },
        prestataireService: { include: { service: true } },
      },
    });
    if (!prestation) {
      throw new BadRequestException('Prestation introuvable');
    }
    if (prestation.statut !== StatutPrestation.EN_ATTENTE) {
      throw new BadRequestException('Cette prestation n\'est plus en attente d\'acceptation');
    }

    const updated = await this.prisma.prestation.update({
      where: { id: prestationId },
      data: { statut: StatutPrestation.REFUSEE },
      include: {
        particulier: { select: { prenom: true, nom: true, userId: true } },
        prestataire: { select: { nom: true } },
        prestataireService: { include: { service: true } },
      },
    });

    await this.notifications.sendToUser(updated.particulier.userId, {
      title: 'Prestation refusée',
      body: `${updated.prestataire.nom} a refusé votre demande (${updated.prestataireService.service.libelle}).`,
      type: 'prestation_refused',
      data: { prestationId: updated.id },
    });

    return this.formatPrestation(updated);
  }

  /**
   * Terminer une prestation (prestataire). Passe le statut en TERMINEE.
   * Le particulier est notifié (pour procéder au paiement).
   */
  async terminer(prestataireUserId: string, prestationId: string) {
    const prestataire = await this.prisma.prestataire.findUnique({
      where: { userId: prestataireUserId },
      select: { id: true },
    });
    if (!prestataire) {
      throw new BadRequestException('Profil prestataire introuvable');
    }

    const prestation = await this.prisma.prestation.findFirst({
      where: { id: prestationId, prestataireId: prestataire.id },
      include: {
        particulier: { select: { userId: true } },
        prestataire: { select: { nom: true } },
        prestataireService: { include: { service: true } },
      },
    });
    if (!prestation) {
      throw new BadRequestException('Prestation introuvable');
    }
    if (prestation.statut !== StatutPrestation.EN_COURS && prestation.statut !== StatutPrestation.ACCEPTEE) {
      throw new BadRequestException('Seule une prestation acceptée/en cours peut être terminée');
    }

    const updated = await this.prisma.prestation.update({
      where: { id: prestationId },
      data: {
        statut: StatutPrestation.TERMINEE,
        completedAt: new Date(),
      },
      include: {
        particulier: { select: { prenom: true, nom: true, userId: true } },
        prestataire: { select: { nom: true } },
        prestataireService: { include: { service: true } },
      },
    });

    await this.notifications.sendToUser(updated.particulier.userId, {
      title: 'Prestation terminée',
      body: `${updated.prestataire.nom} a terminé la prestation. Vous pouvez procéder au paiement.`,
      type: 'prestation_completed',
      data: { prestationId: updated.id },
    });

    return this.formatPrestation(updated);
  }

  /**
   * Marquer une prestation comme payée (particulier). Statut -> PAYEE.
   * Le prestataire est notifié. (À appeler après intégration paiement.)
   */
  async marquerPayee(particulierUserId: string, prestationId: string) {
    const particulier = await this.prisma.particulier.findUnique({
      where: { userId: particulierUserId },
      select: { id: true },
    });
    if (!particulier) {
      throw new BadRequestException('Profil particulier introuvable');
    }

    const prestation = await this.prisma.prestation.findFirst({
      where: { id: prestationId, particulierId: particulier.id },
      include: {
        prestataire: { include: { user: { select: { id: true } } } },
        prestataireService: { include: { service: true } },
      },
    });
    if (!prestation) {
      throw new BadRequestException('Prestation introuvable');
    }
    if (prestation.statut !== StatutPrestation.TERMINEE) {
      throw new BadRequestException('Seule une prestation terminée peut être payée');
    }

    const rawAmount =
      prestation.budget != null
        ? Number(prestation.budget)
        : prestation.prestataireService?.tarifHoraire != null
          ? Number(prestation.prestataireService.tarifHoraire)
          : null;
    if (rawAmount == null || Number.isNaN(rawAmount) || rawAmount <= 0) {
      throw new BadRequestException('Montant de la prestation introuvable');
    }

    const split = this.wallets.splitPrestationAmount(rawAmount);

    const updated = await this.prisma.$transaction(async (tx) => {
      const p = await tx.prestation.update({
        where: { id: prestationId },
        data: { statut: StatutPrestation.PAYEE },
        include: {
          particulier: { select: { prenom: true, nom: true } },
          prestataire: { select: { nom: true }, include: { user: { select: { id: true } } } },
          prestataireService: { include: { service: true } },
        },
      });

      const generalWallet = await this.wallets.ensureGeneralWallet(tx);
      const prestWallet = await this.wallets.ensurePrestataireWallet(p.prestataireId, tx);

      await this.wallets.creditWallet({
        tx,
        walletId: prestWallet.id,
        amount: split.net,
        type: TransactionType.PRESTATION,
        prestationId: p.id,
        createdByUserId: particulierUserId,
        meta: { gross: split.gross, fee: split.fee, rate: split.rate },
      });

      await this.wallets.creditWallet({
        tx,
        walletId: generalWallet.id,
        amount: split.fee,
        type: TransactionType.PRESTATION,
        prestationId: p.id,
        createdByUserId: particulierUserId,
        meta: { gross: split.gross, fee: split.fee, rate: split.rate },
      });

      return p;
    });

    await this.notifications.sendToUser(updated.prestataire.user.id, {
      title: 'Prestation payée',
      body: `Le client a réglé la prestation ${updated.prestataireService.service.libelle}.`,
      type: 'prestation_paid',
      data: { prestationId: updated.id },
    });

    return this.formatPrestation(updated);
  }

  /**
   * Liste des prestations pour l'utilisateur connecté (particulier ou prestataire).
   */
  async listForUser(userId: string, role: 'PARTICULIER' | 'PRESTATAIRE') {
    if (role === 'PARTICULIER') {
      const particulier = await this.prisma.particulier.findUnique({
        where: { userId },
        select: { id: true },
      });
      if (!particulier) return [];
      const list = await this.prisma.prestation.findMany({
        where: { particulierId: particulier.id },
        orderBy: { createdAt: 'desc' },
        include: {
          prestataire: { select: { nom: true, avatarUrl: true } },
          prestataireService: { include: { service: true } },
        },
      });
      return list.map((p) => this.formatPrestation(p));
    }

    const prestataire = await this.prisma.prestataire.findUnique({
      where: { userId },
      select: { id: true },
    });
    if (!prestataire) return [];
    const list = await this.prisma.prestation.findMany({
      where: { prestataireId: prestataire.id },
      orderBy: { createdAt: 'desc' },
      include: {
        particulier: { select: { prenom: true, nom: true } },
        prestataireService: { include: { service: true } },
      },
    });
    return list.map((p) => this.formatPrestation(p));
  }

  /**
   * Récupère une prestation par ID avec prestataire et particulier (dont lat/lng).
   * Réservé au particulier ou au prestataire concerné par cette prestation.
   */
  async findById(prestationId: string, userId: string, role: string) {
    const particulier = await this.prisma.particulier.findUnique({
      where: { userId },
      select: { id: true },
    });
    const prestataire = await this.prisma.prestataire.findUnique({
      where: { userId },
      select: { id: true },
    });

    const prestation = await this.prisma.prestation.findUnique({
      where: { id: prestationId },
      include: {
        particulier: {
          select: {
            prenom: true,
            nom: true,
            latitude: true,
            longitude: true,
          },
        },
        prestataire: {
          select: {
            nom: true,
            avatarUrl: true,
            adresse: true,
            latitude: true,
            longitude: true,
          },
        },
        prestataireService: { include: { service: true } },
      },
    });

    if (!prestation) {
      throw new BadRequestException('Prestation introuvable');
    }

    const isParticulier = role === 'PARTICULIER' && particulier?.id === prestation.particulierId;
    const isPrestataire = role === 'PRESTATAIRE' && prestataire?.id === prestation.prestataireId;
    if (!isParticulier && !isPrestataire) {
      throw new ForbiddenException('Accès non autorisé à cette prestation');
    }

    return this.formatPrestationWithCoords(prestation);
  }

  private formatPrestationWithCoords(p: any) {
    return {
      id: p.id,
      statut: p.statut,
      typeDeTache: p.typeDeTache ?? undefined,
      description: p.description ?? undefined,
      imageUrl: p.imageUrl ?? undefined,
      budget: p.budget != null ? Number(p.budget) : undefined,
      adresse: p.adresse,
      codePostal: p.codePostal,
      ville: p.ville,
      noteParticulier: p.noteParticulier,
      acceptedAt: p.acceptedAt,
      completedAt: p.completedAt,
      createdAt: p.createdAt,
      particulier: p.particulier
        ? {
            prenom: p.particulier.prenom,
            nom: p.particulier.nom,
            telephone: p.particulier.telephone ?? undefined,
            latitude: p.particulier.latitude != null ? Number(p.particulier.latitude) : null,
            longitude: p.particulier.longitude != null ? Number(p.particulier.longitude) : null,
          }
        : undefined,
      prestataire: p.prestataire
        ? {
            nom: p.prestataire.nom,
            telephone: p.prestataire.telephone ?? undefined,
            avatarUrl: p.prestataire.avatarUrl,
            adresse: p.prestataire.adresse,
            latitude: p.prestataire.latitude != null ? Number(p.prestataire.latitude) : null,
            longitude: p.prestataire.longitude != null ? Number(p.prestataire.longitude) : null,
          }
        : undefined,
      service: p.prestataireService?.service
        ? {
            id: p.prestataireService.service.id,
            libelle: p.prestataireService.service.libelle,
            tarifHoraire:
              p.prestataireService.tarifHoraire != null
                ? Number(p.prestataireService.tarifHoraire)
                : undefined,
          }
        : undefined,
    };
  }

  private formatPrestation(p: any) {
    return {
      id: p.id,
      statut: p.statut,
      typeDeTache: p.typeDeTache ?? undefined,
      description: p.description ?? undefined,
      imageUrl: p.imageUrl ?? undefined,
      budget: p.budget != null ? Number(p.budget) : undefined,
      adresse: p.adresse,
      codePostal: p.codePostal,
      ville: p.ville,
      noteParticulier: p.noteParticulier,
      acceptedAt: p.acceptedAt,
      completedAt: p.completedAt,
      createdAt: p.createdAt,
      particulier: p.particulier
        ? {
            prenom: p.particulier.prenom,
            nom: p.particulier.nom,
          }
        : undefined,
      prestataire: p.prestataire
        ? { nom: p.prestataire.nom, avatarUrl: p.prestataire.avatarUrl }
        : undefined,
      service: p.prestataireService?.service
        ? { id: p.prestataireService.service.id, libelle: p.prestataireService.service.libelle }
        : undefined,
    };
  }
}
