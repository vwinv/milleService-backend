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
var PaydunyaDisburseWebhookService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaydunyaDisburseWebhookService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../prisma/prisma.service.js");
const client_js_1 = require("../../generated/prisma/client.js");
const withdrawal_meta_util_js_1 = require("../wallets/withdrawal-meta.util.js");
function strVal(v) {
    if (v == null)
        return "";
    if (typeof v === "string")
        return v;
    if (typeof v === "number" || typeof v === "boolean")
        return String(v);
    return "";
}
let PaydunyaDisburseWebhookService = PaydunyaDisburseWebhookService_1 = class PaydunyaDisburseWebhookService {
    prisma;
    logger = new common_1.Logger(PaydunyaDisburseWebhookService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async handleCallback(body) {
        const status = strVal(body["status"]).toLowerCase();
        if (status !== "success") {
            this.logger.verbose(`IPN disburse ignoré (status=${status || "∅"})`);
            return { ok: true };
        }
        const token = strVal(body["token"]).trim();
        if (!token) {
            this.logger.warn("IPN disburse sans token");
            return { ok: true };
        }
        const candidates = await this.prisma.withdrawalRequest.findMany({
            where: { status: client_js_1.WithdrawalStatus.EN_ATTENTE },
            select: {
                id: true,
                prestataireId: true,
                meta: true,
            },
        });
        const row = candidates.find((c) => {
            const m = c.meta;
            if (!m || typeof m !== "object" || Array.isArray(m))
                return false;
            return m["paydunyaDisburseToken"] === token;
        });
        if (!row) {
            this.logger.verbose(`IPN disburse : aucune demande EN_ATTENTE pour token=${token.slice(0, 6)}…`);
            return { ok: true };
        }
        const amount = (0, withdrawal_meta_util_js_1.metaWithdrawalAmount)(row.meta);
        const wallet = await this.prisma.wallet.findUnique({
            where: { prestataireId: row.prestataireId },
            select: { id: true, balance: true },
        });
        if (!wallet) {
            this.logger.error(`IPN disburse : wallet introuvable prestataire=${row.prestataireId}`);
            return { ok: true };
        }
        if (amount != null && amount > 0) {
            const bal = Number(wallet.balance);
            if (amount > bal) {
                this.logger.error(`IPN disburse : solde insuffisant demande=${row.id} amount=${String(amount)}`);
                return { ok: true };
            }
        }
        const prevMeta = row.meta && typeof row.meta === "object" && !Array.isArray(row.meta)
            ? { ...row.meta }
            : {};
        prevMeta.paydunyaIpnAt = new Date().toISOString();
        prevMeta.paydunyaIpnBody = {
            status: body["status"],
            transaction_id: body["transaction_id"],
            amount: body["amount"],
            withdraw_mode: body["withdraw_mode"],
            disburse_id: body["disburse_id"],
        };
        await this.prisma.$transaction([
            ...(amount != null && amount > 0
                ? [
                    this.prisma.wallet.update({
                        where: { id: wallet.id },
                        data: { balance: { decrement: amount } },
                    }),
                ]
                : []),
            this.prisma.withdrawalRequest.update({
                where: { id: row.id },
                data: {
                    status: client_js_1.WithdrawalStatus.TRAITE,
                    meta: prevMeta,
                },
            }),
        ]);
        this.logger.log(`IPN disburse : demande ${row.id} finalisée (TRAITE)`);
        return { ok: true };
    }
};
exports.PaydunyaDisburseWebhookService = PaydunyaDisburseWebhookService;
exports.PaydunyaDisburseWebhookService = PaydunyaDisburseWebhookService = PaydunyaDisburseWebhookService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], PaydunyaDisburseWebhookService);
//# sourceMappingURL=paydunya-disburse-webhook.service.js.map