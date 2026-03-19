import { Controller, Get, Post, UseGuards, Query, Body, BadRequestException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { CurrentUser, CurrentUserPayload } from '../auth/decorators/current-user.decorator.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { WalletType } from '../../generated/prisma/client.js';
import { RequestWithdrawalDto } from './dto/request-withdrawal.dto.js';

@Controller('wallets')
@UseGuards(JwtAuthGuard)
export class WalletsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('me')
  @UseGuards(RolesGuard)
  @Roles('PRESTATAIRE')
  async me(@CurrentUser() user: CurrentUserPayload, @Query('limit') limit?: string) {
    const prestataire = await this.prisma.prestataire.findUnique({
      where: { userId: user.userId },
      select: { id: true },
    });
    if (!prestataire) return { wallet: null, transactions: [] };

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

  @Get('general')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  async general(@Query('limit') limit?: string) {
    const wallet = await this.prisma.wallet.findUnique({
      where: { type: WalletType.GENERAL },
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

  @Post('withdrawals/request')
  @UseGuards(RolesGuard)
  @Roles('PRESTATAIRE')
  async requestWithdrawal(
    @CurrentUser() user: CurrentUserPayload,
    @Body() dto: RequestWithdrawalDto,
  ) {
    const prestataire = await this.prisma.prestataire.findUnique({
      where: { userId: user.userId },
      select: { id: true },
    });

    if (!prestataire) {
      throw new BadRequestException('Profil prestataire introuvable');
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
}

