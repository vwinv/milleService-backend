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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_js_1 = require("../auth/guards/jwt-auth.guard.js");
const roles_guard_js_1 = require("../auth/guards/roles.guard.js");
const roles_decorator_js_1 = require("../auth/decorators/roles.decorator.js");
const current_user_decorator_js_1 = require("../auth/decorators/current-user.decorator.js");
const prisma_service_js_1 = require("../prisma/prisma.service.js");
const client_js_1 = require("../../generated/prisma/client.js");
const request_withdrawal_dto_js_1 = require("./dto/request-withdrawal.dto.js");
let WalletsController = class WalletsController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async me(user, limit) {
        const prestataire = await this.prisma.prestataire.findUnique({
            where: { userId: user.userId },
            select: { id: true },
        });
        if (!prestataire)
            return { wallet: null, transactions: [] };
        const wallet = await this.prisma.wallet.findUnique({
            where: { prestataireId: prestataire.id },
        });
        const take = Math.min(Math.max(Number(limit ?? 50), 1), 200);
        const transactions = wallet
            ? await this.prisma.walletTransaction.findMany({
                where: { walletId: wallet.id },
                orderBy: { createdAt: 'desc' },
                take,
            })
            : [];
        return {
            wallet: wallet
                ? { ...wallet, balance: Number(wallet.balance) }
                : null,
            transactions: transactions.map((t) => ({ ...t, amount: Number(t.amount) })),
        };
    }
    async general(limit) {
        const wallet = await this.prisma.wallet.findUnique({
            where: { type: client_js_1.WalletType.GENERAL },
        });
        const take = Math.min(Math.max(Number(limit ?? 50), 1), 200);
        const transactions = wallet
            ? await this.prisma.walletTransaction.findMany({
                where: { walletId: wallet.id },
                orderBy: { createdAt: 'desc' },
                take,
            })
            : [];
        return {
            wallet: wallet ? { ...wallet, balance: Number(wallet.balance) } : null,
            transactions: transactions.map((t) => ({ ...t, amount: Number(t.amount) })),
        };
    }
    async requestWithdrawal(user, dto) {
        const prestataire = await this.prisma.prestataire.findUnique({
            where: { userId: user.userId },
            select: { id: true },
        });
        if (!prestataire) {
            throw new common_1.BadRequestException('Profil prestataire introuvable');
        }
        const req = await this.prisma.withdrawalRequest.create({
            data: {
                prestataireId: prestataire.id,
                method: dto.method,
            },
        });
        return {
            success: true,
            data: req,
        };
    }
};
exports.WalletsController = WalletsController;
__decorate([
    (0, common_1.Get)('me'),
    (0, common_1.UseGuards)(roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('PRESTATAIRE'),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WalletsController.prototype, "me", null);
__decorate([
    (0, common_1.Get)('general'),
    (0, common_1.UseGuards)(roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WalletsController.prototype, "general", null);
__decorate([
    (0, common_1.Post)('withdrawals/request'),
    (0, common_1.UseGuards)(roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('PRESTATAIRE'),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, request_withdrawal_dto_js_1.RequestWithdrawalDto]),
    __metadata("design:returntype", Promise)
], WalletsController.prototype, "requestWithdrawal", null);
exports.WalletsController = WalletsController = __decorate([
    (0, common_1.Controller)('wallets'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], WalletsController);
//# sourceMappingURL=wallets.controller.js.map