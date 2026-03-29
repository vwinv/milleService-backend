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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AdminController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../prisma/prisma.service.js");
const jwt_auth_guard_js_1 = require("../auth/guards/jwt-auth.guard.js");
const roles_guard_js_1 = require("../auth/guards/roles.guard.js");
const roles_decorator_js_1 = require("../auth/decorators/roles.decorator.js");
const current_user_decorator_js_1 = require("../auth/decorators/current-user.decorator.js");
const notifications_service_js_1 = require("../notifications/notifications.service.js");
const client_js_1 = require("../../generated/prisma/client.js");
function metaWithdrawalAmount(meta) {
    if (!meta || typeof meta !== 'object')
        return null;
    const m = meta;
    const a = m.amount;
    if (typeof a === 'number' && !Number.isNaN(a) && a >= 0)
        return a;
    return null;
}
function withdrawalMethodLabel(method) {
    switch (method) {
        case client_js_1.WithdrawalMethod.ORANGE_MONEY:
            return 'Orange money';
        case client_js_1.WithdrawalMethod.WAVE:
            return 'Wave';
        case client_js_1.WithdrawalMethod.FREE_MONEY:
            return 'Free money';
        case client_js_1.WithdrawalMethod.RIB:
            return 'Carte bancaire';
        default:
            return method;
    }
}
function statutPrestationLabelFr(statut) {
    switch (statut) {
        case client_js_1.StatutPrestation.EN_ATTENTE:
            return 'En attente';
        case client_js_1.StatutPrestation.ACCEPTEE:
            return 'Acceptée';
        case client_js_1.StatutPrestation.REFUSEE:
            return 'Refusée';
        case client_js_1.StatutPrestation.EN_COURS:
            return 'En cours';
        case client_js_1.StatutPrestation.TERMINEE:
            return 'Terminée';
        case client_js_1.StatutPrestation.ANNULEE:
            return 'Annulée';
        case client_js_1.StatutPrestation.PAYEE:
            return 'Payée';
        default:
            return statut;
    }
}
function isParticulierStatutMissingError(err) {
    if (!(err instanceof client_js_1.Prisma.PrismaClientKnownRequestError))
        return false;
    if (err.code === 'P2022')
        return true;
    const msg = String(err.message ?? '');
    return msg.includes('statut') && msg.toLowerCase().includes('particulier');
}
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
    };
}
let AdminController = AdminController_1 = class AdminController {
    prisma;
    notifications;
    logger = new common_1.Logger(AdminController_1.name);
    constructor(prisma, notifications) {
        this.prisma = prisma;
        this.notifications = notifications;
    }
    async getStats() {
        try {
            const [clientsActifs, prestatairesActifs, metiersCount, generalWallet] = await Promise.all([
                this.prisma.particulier.count({ where: { statut: client_js_1.ParticulierStatut.ACTIF } }),
                this.prisma.prestataire.count({ where: { actif: true } }),
                this.prisma.service.count(),
                this.prisma.wallet.findFirst({
                    where: { type: client_js_1.WalletType.GENERAL },
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
        catch (err) {
            if (!isParticulierStatutMissingError(err))
                throw err;
            this.logger.warn('KPI clients : colonne particuliers.statut absente — repli sur email vérifié. Exécutez: npx prisma migrate deploy');
            const [clientsActifs, prestatairesActifs, metiersCount, generalWallet] = await Promise.all([
                this.prisma.particulier.count({
                    where: { user: { emailVerified: true } },
                }),
                this.prisma.prestataire.count({ where: { actif: true } }),
                this.prisma.service.count(),
                this.prisma.wallet.findFirst({
                    where: { type: client_js_1.WalletType.GENERAL },
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
    async createGeneralNotification(body) {
        const title = String(body?.title ?? '').trim();
        if (!title) {
            throw new common_1.BadRequestException('title requis');
        }
        const audience = body?.audience ?? 'TOUT';
        const roleFilter = audience === 'PARTICULIER'
            ? { role: client_js_1.Role.PARTICULIER }
            : audience === 'PRESTATAIRE'
                ? { role: client_js_1.Role.PRESTATAIRE }
                : { role: { in: [client_js_1.Role.PARTICULIER, client_js_1.Role.PRESTATAIRE] } };
        const users = await this.prisma.user.findMany({
            where: roleFilter,
            select: { id: true },
        });
        const sent = users.length;
        this.logger.log(`[FCM trace] admin POST notifications/general audience=${audience} destinataires=${sent} title="${title.slice(0, 80)}"`);
        await Promise.all(users.map((u) => this.notifications.sendToUser(u.id, {
            title,
            body: body.body ?? undefined,
            type: body.type ?? undefined,
            data: body.data,
        })));
        this.logger.log(`[FCM trace] admin notifications/general terminé (sendToUser × ${sent})`);
        return { ok: true, sent };
    }
    async createTargetedNotification(body) {
        const userId = String(body?.userId ?? '').trim();
        const title = String(body?.title ?? '').trim();
        if (!userId)
            throw new common_1.BadRequestException('userId requis');
        if (!title)
            throw new common_1.BadRequestException('title requis');
        this.logger.log(`[FCM trace] admin POST notifications/targeted userId=${userId} title="${title.slice(0, 80)}"`);
        await this.notifications.sendToUser(userId, {
            title,
            body: body.body ?? undefined,
            type: body.type ?? undefined,
            data: body.data,
        });
        this.logger.log(`[FCM trace] admin notifications/targeted terminé userId=${userId}`);
        return { ok: true };
    }
    async listAdminNotifications(limit, offset, audience, unreadOnly, type, search) {
        const take = Math.min(Math.max(Number(limit ?? 14), 1), 100);
        const skip = Math.max(Number(offset ?? 0), 0);
        const aud = (audience ?? 'TOUT').toUpperCase();
        const roleFilter = aud === 'PARTICULIER'
            ? { role: client_js_1.Role.PARTICULIER }
            : aud === 'PRESTATAIRE'
                ? { role: client_js_1.Role.PRESTATAIRE }
                : aud === 'ALL'
                    ? { role: { in: [client_js_1.Role.PARTICULIER, client_js_1.Role.PRESTATAIRE] } }
                    : { role: { in: [client_js_1.Role.PARTICULIER, client_js_1.Role.PRESTATAIRE] } };
        const q = search?.trim();
        const where = {
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
                const displayName = u.role === client_js_1.Role.PARTICULIER
                    ? [u.particulier?.prenom, u.particulier?.nom].filter(Boolean).join(' ')
                    : u.role === client_js_1.Role.PRESTATAIRE
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
    async getEvolution(months) {
        const allowed = new Set([1, 3, 6, 12]);
        const parsed = Number(months ?? 12);
        const periodMonths = allowed.has(parsed) ? parsed : 12;
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth() - (periodMonths - 1), 1);
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        const [baseClients, basePrestataires, clientRows, prestataireRows,] = await Promise.all([
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
        const monthKey = (d) => `${d.getFullYear()}-${d.getMonth()}`;
        const clientNewByMonth = new Map();
        const prestataireNewByMonth = new Map();
        for (const row of clientRows) {
            const k = monthKey(row.createdAt);
            clientNewByMonth.set(k, (clientNewByMonth.get(k) ?? 0) + 1);
        }
        for (const row of prestataireRows) {
            const k = monthKey(row.createdAt);
            prestataireNewByMonth.set(k, (prestataireNewByMonth.get(k) ?? 0) + 1);
        }
        const labels = [];
        const clients = [];
        const prestataires = [];
        let runningClients = baseClients;
        let runningPrestataires = basePrestataires;
        for (let i = 0; i < periodMonths; i += 1) {
            const d = new Date(start.getFullYear(), start.getMonth() + i, 1);
            const k = monthKey(d);
            runningClients += clientNewByMonth.get(k) ?? 0;
            runningPrestataires += prestataireNewByMonth.get(k) ?? 0;
            labels.push(d.toLocaleString('fr-FR', { month: 'short' }).replace('.', ''));
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
    async getWalletSummary() {
        const [generalRow, prestataireAgg] = await Promise.all([
            this.prisma.wallet.findFirst({
                where: { type: client_js_1.WalletType.GENERAL },
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
    async listWithdrawalRequests(limit, offset) {
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
    async decisionWithdrawalRequest(id, body) {
        const decision = body.decision;
        if (decision !== 'accept' && decision !== 'reject') {
            throw new common_1.BadRequestException('decision invalide (accept ou reject)');
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
            throw new common_1.BadRequestException('Demande introuvable');
        }
        if (row.status !== client_js_1.WithdrawalStatus.EN_ATTENTE) {
            throw new common_1.BadRequestException('Cette demande a déjà été traitée');
        }
        if (decision === 'reject') {
            await this.prisma.withdrawalRequest.update({
                where: { id: row.id },
                data: { status: client_js_1.WithdrawalStatus.REFUSE },
            });
            return { ok: true, status: client_js_1.WithdrawalStatus.REFUSE };
        }
        if (body.payoutMethod != null &&
            !Object.values(client_js_1.WithdrawalMethod).includes(body.payoutMethod)) {
            throw new common_1.BadRequestException('Moyen de paiement invalide');
        }
        const metaBase = row.meta && typeof row.meta === 'object' && !Array.isArray(row.meta)
            ? { ...row.meta }
            : {};
        if (body.payoutMethod != null) {
            metaBase.adminPayoutMethod = body.payoutMethod;
        }
        metaBase.adminProcessedAt = new Date().toISOString();
        const metaPayload = metaBase;
        const amount = metaWithdrawalAmount(row.meta);
        const wallet = await this.prisma.wallet.findUnique({
            where: { prestataireId: row.prestataireId },
            select: { id: true, balance: true },
        });
        if (!wallet) {
            throw new common_1.BadRequestException('Wallet du prestataire introuvable');
        }
        if (amount != null && amount > 0) {
            const bal = Number(wallet.balance);
            if (amount > bal) {
                throw new common_1.BadRequestException('Solde insuffisant pour valider ce montant');
            }
            await this.prisma.$transaction([
                this.prisma.wallet.update({
                    where: { id: wallet.id },
                    data: { balance: { decrement: amount } },
                }),
                this.prisma.withdrawalRequest.update({
                    where: { id: row.id },
                    data: {
                        status: client_js_1.WithdrawalStatus.TRAITE,
                        meta: metaPayload,
                    },
                }),
            ]);
        }
        else {
            await this.prisma.withdrawalRequest.update({
                where: { id: row.id },
                data: {
                    status: client_js_1.WithdrawalStatus.TRAITE,
                    meta: metaPayload,
                },
            });
        }
        return { ok: true, status: client_js_1.WithdrawalStatus.TRAITE };
    }
    async getTransactions(limit) {
        const take = Math.min(Math.max(Number(limit ?? 20), 1), 100);
        const generalWallet = await this.prisma.wallet.findFirst({
            where: { type: client_js_1.WalletType.GENERAL },
            select: { id: true },
        });
        const [walletRows, withdrawalRows] = await Promise.all([
            generalWallet
                ? this.prisma.walletTransaction.findMany({
                    where: {
                        walletId: generalWallet.id,
                        type: { in: [client_js_1.TransactionType.PRESTATION, client_js_1.TransactionType.ABONNEMENT] },
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
            if (row.type === client_js_1.TransactionType.ABONNEMENT) {
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
                    category: 'PAIEMENT_ABONNEMENT',
                };
            }
            return {
                id: row.id,
                date: row.createdAt,
                prestataireNom: row.prestation?.prestataire?.nom ?? 'Prestataire',
                montant: Number(row.amount),
                wallet: 'Wallet Général',
                statut: 'Depot',
                category: 'PAIEMENT_PRESTATION',
            };
        });
        const withdrawals = withdrawalRows.map((row) => ({
            id: row.id,
            date: row.createdAt,
            prestataireNom: row.prestataire?.nom ?? 'Prestataire',
            montant: null,
            wallet: row.method === 'ORANGE_MONEY'
                ? 'Orange Money'
                : row.method === 'FREE_MONEY'
                    ? 'Free Money'
                    : row.method === 'RIB'
                        ? 'RIB'
                        : 'Wave',
            statut: row.status === client_js_1.WithdrawalStatus.TRAITE
                ? 'Retrait'
                : row.status === client_js_1.WithdrawalStatus.REFUSE
                    ? 'Refuse'
                    : 'En attente',
            category: 'RETRAIT_PRESTATAIRE',
        }));
        return [...walletTxs, ...withdrawals]
            .sort((a, b) => b.date.getTime() - a.date.getTime())
            .slice(0, take);
    }
    async getClients(limit, offset, search) {
        const take = Math.min(Math.max(Number(limit ?? 10), 1), 100);
        const skip = Math.max(Number(offset ?? 0), 0);
        const q = search?.trim();
        const searchFilter = q
            ? {
                OR: [
                    { nom: { contains: q, mode: 'insensitive' } },
                    { prenom: { contains: q, mode: 'insensitive' } },
                    { user: { email: { contains: q, mode: 'insensitive' } } },
                ],
            }
            : {};
        try {
            const [globalTotal, actifsCount, inactifsCount, filteredTotal, rows] = await Promise.all([
                this.prisma.particulier.count(),
                this.prisma.particulier.count({
                    where: { statut: client_js_1.ParticulierStatut.ACTIF },
                }),
                this.prisma.particulier.count({
                    where: { statut: client_js_1.ParticulierStatut.INACTIF },
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
                    const actif = p.statut === client_js_1.ParticulierStatut.ACTIF;
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
        catch (err) {
            if (!isParticulierStatutMissingError(err))
                throw err;
            this.logger.warn('Liste clients : colonne particuliers.statut absente — repli sur email vérifié. Exécutez: npx prisma migrate deploy');
            const [globalTotal, actifsCount, inactifsCount, filteredTotal, rows] = await Promise.all([
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
    async getClientDetails(particulierId) {
        let p;
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
        }
        catch (err) {
            if (!isParticulierStatutMissingError(err))
                throw err;
            this.logger.warn('Détail client : colonne particuliers.statut absente — repli sur email vérifié. Exécutez: npx prisma migrate deploy');
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
            throw new common_1.BadRequestException('Client introuvable');
        }
        const [prestationsTotal, prestationsAnnulees] = await Promise.all([
            this.prisma.prestation.count({ where: { particulierId } }),
            this.prisma.prestation.count({
                where: { particulierId, statut: client_js_1.StatutPrestation.ANNULEE },
            }),
        ]);
        const actif = p.statut !== undefined
            ? p.statut === client_js_1.ParticulierStatut.ACTIF
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
    async setClientActif(particulierId, body) {
        const actif = Boolean(body?.actif);
        const p = await this.prisma.particulier.findUnique({
            where: { id: particulierId },
            select: { id: true, userId: true },
        });
        if (!p) {
            throw new common_1.BadRequestException('Client introuvable');
        }
        try {
            await this.prisma.particulier.update({
                where: { id: p.id },
                data: {
                    statut: actif ? client_js_1.ParticulierStatut.ACTIF : client_js_1.ParticulierStatut.INACTIF,
                },
            });
        }
        catch (err) {
            if (!isParticulierStatutMissingError(err))
                throw err;
            this.logger.warn('Mise à jour statut client : colonne particuliers.statut absente — repli sur users.email_verified. Exécutez: npx prisma migrate deploy');
            await this.prisma.user.update({
                where: { id: p.userId },
                data: { emailVerified: actif },
            });
        }
        return { actif, statut: actif ? 'Actif' : 'Inactif' };
    }
    async deleteClient(particulierId) {
        const particulier = await this.prisma.particulier.findUnique({
            where: { id: particulierId },
            select: {
                userId: true,
                user: { select: { role: true } },
            },
        });
        if (!particulier) {
            throw new common_1.BadRequestException('Client introuvable');
        }
        if (particulier.user.role !== client_js_1.Role.PARTICULIER) {
            throw new common_1.BadRequestException('Utilisateur invalide');
        }
        await this.prisma.user.delete({ where: { id: particulier.userId } });
        return { success: true };
    }
    async getPrestataires(limit) {
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
                const noteMoyenne = notes.length > 0
                    ? Math.round((notes.reduce((sum, n) => sum + n, 0) / notes.length) * 10) / 10
                    : 0;
                const documentsTotal = p.documents.length;
                const documentsValides = p.documents.filter((d) => d.statut === client_js_1.StatutDocument.VALIDE).length;
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
    async setPrestataireActif(prestataireId, body) {
        const actif = Boolean(body?.actif);
        const existing = await this.prisma.prestataire.findUnique({
            where: { id: prestataireId },
            select: { id: true, statutVerification: true },
        });
        if (!existing) {
            throw new common_1.BadRequestException('Prestataire introuvable');
        }
        if (actif && existing.statutVerification !== client_js_1.StatutVerificationPrestataire.VERIFIE) {
            throw new common_1.BadRequestException('Un prestataire ne peut être activé que lorsque son statut de vérification est « Vérifié ».');
        }
        const updated = await this.prisma.prestataire.update({
            where: { id: prestataireId },
            data: { actif },
            select: { id: true, actif: true },
        });
        return { id: updated.id, actif: updated.actif };
    }
    async getPrestatairePaiementsParticuliers(prestataireId, limit, offset) {
        const take = Math.min(Math.max(Number(limit ?? 50), 1), 200);
        const skip = Math.max(Number(offset ?? 0), 0);
        const exists = await this.prisma.prestataire.findUnique({
            where: { id: prestataireId },
            select: { id: true },
        });
        if (!exists) {
            throw new common_1.BadRequestException('Prestataire introuvable');
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
            type: client_js_1.TransactionType.PRESTATION,
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
            const meta = row.meta;
            const grossFromMeta = meta &&
                typeof meta.gross === 'number' &&
                !Number.isNaN(meta.gross)
                ? meta.gross
                : null;
            const budget = row.prestation?.budget;
            const grossFromBudget = budget != null ? Number(budget) : null;
            const montantPayeParClient = grossFromMeta ??
                (grossFromBudget != null && !Number.isNaN(grossFromBudget)
                    ? grossFromBudget
                    : Number(row.amount));
            const particulier = row.prestation?.particulier;
            const clientNom = particulier
                ? `${particulier.prenom} ${particulier.nom}`.trim()
                : '—';
            const serviceLibelle = row.prestation?.prestataireService?.service?.libelle ?? '—';
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
    async getPrestataireDetails(prestataireId) {
        const prestataire = await this.prisma.prestataire.findUnique({
            where: { id: prestataireId },
            select: prestataireAdminDetailSelect(),
        });
        if (!prestataire) {
            throw new common_1.BadRequestException('Prestataire introuvable');
        }
        let walletStatutPrestataire = client_js_1.PrestataireWalletStatut.ACTIF;
        let walletBalancePlafond = null;
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
        }
        catch (err) {
            this.logger.debug(`Wallet plafond/statut non disponibles en base (migrate ?) — ${err instanceof Error ? err.message : String(err)}`);
        }
        const notes = prestataire.avis.map((a) => a.note);
        const noteMoyenne = notes.length > 0
            ? Math.round((notes.reduce((sum, n) => sum + n, 0) / notes.length) * 10) / 10
            : 0;
        const libelles = prestataire.servicesProposes.map((s) => s.service.libelle);
        const metier = libelles.length === 0 ? '—' : libelles.length === 1 ? libelles[0] : libelles.join(', ');
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
    async patchPrestataireWalletStatut(prestataireId, body) {
        const s = body.statut;
        if (s !== 'ACTIF' && s !== 'BLOQUE') {
            throw new common_1.BadRequestException('statut doit être ACTIF ou BLOQUE');
        }
        const exists = await this.prisma.prestataire.findUnique({
            where: { id: prestataireId },
            select: { id: true },
        });
        if (!exists) {
            throw new common_1.BadRequestException('Prestataire introuvable');
        }
        let wallet = await this.prisma.wallet.findUnique({ where: { prestataireId } });
        if (!wallet) {
            wallet = await this.prisma.wallet.create({
                data: {
                    type: client_js_1.WalletType.PRESTATAIRE,
                    prestataireId,
                    statutPrestataire: s,
                },
            });
        }
        else {
            wallet = await this.prisma.wallet.update({
                where: { id: wallet.id },
                data: { statutPrestataire: s },
            });
        }
        return { statutPrestataire: wallet.statutPrestataire };
    }
    async patchPrestataireWalletPlafond(prestataireId, body) {
        if (!('montantMax' in body)) {
            throw new common_1.BadRequestException('montantMax requis (nombre positif ou null pour retirer le plafond)');
        }
        const raw = body.montantMax;
        let balancePlafond;
        if (raw === null) {
            balancePlafond = null;
        }
        else {
            const n = Number(raw);
            if (!Number.isFinite(n) || n < 0) {
                throw new common_1.BadRequestException('montantMax invalide');
            }
            balancePlafond = n;
        }
        const exists = await this.prisma.prestataire.findUnique({
            where: { id: prestataireId },
            select: { id: true },
        });
        if (!exists) {
            throw new common_1.BadRequestException('Prestataire introuvable');
        }
        let wallet = await this.prisma.wallet.findUnique({ where: { prestataireId } });
        if (!wallet) {
            wallet = await this.prisma.wallet.create({
                data: {
                    type: client_js_1.WalletType.PRESTATAIRE,
                    prestataireId,
                    balancePlafond,
                },
            });
        }
        else {
            if (balancePlafond != null) {
                const bal = Math.round(Number(wallet.balance) * 100) / 100;
                const max = Math.round(balancePlafond * 100) / 100;
                if (bal > max) {
                    throw new common_1.BadRequestException(`Le solde actuel (${bal} FCFA) est déjà supérieur au plafond choisi. Le solde maximal doit être au moins égal au solde actuel.`);
                }
            }
            wallet = await this.prisma.wallet.update({
                where: { id: wallet.id },
                data: { balancePlafond },
            });
        }
        return {
            balancePlafond: wallet.balancePlafond != null ? Number(wallet.balancePlafond) : null,
        };
    }
    async deletePrestataireDocument(prestataireId, documentId) {
        const existing = await this.prisma.prestataireDocument.findFirst({
            where: { id: documentId, prestataireId },
            select: { id: true },
        });
        if (!existing) {
            throw new common_1.BadRequestException('Document introuvable pour ce prestataire');
        }
        await this.prisma.prestataireDocument.delete({ where: { id: existing.id } });
        return { success: true };
    }
    async validatePrestataireDocument(prestataireId, documentId, admin) {
        const existing = await this.prisma.prestataireDocument.findFirst({
            where: { id: documentId, prestataireId },
            select: { id: true, prestataireId: true },
        });
        if (!existing) {
            throw new common_1.BadRequestException('Document introuvable pour ce prestataire');
        }
        const now = new Date();
        await this.prisma.prestataireDocument.update({
            where: { id: existing.id },
            data: {
                statut: client_js_1.StatutDocument.VALIDE,
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
                    statut: client_js_1.StatutDocument.VALIDE,
                    typeDocument: { actif: true, obligatoire: true },
                },
            }),
        ]);
        const nextStatus = requiredTypesCount > 0 && validatedRequiredDocsCount >= requiredTypesCount
            ? client_js_1.StatutVerificationPrestataire.VERIFIE
            : client_js_1.StatutVerificationPrestataire.EN_ATTENTE;
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
    async rejectPrestataireDocument(prestataireId, documentId, body) {
        const motif = (body?.motif ?? '').trim();
        if (motif.length < 3) {
            throw new common_1.BadRequestException('Merci d’indiquer un motif de refus (au moins 3 caractères).');
        }
        const existing = await this.prisma.prestataireDocument.findFirst({
            where: { id: documentId, prestataireId },
            select: { id: true },
        });
        if (!existing) {
            throw new common_1.BadRequestException('Document introuvable pour ce prestataire');
        }
        await this.prisma.prestataireDocument.update({
            where: { id: existing.id },
            data: {
                statut: client_js_1.StatutDocument.REFUSE,
                motifRefus: motif,
                validePar: null,
                valideAt: null,
            },
        });
        await this.prisma.prestataire.update({
            where: { id: prestataireId },
            data: { statutVerification: client_js_1.StatutVerificationPrestataire.REFUSE },
        });
        return {
            ok: true,
            documentId: existing.id,
            prestataireId,
            statutVerification: client_js_1.StatutVerificationPrestataire.REFUSE,
        };
    }
    async getDemandesMilleServices(limit, offset, statutFilter) {
        const take = Math.min(Math.max(Number(limit ?? 20), 1), 100);
        const skip = Math.max(Number(offset ?? 0), 0);
        const allowed = new Set(Object.values(client_js_1.StatutPrestation));
        const listWhere = statutFilter && allowed.has(statutFilter)
            ? { statut: statutFilter }
            : {};
        const [total, enAttente, acceptee, enCours, terminee, payee, refusee, annulee, filteredTotal, rows,] = await Promise.all([
            this.prisma.prestation.count(),
            this.prisma.prestation.count({
                where: { statut: client_js_1.StatutPrestation.EN_ATTENTE },
            }),
            this.prisma.prestation.count({
                where: { statut: client_js_1.StatutPrestation.ACCEPTEE },
            }),
            this.prisma.prestation.count({
                where: { statut: client_js_1.StatutPrestation.EN_COURS },
            }),
            this.prisma.prestation.count({
                where: { statut: client_js_1.StatutPrestation.TERMINEE },
            }),
            this.prisma.prestation.count({
                where: { statut: client_js_1.StatutPrestation.PAYEE },
            }),
            this.prisma.prestation.count({
                where: { statut: client_js_1.StatutPrestation.REFUSEE },
            }),
            this.prisma.prestation.count({
                where: { statut: client_js_1.StatutPrestation.ANNULEE },
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
                budget: r.budget != null ? Number(r.budget) : null,
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
    async createService(body) {
        const libelle = body?.libelle?.trim();
        if (!libelle) {
            throw new common_1.BadRequestException('Libellé requis');
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
    async updateService(serviceId, body) {
        const existing = await this.prisma.service.findUnique({
            where: { id: serviceId },
            select: { id: true },
        });
        if (!existing) {
            throw new common_1.BadRequestException('Métier introuvable');
        }
        if (body.actif === false) {
            const rattaches = await this.prisma.prestataireService.count({
                where: { serviceId },
            });
            if (rattaches > 0) {
                throw new common_1.BadRequestException(`Impossible de désactiver ce service : ${rattaches} prestataire(s) encore rattaché(s). Retirez les rattachements avant.`);
            }
        }
        const data = {};
        if (typeof body.actif === 'boolean') {
            data.actif = body.actif;
        }
        if (body.libelle !== undefined) {
            const libelle = body.libelle.trim();
            if (!libelle) {
                throw new common_1.BadRequestException('Libellé invalide');
            }
            data.libelle = libelle;
            const base = this.slugifyServiceLabel(libelle);
            data.slug = await this.ensureUniqueServiceSlug(base, serviceId);
        }
        if (Object.keys(data).length === 0) {
            throw new common_1.BadRequestException('Aucune modification');
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
    slugifyServiceLabel(input) {
        const s = input
            .normalize('NFD')
            .replace(/\p{M}/gu, '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
        return s || 'service';
    }
    async ensureUniqueServiceSlug(base, excludeServiceId) {
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
    async getPrestatairesByService(serviceId) {
        const service = await this.prisma.service.findUnique({
            where: { id: serviceId },
            select: { id: true, libelle: true },
        });
        if (!service) {
            throw new common_1.BadRequestException('Métier (service) introuvable');
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
    async deleteService(serviceId) {
        const count = await this.prisma.prestataireService.count({
            where: { serviceId },
        });
        if (count > 0) {
            throw new common_1.BadRequestException('Impossible de supprimer : des prestataires sont encore inscrits à ce métier.');
        }
        await this.prisma.service.delete({ where: { id: serviceId } });
        return { ok: true, id: serviceId };
    }
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
    async createOffre(body) {
        const libelle = (body?.libelle ?? '').trim();
        if (!libelle)
            throw new common_1.BadRequestException('Libellé requis');
        const prix = Number(body?.prix);
        if (!Number.isFinite(prix) || prix < 0) {
            throw new common_1.BadRequestException('Prix invalide');
        }
        const dureeMois = Number(body?.dureeMois);
        if (!Number.isInteger(dureeMois) || dureeMois <= 0) {
            throw new common_1.BadRequestException('Durée (mois) invalide');
        }
        const ordreRaw = body?.ordre;
        const ordre = ordreRaw == null ? 0 : Number.isFinite(Number(ordreRaw)) ? Number(ordreRaw) : 0;
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
    async updateOffre(offreId, body) {
        const existing = await this.prisma.offre.findUnique({
            where: { id: offreId },
            select: { id: true, code: true, libelle: true, description: true, prix: true, dureeMois: true, ordre: true, actif: true },
        });
        if (!existing)
            throw new common_1.BadRequestException('Offre introuvable');
        const data = {};
        if (typeof body?.actif === 'boolean')
            data.actif = body.actif;
        if (body.code !== undefined) {
            const rawCode = body.code.trim();
            const base = rawCode || this.slugifyServiceLabel(body.libelle?.trim() || existing.libelle);
            data.code = await this.ensureUniqueOffreCode(base, existing.id);
        }
        if (body.libelle !== undefined) {
            const libelle = body.libelle.trim();
            if (!libelle)
                throw new common_1.BadRequestException('Libellé requis');
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
            if (!Number.isFinite(prix) || prix < 0)
                throw new common_1.BadRequestException('Prix invalide');
            data.prix = prix;
        }
        if (body.dureeMois !== undefined) {
            const dureeMois = Number(body.dureeMois);
            if (!Number.isInteger(dureeMois) || dureeMois <= 0) {
                throw new common_1.BadRequestException('Durée (mois) invalide');
            }
            data.dureeMois = dureeMois;
        }
        if (body.ordre !== undefined) {
            const ordre = Number(body.ordre);
            if (!Number.isFinite(ordre))
                throw new common_1.BadRequestException('Ordre invalide');
            data.ordre = ordre;
        }
        if (Object.keys(data).length === 0) {
            throw new common_1.BadRequestException('Aucune modification');
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
    async ensureUniqueOffreCode(base, excludeOffreId) {
        let code = base;
        let n = 0;
        while (true) {
            const row = await this.prisma.offre.findUnique({
                where: { code },
                select: { id: true },
            });
            if (!row || row.id === excludeOffreId)
                return code;
            n += 1;
            code = `${base}-${n}`;
        }
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getStats", null);
__decorate([
    (0, common_1.Post)('notifications/general'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createGeneralNotification", null);
__decorate([
    (0, common_1.Post)('notifications/targeted'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createTargetedNotification", null);
__decorate([
    (0, common_1.Get)('notifications'),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, common_1.Query)('offset')),
    __param(2, (0, common_1.Query)('audience')),
    __param(3, (0, common_1.Query)('unreadOnly')),
    __param(4, (0, common_1.Query)('type')),
    __param(5, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "listAdminNotifications", null);
__decorate([
    (0, common_1.Get)('evolution'),
    __param(0, (0, common_1.Query)('months')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getEvolution", null);
__decorate([
    (0, common_1.Get)('wallet/summary'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getWalletSummary", null);
__decorate([
    (0, common_1.Get)('wallet/withdrawal-requests'),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "listWithdrawalRequests", null);
__decorate([
    (0, common_1.Patch)('wallet/withdrawal-requests/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "decisionWithdrawalRequest", null);
__decorate([
    (0, common_1.Get)('transactions'),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getTransactions", null);
__decorate([
    (0, common_1.Get)('clients'),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, common_1.Query)('offset')),
    __param(2, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getClients", null);
__decorate([
    (0, common_1.Get)('clients/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getClientDetails", null);
__decorate([
    (0, common_1.Patch)('clients/:id/statut'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "setClientActif", null);
__decorate([
    (0, common_1.Delete)('clients/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteClient", null);
__decorate([
    (0, common_1.Get)('prestataires'),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getPrestataires", null);
__decorate([
    (0, common_1.Patch)('prestataires/:id/actif'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "setPrestataireActif", null);
__decorate([
    (0, common_1.Get)('prestataires/:id/transactions'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getPrestatairePaiementsParticuliers", null);
__decorate([
    (0, common_1.Get)('prestataires/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getPrestataireDetails", null);
__decorate([
    (0, common_1.Patch)('prestataires/:id/wallet/statut'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "patchPrestataireWalletStatut", null);
__decorate([
    (0, common_1.Patch)('prestataires/:id/wallet/plafond'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "patchPrestataireWalletPlafond", null);
__decorate([
    (0, common_1.Delete)('prestataires/:prestataireId/documents/:documentId'),
    __param(0, (0, common_1.Param)('prestataireId')),
    __param(1, (0, common_1.Param)('documentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deletePrestataireDocument", null);
__decorate([
    (0, common_1.Patch)('prestataires/:prestataireId/documents/:documentId/validate'),
    __param(0, (0, common_1.Param)('prestataireId')),
    __param(1, (0, common_1.Param)('documentId')),
    __param(2, (0, current_user_decorator_js_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "validatePrestataireDocument", null);
__decorate([
    (0, common_1.Patch)('prestataires/:prestataireId/documents/:documentId/reject'),
    __param(0, (0, common_1.Param)('prestataireId')),
    __param(1, (0, common_1.Param)('documentId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "rejectPrestataireDocument", null);
__decorate([
    (0, common_1.Get)('demandes-mille-services'),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, common_1.Query)('offset')),
    __param(2, (0, common_1.Query)('statut')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getDemandesMilleServices", null);
__decorate([
    (0, common_1.Get)('services'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getServicesForAdmin", null);
__decorate([
    (0, common_1.Post)('services'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createService", null);
__decorate([
    (0, common_1.Patch)('services/:serviceId'),
    __param(0, (0, common_1.Param)('serviceId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateService", null);
__decorate([
    (0, common_1.Get)('services/:serviceId/prestataires'),
    __param(0, (0, common_1.Param)('serviceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getPrestatairesByService", null);
__decorate([
    (0, common_1.Delete)('services/:serviceId'),
    __param(0, (0, common_1.Param)('serviceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteService", null);
__decorate([
    (0, common_1.Get)('offres'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getOffresForAdmin", null);
__decorate([
    (0, common_1.Post)('offres'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createOffre", null);
__decorate([
    (0, common_1.Patch)('offres/:offreId'),
    __param(0, (0, common_1.Param)('offreId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateOffre", null);
exports.AdminController = AdminController = AdminController_1 = __decorate([
    (0, common_1.Controller)('admin'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('ADMIN'),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService,
        notifications_service_js_1.NotificationsService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map