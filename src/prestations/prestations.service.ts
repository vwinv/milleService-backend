import {
  Injectable,
  BadRequestException,
  ForbiddenException,
  Logger,
  ServiceUnavailableException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import {
  StatutPrestation,
  TransactionType,
} from "../../generated/prisma/client.js";
import { NotificationsService } from "../notifications/notifications.service.js";
import { WalletsService } from "../wallets/wallets.service.js";
import { PaydunyaService } from "../paydunya/paydunya.service.js";
import type { PaydunyaSoftPayResponse } from "../paydunya/paydunya-softpay.types.js";
import type { PayerPrestationDto } from "./dto/payer-prestation.dto.js";
import type { SoftPayPrestationDto } from "./dto/softpay-prestation.dto.js";
import {
  PRESTATION_SERVICE_FEE_FCFA,
  computePrestationTotalToChargeFcfa,
  executionHoursFromPrestationDates,
} from "./prestation-billing.util.js";
import { resolveHourlyTarifForPrestation } from "./service-catalog-tarif.util.js";
import { AbonnementsService } from "../abonnements/abonnements.service.js";

@Injectable()
export class PrestationsService {
  private readonly logger = new Logger(PrestationsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly notifications: NotificationsService,
    private readonly wallets: WalletsService,
    private readonly paydunya: PaydunyaService,
    private readonly abonnements: AbonnementsService,
  ) {}

  /**
   * Créer une prestation (particulier choisit le prestataire).
   * Statut initial : EN_ATTENTE.
   * Le prestataire reçoit une notification push.
   */
  async create(
    particulierUserId: string,
    dto: {
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
    },
  ) {
    const particulier = await this.prisma.particulier.findUnique({
      where: { userId: particulierUserId },
      select: { id: true, prenom: true, nom: true },
    });
    if (!particulier) {
      throw new BadRequestException("Profil particulier introuvable");
    }

    const prestataire = await this.prisma.prestataire.findUnique({
      where: { id: dto.prestataireId },
      include: { user: { select: { id: true } } },
    });
    if (!prestataire) {
      throw new BadRequestException("Prestataire introuvable");
    }
    if (!prestataire.actif) {
      throw new BadRequestException("Ce prestataire n'est plus actif");
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
      throw new BadRequestException(
        "Service introuvable ou inactif pour ce prestataire",
      );
    }

    // Éviter les doublons : même particulier, prestataire, type de tâche, service et même date de création
    const now = new Date();
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0,
      0,
    );
    const endOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59,
      999,
    );
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

    const nomClient =
      [particulier.prenom, particulier.nom].filter(Boolean).join(" ").trim() ||
      "Un client";
    await this.notifications.sendToUser(prestataire.user.id, {
      title: "Nouvelle demande de prestation",
      body: `${nomClient} vous a demandé une prestation (${service.service.libelle}).`,
      type: "prestation_created",
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
      throw new BadRequestException("Profil prestataire introuvable");
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
      throw new BadRequestException("Prestation introuvable");
    }
    if (prestation.statut !== StatutPrestation.EN_ATTENTE) {
      throw new BadRequestException(
        "Cette prestation n'est plus en attente d'acceptation",
      );
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
      title: "Prestation acceptée",
      body: `${updated.prestataire.nom} a accepté votre demande (${updated.prestataireService.service.libelle}).`,
      type: "prestation_accepted",
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
      throw new BadRequestException("Profil prestataire introuvable");
    }

    const prestation = await this.prisma.prestation.findFirst({
      where: { id: prestationId, prestataireId: prestataire.id },
    });
    if (!prestation) {
      throw new BadRequestException("Prestation introuvable");
    }
    if (prestation.statut !== StatutPrestation.ACCEPTEE) {
      throw new BadRequestException(
        "Seule une prestation acceptée peut être démarrée",
      );
    }

    const updated = await this.prisma.prestation.update({
      where: { id: prestationId },
      data: {
        statut: StatutPrestation.EN_COURS,
      },
      include: {
        particulier: { select: { userId: true, prenom: true, nom: true } },
        prestataire: { select: { nom: true } },
        prestataireService: { include: { service: true } },
      },
    });

    const serviceLibelle =
      updated.prestataireService?.service?.libelle ?? "prestation";
    await this.notifications.sendToUser(updated.particulier.userId, {
      title: "Le prestataire est arrivé",
      body: `${updated.prestataire.nom} est arrivé à votre adresse pour « ${serviceLibelle} ».`,
      type: "prestation_prestataire_arrived",
      data: { prestationId: updated.id },
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
      throw new BadRequestException("Profil prestataire introuvable");
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
      throw new BadRequestException("Prestation introuvable");
    }
    if (prestation.statut !== StatutPrestation.EN_ATTENTE) {
      throw new BadRequestException(
        "Cette prestation n'est plus en attente d'acceptation",
      );
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
      title: "Prestation refusée",
      body: `${updated.prestataire.nom} a refusé votre demande (${updated.prestataireService.service.libelle}).`,
      type: "prestation_refused",
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
      throw new BadRequestException("Profil prestataire introuvable");
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
      throw new BadRequestException("Prestation introuvable");
    }
    if (
      prestation.statut !== StatutPrestation.EN_COURS &&
      prestation.statut !== StatutPrestation.ACCEPTEE
    ) {
      throw new BadRequestException(
        "Seule une prestation acceptée/en cours peut être terminée",
      );
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
      title: "Prestation terminée",
      body: `${updated.prestataire.nom} a terminé la prestation. Vous pouvez procéder au paiement.`,
      type: "prestation_completed",
      data: { prestationId: updated.id },
    });

    return this.formatPrestation(updated);
  }

  /**
   * Marquer une prestation comme payée (particulier). Statut -> PAYEE.
   * Le prestataire est notifié. (À appeler après intégration paiement.)
   */
  async marquerPayee(
    particulierUserId: string,
    prestationId: string,
    dto?: PayerPrestationDto,
  ) {
    const particulier = await this.prisma.particulier.findUnique({
      where: { userId: particulierUserId },
      select: { id: true },
    });
    if (!particulier) {
      throw new BadRequestException("Profil particulier introuvable");
    }

    const prestation = await this.prisma.prestation.findFirst({
      where: { id: prestationId, particulierId: particulier.id },
      include: {
        prestataire: { include: { user: { select: { id: true } } } },
        prestataireService: { include: { service: true } },
      },
    });
    if (!prestation) {
      throw new BadRequestException("Prestation introuvable");
    }
    if (prestation.statut !== StatutPrestation.TERMINEE) {
      throw new BadRequestException(
        "Seule une prestation terminée peut être payée",
      );
    }

    const rawAmount = this.resolveGrossPaymentAmountFcfa(prestation, dto);
    if (rawAmount == null || Number.isNaN(rawAmount) || rawAmount <= 0) {
      throw new BadRequestException("Montant de la prestation introuvable");
    }

    const updated = await this.settlePrestationAsPaidInternal(
      particulierUserId,
      prestationId,
      rawAmount,
      "app_manual",
    );

    return this.formatPrestation(updated);
  }

  /**
   * Crée une facture PayDunya (checkout + token SoftPay) pour une prestation terminée.
   * Le client paie sur la page PayDunya ou via les endpoints SoftPay avec `invoiceToken`.
   * La confirmation passe par l’IPN `POST /webhooks/paydunya`.
   */
  async initPaydunyaCheckout(particulierUserId: string, prestationId: string) {
    if (!this.paydunya.isConfigured()) {
      throw new ServiceUnavailableException(
        "Paiement PayDunya non configuré sur le serveur",
      );
    }

    const particulier = await this.prisma.particulier.findUnique({
      where: { userId: particulierUserId },
      select: { id: true, prenom: true, nom: true },
    });
    if (!particulier) {
      throw new BadRequestException("Profil particulier introuvable");
    }

    const prestation = await this.prisma.prestation.findFirst({
      where: { id: prestationId, particulierId: particulier.id },
      include: {
        prestataire: { select: { nom: true } },
        prestataireService: { include: { service: true } },
      },
    });
    if (!prestation) {
      throw new BadRequestException("Prestation introuvable");
    }
    if (prestation.statut !== StatutPrestation.TERMINEE) {
      throw new BadRequestException(
        "Seule une prestation terminée peut être payée en ligne",
      );
    }

    const amount = this.resolveGrossPaymentAmountFcfa(prestation);
    if (amount == null || amount <= 0) {
      throw new BadRequestException(
        "Montant de paiement indisponible (tarif catalogue ou durée manquant)",
      );
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
    const serviceLibelle =
      prestation.prestataireService?.service?.libelle ?? "Prestation";

    this.logger.log(
      `Paiement prestation init PayDunya prestationId=${prestationId} particulierId=${particulier.id} amountFcfa=${String(amount)} service="${serviceLibelle.slice(0, 80)}"`,
    );

    const inv = await this.paydunya.createCheckoutInvoice({
      totalAmountFcfa: amount,
      description: `Paiement prestation — ${serviceLibelle} (${prestation.id})`,
      storeName,
      callbackUrl,
      returnUrl: process.env.PAYDUNYA_RETURN_URL?.trim() || undefined,
      cancelUrl: process.env.PAYDUNYA_CANCEL_URL?.trim() || undefined,
      customData: {
        kind: "prestation",
        prestationId: prestation.id,
        particulierId: particulier.id,
      },
    });

    this.logger.log(
      `Paiement prestation init OK prestationId=${prestationId} invoiceToken=${inv.invoiceToken.length > 8 ? `${inv.invoiceToken.slice(0, 8)}…` : "[short]"}`,
    );

    return {
      amountFcfa: amount,
      invoiceToken: inv.invoiceToken,
      checkoutUrl: inv.checkoutUrl,
      description: serviceLibelle,
    };
  }

  /**
   * SoftPay (Wave / OM / Free Money Sénégal) sur une facture déjà créée via `initPaydunyaCheckout`.
   */
  async softPayPrestation(
    particulierUserId: string,
    prestationId: string,
    dto: SoftPayPrestationDto,
  ) {
    if (!this.paydunya.isConfigured()) {
      throw new ServiceUnavailableException(
        "Paiement PayDunya non configuré sur le serveur",
      );
    }

    const particulier = await this.prisma.particulier.findUnique({
      where: { userId: particulierUserId },
      select: { id: true },
    });
    if (!particulier) {
      throw new BadRequestException("Profil particulier introuvable");
    }

    const prestation = await this.prisma.prestation.findFirst({
      where: { id: prestationId, particulierId: particulier.id },
      include: {
        prestataireService: { include: { service: true } },
      },
    });
    if (!prestation) {
      throw new BadRequestException("Prestation introuvable");
    }
    if (prestation.statut !== StatutPrestation.TERMINEE) {
      throw new BadRequestException(
        "Seule une prestation terminée peut être payée en ligne",
      );
    }

    const amount = this.resolveGrossPaymentAmountFcfa(prestation);
    if (amount == null || amount <= 0) {
      throw new BadRequestException(
        "Montant de paiement indisponible (tarif catalogue ou durée manquant)",
      );
    }

    const serviceLibelle =
      prestation.prestataireService?.service?.libelle ?? "Prestation";
    const invoiceToken = dto.invoiceToken.trim();

    const dbUser = await this.prisma.user.findUnique({
      where: { id: particulierUserId },
      select: { email: true },
    });
    const email = (
      dto.email?.trim() ||
      dbUser?.email ||
      "client@milleservices.sn"
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
      `Paiement prestation SoftPay → prestationId=${prestationId} method=${dto.method} amountFcfa=${String(amount)} invoiceToken=${tokenMask} telephone=${telMask}`,
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
        `Paiement prestation SoftPay KO prestationId=${prestationId} method=${dto.method} message=${soft.message ?? "n/a"}`,
      );
      throw new BadRequestException(
        typeof soft.message === "string" && soft.message.trim()
          ? soft.message
          : "Paiement mobile refusé par PayDunya",
      );
    }

    this.logger.log(
      `Paiement prestation SoftPay OK prestationId=${prestationId} method=${dto.method} url=${soft.url ? "yes" : "no"} om_url=${soft.other_url?.om_url ? "yes" : "no"} maxit_url=${soft.other_url?.maxit_url ? "yes" : "no"} message="${(soft.message ?? "").slice(0, 120)}"`,
    );

    return {
      amountFcfa: amount,
      invoiceToken,
      description: serviceLibelle,
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
   * IPN PayDunya (Instant Payment Notification).
   * Vérification du hash SHA-512 (Master Key) + montant attendu + idempotence.
   */
  async handlePaydunyaIpn(body: Record<string, unknown>) {
    const parsed = this.normalizePaydunyaIpnPayload(body);
    if (!parsed) {
      this.logger.warn("IPN PayDunya: payload non reconnu");
      return { ok: false as const, error: "invalid_payload" };
    }

    if (!this.paydunya.verifyIpnHash(parsed.hash)) {
      this.logger.warn("IPN PayDunya: hash refusé");
      throw new ForbiddenException("Notification PayDunya non authentifiée");
    }

    if (parsed.status.toLowerCase() !== "completed") {
      return {
        ok: true as const,
        ignored: true as const,
        status: parsed.status,
      };
    }

    if (parsed.kind === "abonnement") {
      const r = await this.abonnements.finalizeFromPaydunyaIpn({
        offreId: parsed.offreId,
        prestataireId: parsed.prestataireId,
        userId: parsed.userId,
        paidAmount: parsed.totalAmount,
        invoiceToken: parsed.invoiceToken,
      });
      if (!r.ok) {
        this.logger.warn(`IPN PayDunya abonnement: ${r.error}`);
        return { ok: false as const, error: r.error };
      }
      return { ok: true as const, scope: "abonnement" as const };
    }

    const prestation = await this.prisma.prestation.findUnique({
      where: { id: parsed.prestationId },
      include: {
        prestataire: { include: { user: { select: { id: true } } } },
        prestataireService: { include: { service: true } },
        particulier: { select: { userId: true } },
      },
    });
    if (!prestation) {
      this.logger.warn(
        `IPN PayDunya: prestation ${parsed.prestationId} introuvable`,
      );
      return { ok: false as const, error: "prestation_not_found" };
    }

    if (prestation.statut === StatutPrestation.PAYEE) {
      return { ok: true as const, alreadyPaid: true as const };
    }

    if (prestation.statut !== StatutPrestation.TERMINEE) {
      this.logger.warn(
        `IPN PayDunya: statut prestation invalide ${prestation.statut}`,
      );
      return { ok: false as const, error: "invalid_prestation_status" };
    }

    const expected = this.resolveGrossPaymentAmountFcfa(prestation);
    if (expected == null || expected <= 0) {
      return { ok: false as const, error: "amount_unavailable" };
    }

    const paid = Math.round(parsed.totalAmount);
    if (Math.abs(paid - expected) > 1) {
      this.logger.warn(
        `IPN PayDunya: écart montant payé=${paid} attendu=${expected} prestation=${prestation.id}`,
      );
      return { ok: false as const, error: "amount_mismatch" };
    }

    const particulierUserId = prestation.particulier?.userId;
    if (!particulierUserId) {
      return { ok: false as const, error: "particulier_missing" };
    }

    await this.settlePrestationAsPaidInternal(
      particulierUserId,
      prestation.id,
      paid,
      "paydunya",
    );

    const invTk =
      parsed.invoiceToken.length > 8
        ? `${parsed.invoiceToken.slice(0, 8)}…`
        : "[short]";
    this.logger.log(
      `IPN PayDunya prestation réglée prestationId=${prestation.id} montantFcfa=${String(paid)} attendu=${String(expected)} invoiceToken=${invTk}`,
    );

    return { ok: true as const };
  }

  private normalizePaydunyaIpnPayload(
    body: Record<string, unknown>,
  ):
    | {
        kind: "prestation";
        hash: string;
        status: string;
        totalAmount: number;
        prestationId: string;
        invoiceToken: string;
      }
    | {
        kind: "abonnement";
        hash: string;
        status: string;
        totalAmount: number;
        offreId: string;
        prestataireId: string;
        userId: string;
        invoiceToken: string;
      }
    | null {
    const root = body as Record<string, unknown>;
    const dataVal = root?.data ?? root;
    if (!dataVal || typeof dataVal !== "object" || Array.isArray(dataVal)) {
      return null;
    }
    const data = dataVal as Record<string, unknown>;

    const hash = data.hash?.toString()?.trim();
    const status = data.status?.toString()?.trim() ?? "";
    const inv = data.invoice;
    let totalAmount = NaN;
    let invoiceToken = "";
    if (inv && typeof inv === "object" && !Array.isArray(inv)) {
      const invObj = inv as Record<string, unknown>;
      totalAmount = Number(invObj.total_amount);
      invoiceToken = invObj.token?.toString()?.trim() ?? "";
    }
    const custom = data.custom_data;
    if (!custom || typeof custom !== "object" || Array.isArray(custom)) {
      return null;
    }
    const c = custom as Record<string, unknown>;
    const kindRaw = c.kind?.toString()?.trim().toLowerCase();
    const prestationId =
      c.prestationId?.toString()?.trim() ||
      c.prestation_id?.toString()?.trim() ||
      "";
    const offreId = c.offreId?.toString()?.trim() || "";
    const prestataireId = c.prestataireId?.toString()?.trim() || "";
    const userId = c.userId?.toString()?.trim() || "";

    if (!hash || !Number.isFinite(totalAmount) || !invoiceToken) return null;

    if (prestationId && kindRaw !== "abonnement") {
      return {
        kind: "prestation",
        hash,
        status,
        totalAmount,
        prestationId,
        invoiceToken,
      };
    }

    if (kindRaw === "abonnement" || (offreId && prestataireId && userId)) {
      if (!offreId || !prestataireId || !userId) return null;
      return {
        kind: "abonnement",
        hash,
        status,
        totalAmount,
        offreId,
        prestataireId,
        userId,
        invoiceToken,
      };
    }

    return null;
  }

  /** Montant catalogue (durée × tarif + frais), aligné app mobile. */
  private computeCatalogPaymentAmountFcfa(p: {
    acceptedAt: Date | null;
    completedAt: Date | null;
    createdAt: Date;
    prestataireService: {
      tarifHoraire?: unknown;
      service?: { tarifs?: string | null } | null;
    } | null;
  }): number | null {
    const tarif = resolveHourlyTarifForPrestation(p.prestataireService);
    if (tarif == null) return null;
    const hours = executionHoursFromPrestationDates({
      acceptedAt: p.acceptedAt,
      completedAt: p.completedAt,
      createdAt: p.createdAt,
      useNowAsEndIfOpen: false,
    });
    return computePrestationTotalToChargeFcfa(tarif, hours);
  }

  /**
   * Montant brut à encaisser : uniquement le catalogue (tarif × durée + frais),
   * ou `dto.montant` si le client envoie un montant explicite.
   */
  private resolveGrossPaymentAmountFcfa(
    prestation: {
      prestataireService: {
        tarifHoraire?: unknown;
        service?: { tarifs?: string | null } | null;
      } | null;
      acceptedAt: Date | null;
      completedAt: Date | null;
      createdAt: Date;
    },
    dto?: PayerPrestationDto,
  ): number | null {
    const fromBody =
      dto?.montant != null && !Number.isNaN(Number(dto.montant))
        ? Number(dto.montant)
        : null;
    if (fromBody != null && fromBody > 0) return fromBody;

    const computed = this.computeCatalogPaymentAmountFcfa(prestation);
    if (computed != null && computed > 0) return computed;

    return null;
  }

  private async settlePrestationAsPaidInternal(
    particulierUserId: string,
    prestationId: string,
    grossAmount: number,
    paymentSource: string,
  ) {
    const rowForSplit = await this.prisma.prestation.findUnique({
      where: { id: prestationId },
      include: { prestataireService: { include: { service: true } } },
    });
    const splitOpts = rowForSplit
      ? this.prestationSplitCommissionOpts(rowForSplit)
      : undefined;
    const split = this.wallets.splitPrestationAmount(
      grossAmount,
      splitOpts,
    );

    const { updated, didSettle } = await this.prisma.$transaction(
      async (tx) => {
        const current = await tx.prestation.findUnique({
          where: { id: prestationId },
          select: { statut: true },
        });
        if (current?.statut === StatutPrestation.PAYEE) {
          const row = await tx.prestation.findUniqueOrThrow({
            where: { id: prestationId },
            include: {
              particulier: { select: { prenom: true, nom: true } },
              prestataire: {
                select: {
                  nom: true,
                  user: { select: { id: true } },
                },
              },
              prestataireService: { include: { service: true } },
            },
          });
          return { updated: row, didSettle: false };
        }
        if (current?.statut !== StatutPrestation.TERMINEE) {
          throw new BadRequestException(
            "Seule une prestation terminée peut être payée",
          );
        }

        const p = await tx.prestation.update({
          where: { id: prestationId },
          data: { statut: StatutPrestation.PAYEE },
          include: {
            particulier: { select: { prenom: true, nom: true } },
            prestataire: {
              select: {
                nom: true,
                user: { select: { id: true } },
              },
            },
            prestataireService: { include: { service: true } },
          },
        });

        const generalWallet = await this.wallets.ensureGeneralWallet(tx);
        const prestWallet = await this.wallets.ensurePrestataireWallet(
          p.prestataireId,
          tx,
        );

        await this.wallets.creditWallet({
          tx,
          walletId: prestWallet.id,
          amount: split.net,
          type: TransactionType.PRESTATION,
          prestationId: p.id,
          createdByUserId: particulierUserId,
          meta: {
            gross: split.gross,
            fee: split.fee,
            rate: split.rate,
            provider: paymentSource,
          },
        });

        await this.wallets.creditWallet({
          tx,
          walletId: generalWallet.id,
          amount: split.fee,
          type: TransactionType.PRESTATION,
          prestationId: p.id,
          createdByUserId: particulierUserId,
          meta: {
            gross: split.gross,
            fee: split.fee,
            rate: split.rate,
            provider: paymentSource,
          },
        });

        return { updated: p, didSettle: true };
      },
    );

    if (didSettle) {
      await this.notifications.sendToUser(updated.prestataire.user.id, {
        title: "Prestation payée",
        body: `Le client a réglé la prestation ${updated.prestataireService.service.libelle}.`,
        type: "prestation_paid",
        data: { prestationId: updated.id },
      });
    }

    return updated;
  }

  /** Base « travail » pour le split : tarif×durée (frais service / déplacement gérés dans le util wallet). */
  private prestationSplitCommissionOpts(p: {
    acceptedAt: Date | null;
    completedAt: Date | null;
    createdAt: Date;
    prestataireService: {
      tarifHoraire?: unknown;
      service?: { tarifs?: string | null } | null;
    } | null;
  }):
    | { baseWorkFcfa: number; serviceFeeFcfa: number }
    | undefined {
    const tarif = resolveHourlyTarifForPrestation(p.prestataireService);
    if (tarif == null) return undefined;
    const hours = executionHoursFromPrestationDates({
      acceptedAt: p.acceptedAt,
      completedAt: p.completedAt,
      createdAt: p.createdAt,
      useNowAsEndIfOpen: false,
    });
    const baseWorkFcfa = tarif * hours;
    return {
      baseWorkFcfa,
      serviceFeeFcfa: PRESTATION_SERVICE_FEE_FCFA,
    };
  }

  /**
   * Liste des prestations pour l'utilisateur connecté (particulier ou prestataire).
   */
  async listForUser(userId: string, role: "PARTICULIER" | "PRESTATAIRE") {
    if (role === "PARTICULIER") {
      const particulier = await this.prisma.particulier.findUnique({
        where: { userId },
        select: { id: true },
      });
      if (!particulier) return [];
      const list = await this.prisma.prestation.findMany({
        where: { particulierId: particulier.id },
        orderBy: { createdAt: "desc" },
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
      orderBy: { createdAt: "desc" },
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
      throw new BadRequestException("Prestation introuvable");
    }

    const isParticulier =
      role === "PARTICULIER" && particulier?.id === prestation.particulierId;
    const isPrestataire =
      role === "PRESTATAIRE" && prestataire?.id === prestation.prestataireId;
    if (!isParticulier && !isPrestataire) {
      throw new ForbiddenException("Accès non autorisé à cette prestation");
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
            latitude:
              p.particulier.latitude != null
                ? Number(p.particulier.latitude)
                : null,
            longitude:
              p.particulier.longitude != null
                ? Number(p.particulier.longitude)
                : null,
          }
        : undefined,
      prestataire: p.prestataire
        ? {
            nom: p.prestataire.nom,
            telephone: p.prestataire.telephone ?? undefined,
            avatarUrl: p.prestataire.avatarUrl,
            adresse: p.prestataire.adresse,
            latitude:
              p.prestataire.latitude != null
                ? Number(p.prestataire.latitude)
                : null,
            longitude:
              p.prestataire.longitude != null
                ? Number(p.prestataire.longitude)
                : null,
          }
        : undefined,
      // Le tarif est sur PrestataireService ; ne pas exiger la relation Service (catalogue)
      // sinon `service` disparaît du JSON alors que `tarif_horaire` est bien en base.
      service: this.formatPrestationServicePayload(p),
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
      service: this.formatPrestationServicePayload(p),
    };
  }

  /** Tarif horaire affiché / facturé : `Service.tarifs` (admin), repli sur `PrestataireService.tarifHoraire`. */
  private formatPrestationServicePayload(p: {
    prestataireService?: {
      tarifHoraire?: unknown;
      service?: {
        id: string;
        libelle: string;
        tarifs?: string | null;
      } | null;
    } | null;
  }) {
    const ps = p.prestataireService;
    if (ps == null) return undefined;
    const cat = ps.service;
    const hourly = resolveHourlyTarifForPrestation(ps);
    return {
      id: cat?.id,
      libelle: cat?.libelle,
      tarifHoraire: hourly ?? undefined,
    };
  }
}
