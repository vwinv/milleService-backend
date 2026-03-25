"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineExtension = exports.JsonNullValueFilter = exports.NullsOrder = exports.QueryMode = exports.NullableJsonNullValueInput = exports.SortOrder = exports.AvisPrestataireScalarFieldEnum = exports.NotificationScalarFieldEnum = exports.PrestationScalarFieldEnum = exports.WithdrawalRequestScalarFieldEnum = exports.WalletTransactionScalarFieldEnum = exports.WalletScalarFieldEnum = exports.PrestataireServiceScalarFieldEnum = exports.ServiceScalarFieldEnum = exports.PrestatairePhotoScalarFieldEnum = exports.PrestataireDocumentScalarFieldEnum = exports.TypeDocumentScalarFieldEnum = exports.AbonnementScalarFieldEnum = exports.OffreScalarFieldEnum = exports.PrestataireScalarFieldEnum = exports.ParticulierScalarFieldEnum = exports.UserScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.prismaVersion = exports.getExtensionContext = exports.Decimal = exports.Sql = exports.raw = exports.join = exports.empty = exports.sql = exports.PrismaClientValidationError = exports.PrismaClientInitializationError = exports.PrismaClientRustPanicError = exports.PrismaClientUnknownRequestError = exports.PrismaClientKnownRequestError = void 0;
const runtime = __importStar(require("@prisma/client/runtime/client"));
exports.PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
exports.PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
exports.PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
exports.PrismaClientInitializationError = runtime.PrismaClientInitializationError;
exports.PrismaClientValidationError = runtime.PrismaClientValidationError;
exports.sql = runtime.sqltag;
exports.empty = runtime.empty;
exports.join = runtime.join;
exports.raw = runtime.raw;
exports.Sql = runtime.Sql;
exports.Decimal = runtime.Decimal;
exports.getExtensionContext = runtime.Extensions.getExtensionContext;
exports.prismaVersion = {
    client: "7.3.0",
    engine: "9d6ad21cbbceab97458517b147a6a09ff43aa735"
};
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    User: 'User',
    Particulier: 'Particulier',
    Prestataire: 'Prestataire',
    Offre: 'Offre',
    Abonnement: 'Abonnement',
    TypeDocument: 'TypeDocument',
    PrestataireDocument: 'PrestataireDocument',
    PrestatairePhoto: 'PrestatairePhoto',
    Service: 'Service',
    PrestataireService: 'PrestataireService',
    Wallet: 'Wallet',
    WalletTransaction: 'WalletTransaction',
    WithdrawalRequest: 'WithdrawalRequest',
    Prestation: 'Prestation',
    Notification: 'Notification',
    AvisPrestataire: 'AvisPrestataire'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.UserScalarFieldEnum = {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    role: 'role',
    emailVerified: 'emailVerified',
    fcmToken: 'fcmToken',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ParticulierScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    nom: 'nom',
    prenom: 'prenom',
    telephone: 'telephone',
    adresse: 'adresse',
    latitude: 'latitude',
    longitude: 'longitude',
    avatarUrl: 'avatarUrl',
    statut: 'statut',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PrestataireScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    nom: 'nom',
    telephone: 'telephone',
    adresse: 'adresse',
    bio: 'bio',
    avatarUrl: 'avatarUrl',
    zoneIntervention: 'zoneIntervention',
    latitude: 'latitude',
    longitude: 'longitude',
    actif: 'actif',
    statutVerification: 'statutVerification',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.OffreScalarFieldEnum = {
    id: 'id',
    code: 'code',
    libelle: 'libelle',
    description: 'description',
    prix: 'prix',
    dureeMois: 'dureeMois',
    actif: 'actif',
    ordre: 'ordre',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.AbonnementScalarFieldEnum = {
    id: 'id',
    prestataireId: 'prestataireId',
    offreId: 'offreId',
    dateDebut: 'dateDebut',
    dateFin: 'dateFin',
    statut: 'statut',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.TypeDocumentScalarFieldEnum = {
    id: 'id',
    code: 'code',
    libelle: 'libelle',
    description: 'description',
    obligatoire: 'obligatoire',
    ordre: 'ordre',
    actif: 'actif',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PrestataireDocumentScalarFieldEnum = {
    id: 'id',
    prestataireId: 'prestataireId',
    typeDocumentId: 'typeDocumentId',
    fichierUrl: 'fichierUrl',
    nomFichier: 'nomFichier',
    statut: 'statut',
    validePar: 'validePar',
    valideAt: 'valideAt',
    motifRefus: 'motifRefus',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PrestatairePhotoScalarFieldEnum = {
    id: 'id',
    prestataireId: 'prestataireId',
    url: 'url',
    titre: 'titre',
    description: 'description',
    ordre: 'ordre',
    createdAt: 'createdAt'
};
exports.ServiceScalarFieldEnum = {
    id: 'id',
    libelle: 'libelle',
    slug: 'slug',
    description: 'description',
    icone: 'icone',
    tarifs: 'tarifs',
    actif: 'actif',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PrestataireServiceScalarFieldEnum = {
    id: 'id',
    prestataireId: 'prestataireId',
    serviceId: 'serviceId',
    tarifHoraire: 'tarifHoraire',
    dureeDefautMin: 'dureeDefautMin',
    description: 'description',
    actif: 'actif',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.WalletScalarFieldEnum = {
    id: 'id',
    type: 'type',
    prestataireId: 'prestataireId',
    balance: 'balance',
    balancePlafond: 'balancePlafond',
    statutPrestataire: 'statutPrestataire',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.WalletTransactionScalarFieldEnum = {
    id: 'id',
    walletId: 'walletId',
    type: 'type',
    amount: 'amount',
    prestationId: 'prestationId',
    abonnementId: 'abonnementId',
    offreId: 'offreId',
    meta: 'meta',
    createdByUserId: 'createdByUserId',
    createdAt: 'createdAt'
};
exports.WithdrawalRequestScalarFieldEnum = {
    id: 'id',
    prestataireId: 'prestataireId',
    method: 'method',
    status: 'status',
    meta: 'meta',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PrestationScalarFieldEnum = {
    id: 'id',
    particulierId: 'particulierId',
    prestataireId: 'prestataireId',
    prestataireServiceId: 'prestataireServiceId',
    typeDeTache: 'typeDeTache',
    description: 'description',
    imageUrl: 'imageUrl',
    budget: 'budget',
    adresse: 'adresse',
    codePostal: 'codePostal',
    ville: 'ville',
    noteParticulier: 'noteParticulier',
    statut: 'statut',
    acceptedAt: 'acceptedAt',
    completedAt: 'completedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.NotificationScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    title: 'title',
    body: 'body',
    type: 'type',
    data: 'data',
    lu: 'lu',
    createdAt: 'createdAt'
};
exports.AvisPrestataireScalarFieldEnum = {
    id: 'id',
    particulierId: 'particulierId',
    prestataireId: 'prestataireId',
    note: 'note',
    commentaire: 'commentaire',
    createdAt: 'createdAt'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.NullableJsonNullValueInput = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.JsonNullValueFilter = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull,
    AnyNull: exports.AnyNull
};
exports.defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map