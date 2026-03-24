"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithdrawalStatus = exports.WithdrawalMethod = exports.TransactionType = exports.PrestataireWalletStatut = exports.WalletType = exports.StatutPrestation = exports.StatutDocument = exports.StatutVerificationPrestataire = exports.StatutAbonnement = exports.Role = void 0;
exports.Role = {
    PARTICULIER: 'PARTICULIER',
    PRESTATAIRE: 'PRESTATAIRE',
    ADMIN: 'ADMIN'
};
exports.StatutAbonnement = {
    ACTIF: 'ACTIF',
    EXPIRE: 'EXPIRE',
    ANNULE: 'ANNULE'
};
exports.StatutVerificationPrestataire = {
    NON_VERIFIE: 'NON_VERIFIE',
    EN_ATTENTE: 'EN_ATTENTE',
    VERIFIE: 'VERIFIE',
    REFUSE: 'REFUSE'
};
exports.StatutDocument = {
    EN_ATTENTE: 'EN_ATTENTE',
    VALIDE: 'VALIDE',
    REFUSE: 'REFUSE'
};
exports.StatutPrestation = {
    EN_ATTENTE: 'EN_ATTENTE',
    ACCEPTEE: 'ACCEPTEE',
    REFUSEE: 'REFUSEE',
    EN_COURS: 'EN_COURS',
    TERMINEE: 'TERMINEE',
    ANNULEE: 'ANNULEE',
    PAYEE: 'PAYEE'
};
exports.WalletType = {
    GENERAL: 'GENERAL',
    PRESTATAIRE: 'PRESTATAIRE'
};
exports.PrestataireWalletStatut = {
    ACTIF: 'ACTIF',
    BLOQUE: 'BLOQUE'
};
exports.TransactionType = {
    PRESTATION: 'PRESTATION',
    ABONNEMENT: 'ABONNEMENT'
};
exports.WithdrawalMethod = {
    ORANGE_MONEY: 'ORANGE_MONEY',
    WAVE: 'WAVE',
    FREE_MONEY: 'FREE_MONEY',
    RIB: 'RIB'
};
exports.WithdrawalStatus = {
    EN_ATTENTE: 'EN_ATTENTE',
    TRAITE: 'TRAITE',
    REFUSE: 'REFUSE'
};
//# sourceMappingURL=enums.js.map