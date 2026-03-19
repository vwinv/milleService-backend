import { PrismaService } from '../prisma/prisma.service.js';
import { TransactionType } from '../../generated/prisma/client.js';
export declare class WalletsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private _commissionRate;
    get commissionRate(): number;
    ensureGeneralWallet(tx?: any): Promise<any>;
    ensurePrestataireWallet(prestataireId: string, tx?: any): Promise<any>;
    creditWallet(params: {
        walletId: string;
        amount: number;
        type: TransactionType;
        prestationId?: string;
        abonnementId?: string;
        offreId?: string;
        createdByUserId?: string;
        meta?: any;
        tx?: any;
    }): Promise<any>;
    splitPrestationAmount(gross: number): {
        gross: number;
        fee: number;
        net: number;
        rate: number;
    };
}
