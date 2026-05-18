import { PrismaService } from "../prisma/prisma.service.js";
import { StatutAbonnement } from "../../generated/prisma/client.js";
import { WalletsService } from "../wallets/wallets.service.js";
import { PaydunyaService } from "../paydunya/paydunya.service.js";
import type { SoftPayAbonnementDto } from "./dto/softpay-abonnement.dto.js";
export declare class AbonnementsService {
    private readonly prisma;
    private readonly wallets;
    private readonly paydunya;
    private readonly logger;
    constructor(prisma: PrismaService, wallets: WalletsService, paydunya: PaydunyaService);
    getOffres(): Promise<{
        prix: number;
        id: string;
        code: string;
        libelle: string;
        description: string | null;
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
            code: string;
            libelle: string;
            dureeMois: number;
        };
    } | null>;
    isPaydunyaInvoicePaidForPrestataire(userId: string, invoiceToken: string): Promise<{
        paid: boolean;
        abonnement?: Awaited<ReturnType<typeof this.getAbonnementCourant>>;
    }>;
    souscrire(userId: string, offreId: string): Promise<{
        id: string;
        dateDebut: Date;
        dateFin: Date;
        statut: StatutAbonnement;
        offre: {
            prix: number;
            id: string;
            code: string;
            libelle: string;
            dureeMois: number;
        };
    } | null>;
    initPaydunyaCheckout(userId: string, offreId: string): Promise<{
        amountFcfa: number;
        invoiceToken: string;
        checkoutUrl: string;
        description: string;
    }>;
    softPayAbonnement(userId: string, dto: SoftPayAbonnementDto): Promise<{
        amountFcfa: number;
        invoiceToken: string;
        description: string;
        softPay: {
            url: string | undefined;
            other_url: {
                om_url?: string;
                maxit_url?: string;
            } | undefined;
            return_url: string | undefined;
            message: string | undefined;
            fees: number | undefined;
            currency: string | undefined;
        };
    }>;
    finalizeFromPaydunyaIpn(input: {
        offreId: string;
        prestataireId: string;
        userId: string;
        paidAmount: number;
        invoiceToken: string;
    }): Promise<{
        ok: true;
        alreadyProcessed: true;
        error?: undefined;
    } | {
        ok: false;
        error: "prestataire_mismatch";
        alreadyProcessed?: undefined;
    } | {
        ok: false;
        error: "offre_not_found";
        alreadyProcessed?: undefined;
    } | {
        ok: false;
        error: "amount_mismatch";
        alreadyProcessed?: undefined;
    } | {
        ok: true;
        alreadyProcessed?: undefined;
        error?: undefined;
    }>;
    resolveStatutAffichage(abo: {
        statut: StatutAbonnement;
        dateFin: Date;
    }): "ACTIF" | "EXPIRE" | "ANNULE";
    listForAdmin(params: {
        statut?: "actif" | "expire" | "all";
        search?: string;
        limit?: number;
        offset?: number;
    }): Promise<{
        stats: {
            total: number;
            actifs: number;
            expires: number;
        };
        total: number;
        items: {
            id: string;
            prestataireId: string;
            prestataireNom: string;
            prestataireEmail: string;
            offreId: string;
            offreLibelle: string;
            offreCode: string;
            offrePrix: number;
            dureeMois: number;
            dateDebut: string;
            dateFin: string;
            statut: StatutAbonnement;
            statutAffichage: "ACTIF" | "EXPIRE" | "ANNULE";
            createdAt: string;
        }[];
    }>;
    adminRenouvelerAbonnement(params: {
        prestataireId: string;
        offreId: string;
        adminUserId: string;
        method: "cash" | "wave_sn" | "orange_money_sn";
        telephone?: string;
    }): Promise<{
        paymentStatus: "completed";
        method: "cash";
        id: string;
        prestataireId: string;
        dateDebut: string;
        dateFin: string;
        statut: StatutAbonnement;
        statutAffichage: "ACTIF" | "EXPIRE" | "ANNULE";
        offre: {
            prix: number;
            id: string;
            code: string;
            libelle: string;
            dureeMois: number;
        };
    } | {
        paymentStatus: "pending_payment";
        method: "wave_sn" | "orange_money_sn";
        amountFcfa: number;
        invoiceToken: string;
        checkoutUrl: string;
        message: string;
        softPay: {
            url: string | undefined;
            other_url: {
                om_url?: string;
                maxit_url?: string;
            } | undefined;
            return_url: string | undefined;
            message: string | undefined;
            fees: number | undefined;
            currency: string | undefined;
        };
    }>;
    adminIsInvoicePaid(prestataireId: string, invoiceToken: string): Promise<{
        paid: boolean;
        abonnement?: Awaited<ReturnType<any>>;
    }>;
    private adminCreateAbonnementCash;
    adminExpirerAbonnement(abonnementId: string): Promise<{
        id: string;
        statut: StatutAbonnement;
        statutAffichage: "ACTIF" | "EXPIRE" | "ANNULE";
    }>;
}
