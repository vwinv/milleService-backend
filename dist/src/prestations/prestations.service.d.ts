import { PrismaService } from '../prisma/prisma.service.js';
import { NotificationsService } from '../notifications/notifications.service.js';
import { WalletsService } from '../wallets/wallets.service.js';
export declare class PrestationsService {
    private readonly prisma;
    private readonly notifications;
    private readonly wallets;
    constructor(prisma: PrismaService, notifications: NotificationsService, wallets: WalletsService);
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
            id: any;
            libelle: any;
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
            id: any;
            libelle: any;
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
            id: any;
            libelle: any;
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
            id: any;
            libelle: any;
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
            id: any;
            libelle: any;
        } | undefined;
    }>;
    marquerPayee(particulierUserId: string, prestationId: string): Promise<{
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
    listForUser(userId: string, role: 'PARTICULIER' | 'PRESTATAIRE'): Promise<{
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
            id: any;
            libelle: any;
            tarifHoraire: number | undefined;
        } | undefined;
    }>;
    private formatPrestationWithCoords;
    private formatPrestation;
}
