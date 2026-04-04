import { PrismaService } from '../prisma/prisma.service.js';
import { StatutAbonnement } from '../../generated/prisma/client.js';
import { WalletsService } from '../wallets/wallets.service.js';
export declare class AbonnementsService {
    private readonly prisma;
    private readonly wallets;
    constructor(prisma: PrismaService, wallets: WalletsService);
    getOffres(): Promise<{
        prix: number;
        id: string;
        libelle: string;
        description: string | null;
        code: string;
        dureeMois: number;
        ordre: number;
    }[]>;
    getAbonnementCourant(userId: string): Promise<{
        id: string;
        dateDebut: Date;
        dateFin: Date;
        statut: StatutAbonnement;
        offre: {
            prix: number;
            id: string;
            libelle: string;
            code: string;
            dureeMois: number;
        };
    } | null>;
    souscrire(userId: string, offreId: string): Promise<{
        id: string;
        dateDebut: Date;
        dateFin: Date;
        statut: StatutAbonnement;
        offre: {
            prix: number;
            id: string;
            libelle: string;
            code: string;
            dureeMois: number;
        };
    } | null>;
}
