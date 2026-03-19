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
exports.AbonnementsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../prisma/prisma.service.js");
const client_js_1 = require("../../generated/prisma/client.js");
const wallets_service_js_1 = require("../wallets/wallets.service.js");
let AbonnementsService = class AbonnementsService {
    prisma;
    wallets;
    constructor(prisma, wallets) {
        this.prisma = prisma;
        this.wallets = wallets;
    }
    async getOffres() {
        const offres = await this.prisma.offre.findMany({
            where: { actif: true },
            orderBy: [
                { ordre: 'asc' },
                { prix: 'asc' },
            ],
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
            throw new common_1.BadRequestException('Profil prestataire introuvable');
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
            orderBy: { dateFin: 'desc' },
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
    async souscrire(userId, offreId) {
        const prestataire = await this.prisma.prestataire.findUnique({
            where: { userId },
            select: { id: true },
        });
        if (!prestataire) {
            throw new common_1.BadRequestException('Profil prestataire introuvable');
        }
        const offre = await this.prisma.offre.findUnique({
            where: { id: offreId, actif: true },
        });
        if (!offre) {
            throw new common_1.BadRequestException('Offre introuvable ou inactive');
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
                meta: { prestataireId: prestataire.id },
            });
            return created;
        });
        return this.getAbonnementCourant(userId);
    }
};
exports.AbonnementsService = AbonnementsService;
exports.AbonnementsService = AbonnementsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService,
        wallets_service_js_1.WalletsService])
], AbonnementsService);
//# sourceMappingURL=abonnements.service.js.map