"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRESTATAIRE_TYPE_DOCUMENTS_CATALOG = void 0;
exports.syncPrestataireTypeDocuments = syncPrestataireTypeDocuments;
exports.PRESTATAIRE_TYPE_DOCUMENTS_CATALOG = [
    { code: "cni_recto", libelle: "CNI / Passeport (recto)", ordre: 1 },
    { code: "cni_verso", libelle: "CNI / Passeport (verso)", ordre: 2 },
    {
        code: "certificat_residence",
        libelle: "Certificat de résidence",
        ordre: 3,
    },
    { code: "diplome", libelle: "Diplôme", ordre: 4 },
];
const DEPRECATED_TYPE_DOCUMENT_CODES = [
    "casier_judiciaire",
    "certificat_bonne_moeurs",
];
async function syncPrestataireTypeDocuments(prisma) {
    await prisma.typeDocument.updateMany({
        where: { code: { in: [...DEPRECATED_TYPE_DOCUMENT_CODES] } },
        data: { actif: false, obligatoire: false },
    });
    for (const item of exports.PRESTATAIRE_TYPE_DOCUMENTS_CATALOG) {
        await prisma.typeDocument.upsert({
            where: { code: item.code },
            create: {
                code: item.code,
                libelle: item.libelle,
                ordre: item.ordre,
                obligatoire: true,
                actif: true,
            },
            update: {
                libelle: item.libelle,
                ordre: item.ordre,
                obligatoire: true,
                actif: true,
            },
        });
    }
}
//# sourceMappingURL=type-documents.catalog.js.map