import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service.js';
import { Role } from '../../generated/prisma/client.js';
import type { RegisterDto } from './dto/register.dto.js';
import type { LoginDto } from './dto/login.dto.js';
import type { UpdateParticulierDto } from './dto/update-particulier.dto.js';
import { GeocodingService } from '../geocoding/geocoding.service.js';
import { AbonnementsService } from '../abonnements/abonnements.service.js';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    private readonly geocodingService;
    private readonly abonnementsService;
    private readonly logger;
    constructor(prisma: PrismaService, jwtService: JwtService, geocodingService: GeocodingService, abonnementsService: AbonnementsService);
    register(dto: RegisterDto): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            id: string;
            email: string;
            role: Role;
            emailVerified: boolean;
            createdAt: Date;
            updatedAt: Date;
            particulier: {
                latitude: number | null;
                longitude: number | null;
            } | undefined;
            prestataire: {
                latitude: number | null;
                longitude: number | null;
            } | undefined;
        };
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            id: string;
            email: string;
            role: Role;
            emailVerified: boolean;
            createdAt: Date;
            updatedAt: Date;
            particulier: {
                latitude: number | null;
                longitude: number | null;
            } | undefined;
            prestataire: {
                latitude: number | null;
                longitude: number | null;
            } | undefined;
        };
        abonnement: {
            id: string;
            dateDebut: Date;
            dateFin: Date;
            statut: import("../../generated/prisma/enums.js").StatutAbonnement;
            offre: {
                prix: number;
                id: string;
                libelle: string;
                code: string;
                dureeMois: number;
            };
        } | null;
    }>;
    refresh(refreshToken: string): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            id: string;
            email: string;
            role: Role;
            emailVerified: boolean;
            createdAt: Date;
            updatedAt: Date;
            particulier: {
                latitude: number | null;
                longitude: number | null;
            } | undefined;
            prestataire: {
                latitude: number | null;
                longitude: number | null;
            } | undefined;
        };
        abonnement: {
            id: string;
            dateDebut: Date;
            dateFin: Date;
            statut: import("../../generated/prisma/enums.js").StatutAbonnement;
            offre: {
                prix: number;
                id: string;
                libelle: string;
                code: string;
                dureeMois: number;
            };
        } | null;
    }>;
    deactivateAccount(userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    updateParticulierProfile(userId: string, dto: UpdateParticulierDto): Promise<{
        success: boolean;
        data: {
            id: string;
            nom: string;
            prenom: string;
            telephone: string | null;
            adresse: string | null;
            latitude: number | null;
            longitude: number | null;
        };
    }>;
    becomePrestataire(userId: string): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            id: string;
            email: string;
            role: Role;
            emailVerified: boolean;
            createdAt: Date;
            updatedAt: Date;
            particulier: {
                latitude: number | null;
                longitude: number | null;
            } | undefined;
            prestataire: {
                latitude: number | null;
                longitude: number | null;
            } | undefined;
        };
        abonnement: {
            id: string;
            dateDebut: Date;
            dateFin: Date;
            statut: import("../../generated/prisma/enums.js").StatutAbonnement;
            offre: {
                prix: number;
                id: string;
                libelle: string;
                code: string;
                dureeMois: number;
            };
        } | null;
    }>;
    becomeParticulier(userId: string): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            id: string;
            email: string;
            role: Role;
            emailVerified: boolean;
            createdAt: Date;
            updatedAt: Date;
            particulier: {
                latitude: number | null;
                longitude: number | null;
            } | undefined;
            prestataire: {
                latitude: number | null;
                longitude: number | null;
            } | undefined;
        };
        abonnement: null;
    }>;
    private ensureTypeDocumentsExist;
    private toNumber;
    private sanitizeUser;
}
