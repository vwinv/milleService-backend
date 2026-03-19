import { PrestationsService } from './prestations.service.js';
import { CreatePrestationDto } from './dto/create-prestation.dto.js';
import { CurrentUserPayload } from '../auth/decorators/current-user.decorator.js';
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
            id: any;
            libelle: any;
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
            id: any;
            libelle: any;
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
            id: any;
            libelle: any;
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
            id: any;
            libelle: any;
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
            id: any;
            libelle: any;
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
            id: any;
            libelle: any;
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
            id: any;
            libelle: any;
        } | undefined;
    }>;
    marquerPayee(user: CurrentUserPayload, id: string): Promise<{
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
            id: any;
            libelle: any;
        } | undefined;
    }>;
}
