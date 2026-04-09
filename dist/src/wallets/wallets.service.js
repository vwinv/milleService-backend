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
exports.WalletsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../prisma/prisma.service.js");
const client_js_1 = require("../../generated/prisma/client.js");
const prestation_billing_util_js_1 = require("../prestations/prestation-billing.util.js");
let WalletsService = class WalletsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    _commissionRate() {
        const raw = process.env.WALLET_COMMISSION_RATE;
        if (!raw)
            return 0.35;
        const n = Number(raw);
        if (Number.isNaN(n) || n < 0 || n > 1)
            return 0.35;
        return n;
    }
    get commissionRate() {
        return this._commissionRate();
    }
    async ensureGeneralWallet(tx) {
        const client = tx ?? this.prisma;
        const existing = await client.wallet.findFirst({
            where: { type: client_js_1.WalletType.GENERAL },
        });
        if (existing)
            return existing;
        return client.wallet.create({
            data: { type: client_js_1.WalletType.GENERAL },
        });
    }
    async ensurePrestataireWallet(prestataireId, tx) {
        const client = tx ?? this.prisma;
        const existing = await client.wallet.findUnique({
            where: { prestataireId },
        });
        if (existing)
            return existing;
        return client.wallet.create({
            data: { type: client_js_1.WalletType.PRESTATAIRE, prestataireId },
        });
    }
    async creditWallet(params) {
        const client = params.tx ?? this.prisma;
        const amount = Number(params.amount);
        if (!(amount > 0) || Number.isNaN(amount)) {
            throw new common_1.BadRequestException("Montant de crédit invalide");
        }
        const walletBefore = await client.wallet.findUnique({
            where: { id: params.walletId },
            select: { balance: true, balancePlafond: true },
        });
        if (!walletBefore) {
            throw new common_1.BadRequestException("Wallet introuvable");
        }
        const balance = Number(walletBefore.balance);
        const plafond = walletBefore.balancePlafond != null
            ? Number(walletBefore.balancePlafond)
            : null;
        const nextBalance = Math.round((balance + amount) * 100) / 100;
        if (plafond != null && !Number.isNaN(plafond) && nextBalance > plafond) {
            throw new common_1.BadRequestException(`Le solde du wallet ne peut pas dépasser ${plafond} FCFA (solde maximal / plafond).`);
        }
        await client.wallet.update({
            where: { id: params.walletId },
            data: {
                balance: { increment: amount },
            },
        });
        return client.walletTransaction.create({
            data: {
                walletId: params.walletId,
                type: params.type,
                amount,
                prestationId: params.prestationId,
                abonnementId: params.abonnementId,
                offreId: params.offreId,
                createdByUserId: params.createdByUserId,
                meta: params.meta,
            },
        });
    }
    splitPrestationAmount(gross, opts) {
        const rate = this.commissionRate;
        let fee;
        if (opts != null &&
            Number.isFinite(opts.baseWorkFcfa) &&
            Number.isFinite(opts.serviceFeeFcfa)) {
            fee = (0, prestation_billing_util_js_1.computePlatformTakePrestationFcfa)(opts.baseWorkFcfa, opts.serviceFeeFcfa, rate);
        }
        else {
            const baseWork = Math.max(0, gross - prestation_billing_util_js_1.PRESTATION_TRAVEL_FEE_FCFA - prestation_billing_util_js_1.PRESTATION_SERVICE_FEE_FCFA);
            fee = (0, prestation_billing_util_js_1.computePlatformTakePrestationFcfa)(baseWork, prestation_billing_util_js_1.PRESTATION_SERVICE_FEE_FCFA, rate);
        }
        if (fee > gross) {
            fee = Math.round(gross * 100) / 100;
        }
        const net = Math.round((gross - fee) * 100) / 100;
        return { gross, fee, net, rate };
    }
    async debitGeneralWallet(params) {
        const client = params.tx ?? this.prisma;
        const amount = Math.round(Number(params.amount) * 100) / 100;
        if (!(amount > 0) || Number.isNaN(amount)) {
            throw new common_1.BadRequestException("Montant de retrait invalide");
        }
        const general = await this.ensureGeneralWallet(client);
        const walletRow = await client.wallet.findUnique({
            where: { id: general.id },
            select: { balance: true },
        });
        if (!walletRow) {
            throw new common_1.BadRequestException("Wallet général introuvable");
        }
        const bal = Number(walletRow.balance);
        if (amount > bal) {
            throw new common_1.BadRequestException("Solde Mille Services insuffisant");
        }
        await client.wallet.update({
            where: { id: general.id },
            data: { balance: { decrement: amount } },
        });
        return client.walletTransaction.create({
            data: {
                walletId: general.id,
                type: client_js_1.TransactionType.RETRAIT_PLATEFORME,
                amount,
                meta: (params.meta ?? {}),
                createdByUserId: params.createdByUserId ?? null,
            },
        });
    }
};
exports.WalletsService = WalletsService;
exports.WalletsService = WalletsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], WalletsService);
//# sourceMappingURL=wallets.service.js.map