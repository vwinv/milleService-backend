"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("../generated/prisma/client");
const email = (process.argv[2] ?? 'test@gmail.com').trim().toLowerCase();
let connectionString = process.env.DATABASE_URL;
if (!connectionString)
    throw new Error('DATABASE_URL est requis');
const isLocal = /@(localhost|127\.0\.0\.1|\[::1\])(:\d+)?\//i.test(connectionString) ||
    connectionString.includes('localhost:');
if (!isLocal && !connectionString.includes('sslmode=')) {
    connectionString += (connectionString.includes('?') ? '&' : '?') + 'sslmode=require';
}
const adapter = new adapter_pg_1.PrismaPg({ connectionString });
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    const user = await prisma.user.findUnique({
        where: { email },
        include: { prestataire: true },
    });
    if (!user) {
        throw new Error(`Utilisateur introuvable : ${email}`);
    }
    if (!user.prestataire) {
        throw new Error(`L'utilisateur ${email} n'a pas de profil prestataire`);
    }
    const offre = await prisma.offre.findFirst({
        where: { code: 'mensuel', actif: true },
    });
    if (!offre) {
        throw new Error('Offre "mensuel" introuvable — lancez npm run db:seed');
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dateFin = new Date(today);
    dateFin.setMonth(dateFin.getMonth() + offre.dureeMois);
    await prisma.abonnement.updateMany({
        where: {
            prestataireId: user.prestataire.id,
            statut: client_1.StatutAbonnement.ACTIF,
        },
        data: { statut: client_1.StatutAbonnement.EXPIRE },
    });
    const abo = await prisma.abonnement.create({
        data: {
            prestataireId: user.prestataire.id,
            offreId: offre.id,
            dateDebut: today,
            dateFin,
            statut: client_1.StatutAbonnement.ACTIF,
        },
        include: {
            offre: { select: { libelle: true, code: true } },
        },
    });
    console.log('Abonnement créé :');
    console.log(`  Prestataire : ${user.prestataire.nom} (${email})`);
    console.log(`  Offre       : ${abo.offre.libelle} (${abo.offre.code})`);
    console.log(`  Début       : ${abo.dateDebut.toISOString().slice(0, 10)}`);
    console.log(`  Fin         : ${abo.dateFin.toISOString().slice(0, 10)}`);
    console.log(`  Statut      : ${abo.statut}`);
    console.log(`  ID          : ${abo.id}`);
}
main()
    .catch((e) => {
    console.error(e instanceof Error ? e.message : e);
    process.exit(1);
})
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=seed-test-abonnement.js.map