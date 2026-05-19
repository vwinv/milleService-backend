import {
  Injectable,
  BadRequestException,
  Logger,
  ServiceUnavailableException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import {
  Prisma,
  StatutAbonnement,
  TransactionType,
} from "../../generated/prisma/client.js";
import { WalletsService } from "../wallets/wallets.service.js";
import { PaydunyaService } from "../paydunya/paydunya.service.js";
import { paydunyaIpnCallbackUrl } from "../paydunya/paydunya-callback.util.js";
import type { PaydunyaSoftPayResponse } from "../paydunya/paydunya-softpay.types.js";
import type { SoftPayAbonnementDto } from "./dto/softpay-abonnement.dto.js";

@Injectable()
export class AbonnementsService {
  private readonly logger = new Logger(AbonnementsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly wallets: WalletsService,
    private readonly paydunya: PaydunyaService,
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

  /**
   * Vrai si l’IPN PayDunya a enregistré le paiement pour ce token (transaction ABONNEMENT liée au prestataire).
   * Utilisé par l’app pour le bouton « Terminer » après SoftPay (évite de confondre avec un ancien abonnement actif).
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
    const row = await this.prisma.walletTransaction.findFirst({
      where: {
        type: TransactionType.ABONNEMENT,
        meta: {
          path: ["paydunyaInvoiceToken"],
          equals: token,
        },
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
   * Repli si l’IPN n’a pas atteint le serveur : interroge PayDunya puis active l’abonnement.
   */
  async syncPaydunyaAbonnementFromConfirm(
    userId: string,
    invoiceToken: string,
  ): Promise<{ paid: boolean; abonnement?: Awaited<ReturnType<typeof this.getAbonnementCourant>>; error?: string }> {
    const token = invoiceToken?.trim();
    if (!token) {
      return { paid: false, error: "missing_token" };
    }

    const confirmed = await this.paydunya.confirmCheckoutInvoice(token);
    if (!confirmed) {
      return { paid: false, error: "confirm_failed" };
    }
    if (!this.paydunya.verifyIpnHash(confirmed.hash)) {
      return { paid: false, error: "invalid_hash" };
    }
    if (confirmed.status !== "completed") {
      return { paid: false, error: `status_${confirmed.status}` };
    }

    const custom = confirmed.customData;
    const kind = String(custom["kind"] ?? "").toLowerCase();
    if (kind !== "abonnement") {
      return { paid: false, error: "not_abonnement_invoice" };
    }

    const offreId = String(custom["offreId"] ?? "").trim();
    const prestataireId = String(custom["prestataireId"] ?? "").trim();
    const customUserId = String(custom["userId"] ?? "").trim();
    if (!offreId || !prestataireId || !customUserId) {
      return { paid: false, error: "invalid_custom_data" };
    }
    if (customUserId !== userId) {
      return { paid: false, error: "user_mismatch" };
    }

    const r = await this.finalizeFromPaydunyaIpn({
      offreId,
      prestataireId,
      userId: customUserId,
      paidAmount: confirmed.totalAmount,
      invoiceToken: confirmed.invoiceToken,
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

      const generalWallet = await this.wallets.ensureGeneralWallet(tx);
      await this.wallets.creditWallet({
        tx,
        walletId: generalWallet.id,
        amount: Number(offre.prix),
        type: TransactionType.ABONNEMENT,
        abonnementId: created.id,
        offreId: offre.id,
        createdByUserId: userId,
        meta: { prestataireId: prestataire.id, provider: "app_manual" },
      });

      return created;
    });

    // Retourner l'abonnement courant (avec offre)
    return this.getAbonnementCourant(userId);
  }

  /**
   * Crée une facture PayDunya pour payer un abonnement (checkout / SoftPay).
   * Finalisation via IPN `POST /webhooks/paydunya` (custom_data.kind = abonnement).
   */
  async initPaydunyaCheckout(userId: string, offreId: string) {
    if (!this.paydunya.isConfigured()) {
      throw new ServiceUnavailableException(
        "Paiement PayDunya non configuré sur le serveur",
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
    const callbackUrl = paydunyaIpnCallbackUrl(this.logger);
    const storeName =
      process.env.PAYDUNYA_STORE_NAME?.trim() || "Mille Services";

    const inv = await this.paydunya.createCheckoutInvoice({
      totalAmountFcfa: amount,
      description: `Abonnement ${offre.libelle} — ${prestataire.nom ?? prestataire.id}`,
      storeName,
      callbackUrl,
      returnUrl: process.env.PAYDUNYA_RETURN_URL?.trim() || undefined,
      cancelUrl: process.env.PAYDUNYA_CANCEL_URL?.trim() || undefined,
      customData: {
        kind: "abonnement",
        offreId: offre.id,
        prestataireId: prestataire.id,
        userId,
      },
    });

    return {
      amountFcfa: amount,
      invoiceToken: inv.invoiceToken,
      checkoutUrl: inv.checkoutUrl,
      description: offre.libelle,
    };
  }

  /**
   * SoftPay (Wave / Orange Money / Free Money) sur une facture abonnement
   * déjà créée via [initPaydunyaCheckout]. L’abonnement n’est créé qu’après IPN complété.
   */
  async softPayAbonnement(userId: string, dto: SoftPayAbonnementDto) {
    if (!this.paydunya.isConfigured()) {
      throw new ServiceUnavailableException(
        "Paiement PayDunya non configuré sur le serveur",
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

    const dbUser = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { email: true },
    });
    const email = (
      dto.email?.trim() ||
      dbUser?.email ||
      "prestataire@milleservices.sn"
    ).slice(0, 200);
    const phone = dto.telephone.replace(/\s+/g, "");
    const fullName = `${dto.prenom} ${dto.nom}`.trim();

    const telMask =
      phone.length >= 2 ? `***${phone.slice(-2)}` : "[short]";
    const tokenMask =
      invoiceToken.length > 8
        ? `${invoiceToken.slice(0, 8)}…`
        : "[short]";
    this.logger.log(
      `Abonnement SoftPay → offreId=${dto.offreId} method=${dto.method} amountFcfa=${String(amount)} invoiceToken=${tokenMask} telephone=${telMask}`,
    );

    let soft: PaydunyaSoftPayResponse;
    switch (dto.method) {
      case "orange_money_sn":
        soft = await this.paydunya.softPayOrangeMoneySenegal({
          customer_name: fullName,
          customer_email: email,
          phone_number: phone,
          invoice_token: invoiceToken,
        });
        break;
      case "free_money_sn":
        soft = await this.paydunya.softPayFreeMoneySenegal({
          customer_name: fullName,
          customer_email: email,
          phone_number: phone,
          payment_token: invoiceToken,
        });
        break;
      case "wave_sn":
        soft = await this.paydunya.softPayWaveSenegal({
          wave_senegal_fullName: fullName,
          wave_senegal_email: email,
          wave_senegal_phone: phone,
          wave_senegal_payment_token: invoiceToken,
        });
        break;
      default:
        throw new BadRequestException("Moyen de paiement inconnu");
    }

    if (!soft.success) {
      this.logger.warn(
        `Abonnement SoftPay KO offreId=${dto.offreId} method=${dto.method} message=${soft.message ?? "n/a"}`,
      );
      throw new BadRequestException(
        typeof soft.message === "string" && soft.message.trim()
          ? soft.message
          : "Paiement mobile refusé par PayDunya",
      );
    }

    this.logger.log(
      `Abonnement SoftPay OK offreId=${dto.offreId} method=${dto.method} url=${soft.url ? "yes" : "no"}`,
    );

    return {
      amountFcfa: amount,
      invoiceToken,
      description: offre.libelle,
      softPay: {
        url: soft.url,
        other_url: soft.other_url,
        return_url: soft.return_url,
        message: soft.message,
        fees: soft.fees,
        currency: soft.currency,
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
          provider: "paydunya",
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
   *   - method = "wave_sn"|"orange_money_sn" → init PayDunya + SoftPay ; l’abonnement
   *     n’est créé qu’après IPN (réutilise finalizeFromPaydunyaIpn).
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
        telephone: true,
        user: { select: { email: true } },
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

    if (!this.paydunya.isConfigured()) {
      throw new ServiceUnavailableException(
        "Paiement PayDunya non configuré sur le serveur",
      );
    }

    const phone = (params.telephone ?? prestataire.telephone ?? "")
      .replace(/\s+/g, "")
      .trim();
    if (phone.length < 8) {
      throw new BadRequestException(
        "Numéro de téléphone requis pour un paiement mobile money",
      );
    }

    const callbackUrl = paydunyaIpnCallbackUrl(this.logger);
    const storeName =
      process.env.PAYDUNYA_STORE_NAME?.trim() || "Mille Services";

    /** Création de la facture PayDunya — `userId = prestataire.userId` pour que l’IPN trouve le bon profil. */
    const invoice = await this.paydunya.createCheckoutInvoice({
      totalAmountFcfa: amount,
      description: `Abonnement ${offre.libelle} — ${prestataire.nom ?? prestataire.id}`,
      storeName,
      callbackUrl,
      returnUrl: process.env.PAYDUNYA_RETURN_URL?.trim() || undefined,
      cancelUrl: process.env.PAYDUNYA_CANCEL_URL?.trim() || undefined,
      customData: {
        kind: "abonnement",
        offreId: offre.id,
        prestataireId: prestataire.id,
        userId: prestataire.userId,
        initiatedByAdminUserId: params.adminUserId,
      },
    });

    const fullName = prestataire.nom ?? "Prestataire";
    const email = (
      prestataire.user.email || "prestataire@milleservices.sn"
    ).slice(0, 200);

    let soft: PaydunyaSoftPayResponse;
    if (params.method === "wave_sn") {
      soft = await this.paydunya.softPayWaveSenegal({
        wave_senegal_fullName: fullName,
        wave_senegal_email: email,
        wave_senegal_phone: phone,
        wave_senegal_payment_token: invoice.invoiceToken,
      });
    } else {
      soft = await this.paydunya.softPayOrangeMoneySenegal({
        customer_name: fullName,
        customer_email: email,
        phone_number: phone,
        invoice_token: invoice.invoiceToken,
      });
    }

    if (!soft.success) {
      this.logger.warn(
        `Admin renouvellement KO method=${params.method} message=${soft.message ?? "n/a"}`,
      );
      throw new BadRequestException(
        typeof soft.message === "string" && soft.message.trim()
          ? soft.message
          : "Paiement mobile refusé par PayDunya",
      );
    }

    this.logger.log(
      `Admin renouvellement OK method=${params.method} prestataire=${prestataire.id} amount=${amount}`,
    );

    return {
      /** distinct de HTTP status dans l’enveloppe API */
      paymentStatus: "pending_payment" as const,
      method: params.method,
      amountFcfa: amount,
      invoiceToken: invoice.invoiceToken,
      checkoutUrl: invoice.checkoutUrl,
      message:
        "Paiement initié. L’abonnement sera activé uniquement après confirmation PayDunya.",
      softPay: {
        url: soft.url,
        other_url: soft.other_url,
        return_url: soft.return_url,
        message: soft.message,
        fees: soft.fees,
        currency: soft.currency,
      },
    };
  }

  /** Admin : vérifie si l’IPN PayDunya a soldé la facture (abonnement créé). */
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
      await this.wallets.creditWallet({
        tx,
        walletId: generalWallet.id,
        amount: Number(params.offre.prix),
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
