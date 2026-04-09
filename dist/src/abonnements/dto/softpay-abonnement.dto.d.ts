import { type PrestationSoftPayMethod } from "../../prestations/dto/softpay-prestation.dto.js";
export declare class SoftPayAbonnementBodyDto {
    offreId: string;
    invoiceToken: string;
    prenom: string;
    nom: string;
    telephone: string;
    email?: string;
}
export declare class SoftPayAbonnementDto extends SoftPayAbonnementBodyDto {
    method: PrestationSoftPayMethod;
}
