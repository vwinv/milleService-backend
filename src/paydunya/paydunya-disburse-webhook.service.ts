import { Injectable, Logger } from "@nestjs/common";
import { Prisma } from "../../generated/prisma/client.js";
import { PrismaService } from "../prisma/prisma.service.js";
import { WithdrawalStatus } from "../../generated/prisma/client.js";
import { metaWithdrawalAmount } from "../wallets/withdrawal-meta.util.js";

function strVal(v: unknown): string {
  if (v == null) return "";
  if (typeof v === "string") return v;
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  return "";
}

/**
 * IPN PayDunya déboursement : finalise une demande de retrait restée « en attente »
 * après un submit `pending`, lorsque l’opérateur confirme le succès.
 */
@Injectable()
export class PaydunyaDisburseWebhookService {
  private readonly logger = new Logger(PaydunyaDisburseWebhookService.name);

  constructor(private readonly prisma: PrismaService) {}

  async handleCallback(body: Record<string, unknown>): Promise<{ ok: boolean }> {
    const status = strVal(body["status"]).toLowerCase();
    if (status !== "success") {
      this.logger.verbose(
        `IPN disburse ignoré (status=${status || "∅"})`,
      );
      return { ok: true };
    }

    const token = strVal(body["token"]).trim();
    if (!token) {
      this.logger.warn("IPN disburse sans token");
      return { ok: true };
    }

    const candidates = await this.prisma.withdrawalRequest.findMany({
      where: { status: WithdrawalStatus.EN_ATTENTE },
      select: {
        id: true,
        prestataireId: true,
        meta: true,
      },
    });
    const row = candidates.find((c) => {
      const m = c.meta;
      if (!m || typeof m !== "object" || Array.isArray(m)) return false;
      return (m as Record<string, unknown>)["paydunyaDisburseToken"] === token;
    });

    if (!row) {
      this.logger.verbose(
        `IPN disburse : aucune demande EN_ATTENTE pour token=${token.slice(0, 6)}…`,
      );
      return { ok: true };
    }

    const amount = metaWithdrawalAmount(row.meta);
    const wallet = await this.prisma.wallet.findUnique({
      where: { prestataireId: row.prestataireId },
      select: { id: true, balance: true },
    });
    if (!wallet) {
      this.logger.error(
        `IPN disburse : wallet introuvable prestataire=${row.prestataireId}`,
      );
      return { ok: true };
    }
    if (amount != null && amount > 0) {
      const bal = Number(wallet.balance);
      if (amount > bal) {
        this.logger.error(
          `IPN disburse : solde insuffisant demande=${row.id} amount=${String(amount)}`,
        );
        return { ok: true };
      }
    }

    const prevMeta =
      row.meta && typeof row.meta === "object" && !Array.isArray(row.meta)
        ? { ...(row.meta as Record<string, unknown>) }
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
          status: WithdrawalStatus.TRAITE,
          meta: prevMeta as Prisma.InputJsonValue,
        },
      }),
    ]);

    this.logger.log(`IPN disburse : demande ${row.id} finalisée (TRAITE)`);
    return { ok: true };
  }
}
