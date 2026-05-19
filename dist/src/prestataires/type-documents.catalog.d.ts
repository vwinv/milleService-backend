import type { PrismaClient } from "../../generated/prisma/client.js";
export declare const PRESTATAIRE_TYPE_DOCUMENTS_CATALOG: readonly [{
    readonly code: "cni_recto";
    readonly libelle: "CNI / Passeport (recto)";
    readonly ordre: 1;
}, {
    readonly code: "cni_verso";
    readonly libelle: "CNI / Passeport (verso)";
    readonly ordre: 2;
}, {
    readonly code: "certificat_residence";
    readonly libelle: "Certificat de résidence";
    readonly ordre: 3;
}, {
    readonly code: "diplome";
    readonly libelle: "Diplôme";
    readonly ordre: 4;
}];
export declare function syncPrestataireTypeDocuments(prisma: PrismaClient): Promise<void>;
