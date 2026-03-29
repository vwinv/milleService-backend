import { PrestatairesService } from './prestataires.service.js';
import { CurrentUserPayload } from '../auth/decorators/current-user.decorator.js';
import { FavorisQueryDto } from './dto/favoris-query.dto.js';
import { SearchQueryDto } from './dto/search-query.dto.js';
import { CreateAvisDto } from './dto/create-avis.dto.js';
import { CreatePrestatairePhotoDto } from './dto/create-photo.dto.js';
import { UpdateMePrestataireDto } from './dto/update-me.dto.js';
import { UpdateStatutVerificationPrestataireDto } from './dto/update-statut-verification.dto.js';
import { UpdatePrestataireDocumentsDto } from './dto/update-documents.dto.js';
export declare class PrestatairesController {
    private readonly prestatairesService;
    constructor(prestatairesService: PrestatairesService);
    createAvis(user: CurrentUserPayload, dto: CreateAvisDto): Promise<{
        id: string;
        createdAt: Date;
        prestataireId: string;
        particulierId: string;
        note: number;
        commentaire: string | null;
    }>;
    getFavoris(user: CurrentUserPayload, query: FavorisQueryDto): Promise<{
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
    search(user: CurrentUserPayload, query: SearchQueryDto): Promise<{
        id: string;
        nom: string;
        adresse: string | null;
        telephone: string | null;
        bio: string | null;
        avatarUrl: string | null;
        zoneIntervention: string[];
        statutVerification: import("../../generated/prisma/enums.js").StatutVerificationPrestataire;
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
    getPrestationStats(user: CurrentUserPayload): Promise<{
        enAttente: number;
        terminee: number;
    }>;
    getMyServiceIds(user: CurrentUserPayload): Promise<{
        serviceIds: string[];
    }>;
    updateMe(user: CurrentUserPayload, dto: UpdateMePrestataireDto): Promise<{
        id: string;
        nom: string;
        telephone: string | null;
        adresse: string | null;
        bio: string | null;
        avatarUrl: string | null;
        latitude: number | null;
        longitude: number | null;
    }>;
    getMyPhotos(user: CurrentUserPayload): Promise<{
        url: string;
        id: string;
        description: string | null;
        createdAt: Date;
        ordre: number;
        prestataireId: string;
        titre: string | null;
    }[]>;
    addPhoto(user: CurrentUserPayload, dto: CreatePrestatairePhotoDto): Promise<{
        url: string;
        id: string;
        description: string | null;
        createdAt: Date;
        ordre: number;
        prestataireId: string;
        titre: string | null;
    }>;
    getPublicAvis(): Promise<{
        id: string;
        nomClient: string;
        note: number;
        commentaire: string | null;
        avatarUrl: string | null;
    }[]>;
    getPhotosByPrestataire(prestataireId: string): Promise<{
        url: string;
        id: string;
        description: string | null;
        createdAt: Date;
        ordre: number;
        prestataireId: string;
        titre: string | null;
    }[]>;
    getAvisByPrestataire(prestataireId: string): Promise<{
        id: string;
        nomClient: string;
        note: number;
        commentaire: string | null;
    }[]>;
    getMyVerificationStatus(user: CurrentUserPayload): Promise<{
        statutVerification: import("../../generated/prisma/enums.js").StatutVerificationPrestataire;
        documents: {
            id: string;
            typeCode: string;
            typeLibelle: string;
            obligatoire: boolean;
            statut: import("../../generated/prisma/enums.js").StatutDocument;
            motifRefus: string | null;
            fichierUrl: string;
            nomFichier: string | null;
            updatedAt: Date;
        }[];
    }>;
    getMyDocuments(user: CurrentUserPayload): Promise<{
        id: string;
        typeCode: string;
        typeLibelle: string;
        obligatoire: boolean;
        statut: import("../../generated/prisma/enums.js").StatutDocument;
        motifRefus: string | null;
        fichierUrl: string;
        nomFichier: string | null;
        updatedAt: Date;
    }[]>;
    updateMyDocuments(user: CurrentUserPayload, dto: UpdatePrestataireDocumentsDto): Promise<{
        id: string;
        statutVerification: import("../../generated/prisma/enums.js").StatutVerificationPrestataire;
    }>;
    updateStatutVerification(prestataireId: string, dto: UpdateStatutVerificationPrestataireDto): Promise<{
        id: string;
        statutVerification: import("../../generated/prisma/enums.js").StatutVerificationPrestataire;
    }>;
}
