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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrestationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../prisma/prisma.service.js");
const client_js_1 = require("../../generated/prisma/client.js");
const notifications_service_js_1 = require("../notifications/notifications.service.js");
const wallets_service_js_1 = require("../wallets/wallets.service.js");
let PrestationsService = class PrestationsService {
    prisma;
    notifications;
    wallets;
    constructor(prisma, notifications, wallets) {
        this.prisma = prisma;
        this.notifications = notifications;
        this.wallets = wallets;
    }
    async create(particulierUserId, dto) {
        const particulier = await this.prisma.particulier.findUnique({
            where: { userId: particulierUserId },
            select: { id: true, prenom: true, nom: true },
        });
        if (!particulier) {
            throw new common_1.BadRequestException('Profil particulier introuvable');
        }
        const prestataire = await this.prisma.prestataire.findUnique({
            where: { id: dto.prestataireId },
            include: { user: { select: { id: true } } },
        });
        if (!prestataire) {
            throw new common_1.BadRequestException('Prestataire introuvable');
        }
        if (!prestataire.actif) {
            throw new common_1.BadRequestException('Ce prestataire n\'est plus actif');
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
            throw new common_1.BadRequestException('Service introuvable ou inactif pour ce prestataire');
        }
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
                statut: client_js_1.StatutPrestation.EN_ATTENTE,
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
    async accepter(prestataireUserId, prestationId) {
        const prestataire = await this.prisma.prestataire.findUnique({
            where: { userId: prestataireUserId },
            select: { id: true },
        });
        if (!prestataire) {
            throw new common_1.BadRequestException('Profil prestataire introuvable');
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
            throw new common_1.BadRequestException('Prestation introuvable');
        }
        if (prestation.statut !== client_js_1.StatutPrestation.EN_ATTENTE) {
            throw new common_1.BadRequestException('Cette prestation n\'est plus en attente d\'acceptation');
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
            title: 'Prestation acceptée',
            body: `${updated.prestataire.nom} a accepté votre demande (${updated.prestataireService.service.libelle}).`,
            type: 'prestation_accepted',
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
            throw new common_1.BadRequestException('Profil prestataire introuvable');
        }
        const prestation = await this.prisma.prestation.findFirst({
            where: { id: prestationId, prestataireId: prestataire.id },
        });
        if (!prestation) {
            throw new common_1.BadRequestException('Prestation introuvable');
        }
        if (prestation.statut !== client_js_1.StatutPrestation.ACCEPTEE) {
            throw new common_1.BadRequestException('Seule une prestation acceptée peut être démarrée');
        }
        const updated = await this.prisma.prestation.update({
            where: { id: prestationId },
            data: { statut: client_js_1.StatutPrestation.EN_COURS },
        });
        return this.formatPrestation(updated);
    }
    async refuser(prestataireUserId, prestationId) {
        const prestataire = await this.prisma.prestataire.findUnique({
            where: { userId: prestataireUserId },
            select: { id: true },
        });
        if (!prestataire) {
            throw new common_1.BadRequestException('Profil prestataire introuvable');
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
            throw new common_1.BadRequestException('Prestation introuvable');
        }
        if (prestation.statut !== client_js_1.StatutPrestation.EN_ATTENTE) {
            throw new common_1.BadRequestException('Cette prestation n\'est plus en attente d\'acceptation');
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
            title: 'Prestation refusée',
            body: `${updated.prestataire.nom} a refusé votre demande (${updated.prestataireService.service.libelle}).`,
            type: 'prestation_refused',
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
            throw new common_1.BadRequestException('Profil prestataire introuvable');
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
            throw new common_1.BadRequestException('Prestation introuvable');
        }
        if (prestation.statut !== client_js_1.StatutPrestation.EN_COURS && prestation.statut !== client_js_1.StatutPrestation.ACCEPTEE) {
            throw new common_1.BadRequestException('Seule une prestation acceptée/en cours peut être terminée');
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
            title: 'Prestation terminée',
            body: `${updated.prestataire.nom} a terminé la prestation. Vous pouvez procéder au paiement.`,
            type: 'prestation_completed',
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
            throw new common_1.BadRequestException('Profil particulier introuvable');
        }
        const prestation = await this.prisma.prestation.findFirst({
            where: { id: prestationId, particulierId: particulier.id },
            include: {
                prestataire: { include: { user: { select: { id: true } } } },
                prestataireService: { include: { service: true } },
            },
        });
        if (!prestation) {
            throw new common_1.BadRequestException('Prestation introuvable');
        }
        if (prestation.statut !== client_js_1.StatutPrestation.TERMINEE) {
            throw new common_1.BadRequestException('Seule une prestation terminée peut être payée');
        }
        const fromBody = dto?.montant != null && !Number.isNaN(Number(dto.montant))
            ? Number(dto.montant)
            : null;
        const rawAmount = fromBody != null && fromBody > 0
            ? fromBody
            : prestation.budget != null
                ? Number(prestation.budget)
                : prestation.prestataireService?.tarifHoraire != null
                    ? Number(prestation.prestataireService.tarifHoraire)
                    : null;
        if (rawAmount == null || Number.isNaN(rawAmount) || rawAmount <= 0) {
            throw new common_1.BadRequestException('Montant de la prestation introuvable');
        }
        const split = this.wallets.splitPrestationAmount(rawAmount);
        const updated = await this.prisma.$transaction(async (tx) => {
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
                meta: { gross: split.gross, fee: split.fee, rate: split.rate },
            });
            await this.wallets.creditWallet({
                tx,
                walletId: generalWallet.id,
                amount: split.fee,
                type: client_js_1.TransactionType.PRESTATION,
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
    async listForUser(userId, role) {
        if (role === 'PARTICULIER') {
            const particulier = await this.prisma.particulier.findUnique({
                where: { userId },
                select: { id: true },
            });
            if (!particulier)
                return [];
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
        if (!prestataire)
            return [];
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
            throw new common_1.BadRequestException('Prestation introuvable');
        }
        const isParticulier = role === 'PARTICULIER' && particulier?.id === prestation.particulierId;
        const isPrestataire = role === 'PRESTATAIRE' && prestataire?.id === prestation.prestataireId;
        if (!isParticulier && !isPrestataire) {
            throw new common_1.ForbiddenException('Accès non autorisé à cette prestation');
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
                    tarifHoraire: p.prestataireService.tarifHoraire != null
                        ? Number(p.prestataireService.tarifHoraire)
                        : undefined,
                }
                : undefined,
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
};
exports.PrestationsService = PrestationsService;
exports.PrestationsService = PrestationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService,
        notifications_service_js_1.NotificationsService,
        wallets_service_js_1.WalletsService])
], PrestationsService);
//# sourceMappingURL=prestations.service.js.map