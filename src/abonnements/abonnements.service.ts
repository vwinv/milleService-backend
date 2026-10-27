import {
  Injectable,
  BadRequestException,
  Logger,
  ServiceUnavailableException,
  ForbiddenException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import {
  Prisma,
  StatutAbonnement,
  TransactionType,
} from "../../generated/prisma/client.js";
import { WalletsService } from "../wallets/wallets.service.js";
import { SamirPayService } from "../samirpay/samirpay.service.js";
import type { SoftPayAbonnementDto } from "./dto/softpay-abonnement.dto.js";

@Injectable()
export class AbonnementsService {
  private readonly logger = new Logger(AbonnementsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly wallets: WalletsService,
    private readonly samirpay: SamirPayService,
  ) {}

  /**
   * Liste des offres d'abonnement actives (pour la souscription prestataire).
   */
  async getOffres() {
    const offres = await this.prisma.offre.findMany({
      where: { actif: true },
      orderBy: [{ ordre: "asc" }, { prix: "asc" }],
      select: {
        id: true,
        code: true,
        libelle: true,
        description: true,
        prix: true,
        dureeMois: true,
        ordre: true,
      },
    });
    return offres.map((o) => ({
      ...o,
      prix: o.prix != null ? Number(o.prix) : 0,
    }));
  }

  /**
   * Retourne l'abonnement actif du prestataire connecté, ou null.
   */
  async getAbonnementCourant(userId: string) {
    const prestataire = await this.prisma.prestataire.findUnique({
      where: { userId },
      select: { id: true },
    });
    if (!prestataire) {
      throw new BadRequestException("Profil prestataire introuvable");
    }

    const abo = await this.prisma.abonnement.findFirst({
      where: {
        prestataireId: prestataire.id,
        statut: StatutAbonnement.ACTIF,
        dateFin: { gte: new Date() },
      },
      include: {
        offre: {
          select: {
            id: true,
            code: true,
            libelle: true,
            prix: true,
            dureeMois: true,
          },
        },
      },
      orderBy: { dateFin: "desc" },
    });

    if (!abo) return null;

    return {
      id: abo.id,
      dateDebut: abo.dateDebut,
      dateFin: abo.dateFin,
      statut: abo.statut,
      offre: {
        ...abo.offre,
        prix: abo.offre.prix != null ? Number(abo.offre.prix) : 0,
      },
    };
  }

  /** Refuse l'accès métier prestataire si aucun abonnement actif. */
  async assertPrestataireHasActiveAbonnement(userId: string): Promise<void> {
    const abo = await this.getAbonnementCourant(userId);
    if (!abo) {
      throw new ForbiddenException(
        "Votre abonnement a expiré. Veuillez le renouveler pour accéder à cette fonctionnalité.",
      );
    }
  }

  /**
   * Vrai si SamirPay a confirmé le paiement pour ce token (transaction ABONNEMENT liée au prestataire).
   */
  async isPaydunyaInvoicePaidForPrestataire(
    userId: string,
    invoiceToken: string,
  ): Promise<{ paid: boolean; abonnement?: Awaited<ReturnType<typeof this.getAbonnementCourant>> }> {
    const token = invoiceToken?.trim();
    if (!token) {
      return { paid: false };
    }
    const prestataire = await this.prisma.prestataire.findUnique({
      where: { userId },
      select: { id: true },
    });
    if (!prestataire) {
      return { paid: false };
    }
    const intent = await this.samirpay.findIntent(token);
    const keys = Array.from(
      new Set(
        [token, intent?.orderId, intent?.transactionId].filter(
          (v): v is string => typeof v === "string" && v.length > 0,
        ),
      ),
    );
    const row = await this.prisma.walletTransaction.findFirst({
      where: {
        type: TransactionType.ABONNEMENT,
        OR: keys.flatMap((k) => [
          { meta: { path: ["samirOrderId"], equals: k } },
          { meta: { path: ["paydunyaInvoiceToken"], equals: k } },
        ]),
        abonnement: { prestataireId: prestataire.id },
      },
      select: { id: true },
    });
    if (!row) {
      return this.syncPaydunyaAbonnementFromConfirm(userId, token);
    }
    const abonnement = await this.getAbonnementCourant(userId);
    return { paid: true, abonnement: abonnement ?? undefined };
  }

  /**
   * Interroge SamirPay puis active l’abonnement si le paiement est confirmé.
   */
  async syncPaydunyaAbonnementFromConfirm(
    userId: string,
    invoiceToken: string,
  ): Promise<{ paid: boolean; abonnement?: Awaited<ReturnType<typeof this.getAbonnementCourant>>; error?: string }> {
    const token = invoiceToken?.trim();
    if (!token) {
      return { paid: false, error: "missing_token" };
    }
    const intent = await this.samirpay.findIntent(token);
    const meta =
      intent?.meta && typeof intent.meta === "object" && !Array.isArray(intent.meta)
        ? (intent.meta as Record<string, unknown>)
        : null;
    if (!intent || intent.kind !== "abonnement" || !meta) {
      return { paid: false, error: "payment_not_found" };
    }
    const offreId = String(meta["offreId"] ?? "").trim();
    const prestataireId = String(meta["prestataireId"] ?? "").trim();
    const customUserId = String(meta["userId"] ?? "").trim();
    if (!offreId || !prestataireId || customUserId !== userId) {
      return { paid: false, error: "invalid_intent" };
    }
    const status = await this.samirpay.getPaymentStatus(
      intent.transactionId || intent.orderId,
    );
    if (status.state !== "paid") {
      return { paid: false, error: `status_${status.state}` };
    }
    const paidAmount = status.amountFcfa ?? intent.amountFcfa;
    if (Math.abs(paidAmount - intent.amountFcfa) > 1) {
      return { paid: false, error: "amount_mismatch" };
    }
    const r = await this.finalizeFromPaydunyaIpn({
      offreId,
      prestataireId,
      userId: customUserId,
      paidAmount,
      invoiceToken: intent.orderId,
    });
    if (!r.ok) {
      return { paid: false, error: "error" in r ? String(r.error) : "finalize_failed" };
    }
    const abonnement = await this.getAbonnementCourant(userId);
    return { paid: true, abonnement: abonnement ?? undefined };
  }

  /**
   * Souscription à une offre : crée un nouvel abonnement et expire l'éventuel abonnement actif.
   */
  async souscrire(userId: string, offreId: string) {
    const prestataire = await this.prisma.prestataire.findUnique({
      where: { userId },
      select: { id: true },
    });
    if (!prestataire) {
      throw new BadRequestException("Profil prestataire introuvable");
    }

    const offre = await this.prisma.offre.findUnique({
      where: { id: offreId, actif: true },
    });
    if (!offre) {
      throw new BadRequestException("Offre introuvable ou inactive");
    }

    const prixFcfa = Number(offre.prix);
    if (!Number.isFinite(prixFcfa) || prixFcfa > 0) {
      throw new BadRequestException(
        "Cette offre nécessite un paiement. Utilisez le parcours SamirPay.",
      );
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dateFin = new Date(today);
    dateFin.setMonth(dateFin.getMonth() + offre.dureeMois);

    const newAbo = await this.prisma.$transaction(async (tx) => {
      await tx.abonnement.updateMany({
        where: {
          prestataireId: prestataire.id,
          statut: StatutAbonnement.ACTIF,
        },
        data: { statut: StatutAbonnement.EXPIRE },
      });

      const created = await tx.abonnement.create({
        data: {
          prestataireId: prestataire.id,
          offreId: offre.id,
          dateDebut: today,
          dateFin,
          statut: StatutAbonnement.ACTIF,
        },
      });

      return created;
    });

    // Retourner l'abonnement courant (avec offre)
    return this.getAbonnementCourant(userId);
  }

  /**
   * Crée un encaissement SamirPay pour payer un abonnement.
   * L’abonnement n’est activé qu’après confirmation du statut SamirPay.
   */
  async initPaydunyaCheckout(userId: string, offreId: string) {
    if (!this.samirpay.isConfigured()) {
      throw new ServiceUnavailableException(
        "Paiement SamirPay non configuré sur le serveur",
      );
    }
    const prestataire = await this.prisma.prestataire.findUnique({
      where: { userId },
      select: { id: true, nom: true },
    });
    if (!prestataire) {
      throw new BadRequestException("Profil prestataire introuvable");
    }
    const offre = await this.prisma.offre.findUnique({
      where: { id: offreId, actif: true },
    });
    if (!offre) {
      throw new BadRequestException("Offre introuvable ou inactive");
    }
    const amount = Math.round(Number(offre.prix));
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new BadRequestException("Prix d'offre invalide pour le paiement");
    }
    const orderId = `abo_${prestataire.id}_${offre.id}_${String(Date.now())}`;
    const inv = await this.samirpay.initPayment({ amountFcfa: amount, orderId });
    await this.samirpay.saveIntent({
      orderId,
      transactionId: inv.transactionId,
      kind: "abonnement",
      amountFcfa: amount,
      checkoutUrl: inv.checkoutUrl,
      meta: {
        kind: "abonnement",
        offreId: offre.id,
        prestataireId: prestataire.id,
        userId,
      },
    });
    return {
      amountFcfa: amount,
      invoiceToken: inv.publicToken,
      checkoutUrl: inv.checkoutUrl ?? "",
      description: offre.libelle,
    };
  }

  /**
   * Renvoie le lien SamirPay déjà créé. L’opérateur se choisit sur la page SamirPay.
   */
  async softPayAbonnement(userId: string, dto: SoftPayAbonnementDto) {
    if (!this.samirpay.isConfigured()) {
      throw new ServiceUnavailableException(
        "Paiement SamirPay non configuré sur le serveur",
      );
    }
    const prestataire = await this.prisma.prestataire.findUnique({
      where: { userId },
      select: { id: true },
    });
    if (!prestataire) {
      throw new BadRequestException("Profil prestataire introuvable");
    }
    const offre = await this.prisma.offre.findUnique({
      where: { id: dto.offreId, actif: true },
    });
    if (!offre) {
      throw new BadRequestException("Offre introuvable ou inactive");
    }
    const amount = Math.round(Number(offre.prix));
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new BadRequestException("Prix d'offre invalide pour le paiement");
    }
    const invoiceToken = dto.invoiceToken.trim();
    const intent = await this.samirpay.findIntent(invoiceToken);
    const meta =
      intent?.meta && typeof intent.meta === "object" && !Array.isArray(intent.meta)
        ? (intent.meta as Record<string, unknown>)
        : null;
    if (
      !intent ||
      intent.kind !== "abonnement" ||
      meta?.offreId !== offre.id ||
      meta?.userId !== userId
    ) {
      throw new BadRequestException(
        "Paiement SamirPay introuvable. Relancez le paiement.",
      );
    }
    const url = intent.checkoutUrl?.trim() || undefined;
    this.logger.log(
      `Abonnement SamirPay lien offreId=${dto.offreId} method=${dto.method} url=${url ? "yes" : "no"}`,
    );
    return {
      amountFcfa: amount,
      invoiceToken,
      description: offre.libelle,
      softPay: {
        url,
        message: url
          ? "Ouvrez la page SamirPay pour valider le paiement."
          : "Paiement initié. Validez-le dans votre application mobile money.",
      },
    };
  }

  /**
   * Active l’abonnement après IPN PayDunya (idempotent par `invoiceToken`).
   */
  async finalizeFromPaydunyaIpn(input: {
    offreId: string;
    prestataireId: string;
    userId: string;
    paidAmount: number;
    invoiceToken: string;
  }) {
    const dup = await this.prisma.walletTransaction.findFirst({
      where: {
        type: TransactionType.ABONNEMENT,
        meta: {
          path: ["paydunyaInvoiceToken"],
          equals: input.invoiceToken,
        },
      },
    });
    if (dup) {
      return { ok: true as const, alreadyProcessed: true as const };
    }

    const prestataire = await this.prisma.prestataire.findUnique({
      where: { id: input.prestataireId },
      select: { id: true, userId: true },
    });
    if (!prestataire || prestataire.userId !== input.userId) {
      return { ok: false as const, error: "prestataire_mismatch" as const };
    }

    const offre = await this.prisma.offre.findUnique({
      where: { id: input.offreId, actif: true },
    });
    if (!offre) {
      return { ok: false as const, error: "offre_not_found" as const };
    }

    const expected = Math.round(Number(offre.prix));
    const paid = Math.round(input.paidAmount);
    if (Math.abs(paid - expected) > 1) {
      return { ok: false as const, error: "amount_mismatch" as const };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dateFin = new Date(today);
    dateFin.setMonth(dateFin.getMonth() + offre.dureeMois);

    await this.prisma.$transaction(async (tx) => {
      await tx.abonnement.updateMany({
        where: {
          prestataireId: prestataire.id,
          statut: StatutAbonnement.ACTIF,
        },
        data: { statut: StatutAbonnement.EXPIRE },
      });

      const created = await tx.abonnement.create({
        data: {
          prestataireId: prestataire.id,
          offreId: offre.id,
          dateDebut: today,
          dateFin,
          statut: StatutAbonnement.ACTIF,
        },
      });

      const generalWallet = await this.wallets.ensureGeneralWallet(tx);
      await this.wallets.creditWallet({
        tx,
        walletId: generalWallet.id,
        amount: Number(offre.prix),
        type: TransactionType.ABONNEMENT,
        abonnementId: created.id,
        offreId: offre.id,
        createdByUserId: input.userId,
        meta: {
          prestataireId: prestataire.id,
          provider: "samirpay",
          samirOrderId: input.invoiceToken,
          paydunyaInvoiceToken: input.invoiceToken,
        },
      });
    });

    return { ok: true as const };
  }

  /** Statut affiché admin : ACTIF si statut DB actif et date de fin non dépassée. */
  resolveStatutAffichage(abo: {
    statut: StatutAbonnement;
    dateFin: Date;
  }): "ACTIF" | "EXPIRE" | "ANNULE" {
    if (abo.statut === StatutAbonnement.ANNULE) return "ANNULE";
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const fin = new Date(abo.dateFin);
    fin.setHours(0, 0, 0, 0);
    if (abo.statut === StatutAbonnement.ACTIF && fin >= today) return "ACTIF";
    return "EXPIRE";
  }

  /**
   * Liste des abonnements prestataires (back-office).
   */
  async listForAdmin(params: {
    statut?: "actif" | "expire" | "all";
    search?: string;
    limit?: number;
    offset?: number;
  }) {
    const limit = Math.min(Math.max(params.limit ?? 50, 1), 200);
    const offset = Math.max(params.offset ?? 0, 0);
    const search = params.search?.trim() ?? "";

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const where: Prisma.AbonnementWhereInput = {};
    if (search) {
      where.prestataire = {
        OR: [
          { nom: { contains: search, mode: "insensitive" } },
          { user: { email: { contains: search, mode: "insensitive" } } },
        ],
      };
    }
    if (params.statut === "actif") {
      where.statut = StatutAbonnement.ACTIF;
      where.dateFin = { gte: today };
    } else if (params.statut === "expire") {
      where.OR = [
        { statut: StatutAbonnement.EXPIRE },
        { statut: StatutAbonnement.ANNULE },
        {
          statut: StatutAbonnement.ACTIF,
          dateFin: { lt: today },
        },
      ];
    }

    const rows = await this.prisma.abonnement.findMany({
      where,
      orderBy: [{ createdAt: "desc" }],
      take: limit,
      skip: offset,
      include: {
        offre: {
          select: {
            id: true,
            code: true,
            libelle: true,
            prix: true,
            dureeMois: true,
          },
        },
        prestataire: {
          select: {
            id: true,
            nom: true,
            user: { select: { email: true } },
          },
        },
      },
    });

    const items = rows.map((abo) => {
      const statutAffichage = this.resolveStatutAffichage(abo);
      return {
        id: abo.id,
        prestataireId: abo.prestataireId,
        prestataireNom: abo.prestataire.nom,
        prestataireEmail: abo.prestataire.user.email,
        offreId: abo.offreId,
        offreLibelle: abo.offre.libelle,
        offreCode: abo.offre.code,
        offrePrix: Number(abo.offre.prix),
        dureeMois: abo.offre.dureeMois,
        dateDebut: abo.dateDebut.toISOString().slice(0, 10),
        dateFin: abo.dateFin.toISOString().slice(0, 10),
        statut: abo.statut,
        statutAffichage,
        createdAt: abo.createdAt.toISOString(),
      };
    });

    const allForStats = await this.prisma.abonnement.findMany({
      select: { statut: true, dateFin: true },
    });
    let actifs = 0;
    let expires = 0;
    for (const a of allForStats) {
      const aff = this.resolveStatutAffichage(a);
      if (aff === "ACTIF") actifs += 1;
      else if (aff === "EXPIRE") expires += 1;
    }

    const total = await this.prisma.abonnement.count({ where });

    return {
      stats: {
        total: allForStats.length,
        actifs,
        expires,
      },
      total,
      items,
    };
  }

  /**
   * Renouvellement d’abonnement par l’admin :
   *   - method = "cash"          → abonnement créé immédiatement, transaction wallet meta provider=cash.
   *   - method = "wave_sn"|"orange_money_sn" → init SamirPay ; l’abonnement
   *     n’est créé qu’après confirmation du statut.
   */
  async adminRenouvelerAbonnement(params: {
    prestataireId: string;
    offreId: string;
    adminUserId: string;
    method: "cash" | "wave_sn" | "orange_money_sn";
    telephone?: string;
  }) {
    const prestataire = await this.prisma.prestataire.findUnique({
      where: { id: params.prestataireId },
      select: {
        id: true,
        userId: true,
        nom: true,
      },
    });
    if (!prestataire) {
      throw new BadRequestException("Prestataire introuvable");
    }

    const offre = await this.prisma.offre.findUnique({
      where: { id: params.offreId, actif: true },
    });
    if (!offre) {
      throw new BadRequestException("Offre introuvable ou inactive");
    }

    const amount = Math.round(Number(offre.prix));
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new BadRequestException("Prix d'offre invalide");
    }

    if (params.method === "cash") {
      return this.adminCreateAbonnementCash({
        prestataireId: prestataire.id,
        offre,
        adminUserId: params.adminUserId,
      });
    }

    if (!this.samirpay.isConfigured()) {
      throw new ServiceUnavailableException(
        "Paiement SamirPay non configuré sur le serveur",
      );
    }

    const orderId = `abo_${prestataire.id}_${offre.id}_${String(Date.now())}`;
    const invoice = await this.samirpay.initPayment({
      amountFcfa: amount,
      orderId,
    });
    await this.samirpay.saveIntent({
      orderId,
      transactionId: invoice.transactionId,
      kind: "abonnement",
      amountFcfa: amount,
      checkoutUrl: invoice.checkoutUrl,
      meta: {
        kind: "abonnement",
        offreId: offre.id,
        prestataireId: prestataire.id,
        userId: prestataire.userId,
        initiatedByAdminUserId: params.adminUserId,
      },
    });

    this.logger.log(
      `Admin renouvellement SamirPay OK method=${params.method} prestataire=${prestataire.id} amount=${amount}`,
    );

    return {
      /** distinct de HTTP status dans l’enveloppe API */
      paymentStatus: "pending_payment" as const,
      method: params.method,
      amountFcfa: amount,
      invoiceToken: invoice.publicToken,
      checkoutUrl: invoice.checkoutUrl ?? "",
      message:
        "Paiement initié. L’abonnement sera activé uniquement après confirmation SamirPay.",
      softPay: {
        url: invoice.checkoutUrl,
        message: invoice.checkoutUrl
          ? "Ouvrez la page SamirPay pour valider le paiement."
          : "Paiement initié. Validez-le dans l’application mobile money.",
      },
    };
  }

  /** Admin : vérifie si SamirPay a soldé le paiement (abonnement créé). */
  async adminIsInvoicePaid(prestataireId: string, invoiceToken: string) {
    const prestataire = await this.prisma.prestataire.findUnique({
      where: { id: prestataireId },
      select: { userId: true },
    });
    if (!prestataire) {
      throw new BadRequestException("Prestataire introuvable");
    }
    return this.isPaydunyaInvoicePaidForPrestataire(
      prestataire.userId,
      invoiceToken,
    );
  }

  /** Création immédiate d’un abonnement (paiement cash enregistré par l’admin). */
  private async adminCreateAbonnementCash(params: {
    prestataireId: string;
    offre: {
      id: string;
      code: string;
      libelle: string;
      prix: Prisma.Decimal | number;
      dureeMois: number;
    };
    adminUserId: string;
  }) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dateFin = new Date(today);
    dateFin.setMonth(dateFin.getMonth() + params.offre.dureeMois);

    const created = await this.prisma.$transaction(async (tx) => {
      await tx.abonnement.updateMany({
        where: {
          prestataireId: params.prestataireId,
          statut: StatutAbonnement.ACTIF,
        },
        data: { statut: StatutAbonnement.EXPIRE },
      });

      const abo = await tx.abonnement.create({
        data: {
          prestataireId: params.prestataireId,
          offreId: params.offre.id,
          dateDebut: today,
          dateFin,
          statut: StatutAbonnement.ACTIF,
        },
        include: {
          offre: {
            select: {
              id: true,
              code: true,
              libelle: true,
              prix: true,
              dureeMois: true,
            },
          },
        },
      });

      const generalWallet = await this.wallets.ensureGeneralWallet(tx);
      const prixFcfa = Number(params.offre.prix);
      if (prixFcfa > 0) {
        await this.wallets.creditWallet({
          tx,
          walletId: generalWallet.id,
          amount: prixFcfa,
          type: TransactionType.ABONNEMENT,
          abonnementId: abo.id,
          offreId: params.offre.id,
          createdByUserId: params.adminUserId,
          meta: {
            prestataireId: params.prestataireId,
            provider: "cash",
            recordedByAdminUserId: params.adminUserId,
          },
        });
      }

      return abo;
    });

    return {
      paymentStatus: "completed" as const,
      method: "cash" as const,
      id: created.id,
      prestataireId: created.prestataireId,
      dateDebut: created.dateDebut.toISOString().slice(0, 10),
      dateFin: created.dateFin.toISOString().slice(0, 10),
      statut: created.statut,
      statutAffichage: this.resolveStatutAffichage(created),
      offre: {
        ...created.offre,
        prix: Number(created.offre.prix),
      },
    };
  }

  /** Marque un abonnement comme expiré (admin). */
  async adminExpirerAbonnement(abonnementId: string) {
    const abo = await this.prisma.abonnement.findUnique({
      where: { id: abonnementId },
      select: { id: true, statut: true },
    });
    if (!abo) {
      throw new BadRequestException("Abonnement introuvable");
    }
    if (abo.statut === StatutAbonnement.ANNULE) {
      throw new BadRequestException("Abonnement déjà annulé");
    }

    const updated = await this.prisma.abonnement.update({
      where: { id: abonnementId },
      data: { statut: StatutAbonnement.EXPIRE },
      include: {
        offre: { select: { libelle: true } },
        prestataire: { select: { nom: true } },
      },
    });

    return {
      id: updated.id,
      statut: updated.statut,
      statutAffichage: this.resolveStatutAffichage(updated),
    };
  }
}
