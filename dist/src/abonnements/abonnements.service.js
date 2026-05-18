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
var AbonnementsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbonnementsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../prisma/prisma.service.js");
const client_js_1 = require("../../generated/prisma/client.js");
const wallets_service_js_1 = require("../wallets/wallets.service.js");
const paydunya_service_js_1 = require("../paydunya/paydunya.service.js");
let AbonnementsService = AbonnementsService_1 = class AbonnementsService {
    prisma;
    wallets;
    paydunya;
    logger = new common_1.Logger(AbonnementsService_1.name);
    constructor(prisma, wallets, paydunya) {
        this.prisma = prisma;
        this.wallets = wallets;
        this.paydunya = paydunya;
    }
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
    async getAbonnementCourant(userId) {
        const prestataire = await this.prisma.prestataire.findUnique({
            where: { userId },
            select: { id: true },
        });
        if (!prestataire) {
            throw new common_1.BadRequestException("Profil prestataire introuvable");
        }
        const abo = await this.prisma.abonnement.findFirst({
            where: {
                prestataireId: prestataire.id,
                statut: client_js_1.StatutAbonnement.ACTIF,
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
        if (!abo)
            return null;
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
    async isPaydunyaInvoicePaidForPrestataire(userId, invoiceToken) {
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
                type: client_js_1.TransactionType.ABONNEMENT,
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
    async souscrire(userId, offreId) {
        const prestataire = await this.prisma.prestataire.findUnique({
            where: { userId },
            select: { id: true },
        });
        if (!prestataire) {
            throw new common_1.BadRequestException("Profil prestataire introuvable");
        }
        const offre = await this.prisma.offre.findUnique({
            where: { id: offreId, actif: true },
        });
        if (!offre) {
            throw new common_1.BadRequestException("Offre introuvable ou inactive");
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dateFin = new Date(today);
        dateFin.setMonth(dateFin.getMonth() + offre.dureeMois);
        const newAbo = await this.prisma.$transaction(async (tx) => {
            await tx.abonnement.updateMany({
                where: {
                    prestataireId: prestataire.id,
                    statut: client_js_1.StatutAbonnement.ACTIF,
                },
                data: { statut: client_js_1.StatutAbonnement.EXPIRE },
            });
            const created = await tx.abonnement.create({
                data: {
                    prestataireId: prestataire.id,
                    offreId: offre.id,
                    dateDebut: today,
                    dateFin,
                    statut: client_js_1.StatutAbonnement.ACTIF,
                },
            });
            const generalWallet = await this.wallets.ensureGeneralWallet(tx);
            await this.wallets.creditWallet({
                tx,
                walletId: generalWallet.id,
                amount: Number(offre.prix),
                type: client_js_1.TransactionType.ABONNEMENT,
                abonnementId: created.id,
                offreId: offre.id,
                createdByUserId: userId,
                meta: { prestataireId: prestataire.id, provider: "app_manual" },
            });
            return created;
        });
        return this.getAbonnementCourant(userId);
    }
    async initPaydunyaCheckout(userId, offreId) {
        if (!this.paydunya.isConfigured()) {
            throw new common_1.ServiceUnavailableException("Paiement PayDunya non configuré sur le serveur");
        }
        const prestataire = await this.prisma.prestataire.findUnique({
            where: { userId },
            select: { id: true, nom: true },
        });
        if (!prestataire) {
            throw new common_1.BadRequestException("Profil prestataire introuvable");
        }
        const offre = await this.prisma.offre.findUnique({
            where: { id: offreId, actif: true },
        });
        if (!offre) {
            throw new common_1.BadRequestException("Offre introuvable ou inactive");
        }
        const amount = Math.round(Number(offre.prix));
        if (!Number.isFinite(amount) || amount <= 0) {
            throw new common_1.BadRequestException("Prix d'offre invalide pour le paiement");
        }
        const callbackBase = process.env.PAYDUNYA_CALLBACK_BASE_URL?.trim() ||
            process.env.PUBLIC_API_URL?.trim() ||
            "";
        if (!callbackBase) {
            throw new common_1.ServiceUnavailableException("PAYDUNYA_CALLBACK_BASE_URL ou PUBLIC_API_URL doit être défini pour l’IPN");
        }
        const callbackUrl = `${callbackBase.replace(/\/$/, "")}/webhooks/paydunya`;
        const storeName = process.env.PAYDUNYA_STORE_NAME?.trim() || "Mille Services";
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
    async softPayAbonnement(userId, dto) {
        if (!this.paydunya.isConfigured()) {
            throw new common_1.ServiceUnavailableException("Paiement PayDunya non configuré sur le serveur");
        }
        const prestataire = await this.prisma.prestataire.findUnique({
            where: { userId },
            select: { id: true, nom: true },
        });
        if (!prestataire) {
            throw new common_1.BadRequestException("Profil prestataire introuvable");
        }
        const offre = await this.prisma.offre.findUnique({
            where: { id: dto.offreId, actif: true },
        });
        if (!offre) {
            throw new common_1.BadRequestException("Offre introuvable ou inactive");
        }
        const amount = Math.round(Number(offre.prix));
        if (!Number.isFinite(amount) || amount <= 0) {
            throw new common_1.BadRequestException("Prix d'offre invalide pour le paiement");
        }
        const invoiceToken = dto.invoiceToken.trim();
        const dbUser = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { email: true },
        });
        const email = (dto.email?.trim() ||
            dbUser?.email ||
            "prestataire@milleservices.sn").slice(0, 200);
        const phone = dto.telephone.replace(/\s+/g, "");
        const fullName = `${dto.prenom} ${dto.nom}`.trim();
        const telMask = phone.length >= 2 ? `***${phone.slice(-2)}` : "[short]";
        const tokenMask = invoiceToken.length > 8
            ? `${invoiceToken.slice(0, 8)}…`
            : "[short]";
        this.logger.log(`Abonnement SoftPay → offreId=${dto.offreId} method=${dto.method} amountFcfa=${String(amount)} invoiceToken=${tokenMask} telephone=${telMask}`);
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
            this.logger.warn(`Abonnement SoftPay KO offreId=${dto.offreId} method=${dto.method} message=${soft.message ?? "n/a"}`);
            throw new common_1.BadRequestException(typeof soft.message === "string" && soft.message.trim()
                ? soft.message
                : "Paiement mobile refusé par PayDunya");
        }
        this.logger.log(`Abonnement SoftPay OK offreId=${dto.offreId} method=${dto.method} url=${soft.url ? "yes" : "no"}`);
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
    async finalizeFromPaydunyaIpn(input) {
        const dup = await this.prisma.walletTransaction.findFirst({
            where: {
                type: client_js_1.TransactionType.ABONNEMENT,
                meta: {
                    path: ["paydunyaInvoiceToken"],
                    equals: input.invoiceToken,
                },
            },
        });
        if (dup) {
            return { ok: true, alreadyProcessed: true };
        }
        const prestataire = await this.prisma.prestataire.findUnique({
            where: { id: input.prestataireId },
            select: { id: true, userId: true },
        });
        if (!prestataire || prestataire.userId !== input.userId) {
            return { ok: false, error: "prestataire_mismatch" };
        }
        const offre = await this.prisma.offre.findUnique({
            where: { id: input.offreId, actif: true },
        });
        if (!offre) {
            return { ok: false, error: "offre_not_found" };
        }
        const expected = Math.round(Number(offre.prix));
        const paid = Math.round(input.paidAmount);
        if (Math.abs(paid - expected) > 1) {
            return { ok: false, error: "amount_mismatch" };
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dateFin = new Date(today);
        dateFin.setMonth(dateFin.getMonth() + offre.dureeMois);
        await this.prisma.$transaction(async (tx) => {
            await tx.abonnement.updateMany({
                where: {
                    prestataireId: prestataire.id,
                    statut: client_js_1.StatutAbonnement.ACTIF,
                },
                data: { statut: client_js_1.StatutAbonnement.EXPIRE },
            });
            const created = await tx.abonnement.create({
                data: {
                    prestataireId: prestataire.id,
                    offreId: offre.id,
                    dateDebut: today,
                    dateFin,
                    statut: client_js_1.StatutAbonnement.ACTIF,
                },
            });
            const generalWallet = await this.wallets.ensureGeneralWallet(tx);
            await this.wallets.creditWallet({
                tx,
                walletId: generalWallet.id,
                amount: Number(offre.prix),
                type: client_js_1.TransactionType.ABONNEMENT,
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
        return { ok: true };
    }
    resolveStatutAffichage(abo) {
        if (abo.statut === client_js_1.StatutAbonnement.ANNULE)
            return "ANNULE";
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const fin = new Date(abo.dateFin);
        fin.setHours(0, 0, 0, 0);
        if (abo.statut === client_js_1.StatutAbonnement.ACTIF && fin >= today)
            return "ACTIF";
        return "EXPIRE";
    }
    async listForAdmin(params) {
        const limit = Math.min(Math.max(params.limit ?? 50, 1), 200);
        const offset = Math.max(params.offset ?? 0, 0);
        const search = params.search?.trim() ?? "";
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const where = {};
        if (search) {
            where.prestataire = {
                OR: [
                    { nom: { contains: search, mode: "insensitive" } },
                    { user: { email: { contains: search, mode: "insensitive" } } },
                ],
            };
        }
        if (params.statut === "actif") {
            where.statut = client_js_1.StatutAbonnement.ACTIF;
            where.dateFin = { gte: today };
        }
        else if (params.statut === "expire") {
            where.OR = [
                { statut: client_js_1.StatutAbonnement.EXPIRE },
                { statut: client_js_1.StatutAbonnement.ANNULE },
                {
                    statut: client_js_1.StatutAbonnement.ACTIF,
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
            if (aff === "ACTIF")
                actifs += 1;
            else if (aff === "EXPIRE")
                expires += 1;
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
    async adminRenouvelerAbonnement(params) {
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
            throw new common_1.BadRequestException("Prestataire introuvable");
        }
        const offre = await this.prisma.offre.findUnique({
            where: { id: params.offreId, actif: true },
        });
        if (!offre) {
            throw new common_1.BadRequestException("Offre introuvable ou inactive");
        }
        const amount = Math.round(Number(offre.prix));
        if (!Number.isFinite(amount) || amount <= 0) {
            throw new common_1.BadRequestException("Prix d'offre invalide");
        }
        if (params.method === "cash") {
            return this.adminCreateAbonnementCash({
                prestataireId: prestataire.id,
                offre,
                adminUserId: params.adminUserId,
            });
        }
        if (!this.paydunya.isConfigured()) {
            throw new common_1.ServiceUnavailableException("Paiement PayDunya non configuré sur le serveur");
        }
        const phone = (params.telephone ?? prestataire.telephone ?? "")
            .replace(/\s+/g, "")
            .trim();
        if (phone.length < 8) {
            throw new common_1.BadRequestException("Numéro de téléphone requis pour un paiement mobile money");
        }
        const callbackBase = process.env.PAYDUNYA_CALLBACK_BASE_URL?.trim() ||
            process.env.PUBLIC_API_URL?.trim() ||
            "";
        if (!callbackBase) {
            throw new common_1.ServiceUnavailableException("PAYDUNYA_CALLBACK_BASE_URL ou PUBLIC_API_URL doit être défini pour l’IPN");
        }
        const callbackUrl = `${callbackBase.replace(/\/$/, "")}/webhooks/paydunya`;
        const storeName = process.env.PAYDUNYA_STORE_NAME?.trim() || "Mille Services";
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
        const email = (prestataire.user.email || "prestataire@milleservices.sn").slice(0, 200);
        let soft;
        if (params.method === "wave_sn") {
            soft = await this.paydunya.softPayWaveSenegal({
                wave_senegal_fullName: fullName,
                wave_senegal_email: email,
                wave_senegal_phone: phone,
                wave_senegal_payment_token: invoice.invoiceToken,
            });
        }
        else {
            soft = await this.paydunya.softPayOrangeMoneySenegal({
                customer_name: fullName,
                customer_email: email,
                phone_number: phone,
                invoice_token: invoice.invoiceToken,
            });
        }
        if (!soft.success) {
            this.logger.warn(`Admin renouvellement KO method=${params.method} message=${soft.message ?? "n/a"}`);
            throw new common_1.BadRequestException(typeof soft.message === "string" && soft.message.trim()
                ? soft.message
                : "Paiement mobile refusé par PayDunya");
        }
        this.logger.log(`Admin renouvellement OK method=${params.method} prestataire=${prestataire.id} amount=${amount}`);
        return {
            paymentStatus: "pending_payment",
            method: params.method,
            amountFcfa: amount,
            invoiceToken: invoice.invoiceToken,
            checkoutUrl: invoice.checkoutUrl,
            message: "Paiement initié. L’abonnement sera activé uniquement après confirmation PayDunya.",
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
    async adminIsInvoicePaid(prestataireId, invoiceToken) {
        const prestataire = await this.prisma.prestataire.findUnique({
            where: { id: prestataireId },
            select: { userId: true },
        });
        if (!prestataire) {
            throw new common_1.BadRequestException("Prestataire introuvable");
        }
        return this.isPaydunyaInvoicePaidForPrestataire(prestataire.userId, invoiceToken);
    }
    async adminCreateAbonnementCash(params) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dateFin = new Date(today);
        dateFin.setMonth(dateFin.getMonth() + params.offre.dureeMois);
        const created = await this.prisma.$transaction(async (tx) => {
            await tx.abonnement.updateMany({
                where: {
                    prestataireId: params.prestataireId,
                    statut: client_js_1.StatutAbonnement.ACTIF,
                },
                data: { statut: client_js_1.StatutAbonnement.EXPIRE },
            });
            const abo = await tx.abonnement.create({
                data: {
                    prestataireId: params.prestataireId,
                    offreId: params.offre.id,
                    dateDebut: today,
                    dateFin,
                    statut: client_js_1.StatutAbonnement.ACTIF,
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
                type: client_js_1.TransactionType.ABONNEMENT,
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
            paymentStatus: "completed",
            method: "cash",
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
    async adminExpirerAbonnement(abonnementId) {
        const abo = await this.prisma.abonnement.findUnique({
            where: { id: abonnementId },
            select: { id: true, statut: true },
        });
        if (!abo) {
            throw new common_1.BadRequestException("Abonnement introuvable");
        }
        if (abo.statut === client_js_1.StatutAbonnement.ANNULE) {
            throw new common_1.BadRequestException("Abonnement déjà annulé");
        }
        const updated = await this.prisma.abonnement.update({
            where: { id: abonnementId },
            data: { statut: client_js_1.StatutAbonnement.EXPIRE },
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
};
exports.AbonnementsService = AbonnementsService;
exports.AbonnementsService = AbonnementsService = AbonnementsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService,
        wallets_service_js_1.WalletsService,
        paydunya_service_js_1.PaydunyaService])
], AbonnementsService);
//# sourceMappingURL=abonnements.service.js.map