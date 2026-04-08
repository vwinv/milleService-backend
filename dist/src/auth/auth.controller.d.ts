import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { RefreshTokenDto } from './dto/refresh-token.dto.js';
import { UpdateParticulierDto } from './dto/update-particulier.dto.js';
import { CurrentUserPayload } from './decorators/current-user.decorator.js';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            id: string;
            email: string;
            role: import("../../generated/prisma/enums.js").Role;
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
            role: import("../../generated/prisma/enums.js").Role;
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
                code: string;
                libelle: string;
                dureeMois: number;
            };
        } | null;
    }>;
    refresh(dto: RefreshTokenDto): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            id: string;
            email: string;
            role: import("../../generated/prisma/enums.js").Role;
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
                code: string;
                libelle: string;
                dureeMois: number;
            };
        } | null;
    }>;
    deactivate(user: CurrentUserPayload): Promise<{
        success: boolean;
        message: string;
    }>;
    updateParticulier(user: CurrentUserPayload, dto: UpdateParticulierDto): Promise<{
        success: boolean;
        data: {
            id: string;
            nom: string;
            prenom: string;
            telephone: string | null;
            adresse: string | null;
            avatarUrl: string | null;
            latitude: number | null;
            longitude: number | null;
        };
    }>;
    becomePrestataire(user: CurrentUserPayload): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            id: string;
            email: string;
            role: import("../../generated/prisma/enums.js").Role;
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
                code: string;
                libelle: string;
                dureeMois: number;
            };
        } | null;
    }>;
    becomeParticulier(user: CurrentUserPayload): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            id: string;
            email: string;
            role: import("../../generated/prisma/enums.js").Role;
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
}
