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
let WalletsService = class WalletsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    _commissionRate() {
        const raw = process.env.WALLET_COMMISSION_RATE;
        if (!raw)
            return 0.1;
        const n = Number(raw);
        if (Number.isNaN(n) || n < 0 || n > 1)
            return 0.1;
        return n;
    }
    get commissionRate() {
        return this._commissionRate();
    }
    async ensureGeneralWallet(tx) {
        const client = tx ?? this.prisma;
        const existing = await client.wallet.findUnique({
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
    splitPrestationAmount(gross) {
        const rate = this.commissionRate;
        const feeRaw = gross * rate;
        const fee = Math.round(feeRaw * 100) / 100;
        const net = Math.round((gross - fee) * 100) / 100;
        return { gross, fee, net, rate };
    }
};
exports.WalletsService = WalletsService;
exports.WalletsService = WalletsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], WalletsService);
//# sourceMappingURL=wallets.service.js.map