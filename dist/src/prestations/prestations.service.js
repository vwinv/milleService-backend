"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PrestationsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrestationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../prisma/prisma.service.js");
const client_js_1 = require("../../generated/prisma/client.js");
const notifications_service_js_1 = require("../notifications/notifications.service.js");
const wallets_service_js_1 = require("../wallets/wallets.service.js");
const paydunya_service_js_1 = require("../paydunya/paydunya.service.js");
const paydunya_callback_util_js_1 = require("../paydunya/paydunya-callback.util.js");
const prestation_billing_util_js_1 = require("./prestation-billing.util.js");
const service_catalog_tarif_util_js_1 = require("./service-catalog-tarif.util.js");
const abonnements_service_js_1 = require("../abonnements/abonnements.service.js");
let PrestationsService = PrestationsService_1 = class PrestationsService {
    prisma;
    notifications;
    wallets;
    paydunya;
    abonnements;
    logger = new common_1.Logger(PrestationsService_1.name);
    constructor(prisma, notifications, wallets, paydunya, abonnements) {
        this.prisma = prisma;
        this.notifications = notifications;
        this.wallets = wallets;
        this.paydunya = paydunya;
        this.abonnements = abonnements;
    }
    async create(particulierUserId, dto) {
        const particulier = await this.prisma.particulier.findUnique({
            where: { userId: particulierUserId },
            select: { id: true, prenom: true, nom: true },
        });
        if (!particulier) {
            throw new common_1.BadRequestException("Profil particulier introuvable");
        }
        const prestataire = await this.prisma.prestataire.findUnique({
            where: { id: dto.prestataireId },
            include: { user: { select: { id: true } } },
        });
        if (!prestataire) {
            throw new common_1.BadRequestException("Prestataire introuvable");
        }
        if (!prestataire.actif) {
            throw new common_1.BadRequestException("Ce prestataire n'est plus actif");
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
            throw new common_1.BadRequestException("Service introuvable ou inactif pour ce prestataire");
        }
        const openStatuts = [
            client_js_1.StatutPrestation.EN_ATTENTE,
            client_js_1.StatutPrestation.ACCEPTEE,
            client_js_1.StatutPrestation.EN_COURS,
            client_js_1.StatutPrestation.TERMINEE,
        ];
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
            throw new common_1.ConflictException(this.messagePrestationDoublonOuverte(existing.statut));
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
                statut: client_js_1.StatutPrestation.EN_ATTENTE,
            },
            include: {
                particulier: { select: { prenom: true, nom: true } },
                prestataire: { select: { nom: true } },
                prestataireService: { include: { service: true } },
            },
        });
        const nomClient = [particulier.prenom, particulier.nom].filter(Boolean).join(" ").trim() ||
            "Un client";
        await this.notifications.sendToUser(prestataire.user.id, {
            title: "Nouvelle demande de prestation",
            body: `${nomClient} vous a demandé une prestation (${service.service.libelle}).`,
            type: "prestation_created",
            data: { prestationId: prestation.id },
        });
        return this.formatPrestation(prestation);
    }
    async accepter(prestataireUserId, prestationId) {
        const prestataire = await this.prisma.prestataire.findUnique({
            where: { userId: prestataireUserId },
            select: { id: true },
        });
        if (!prestataire) {
            throw new common_1.BadRequestException("Profil prestataire introuvable");
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
            throw new common_1.BadRequestException("Prestation introuvable");
        }
        if (prestation.statut !== client_js_1.StatutPrestation.EN_ATTENTE) {
            throw new common_1.BadRequestException("Cette prestation n'est plus en attente d'acceptation");
        }
        const updated = await this.prisma.prestation.update({
            where: { id: prestationId },
            data: {
                statut: client_js_1.StatutPrestation.ACCEPTEE,
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
    async demarrer(prestataireUserId, prestationId) {
        const prestataire = await this.prisma.prestataire.findUnique({
            where: { userId: prestataireUserId },
            select: { id: true },
        });
        if (!prestataire) {
            throw new common_1.BadRequestException("Profil prestataire introuvable");
        }
        const prestation = await this.prisma.prestation.findFirst({
            where: { id: prestationId, prestataireId: prestataire.id },
        });
        if (!prestation) {
            throw new common_1.BadRequestException("Prestation introuvable");
        }
        if (prestation.statut !== client_js_1.StatutPrestation.ACCEPTEE) {
            throw new common_1.BadRequestException("Seule une prestation acceptée peut être démarrée");
        }
        const now = new Date();
        const updated = await this.prisma.prestation.update({
            where: { id: prestationId },
            data: {
                statut: client_js_1.StatutPrestation.EN_COURS,
                startedAt: now,
            },
            include: {
                particulier: { select: { userId: true, prenom: true, nom: true } },
                prestataire: { select: { nom: true } },
                prestataireService: { include: { service: true } },
            },
        });
        const serviceLibelle = updated.prestataireService?.service?.libelle ?? "prestation";
        await this.notifications.sendToUser(updated.particulier.userId, {
            title: "Le prestataire est arrivé",
            body: `${updated.prestataire.nom} est arrivé à votre adresse pour « ${serviceLibelle} ».`,
            type: "prestation_prestataire_arrived",
            data: { prestationId: updated.id },
        });
        return this.formatPrestation(updated);
    }
    async refuser(prestataireUserId, prestationId) {
        const prestataire = await this.prisma.prestataire.findUnique({
            where: { userId: prestataireUserId },
            select: { id: true },
        });
        if (!prestataire) {
            throw new common_1.BadRequestException("Profil prestataire introuvable");
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
            throw new common_1.BadRequestException("Prestation introuvable");
        }
        if (prestation.statut !== client_js_1.StatutPrestation.EN_ATTENTE) {
            throw new common_1.BadRequestException("Cette prestation n'est plus en attente d'acceptation");
        }
        const updated = await this.prisma.prestation.update({
            where: { id: prestationId },
            data: { statut: client_js_1.StatutPrestation.REFUSEE },
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
    async terminer(prestataireUserId, prestationId) {
        const prestataire = await this.prisma.prestataire.findUnique({
            where: { userId: prestataireUserId },
            select: { id: true },
        });
        if (!prestataire) {
            throw new common_1.BadRequestException("Profil prestataire introuvable");
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
            throw new common_1.BadRequestException("Prestation introuvable");
        }
        if (prestation.statut !== client_js_1.StatutPrestation.EN_COURS) {
            throw new common_1.BadRequestException("Indiquez d'abord votre arrivée sur place avant de terminer la prestation");
        }
        const updated = await this.prisma.prestation.update({
            where: { id: prestationId },
            data: {
                statut: client_js_1.StatutPrestation.TERMINEE,
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
    async marquerPayee(particulierUserId, prestationId, dto) {
        const particulier = await this.prisma.particulier.findUnique({
            where: { userId: particulierUserId },
            select: { id: true },
        });
        if (!particulier) {
            throw new common_1.BadRequestException("Profil particulier introuvable");
        }
        const prestation = await this.prisma.prestation.findFirst({
            where: { id: prestationId, particulierId: particulier.id },
            include: {
                prestataire: { include: { user: { select: { id: true } } } },
                prestataireService: { include: { service: true } },
            },
        });
        if (!prestation) {
            throw new common_1.BadRequestException("Prestation introuvable");
        }
        if (prestation.statut !== client_js_1.StatutPrestation.TERMINEE) {
            throw new common_1.BadRequestException("Seule une prestation terminée peut être payée");
        }
        const rawAmount = this.resolveGrossPaymentAmountFcfa(prestation, dto);
        if (rawAmount == null || Number.isNaN(rawAmount) || rawAmount <= 0) {
            throw new common_1.BadRequestException("Montant de la prestation introuvable");
        }
        const updated = await this.settlePrestationAsPaidInternal(particulierUserId, prestationId, rawAmount, "app_manual");
        return this.formatPrestation(updated);
    }
    async initPaydunyaCheckout(particulierUserId, prestationId) {
        if (!this.paydunya.isConfigured()) {
            throw new common_1.ServiceUnavailableException("Paiement PayDunya non configuré sur le serveur");
        }
        const particulier = await this.prisma.particulier.findUnique({
            where: { userId: particulierUserId },
            select: { id: true, prenom: true, nom: true },
        });
        if (!particulier) {
            throw new common_1.BadRequestException("Profil particulier introuvable");
        }
        const prestation = await this.prisma.prestation.findFirst({
            where: { id: prestationId, particulierId: particulier.id },
            include: {
                prestataire: { select: { nom: true } },
                prestataireService: { include: { service: true } },
            },
        });
        if (!prestation) {
            throw new common_1.BadRequestException("Prestation introuvable");
        }
        if (prestation.statut !== client_js_1.StatutPrestation.TERMINEE) {
            throw new common_1.BadRequestException("Seule une prestation terminée peut être payée en ligne");
        }
        const amount = this.resolveGrossPaymentAmountFcfa(prestation);
        if (amount == null || amount <= 0) {
            throw new common_1.BadRequestException("Montant de paiement indisponible (tarif catalogue ou durée manquant)");
        }
        const callbackUrl = (0, paydunya_callback_util_js_1.paydunyaIpnCallbackUrl)(this.logger);
        const storeName = process.env.PAYDUNYA_STORE_NAME?.trim() || "Mille Services";
        const serviceLibelle = prestation.prestataireService?.service?.libelle ?? "Prestation";
        this.logger.log(`Paiement prestation init PayDunya prestationId=${prestationId} particulierId=${particulier.id} amountFcfa=${String(amount)} service="${serviceLibelle.slice(0, 80)}"`);
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
        this.logger.log(`Paiement prestation init OK prestationId=${prestationId} invoiceToken=${inv.invoiceToken.length > 8 ? `${inv.invoiceToken.slice(0, 8)}…` : "[short]"}`);
        return {
            amountFcfa: amount,
            invoiceToken: inv.invoiceToken,
            checkoutUrl: inv.checkoutUrl,
            description: serviceLibelle,
        };
    }
    async softPayPrestation(particulierUserId, prestationId, dto) {
        if (!this.paydunya.isConfigured()) {
            throw new common_1.ServiceUnavailableException("Paiement PayDunya non configuré sur le serveur");
        }
        const particulier = await this.prisma.particulier.findUnique({
            where: { userId: particulierUserId },
            select: { id: true },
        });
        if (!particulier) {
            throw new common_1.BadRequestException("Profil particulier introuvable");
        }
        const prestation = await this.prisma.prestation.findFirst({
            where: { id: prestationId, particulierId: particulier.id },
            include: {
                prestataireService: { include: { service: true } },
            },
        });
        if (!prestation) {
            throw new common_1.BadRequestException("Prestation introuvable");
        }
        if (prestation.statut !== client_js_1.StatutPrestation.TERMINEE) {
            throw new common_1.BadRequestException("Seule une prestation terminée peut être payée en ligne");
        }
        const amount = this.resolveGrossPaymentAmountFcfa(prestation);
        if (amount == null || amount <= 0) {
            throw new common_1.BadRequestException("Montant de paiement indisponible (tarif catalogue ou durée manquant)");
        }
        const serviceLibelle = prestation.prestataireService?.service?.libelle ?? "Prestation";
        const invoiceToken = dto.invoiceToken.trim();
        const dbUser = await this.prisma.user.findUnique({
            where: { id: particulierUserId },
            select: { email: true },
        });
        const email = (dto.email?.trim() ||
            dbUser?.email ||
            "client@milleservices.sn").slice(0, 200);
        const phone = dto.telephone.replace(/\s+/g, "");
        const fullName = `${dto.prenom} ${dto.nom}`.trim();
        const telMask = phone.length >= 2 ? `***${phone.slice(-2)}` : "[short]";
        const tokenMask = invoiceToken.length > 8
            ? `${invoiceToken.slice(0, 8)}…`
            : "[short]";
        this.logger.log(`Paiement prestation SoftPay → prestationId=${prestationId} method=${dto.method} amountFcfa=${String(amount)} invoiceToken=${tokenMask} telephone=${telMask}`);
        let soft;
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
                throw new common_1.BadRequestException("Moyen de paiement inconnu");
        }
        if (!soft.success) {
            this.logger.warn(`Paiement prestation SoftPay KO prestationId=${prestationId} method=${dto.method} message=${soft.message ?? "n/a"}`);
            throw new common_1.BadRequestException(typeof soft.message === "string" && soft.message.trim()
                ? soft.message
                : "Paiement mobile refusé par PayDunya");
        }
        this.logger.log(`Paiement prestation SoftPay OK prestationId=${prestationId} method=${dto.method} url=${soft.url ? "yes" : "no"} om_url=${soft.other_url?.om_url ? "yes" : "no"} maxit_url=${soft.other_url?.maxit_url ? "yes" : "no"} message="${(soft.message ?? "").slice(0, 120)}"`);
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
    async handlePaydunyaIpn(body) {
        const parsed = this.normalizePaydunyaIpnPayload(body);
        if (!parsed) {
            this.logger.warn("IPN PayDunya: payload non reconnu");
            return { ok: false, error: "invalid_payload" };
        }
        if (!this.paydunya.verifyIpnHash(parsed.hash)) {
            this.logger.warn("IPN PayDunya: hash refusé");
            throw new common_1.ForbiddenException("Notification PayDunya non authentifiée");
        }
        if (parsed.status.toLowerCase() !== "completed") {
            return {
                ok: true,
                ignored: true,
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
                return { ok: false, error: r.error };
            }
            return { ok: true, scope: "abonnement" };
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
            this.logger.warn(`IPN PayDunya: prestation ${parsed.prestationId} introuvable`);
            return { ok: false, error: "prestation_not_found" };
        }
        if (prestation.statut === client_js_1.StatutPrestation.PAYEE) {
            return { ok: true, alreadyPaid: true };
        }
        if (prestation.statut !== client_js_1.StatutPrestation.TERMINEE) {
            this.logger.warn(`IPN PayDunya: statut prestation invalide ${prestation.statut}`);
            return { ok: false, error: "invalid_prestation_status" };
        }
        const expected = this.resolveGrossPaymentAmountFcfa(prestation);
        if (expected == null || expected <= 0) {
            return { ok: false, error: "amount_unavailable" };
        }
        const paid = Math.round(parsed.totalAmount);
        if (Math.abs(paid - expected) > 1) {
            this.logger.warn(`IPN PayDunya: écart montant payé=${paid} attendu=${expected} prestation=${prestation.id}`);
            return { ok: false, error: "amount_mismatch" };
        }
        const particulierUserId = prestation.particulier?.userId;
        if (!particulierUserId) {
            return { ok: false, error: "particulier_missing" };
        }
        await this.settlePrestationAsPaidInternal(particulierUserId, prestation.id, paid, "paydunya");
        const invTk = parsed.invoiceToken.length > 8
            ? `${parsed.invoiceToken.slice(0, 8)}…`
            : "[short]";
        this.logger.log(`IPN PayDunya prestation réglée prestationId=${prestation.id} montantFcfa=${String(paid)} attendu=${String(expected)} invoiceToken=${invTk}`);
        return { ok: true };
    }
    async syncPaydunyaPrestationPayment(particulierUserId, prestationId, invoiceToken) {
        const confirmed = await this.paydunya.confirmCheckoutInvoice(invoiceToken);
        if (!confirmed) {
            return { paid: false, error: "confirm_failed" };
        }
        if (!this.paydunya.verifyIpnHash(confirmed.hash)) {
            this.logger.warn("Confirm PayDunya prestation: hash refusé");
            return { paid: false, error: "invalid_hash" };
        }
        if (confirmed.status !== "completed") {
            return { paid: false, error: `status_${confirmed.status}` };
        }
        const prestation = await this.prisma.prestation.findFirst({
            where: { id: prestationId, particulier: { userId: particulierUserId } },
            select: { id: true, statut: true },
        });
        if (!prestation) {
            return { paid: false, error: "prestation_not_found" };
        }
        if (prestation.statut === client_js_1.StatutPrestation.PAYEE) {
            return { paid: true };
        }
        const body = {
            data: {
                hash: confirmed.hash,
                status: confirmed.status,
                invoice: {
                    total_amount: confirmed.totalAmount,
                    token: confirmed.invoiceToken,
                },
                custom_data: {
                    kind: "prestation",
                    prestationId: prestation.id,
                    ...confirmed.customData,
                },
            },
        };
        const result = await this.handlePaydunyaIpn(body);
        if (result.ok && !("ignored" in result && result.ignored)) {
            return { paid: true };
        }
        return {
            paid: false,
            error: "error" in result ? String(result.error) : "not_settled",
        };
    }
    normalizePaydunyaIpnPayload(body) {
        const root = body;
        const dataVal = root?.data ?? root;
        if (!dataVal || typeof dataVal !== "object" || Array.isArray(dataVal)) {
            return null;
        }
        const data = dataVal;
        const hash = data.hash?.toString()?.trim();
        const status = data.status?.toString()?.trim() ?? "";
        const inv = data.invoice;
        let totalAmount = NaN;
        let invoiceToken = "";
        if (inv && typeof inv === "object" && !Array.isArray(inv)) {
            const invObj = inv;
            totalAmount = Number(invObj.total_amount);
            invoiceToken = invObj.token?.toString()?.trim() ?? "";
        }
        const custom = data.custom_data;
        if (!custom || typeof custom !== "object" || Array.isArray(custom)) {
            return null;
        }
        const c = custom;
        const kindRaw = c.kind?.toString()?.trim().toLowerCase();
        const prestationId = c.prestationId?.toString()?.trim() ||
            c.prestation_id?.toString()?.trim() ||
            "";
        const offreId = c.offreId?.toString()?.trim() || "";
        const prestataireId = c.prestataireId?.toString()?.trim() || "";
        const userId = c.userId?.toString()?.trim() || "";
        if (!hash || !Number.isFinite(totalAmount) || !invoiceToken)
            return null;
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
            if (!offreId || !prestataireId || !userId)
                return null;
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
    computeCatalogPaymentAmountFcfa(p) {
        const tarif = (0, service_catalog_tarif_util_js_1.resolveHourlyTarifForPrestation)(p.prestataireService);
        if (tarif == null)
            return null;
        const hours = (0, prestation_billing_util_js_1.executionHoursFromPrestationDates)({
            startedAt: p.startedAt,
            acceptedAt: p.acceptedAt,
            completedAt: p.completedAt,
            createdAt: p.createdAt,
            useNowAsEndIfOpen: false,
        });
        return (0, prestation_billing_util_js_1.computePrestationTotalToChargeFcfa)(tarif, hours);
    }
    resolveGrossPaymentAmountFcfa(prestation, dto) {
        const fromBody = dto?.montant != null && !Number.isNaN(Number(dto.montant))
            ? Number(dto.montant)
            : null;
        if (fromBody != null && fromBody > 0)
            return fromBody;
        const computed = this.computeCatalogPaymentAmountFcfa(prestation);
        if (computed != null && computed > 0)
            return computed;
        return null;
    }
    async settlePrestationAsPaidInternal(particulierUserId, prestationId, grossAmount, paymentSource) {
        const rowForSplit = await this.prisma.prestation.findUnique({
            where: { id: prestationId },
            include: { prestataireService: { include: { service: true } } },
        });
        const splitOpts = rowForSplit
            ? this.prestationSplitCommissionOpts(rowForSplit)
            : undefined;
        const split = this.wallets.splitPrestationAmount(grossAmount, splitOpts);
        const { updated, didSettle } = await this.prisma.$transaction(async (tx) => {
            const current = await tx.prestation.findUnique({
                where: { id: prestationId },
                select: { statut: true },
            });
            if (current?.statut === client_js_1.StatutPrestation.PAYEE) {
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
            if (current?.statut !== client_js_1.StatutPrestation.TERMINEE) {
                throw new common_1.BadRequestException("Seule une prestation terminée peut être payée");
            }
            const p = await tx.prestation.update({
                where: { id: prestationId },
                data: { statut: client_js_1.StatutPrestation.PAYEE },
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
            const prestWallet = await this.wallets.ensurePrestataireWallet(p.prestataireId, tx);
            await this.wallets.creditWallet({
                tx,
                walletId: prestWallet.id,
                amount: split.net,
                type: client_js_1.TransactionType.PRESTATION,
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
                type: client_js_1.TransactionType.PRESTATION,
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
        });
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
    prestationSplitCommissionOpts(p) {
        const tarif = (0, service_catalog_tarif_util_js_1.resolveHourlyTarifForPrestation)(p.prestataireService);
        if (tarif == null)
            return undefined;
        const hours = (0, prestation_billing_util_js_1.executionHoursFromPrestationDates)({
            startedAt: p.startedAt,
            acceptedAt: p.acceptedAt,
            completedAt: p.completedAt,
            createdAt: p.createdAt,
            useNowAsEndIfOpen: false,
        });
        const baseWorkFcfa = tarif * hours;
        return {
            baseWorkFcfa,
            serviceFeeFcfa: prestation_billing_util_js_1.PRESTATION_SERVICE_FEE_FCFA,
        };
    }
    async listForUser(userId, role) {
        if (role === "PARTICULIER") {
            const particulier = await this.prisma.particulier.findUnique({
                where: { userId },
                select: { id: true },
            });
            if (!particulier)
                return [];
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
        if (!prestataire)
            return [];
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
    async findById(prestationId, userId, role) {
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
            throw new common_1.BadRequestException("Prestation introuvable");
        }
        const isParticulier = role === "PARTICULIER" && particulier?.id === prestation.particulierId;
        const isPrestataire = role === "PRESTATAIRE" && prestataire?.id === prestation.prestataireId;
        if (!isParticulier && !isPrestataire) {
            throw new common_1.ForbiddenException("Accès non autorisé à cette prestation");
        }
        return this.formatPrestationWithCoords(prestation);
    }
    formatPrestationWithCoords(p) {
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
            particulier: p.particulier
                ? {
                    prenom: p.particulier.prenom,
                    nom: p.particulier.nom,
                    telephone: p.particulier.telephone ?? undefined,
                    latitude: p.particulier.latitude != null
                        ? Number(p.particulier.latitude)
                        : null,
                    longitude: p.particulier.longitude != null
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
                    latitude: p.prestataire.latitude != null
                        ? Number(p.prestataire.latitude)
                        : null,
                    longitude: p.prestataire.longitude != null
                        ? Number(p.prestataire.longitude)
                        : null,
                }
                : undefined,
            service: this.formatPrestationServicePayload(p),
        };
    }
    formatPrestation(p) {
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
    messagePrestationDoublonOuverte(statut) {
        const base = "Vous avez déjà une demande en cours pour ce prestataire et ce service aujourd'hui. ";
        switch (statut) {
            case client_js_1.StatutPrestation.EN_ATTENTE:
                return (base +
                    "Elle est en attente de réponse du prestataire. Retournez à l'écran d'accueil ou consultez vos notifications pour la suivre — vous ne pouvez pas en créer une seconde tant qu'elle n'est pas terminée ou annulée.");
            case client_js_1.StatutPrestation.ACCEPTEE:
                return (base +
                    "Elle a été acceptée et attend le démarrage. Ouvrez la prestation en cours depuis vos notifications ou votre historique.");
            case client_js_1.StatutPrestation.EN_COURS:
                return (base +
                    "Elle est actuellement en cours. Suivez-la depuis l'écran de déroulement déjà ouvert ou vos notifications.");
            case client_js_1.StatutPrestation.TERMINEE:
                return (base +
                    "Elle est terminée et en attente de paiement. Réglez le paiement de cette prestation avant d'en demander une nouvelle identique aujourd'hui.");
            default:
                return (base +
                    "Consultez la prestation existante avant d'en créer une nouvelle.");
        }
    }
    formatPrestationServicePayload(p) {
        const ps = p.prestataireService;
        if (ps == null)
            return undefined;
        const cat = ps.service;
        const hourly = (0, service_catalog_tarif_util_js_1.resolveHourlyTarifForPrestation)(ps);
        return {
            id: cat?.id,
            libelle: cat?.libelle,
            tarifHoraire: hourly ?? undefined,
        };
    }
};
exports.PrestationsService = PrestationsService;
exports.PrestationsService = PrestationsService = PrestationsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService,
        notifications_service_js_1.NotificationsService,
        wallets_service_js_1.WalletsService,
        paydunya_service_js_1.PaydunyaService,
        abonnements_service_js_1.AbonnementsService])
], PrestationsService);
//# sourceMappingURL=prestations.service.js.map