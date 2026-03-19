"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("../../generated/prisma/client");
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error('DATABASE_URL is not set in environment');
}
const adapter = new adapter_pg_1.PrismaPg({ connectionString });
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    const particulier = await prisma.particulier.findFirst({
        orderBy: { createdAt: 'asc' },
        select: { id: true },
    });
    if (!particulier) {
        console.log('Aucun particulier trouvé, impossible de créer des avis.');
        return;
    }
    const prestataires = await prisma.prestataire.findMany({
        orderBy: { createdAt: 'asc' },
        take: 2,
        select: { id: true, nom: true },
    });
    if (prestataires.length < 2) {
        console.log(`Seulement ${prestataires.length} prestataire(s) trouvé(s), il en faut au moins 2.`);
        return;
    }
    const [p1, p2] = prestataires;
    console.log(`Création / mise à jour des avis pour :\n` +
        `- ${p1.nom} (5/5)\n` +
        `- ${p2.nom} (4/5)`);
    await prisma.avisPrestataire.upsert({
        where: {
            particulierId_prestataireId: {
                particulierId: particulier.id,
                prestataireId: p1.id,
            },
        },
        create: {
            particulierId: particulier.id,
            prestataireId: p1.id,
            note: 5,
            commentaire: 'Note ajoutée automatiquement (5/5).',
        },
        update: {
            note: 5,
            commentaire: 'Note mise à jour automatiquement (5/5).',
        },
    });
    await prisma.avisPrestataire.upsert({
        where: {
            particulierId_prestataireId: {
                particulierId: particulier.id,
                prestataireId: p2.id,
            },
        },
        create: {
            particulierId: particulier.id,
            prestataireId: p2.id,
            note: 4,
            commentaire: 'Note ajoutée automatiquement (4/5).',
        },
        update: {
            note: 4,
            commentaire: 'Note mise à jour automatiquement (4/5).',
        },
    });
    console.log('Avis créés / mis à jour avec succès.');
}
main()
    .catch((e) => {
    console.error('Erreur lors du seed des avis :', e);
    process.exitCode = 1;
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed-avis.js.map