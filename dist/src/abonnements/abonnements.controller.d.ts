import { AbonnementsService } from "./abonnements.service.js";
import { CurrentUserPayload } from "../auth/decorators/current-user.decorator.js";
import { SouscrireAbonnementDto } from "./dto/souscrire-abonnement.dto.js";
import { SoftPayAbonnementBodyDto, SoftPayAbonnementDto } from "./dto/softpay-abonnement.dto.js";
export declare class AbonnementsController {
    private readonly abonnementsService;
    constructor(abonnementsService: AbonnementsService);
    getOffres(): Promise<{
        prix: number;
        id: string;
        code: string;
        libelle: string;
        description: string | null;
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
            code: string;
            libelle: string;
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
            code: string;
            libelle: string;
            dureeMois: number;
        };
    } | null>;
    initPaydunya(user: CurrentUserPayload, dto: SouscrireAbonnementDto): Promise<{
        amountFcfa: number;
        invoiceToken: string;
        checkoutUrl: string;
        description: string;
    }>;
    invoicePaid(user: CurrentUserPayload, invoiceToken: string): Promise<{
        paid: boolean;
        abonnement?: Awaited<ReturnType<any>>;
    }>;
    softPay(user: CurrentUserPayload, dto: SoftPayAbonnementDto): Promise<{
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
    payWave(user: CurrentUserPayload, dto: SoftPayAbonnementBodyDto): Promise<{
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
    payOrangeMoney(user: CurrentUserPayload, dto: SoftPayAbonnementBodyDto): Promise<{
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
    payFreeMoney(user: CurrentUserPayload, dto: SoftPayAbonnementBodyDto): Promise<{
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
