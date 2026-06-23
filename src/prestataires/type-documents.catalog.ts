import type { PrismaClient } from "../../generated/prisma/client.js";

/** Catalogue des types de documents prestataire. */
export const PRESTATAIRE_TYPE_DOCUMENTS_CATALOG = [
  {
    code: "cni_recto",
    libelle: "CNI / Passeport (recto)",
    ordre: 1,
    obligatoire: true,
  },
  {
    code: "cni_verso",
    libelle: "CNI / Passeport (verso)",
    ordre: 2,
    obligatoire: true,
  },
  {
    code: "certificat_residence",
    libelle: "Certificat de résidence",
    ordre: 3,
    obligatoire: false,
  },
  { code: "diplome", libelle: "Diplôme", ordre: 4, obligatoire: false },
] as const;

const DEPRECATED_TYPE_DOCUMENT_CODES = [
  "casier_judiciaire",
  "certificat_bonne_moeurs",
] as const;

/**
 * Met à jour le catalogue en base : active les 4 types courants,
 * désactive casier judiciaire et certificat de bonne mœurs.
 */
export async function syncPrestataireTypeDocuments(
  prisma: PrismaClient,
): Promise<void> {
  await prisma.typeDocument.updateMany({
    where: { code: { in: [...DEPRECATED_TYPE_DOCUMENT_CODES] } },
    data: { actif: false, obligatoire: false },
  });

  for (const item of PRESTATAIRE_TYPE_DOCUMENTS_CATALOG) {
    await prisma.typeDocument.upsert({
      where: { code: item.code },
      create: {
        code: item.code,
        libelle: item.libelle,
        ordre: item.ordre,
        obligatoire: item.obligatoire,
        actif: true,
      },
      update: {
        libelle: item.libelle,
        ordre: item.ordre,
        obligatoire: item.obligatoire,
        actif: true,
      },
    });
  }
}
