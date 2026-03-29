import { PrismaService } from '../prisma/prisma.service.js';
import { StatutDocument, StatutVerificationPrestataire } from '../../generated/prisma/client.js';
import { CreatePrestatairePhotoDto } from './dto/create-photo.dto.js';
import { GeocodingService } from '../geocoding/geocoding.service.js';
import { UpdateMePrestataireDto } from './dto/update-me.dto.js';
import { NotificationsService } from '../notifications/notifications.service.js';
export declare class PrestatairesService {
    private readonly prisma;
    private readonly geocodingService;
    private readonly notifications;
    constructor(prisma: PrismaService, geocodingService: GeocodingService, notifications: NotificationsService);
    getPrestatairesFavoris(userId: string, lat?: number, lng?: number): Promise<{
        listeProximite: boolean;
        prestataires: {
            id: any;
            nom: any;
            adresse: any;
            telephone: any;
            bio: any;
            avatarUrl: any;
            zoneIntervention: any;
            statutVerification: any;
            noteMoyenne: number;
            noteSur: number;
            nbAvis: number;
            distanceMetres: number;
            latitude: number | null;
            longitude: number | null;
            services: any;
        }[];
    }>;
    createOrUpdateAvis(userId: string, prestataireId: string, note: number, commentaire?: string): Promise<{
        id: string;
        createdAt: Date;
        prestataireId: string;
        particulierId: string;
        note: number;
        commentaire: string | null;
    }>;
    search(userId: string, serviceId?: string, tarifMin?: number, tarifMax?: number, date?: string): Promise<{
        id: string;
        nom: string;
        adresse: string | null;
        telephone: string | null;
        bio: string | null;
        avatarUrl: string | null;
        zoneIntervention: string[];
        statutVerification: StatutVerificationPrestataire;
        noteMoyenne: number;
        noteSur: number;
        nbAvis: number;
        distanceMetres: number;
        latitude: number | null;
        longitude: number | null;
        services: {
            id: any;
            prestataireServiceId: any;
            libelle: any;
            slug: any;
            tarifHoraire: number | null;
            description: any;
        }[];
    }[]>;
    getPrestationStats(prestataireUserId: string): Promise<{
        enAttente: number;
        terminee: number;
    }>;
    updateStatutVerification(prestataireId: string, statut: StatutVerificationPrestataire, motifRefus?: string): Promise<{
        id: string;
        statutVerification: StatutVerificationPrestataire;
    }>;
    updateMyDocuments(userId: string, documents: {
        typeCode: string;
        fichierUrl: string;
        nomFichier?: string;
    }[]): Promise<{
        id: string;
        statutVerification: StatutVerificationPrestataire;
    }>;
    private ensureTypeDocumentsExist;
    getMyVerificationStatus(userId: string): Promise<{
        statutVerification: StatutVerificationPrestataire;
        documents: {
            id: string;
            typeCode: string;
            typeLibelle: string;
            obligatoire: boolean;
            statut: StatutDocument;
            motifRefus: string | null;
            fichierUrl: string;
            nomFichier: string | null;
            updatedAt: Date;
        }[];
    }>;
    getMyDocuments(userId: string): Promise<{
        id: string;
        typeCode: string;
        typeLibelle: string;
        obligatoire: boolean;
        statut: StatutDocument;
        motifRefus: string | null;
        fichierUrl: string;
        nomFichier: string | null;
        updatedAt: Date;
    }[]>;
    getMyPhotos(userId: string): Promise<{
        url: string;
        id: string;
        createdAt: Date;
        description: string | null;
        ordre: number;
        prestataireId: string;
        titre: string | null;
    }[]>;
    addPhoto(userId: string, dto: CreatePrestatairePhotoDto): Promise<{
        url: string;
        id: string;
        createdAt: Date;
        description: string | null;
        ordre: number;
        prestataireId: string;
        titre: string | null;
    }>;
    getMyServiceIds(userId: string): Promise<{
        serviceIds: string[];
    }>;
    getPhotosByPrestataire(prestataireId: string): Promise<{
        url: string;
        id: string;
        createdAt: Date;
        description: string | null;
        ordre: number;
        prestataireId: string;
        titre: string | null;
    }[]>;
    getAvisByPrestataireId(prestataireId: string): Promise<{
        id: string;
        nomClient: string;
        note: number;
        commentaire: string | null;
    }[]>;
    getAvisPublicLanding(limit?: number): Promise<{
        id: string;
        nomClient: string;
        note: number;
        commentaire: string | null;
        avatarUrl: string | null;
    }[]>;
    updateMe(userId: string, dto: UpdateMePrestataireDto): Promise<{
        id: string;
        nom: string;
        telephone: string | null;
        adresse: string | null;
        bio: string | null;
        avatarUrl: string | null;
        latitude: number | null;
        longitude: number | null;
    }>;
}
