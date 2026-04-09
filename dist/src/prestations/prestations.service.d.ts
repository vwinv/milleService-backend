import { PrismaService } from "../prisma/prisma.service.js";
import { NotificationsService } from "../notifications/notifications.service.js";
import { WalletsService } from "../wallets/wallets.service.js";
import { PaydunyaService } from "../paydunya/paydunya.service.js";
import type { PayerPrestationDto } from "./dto/payer-prestation.dto.js";
import type { SoftPayPrestationDto } from "./dto/softpay-prestation.dto.js";
import { AbonnementsService } from "../abonnements/abonnements.service.js";
export declare class PrestationsService {
    private readonly prisma;
    private readonly notifications;
    private readonly wallets;
    private readonly paydunya;
    private readonly abonnements;
    private readonly logger;
    constructor(prisma: PrismaService, notifications: NotificationsService, wallets: WalletsService, paydunya: PaydunyaService, abonnements: AbonnementsService);
    create(particulierUserId: string, dto: {
        prestataireId: string;
        prestataireServiceId: string;
        typeDeTache?: string;
        description?: string;
        imageUrl?: string;
        budget?: number;
        adresse?: string;
        codePostal?: string;
        ville?: string;
        noteParticulier?: string;
    }): Promise<{
        id: any;
        statut: any;
        typeDeTache: any;
        description: any;
        imageUrl: any;
        budget: number | undefined;
        adresse: any;
        codePostal: any;
        ville: any;
        noteParticulier: any;
        acceptedAt: any;
        completedAt: any;
        createdAt: any;
        particulier: {
            prenom: any;
            nom: any;
        } | undefined;
        prestataire: {
            nom: any;
            avatarUrl: any;
        } | undefined;
        service: {
            id: string | undefined;
            libelle: string | undefined;
            tarifHoraire: number | undefined;
        } | undefined;
    }>;
    accepter(prestataireUserId: string, prestationId: string): Promise<{
        id: any;
        statut: any;
        typeDeTache: any;
        description: any;
        imageUrl: any;
        budget: number | undefined;
        adresse: any;
        codePostal: any;
        ville: any;
        noteParticulier: any;
        acceptedAt: any;
        completedAt: any;
        createdAt: any;
        particulier: {
            prenom: any;
            nom: any;
        } | undefined;
        prestataire: {
            nom: any;
            avatarUrl: any;
        } | undefined;
        service: {
            id: string | undefined;
            libelle: string | undefined;
            tarifHoraire: number | undefined;
        } | undefined;
    }>;
    demarrer(prestataireUserId: string, prestationId: string): Promise<{
        id: any;
        statut: any;
        typeDeTache: any;
        description: any;
        imageUrl: any;
        budget: number | undefined;
        adresse: any;
        codePostal: any;
        ville: any;
        noteParticulier: any;
        acceptedAt: any;
        completedAt: any;
        createdAt: any;
        particulier: {
            prenom: any;
            nom: any;
        } | undefined;
        prestataire: {
            nom: any;
            avatarUrl: any;
        } | undefined;
        service: {
            id: string | undefined;
            libelle: string | undefined;
            tarifHoraire: number | undefined;
        } | undefined;
    }>;
    refuser(prestataireUserId: string, prestationId: string): Promise<{
        id: any;
        statut: any;
        typeDeTache: any;
        description: any;
        imageUrl: any;
        budget: number | undefined;
        adresse: any;
        codePostal: any;
        ville: any;
        noteParticulier: any;
        acceptedAt: any;
        completedAt: any;
        createdAt: any;
        particulier: {
            prenom: any;
            nom: any;
        } | undefined;
        prestataire: {
            nom: any;
            avatarUrl: any;
        } | undefined;
        service: {
            id: string | undefined;
            libelle: string | undefined;
            tarifHoraire: number | undefined;
        } | undefined;
    }>;
    terminer(prestataireUserId: string, prestationId: string): Promise<{
        id: any;
        statut: any;
        typeDeTache: any;
        description: any;
        imageUrl: any;
        budget: number | undefined;
        adresse: any;
        codePostal: any;
        ville: any;
        noteParticulier: any;
        acceptedAt: any;
        completedAt: any;
        createdAt: any;
        particulier: {
            prenom: any;
            nom: any;
        } | undefined;
        prestataire: {
            nom: any;
            avatarUrl: any;
        } | undefined;
        service: {
            id: string | undefined;
            libelle: string | undefined;
            tarifHoraire: number | undefined;
        } | undefined;
    }>;
    marquerPayee(particulierUserId: string, prestationId: string, dto?: PayerPrestationDto): Promise<{
        id: any;
        statut: any;
        typeDeTache: any;
        description: any;
        imageUrl: any;
        budget: number | undefined;
        adresse: any;
        codePostal: any;
        ville: any;
        noteParticulier: any;
        acceptedAt: any;
        completedAt: any;
        createdAt: any;
        particulier: {
            prenom: any;
            nom: any;
        } | undefined;
        prestataire: {
            nom: any;
            avatarUrl: any;
        } | undefined;
        service: {
            id: string | undefined;
            libelle: string | undefined;
            tarifHoraire: number | undefined;
        } | undefined;
    }>;
    initPaydunyaCheckout(particulierUserId: string, prestationId: string): Promise<{
        amountFcfa: number;
        invoiceToken: string;
        checkoutUrl: string;
        description: string;
    }>;
    softPayPrestation(particulierUserId: string, prestationId: string, dto: SoftPayPrestationDto): Promise<{
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
    handlePaydunyaIpn(body: Record<string, unknown>): Promise<{
        ok: false;
        error: string;
        ignored?: undefined;
        status?: undefined;
        scope?: undefined;
        alreadyPaid?: undefined;
    } | {
        ok: true;
        ignored: true;
        status: string;
        error?: undefined;
        scope?: undefined;
        alreadyPaid?: undefined;
    } | {
        ok: true;
        scope: "abonnement";
        error?: undefined;
        ignored?: undefined;
        status?: undefined;
        alreadyPaid?: undefined;
    } | {
        ok: true;
        alreadyPaid: true;
        error?: undefined;
        ignored?: undefined;
        status?: undefined;
        scope?: undefined;
    } | {
        ok: true;
        error?: undefined;
        ignored?: undefined;
        status?: undefined;
        scope?: undefined;
        alreadyPaid?: undefined;
    }>;
    private normalizePaydunyaIpnPayload;
    private computeCatalogPaymentAmountFcfa;
    private resolveGrossPaymentAmountFcfa;
    private settlePrestationAsPaidInternal;
    private prestationSplitCommissionOpts;
    listForUser(userId: string, role: "PARTICULIER" | "PRESTATAIRE"): Promise<{
        id: any;
        statut: any;
        typeDeTache: any;
        description: any;
        imageUrl: any;
        budget: number | undefined;
        adresse: any;
        codePostal: any;
        ville: any;
        noteParticulier: any;
        acceptedAt: any;
        completedAt: any;
        createdAt: any;
        particulier: {
            prenom: any;
            nom: any;
        } | undefined;
        prestataire: {
            nom: any;
            avatarUrl: any;
        } | undefined;
        service: {
            id: string | undefined;
            libelle: string | undefined;
            tarifHoraire: number | undefined;
        } | undefined;
    }[]>;
    findById(prestationId: string, userId: string, role: string): Promise<{
        id: any;
        statut: any;
        typeDeTache: any;
        description: any;
        imageUrl: any;
        budget: number | undefined;
        adresse: any;
        codePostal: any;
        ville: any;
        noteParticulier: any;
        acceptedAt: any;
        completedAt: any;
        createdAt: any;
        particulier: {
            prenom: any;
            nom: any;
            telephone: any;
            latitude: number | null;
            longitude: number | null;
        } | undefined;
        prestataire: {
            nom: any;
            telephone: any;
            avatarUrl: any;
            adresse: any;
            latitude: number | null;
            longitude: number | null;
        } | undefined;
        service: {
            id: string | undefined;
            libelle: string | undefined;
            tarifHoraire: number | undefined;
        } | undefined;
    }>;
    private formatPrestationWithCoords;
    private formatPrestation;
    private formatPrestationServicePayload;
}
