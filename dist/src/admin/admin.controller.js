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
const client_js_1 = require("../../generated/prisma/client.js");
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
    logger = new common_1.Logger(AdminController_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getStats() {
        const [clientsActifs, prestatairesActifs, metiersCount, generalWallet] = await Promise.all([
            this.prisma.particulier.count(),
            this.prisma.prestataire.count({ where: { actif: true } }),
            this.prisma.service.count(),
            this.prisma.wallet.findUnique({
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
    async getTransactions(limit) {
        const take = Math.min(Math.max(Number(limit ?? 20), 1), 100);
        const generalWallet = await this.prisma.wallet.findUnique({
            where: { type: client_js_1.WalletType.GENERAL },
            select: { id: true },
        });
        const [paymentRows, withdrawalRows] = await Promise.all([
            generalWallet
                ? this.prisma.walletTransaction.findMany({
                    where: {
                        walletId: generalWallet.id,
                        type: client_js_1.TransactionType.PRESTATION,
                    },
                    take,
                    orderBy: { createdAt: 'desc' },
                    include: {
                        prestation: {
                            select: {
                                prestataire: { select: { nom: true } },
                            },
                        },
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
        const payments = paymentRows.map((row) => ({
            id: row.id,
            date: row.createdAt,
            prestataireNom: row.prestation?.prestataire?.nom ?? 'Prestataire',
            montant: Number(row.amount),
            wallet: 'Wallet Général',
            statut: 'Depot',
            category: 'PAIEMENT_PRESTATION',
        }));
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
        return [...payments, ...withdrawals]
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
    async getClientDetails(particulierId) {
        const p = await this.prisma.particulier.findUnique({
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
        if (!p) {
            throw new common_1.BadRequestException('Client introuvable');
        }
        const [prestationsTotal, prestationsAnnulees] = await Promise.all([
            this.prisma.prestation.count({ where: { particulierId } }),
            this.prisma.prestation.count({
                where: { particulierId, statut: client_js_1.StatutPrestation.ANNULEE },
            }),
        ]);
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
            select: { userId: true },
        });
        if (!p) {
            throw new common_1.BadRequestException('Client introuvable');
        }
        await this.prisma.user.update({
            where: { id: p.userId },
            data: { emailVerified: actif },
        });
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
    async getServicesForAdmin() {
        const rows = await this.prisma.service.findMany({
            orderBy: { libelle: 'asc' },
            select: {
                id: true,
                libelle: true,
                slug: true,
                actif: true,
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
                prestatairesCount: s._count.prestataires,
            })),
        };
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
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('evolution'),
    __param(0, (0, common_1.Query)('months')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getEvolution", null);
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
    (0, common_1.Get)('services'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getServicesForAdmin", null);
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
exports.AdminController = AdminController = AdminController_1 = __decorate([
    (0, common_1.Controller)('admin'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('ADMIN'),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map