import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set in environment");
}
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  // 1) Récupérer le premier particulier
  const particulier = await prisma.particulier.findFirst({
    orderBy: { createdAt: "asc" },
    select: { id: true },
  });

  if (!particulier) {
    console.log("Aucun particulier trouvé, impossible de créer des avis.");
    return;
  }

  // 2) Récupérer les deux premiers prestataires
  const prestataires = await prisma.prestataire.findMany({
    orderBy: { createdAt: "asc" },
    take: 2,
    select: { id: true, nom: true },
  });

  if (prestataires.length < 2) {
    console.log(
      `Seulement ${prestataires.length} prestataire(s) trouvé(s), il en faut au moins 2.`,
    );
    return;
  }

  const [p1, p2] = prestataires;
  const particulierId = particulier.id;

  console.log(
    `Création / mise à jour des avis pour :\n` +
      `- ${p1.nom} (5/5)\n` +
      `- ${p2.nom} (4/5)`,
  );

  async function upsertAvis(
    prestataireId: string,
    note: number,
    commentaire: string,
  ) {
    const existing = await prisma.avisPrestataire.findFirst({
      where: {
        particulierId,
        prestataireId,
        prestationId: null,
      },
    });
    if (existing) {
      await prisma.avisPrestataire.update({
        where: { id: existing.id },
        data: { note, commentaire },
      });
      return;
    }
    await prisma.avisPrestataire.create({
      data: {
        particulierId,
        prestataireId,
        note,
        commentaire,
      },
    });
  }

  await upsertAvis(p1.id, 5, "Note ajoutée automatiquement (5/5).");
  await upsertAvis(p2.id, 4, "Note ajoutée automatiquement (4/5).");

  console.log("Avis créés / mis à jour avec succès.");
}

main()
  .catch((e) => {
    console.error("Erreur lors du seed des avis :", e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
