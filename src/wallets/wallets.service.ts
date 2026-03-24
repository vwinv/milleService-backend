import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { TransactionType, WalletType } from '../../generated/prisma/client.js';

type TxClient = PrismaService | Parameters<PrismaService['$transaction']>[0];

@Injectable()
export class WalletsService {
  constructor(private readonly prisma: PrismaService) {}

  private _commissionRate(): number {
    const raw = process.env.WALLET_COMMISSION_RATE;
    if (!raw) return 0.1;
    const n = Number(raw);
    if (Number.isNaN(n) || n < 0 || n > 1) return 0.1;
    return n;
  }

  get commissionRate() {
    return this._commissionRate();
  }

  async ensureGeneralWallet(tx?: any) {
    const client = tx ?? this.prisma;
    const existing = await client.wallet.findUnique({
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
      throw new BadRequestException('Montant de crédit invalide');
    }
    const walletBefore = await client.wallet.findUnique({
      where: { id: params.walletId },
      select: { balance: true, balancePlafond: true },
    });
    if (!walletBefore) {
      throw new BadRequestException('Wallet introuvable');
    }
    const balance = Number(walletBefore.balance);
    const plafond =
      walletBefore.balancePlafond != null ? Number(walletBefore.balancePlafond) : null;
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

  splitPrestationAmount(gross: number) {
    const rate = this.commissionRate;
    const feeRaw = gross * rate;
    const fee = Math.round(feeRaw * 100) / 100;
    const net = Math.round((gross - fee) * 100) / 100;
    return { gross, fee, net, rate };
  }
}

