export declare const Role: {
    readonly PARTICULIER: "PARTICULIER";
    readonly PRESTATAIRE: "PRESTATAIRE";
    readonly ADMIN: "ADMIN";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const StatutAbonnement: {
    readonly ACTIF: "ACTIF";
    readonly EXPIRE: "EXPIRE";
    readonly ANNULE: "ANNULE";
};
export type StatutAbonnement = (typeof StatutAbonnement)[keyof typeof StatutAbonnement];
export declare const StatutVerificationPrestataire: {
    readonly NON_VERIFIE: "NON_VERIFIE";
    readonly EN_ATTENTE: "EN_ATTENTE";
    readonly VERIFIE: "VERIFIE";
    readonly REFUSE: "REFUSE";
};
export type StatutVerificationPrestataire = (typeof StatutVerificationPrestataire)[keyof typeof StatutVerificationPrestataire];
export declare const StatutDocument: {
    readonly EN_ATTENTE: "EN_ATTENTE";
    readonly VALIDE: "VALIDE";
    readonly REFUSE: "REFUSE";
};
export type StatutDocument = (typeof StatutDocument)[keyof typeof StatutDocument];
export declare const StatutPrestation: {
    readonly EN_ATTENTE: "EN_ATTENTE";
    readonly ACCEPTEE: "ACCEPTEE";
    readonly REFUSEE: "REFUSEE";
    readonly EN_COURS: "EN_COURS";
    readonly TERMINEE: "TERMINEE";
    readonly ANNULEE: "ANNULEE";
    readonly PAYEE: "PAYEE";
};
export type StatutPrestation = (typeof StatutPrestation)[keyof typeof StatutPrestation];
export declare const WalletType: {
    readonly GENERAL: "GENERAL";
    readonly PRESTATAIRE: "PRESTATAIRE";
};
export type WalletType = (typeof WalletType)[keyof typeof WalletType];
export declare const TransactionType: {
    readonly PRESTATION: "PRESTATION";
    readonly ABONNEMENT: "ABONNEMENT";
};
export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType];
export declare const WithdrawalMethod: {
    readonly ORANGE_MONEY: "ORANGE_MONEY";
    readonly WAVE: "WAVE";
    readonly FREE_MONEY: "FREE_MONEY";
    readonly RIB: "RIB";
};
export type WithdrawalMethod = (typeof WithdrawalMethod)[keyof typeof WithdrawalMethod];
export declare const WithdrawalStatus: {
    readonly EN_ATTENTE: "EN_ATTENTE";
    readonly TRAITE: "TRAITE";
    readonly REFUSE: "REFUSE";
};
export type WithdrawalStatus = (typeof WithdrawalStatus)[keyof typeof WithdrawalStatus];
