import { PrestationsService } from "./prestations.service.js";
import { CreatePrestationDto } from "./dto/create-prestation.dto.js";
import { PayerPrestationDto } from "./dto/payer-prestation.dto.js";
import { SoftPayPrestationBodyDto, SoftPayPrestationDto } from "./dto/softpay-prestation.dto.js";
import { CurrentUserPayload } from "../auth/decorators/current-user.decorator.js";
export declare class PrestationsController {
    private readonly prestations;
    constructor(prestations: PrestationsService);
    create(user: CurrentUserPayload, dto: CreatePrestationDto): Promise<{
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
    listMine(user: CurrentUserPayload): Promise<{
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
    findById(user: CurrentUserPayload, id: string): Promise<{
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
    accepter(user: CurrentUserPayload, id: string): Promise<{
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
    demarrer(user: CurrentUserPayload, id: string): Promise<{
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
    refuser(user: CurrentUserPayload, id: string): Promise<{
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
    terminer(user: CurrentUserPayload, id: string): Promise<{
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
    marquerPayee(user: CurrentUserPayload, id: string, dto: PayerPrestationDto): Promise<{
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
    initPaydunya(user: CurrentUserPayload, id: string): Promise<{
        amountFcfa: number;
        invoiceToken: string;
        checkoutUrl: string;
        description: string;
    }>;
    softPayPrestation(user: CurrentUserPayload, id: string, dto: SoftPayPrestationDto): Promise<{
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
    payWithWave(user: CurrentUserPayload, id: string, dto: SoftPayPrestationBodyDto): Promise<{
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
    payWithOrangeMoney(user: CurrentUserPayload, id: string, dto: SoftPayPrestationBodyDto): Promise<{
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
    payWithFreeMoney(user: CurrentUserPayload, id: string, dto: SoftPayPrestationBodyDto): Promise<{
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
}
