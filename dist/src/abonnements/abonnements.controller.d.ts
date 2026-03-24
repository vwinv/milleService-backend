import { AbonnementsService } from './abonnements.service.js';
import { CurrentUserPayload } from '../auth/decorators/current-user.decorator.js';
import { SouscrireAbonnementDto } from './dto/souscrire-abonnement.dto.js';
export declare class AbonnementsController {
    private readonly abonnementsService;
    constructor(abonnementsService: AbonnementsService);
    getOffres(): Promise<{
        prix: number;
        id: string;
        libelle: string;
        description: string | null;
        code: string;
        dureeMois: number;
        ordre: number;
    }[]>;
    getCourant(user: CurrentUserPayload): Promise<{
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
    } | null>;
    souscrire(user: CurrentUserPayload, dto: SouscrireAbonnementDto): Promise<{
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
    } | null>;
}
