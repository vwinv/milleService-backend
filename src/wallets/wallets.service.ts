import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import { TransactionType, WalletType } from "../../generated/prisma/client.js";
import {
  computePlatformTakePrestationFcfa,
  PRESTATION_SERVICE_FEE_FCFA,
  PRESTATION_TRAVEL_FEE_FCFA,
} from "../prestations/prestation-billing.util.js";

type TxClient = PrismaService | Parameters<PrismaService["$transaction"]>[0];

@Injectable()
export class WalletsService {
  constructor(private readonly prisma: PrismaService) {}

  private _commissionRate(): number {
    const raw = process.env.WALLET_COMMISSION_RATE;
    if (!raw) return 0.35;
    const n = Number(raw);
    if (Number.isNaN(n) || n < 0 || n > 1) return 0.35;
    return n;
  }

  get commissionRate() {
    return this._commissionRate();
  }

  async ensureGeneralWallet(tx?: any) {
    const client = tx ?? this.prisma;
    const existing = await client.wallet.findFirst({
      where: { type: WalletType.GENERAL },
    });
    if (existing) return existing;
    return client.wallet.create({
      data: { type: WalletType.GENERAL },
    });
  }

  async ensurePrestataireWallet(prestataireId: string, tx?: any) {
    const client = tx ?? this.prisma;
    const existing = await client.wallet.findUnique({
      where: { prestataireId },
    });
    if (existing) return existing;
    return client.wallet.create({
      data: { type: WalletType.PRESTATAIRE, prestataireId },
    });
  }

  async creditWallet(params: {
    walletId: string;
    amount: number;
    type: TransactionType;
    prestationId?: string;
    abonnementId?: string;
    offreId?: string;
    createdByUserId?: string;
    meta?: any;
    tx?: any;
  }) {
    const client = params.tx ?? this.prisma;
    const amount = Number(params.amount);
    if (!(amount > 0) || Number.isNaN(amount)) {
      throw new BadRequestException("Montant de crédit invalide");
    }
    const walletBefore = await client.wallet.findUnique({
      where: { id: params.walletId },
      select: { balance: true, balancePlafond: true },
    });
    if (!walletBefore) {
      throw new BadRequestException("Wallet introuvable");
    }
    const balance = Number(walletBefore.balance);
    const plafond =
      walletBefore.balancePlafond != null
        ? Number(walletBefore.balancePlafond)
        : null;
    const nextBalance = Math.round((balance + amount) * 100) / 100;
    if (plafond != null && !Number.isNaN(plafond) && nextBalance > plafond) {
      throw new BadRequestException(
        `Le solde du wallet ne peut pas dépasser ${plafond} FCFA (solde maximal / plafond).`,
      );
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

  /**
   * Plateforme : (taux × travail) + frais de service. Prestataire : brut − ce montant
   * (= travail×(1−taux) + déplacement si brut = travail + frais service + déplacement).
   * Sans opts : déduit travail = brut − frais fixes catalogue (répli aligné facturation).
   */
  splitPrestationAmount(
    gross: number,
    opts?: { baseWorkFcfa: number; serviceFeeFcfa: number },
  ) {
    const rate = this.commissionRate;
    let fee: number;
    if (
      opts != null &&
      Number.isFinite(opts.baseWorkFcfa) &&
      Number.isFinite(opts.serviceFeeFcfa)
    ) {
      fee = computePlatformTakePrestationFcfa(
        opts.baseWorkFcfa,
        opts.serviceFeeFcfa,
        rate,
      );
    } else {
      const baseWork = Math.max(
        0,
        gross - PRESTATION_TRAVEL_FEE_FCFA - PRESTATION_SERVICE_FEE_FCFA,
      );
      fee = computePlatformTakePrestationFcfa(
        baseWork,
        PRESTATION_SERVICE_FEE_FCFA,
        rate,
      );
    }
    if (fee > gross) {
      fee = Math.round(gross * 100) / 100;
    }
    const net = Math.round((gross - fee) * 100) / 100;
    return { gross, fee, net, rate };
  }

  /** Débit du wallet général (retrait opérateur). Enregistre une écriture `RETRAIT_PLATEFORME`. */
  async debitGeneralWallet(params: {
    amount: number;
    meta?: Record<string, unknown>;
    createdByUserId?: string;
    tx?: any;
  }) {
    const client = params.tx ?? this.prisma;
    const amount = Math.round(Number(params.amount) * 100) / 100;
    if (!(amount > 0) || Number.isNaN(amount)) {
      throw new BadRequestException("Montant de retrait invalide");
    }
    const general = await this.ensureGeneralWallet(client);
    const walletRow = await client.wallet.findUnique({
      where: { id: general.id },
      select: { balance: true },
    });
    if (!walletRow) {
      throw new BadRequestException("Wallet général introuvable");
    }
    const bal = Number(walletRow.balance);
    if (amount > bal) {
      throw new BadRequestException("Solde Mille Services insuffisant");
    }
    await client.wallet.update({
      where: { id: general.id },
      data: { balance: { decrement: amount } },
    });
    return client.walletTransaction.create({
      data: {
        walletId: general.id,
        type: TransactionType.RETRAIT_PLATEFORME,
        amount,
        meta: (params.meta ?? {}) as object,
        createdByUserId: params.createdByUserId ?? null,
      },
    });
  }
}
