export declare const PRESTATION_SOFTPAY_METHODS: readonly ["wave_sn", "orange_money_sn", "free_money_sn"];
export type PrestationSoftPayMethod = (typeof PRESTATION_SOFTPAY_METHODS)[number];
export declare class SoftPayPrestationBodyDto {
    invoiceToken: string;
    prenom: string;
    nom: string;
    telephone: string;
    email?: string;
}
export declare class SoftPayPrestationDto extends SoftPayPrestationBodyDto {
    method: PrestationSoftPayMethod;
}
