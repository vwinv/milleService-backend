import {
  Injectable,
  BadRequestException,
  Logger,
  ServiceUnavailableException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import {
  StatutAbonnement,
  TransactionType,
} from "../../generated/prisma/client.js";
import { WalletsService } from "../wallets/wallets.service.js";
import { PaydunyaService } from "../paydunya/paydunya.service.js";
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
      return { paid: false };
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
    const callbackBase =
      process.env.PAYDUNYA_CALLBACK_BASE_URL?.trim() ||
      process.env.PUBLIC_API_URL?.trim() ||
      "";
    if (!callbackBase) {
      throw new ServiceUnavailableException(
        "PAYDUNYA_CALLBACK_BASE_URL ou PUBLIC_API_URL doit être défini pour l’IPN",
      );
    }
    const callbackUrl = `${callbackBase.replace(/\/$/, "")}/webhooks/paydunya`;
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
}
