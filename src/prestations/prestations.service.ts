import {
  Injectable,
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Logger,
  ServiceUnavailableException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import {
  Role,
  StatutPrestation,
  TransactionType,
} from "../../generated/prisma/client.js";
import { NotificationsService } from "../notifications/notifications.service.js";
import { WalletsService } from "../wallets/wallets.service.js";
import { SamirPayService } from "../samirpay/samirpay.service.js";
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
    private readonly samirpay: SamirPayService,
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

    // Éviter les doublons (double clic / re-soumission) : même jour, même trio
    // particulier + prestataire + service, uniquement si une prestation est encore « ouverte ».
    // Une prestation PAYEE / REFUSEE / ANNULEE ne bloque pas une nouvelle demande.
    const openStatuts: StatutPrestation[] = [
      StatutPrestation.EN_ATTENTE,
      StatutPrestation.ACCEPTEE,
      StatutPrestation.EN_COURS,
      StatutPrestation.TERMINEE,
    ];
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
        statut: { in: openStatuts },
        createdAt: { gte: startOfDay, lte: endOfDay },
      },
      include: {
        particulier: { select: { prenom: true, nom: true } },
        prestataire: { select: { nom: true, avatarUrl: true } },
        prestataireService: { include: { service: true } },
      },
    });
    if (existing) {
      throw new ConflictException(
        this.messagePrestationDoublonOuverte(existing.statut),
      );
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

    const now = new Date();
    const updated = await this.prisma.prestation.update({
      where: { id: prestationId },
      data: {
        statut: StatutPrestation.EN_COURS,
        startedAt: now,
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
   * Annulation par le client ou le prestataire, tant que la prestation
   * n'a pas démarré (EN_ATTENTE ou ACCEPTEE). Interdit dès EN_COURS.
   */
  async annuler(userId: string, role: string, prestationId: string) {
    if (role === "PARTICULIER") {
      return this.annulerParParticulier(userId, prestationId);
    }
    if (role === "PRESTATAIRE") {
      return this.annulerParPrestataire(userId, prestationId);
    }
    throw new ForbiddenException("Accès non autorisé");
  }

  private readonly statutsAnnulables: StatutPrestation[] = [
    StatutPrestation.EN_ATTENTE,
    StatutPrestation.ACCEPTEE,
  ];

  private messageAnnulationImpossible() {
    return "Cette demande ne peut plus être annulée : la prestation a déjà démarré.";
  }

  private async annulerParParticulier(
    particulierUserId: string,
    prestationId: string,
  ) {
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
        prestataire: { include: { user: { select: { id: true } } } },
        prestataireService: { include: { service: true } },
      },
    });
    if (!prestation) {
      throw new BadRequestException("Prestation introuvable");
    }
    if (!this.statutsAnnulables.includes(prestation.statut)) {
      throw new BadRequestException(this.messageAnnulationImpossible());
    }

    const cancelled = await this.prisma.prestation.updateMany({
      where: {
        id: prestationId,
        particulierId: particulier.id,
        statut: { in: this.statutsAnnulables },
      },
      data: {
        statut: StatutPrestation.ANNULEE,
        annulePar: Role.PARTICULIER,
      },
    });
    if (cancelled.count === 0) {
      throw new BadRequestException(this.messageAnnulationImpossible());
    }

    const updated = await this.prisma.prestation.findUniqueOrThrow({
      where: { id: prestationId },
      include: {
        particulier: { select: { prenom: true, nom: true, userId: true } },
        prestataire: { select: { nom: true } },
        prestataireService: { include: { service: true } },
      },
    });

    const nomClient = `${particulier.prenom} ${particulier.nom}`.trim();
    const serviceLibelle =
      prestation.prestataireService?.service?.libelle ?? "prestation";
    await this.notifications.sendToUser(prestation.prestataire.user.id, {
      title: "Demande annulée",
      body: `${nomClient || "Le client"} a annulé la demande (${serviceLibelle}).`,
      type: "prestation_cancelled",
      data: { prestationId: updated.id },
    });

    return this.formatPrestation(updated);
  }

  private async annulerParPrestataire(
    prestataireUserId: string,
    prestationId: string,
  ) {
    const prestataire = await this.prisma.prestataire.findUnique({
      where: { userId: prestataireUserId },
      select: { id: true, nom: true },
    });
    if (!prestataire) {
      throw new BadRequestException("Profil prestataire introuvable");
    }

    const prestation = await this.prisma.prestation.findFirst({
      where: { id: prestationId, prestataireId: prestataire.id },
      include: {
        particulier: { select: { userId: true } },
        prestataireService: { include: { service: true } },
      },
    });
    if (!prestation) {
      throw new BadRequestException("Prestation introuvable");
    }
    if (!this.statutsAnnulables.includes(prestation.statut)) {
      throw new BadRequestException(this.messageAnnulationImpossible());
    }

    const cancelled = await this.prisma.prestation.updateMany({
      where: {
        id: prestationId,
        prestataireId: prestataire.id,
        statut: { in: this.statutsAnnulables },
      },
      data: {
        statut: StatutPrestation.ANNULEE,
        annulePar: Role.PRESTATAIRE,
      },
    });
    if (cancelled.count === 0) {
      throw new BadRequestException(this.messageAnnulationImpossible());
    }

    const updated = await this.prisma.prestation.findUniqueOrThrow({
      where: { id: prestationId },
      include: {
        particulier: { select: { prenom: true, nom: true, userId: true } },
        prestataire: { select: { nom: true } },
        prestataireService: { include: { service: true } },
      },
    });

    const serviceLibelle =
      prestation.prestataireService?.service?.libelle ?? "prestation";
    await this.notifications.sendToUser(prestation.particulier.userId, {
      title: "Demande annulée",
      body: `${prestataire.nom || "Le prestataire"} a annulé la demande (${serviceLibelle}).`,
      type: "prestation_cancelled",
      data: { prestationId: updated.id },
    });

    return this.formatPrestation(updated);
  }

  /**
   * Note (1 à 5) et commentaire du client sur une prestation payée.
   * Un seul avis par prestation ; un nouvel envoi met à jour l'avis existant.
   */
  async noter(
    particulierUserId: string,
    prestationId: string,
    dto: { note: number; commentaire?: string },
  ) {
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
        prestataire: { include: { user: { select: { id: true } } } },
        prestataireService: { include: { service: true } },
      },
    });
    if (!prestation) {
      throw new BadRequestException("Prestation introuvable");
    }
    if (prestation.statut !== StatutPrestation.PAYEE) {
      throw new BadRequestException(
        "Vous pourrez noter le prestataire une fois la prestation payée",
      );
    }

    const commentaire = dto.commentaire?.trim() || null;
    const avis = await this.prisma.avisPrestataire.upsert({
      where: { prestationId },
      create: {
        particulierId: particulier.id,
        prestataireId: prestation.prestataireId,
        prestationId,
        note: dto.note,
        commentaire,
      },
      update: {
        note: dto.note,
        commentaire,
      },
    });

    const nomClient = `${particulier.prenom} ${particulier.nom}`.trim();
    const serviceLibelle =
      prestation.prestataireService?.service?.libelle ?? "prestation";
    await this.notifications.sendToUser(prestation.prestataire.user.id, {
      title: "Nouvel avis",
      body: `${nomClient || "Un client"} a noté « ${serviceLibelle} » : ${dto.note}/5.`,
      type: "prestation_reviewed",
      data: { prestationId },
    });

    return {
      note: avis.note,
      commentaire: avis.commentaire,
    };
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
    if (prestation.statut !== StatutPrestation.EN_COURS) {
      throw new BadRequestException(
        "Indiquez d'abord votre arrivée sur place avant de terminer la prestation",
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
   * Initie un encaissement SamirPay (`initPayment`) pour une prestation terminée.
   * La confirmation se fait en interrogeant le statut SamirPay (pas d’IPN documentée).
   */
  async initPaydunyaCheckout(particulierUserId: string, prestationId: string) {
    if (!this.samirpay.isConfigured()) {
      throw new ServiceUnavailableException(
        "Paiement SamirPay non configuré sur le serveur",
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

    const serviceLibelle =
      prestation.prestataireService?.service?.libelle ?? "Prestation";
    const orderId = `pst_${prestation.id}_${String(Date.now())}`;

    this.logger.log(
      `Paiement prestation init SamirPay prestationId=${prestationId} particulierId=${particulier.id} amountFcfa=${String(amount)} service="${serviceLibelle.slice(0, 80)}"`,
    );

    const inv = await this.samirpay.initPayment({
      amountFcfa: amount,
      orderId,
    });
    await this.samirpay.saveIntent({
      orderId,
      transactionId: inv.transactionId,
      kind: "prestation",
      amountFcfa: amount,
      checkoutUrl: inv.checkoutUrl,
      meta: {
        kind: "prestation",
        prestationId: prestation.id,
        particulierId: particulier.id,
      },
    });

    this.logger.log(
      `Paiement prestation init OK prestationId=${prestationId} invoiceToken=${inv.publicToken.length > 8 ? `${inv.publicToken.slice(0, 8)}…` : "[short]"}`,
    );

    return {
      amountFcfa: amount,
      invoiceToken: inv.publicToken,
      checkoutUrl: inv.checkoutUrl ?? "",
      description: serviceLibelle,
    };
  }

  /**
   * Le cashin SamirPay ne prend pas d’opérateur : on renvoie le lien créé à l’init.
   * L’écran mobile ouvre cette URL (Wave, Orange Money ou Free se choisissent chez SamirPay).
   */
  async softPayPrestation(
    particulierUserId: string,
    prestationId: string,
    dto: SoftPayPrestationDto,
  ) {
    if (!this.samirpay.isConfigured()) {
      throw new ServiceUnavailableException(
        "Paiement SamirPay non configuré sur le serveur",
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
    const intent = await this.samirpay.findIntent(invoiceToken);
    const meta =
      intent?.meta && typeof intent.meta === "object" && !Array.isArray(intent.meta)
        ? (intent.meta as Record<string, unknown>)
        : null;
    if (!intent || intent.kind !== "prestation" || meta?.prestationId !== prestation.id) {
      throw new BadRequestException(
        "Paiement SamirPay introuvable. Relancez le paiement.",
      );
    }

    const url = intent.checkoutUrl?.trim() || undefined;
    const telMask =
      dto.telephone.replace(/\s+/g, "").length >= 2
        ? `***${dto.telephone.replace(/\s+/g, "").slice(-2)}`
        : "[short]";
    this.logger.log(
      `Paiement prestation SamirPay lien prestationId=${prestationId} method=${dto.method} url=${url ? "yes" : "no"} tel=${telMask}`,
    );

    return {
      amountFcfa: amount,
      invoiceToken,
      description: serviceLibelle,
      softPay: {
        url,
        message: url
          ? "Ouvrez la page SamirPay pour valider le paiement."
          : "Paiement initié. Validez-le dans votre application mobile money.",
      },
    };
  }

  /**
   * Interroge SamirPay et enregistre le paiement si le statut est payé.
   */
  async syncPaydunyaPrestationPayment(
    particulierUserId: string,
    prestationId: string,
    invoiceToken: string,
  ): Promise<{ paid: boolean; error?: string }> {
    const prestation = await this.prisma.prestation.findFirst({
      where: { id: prestationId, particulier: { userId: particulierUserId } },
      select: { id: true, statut: true },
    });
    if (!prestation) {
      return { paid: false, error: "prestation_not_found" };
    }
    if (prestation.statut === StatutPrestation.PAYEE) {
      return { paid: true };
    }

    const intent = await this.samirpay.findIntent(invoiceToken);
    const meta =
      intent?.meta && typeof intent.meta === "object" && !Array.isArray(intent.meta)
        ? (intent.meta as Record<string, unknown>)
        : null;
    if (!intent || intent.kind !== "prestation" || meta?.prestationId !== prestation.id) {
      return { paid: false, error: "payment_not_found" };
    }

    const status = await this.samirpay.getPaymentStatus(
      intent.transactionId || intent.orderId,
    );
    if (status.state !== "paid") {
      return { paid: false, error: `status_${status.state}` };
    }
    const paidAmount = status.amountFcfa ?? intent.amountFcfa;
    if (Math.abs(paidAmount - intent.amountFcfa) > 1) {
      this.logger.warn(
        `SamirPay prestation écart montant payé=${String(paidAmount)} attendu=${String(intent.amountFcfa)} prestation=${prestation.id}`,
      );
      return { paid: false, error: "amount_mismatch" };
    }

    await this.settlePrestationAsPaidInternal(
      particulierUserId,
      prestation.id,
      paidAmount,
      "samirpay",
    );
    return { paid: true };
  }

  /** Montant catalogue (durée × tarif + frais), aligné app mobile. */
  private computeCatalogPaymentAmountFcfa(p: {
    startedAt: Date | null;
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
      startedAt: p.startedAt,
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
      startedAt: Date | null;
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
    startedAt: Date | null;
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
      startedAt: p.startedAt,
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
          avis: { select: { note: true, commentaire: true } },
        },
      });
      return list.map((p) => this.formatPrestation(p));
    }

    const prestataire = await this.prisma.prestataire.findUnique({
      where: { userId },
      select: { id: true },
    });
    if (!prestataire) return [];
    await this.abonnements.assertPrestataireHasActiveAbonnement(userId);
    const list = await this.prisma.prestation.findMany({
      where: { prestataireId: prestataire.id },
      orderBy: { createdAt: "desc" },
        include: {
          particulier: { select: { prenom: true, nom: true } },
          prestataireService: { include: { service: true } },
          avis: { select: { note: true, commentaire: true } },
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
        avis: { select: { note: true, commentaire: true } },
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
    if (isPrestataire) {
      await this.abonnements.assertPrestataireHasActiveAbonnement(userId);
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
      startedAt: p.startedAt,
      completedAt: p.completedAt,
      createdAt: p.createdAt,
      annulePar: p.annulePar ?? undefined,
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
      avis: this.formatAvis(p.avis),
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
      startedAt: p.startedAt,
      completedAt: p.completedAt,
      createdAt: p.createdAt,
      annulePar: p.annulePar ?? undefined,
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
      avis: this.formatAvis(p.avis),
    };
  }

  private formatAvis(
    avis: { note?: number; commentaire?: string | null } | null | undefined,
  ) {
    if (!avis || avis.note == null) return null;
    return {
      note: avis.note,
      commentaire: avis.commentaire ?? null,
    };
  }

  /** Message affiché au particulier si une demande ouverte existe déjà (même jour, même prestataire / service). */
  private messagePrestationDoublonOuverte(statut: StatutPrestation): string {
    const base =
      "Vous avez déjà une demande en cours pour ce prestataire et ce service aujourd'hui. ";
    switch (statut) {
      case StatutPrestation.EN_ATTENTE:
        return (
          base +
          "Elle est en attente de réponse du prestataire. Retournez à l'écran d'accueil ou consultez vos notifications pour la suivre — vous ne pouvez pas en créer une seconde tant qu'elle n'est pas terminée ou annulée."
        );
      case StatutPrestation.ACCEPTEE:
        return (
          base +
          "Elle a été acceptée et attend le démarrage. Ouvrez la prestation en cours depuis vos notifications ou votre historique."
        );
      case StatutPrestation.EN_COURS:
        return (
          base +
          "Elle est actuellement en cours. Suivez-la depuis l'écran de déroulement déjà ouvert ou vos notifications."
        );
      case StatutPrestation.TERMINEE:
        return (
          base +
          "Elle est terminée et en attente de paiement. Réglez le paiement de cette prestation avant d'en demander une nouvelle identique aujourd'hui."
        );
      default:
        return (
          base +
          "Consultez la prestation existante avant d'en créer une nouvelle."
        );
    }
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
