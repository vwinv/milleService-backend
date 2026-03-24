import { CurrentUserPayload } from '../auth/decorators/current-user.decorator.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { WalletType } from '../../generated/prisma/client.js';
import { RequestWithdrawalDto } from './dto/request-withdrawal.dto.js';
export declare class WalletsController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    me(user: CurrentUserPayload, limit?: string): Promise<{
        wallet: {
            balance: number;
            balancePlafond: number | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            prestataireId: string | null;
            type: WalletType;
            statutPrestataire: import("../../generated/prisma/enums.js").PrestataireWalletStatut;
        } | null;
        transactions: {
            amount: number;
            id: string;
            createdAt: Date;
            offreId: string | null;
            type: import("../../generated/prisma/enums.js").TransactionType;
            walletId: string;
            prestationId: string | null;
            abonnementId: string | null;
            meta: import("@prisma/client/runtime/client.js").JsonValue | null;
            createdByUserId: string | null;
        }[];
    }>;
    general(limit?: string): Promise<{
        wallet: {
            balance: number;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            prestataireId: string | null;
            type: WalletType;
            balancePlafond: import("@prisma/client-runtime-utils").Decimal | null;
            statutPrestataire: import("../../generated/prisma/enums.js").PrestataireWalletStatut;
        } | null;
        transactions: {
            amount: number;
            id: string;
            createdAt: Date;
            offreId: string | null;
            type: import("../../generated/prisma/enums.js").TransactionType;
            walletId: string;
            prestationId: string | null;
            abonnementId: string | null;
            meta: import("@prisma/client/runtime/client.js").JsonValue | null;
            createdByUserId: string | null;
        }[];
    }>;
    requestWithdrawal(user: CurrentUserPayload, dto: RequestWithdrawalDto): Promise<{
        success: boolean;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            prestataireId: string;
            method: import("../../generated/prisma/enums.js").WithdrawalMethod;
            meta: import("@prisma/client/runtime/client.js").JsonValue | null;
            status: import("../../generated/prisma/enums.js").WithdrawalStatus;
        };
    }>;
}
