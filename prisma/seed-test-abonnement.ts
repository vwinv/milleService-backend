/**
 * Crée un abonnement mensuel actif pour un ou plusieurs prestataires (test manuel).
 * Usage :
 *   npx ts-node prisma/seed-test-abonnement.ts test@gmail.com
 *   npx ts-node prisma/seed-test-abonnement.ts a@mail.com b@mail.com
 */
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, StatutAbonnement } from '../generated/prisma/client';

const emails = process.argv
  .slice(2)
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);
if (emails.length === 0) {
  emails.push('test@gmail.com');
}

let connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL est requis');
const isLocal =
  /@(localhost|127\.0\.0\.1|\[::1\])(:\d+)?\//i.test(connectionString) ||
  connectionString.includes('localhost:');
if (!isLocal && !connectionString.includes('sslmode=')) {
  connectionString += (connectionString.includes('?') ? '&' : '?') + 'sslmode=require';
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function createMonthlyForEmail(email: string) {
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
      statut: StatutAbonnement.ACTIF,
    },
    data: { statut: StatutAbonnement.EXPIRE },
  });

  const abo = await prisma.abonnement.create({
    data: {
      prestataireId: user.prestataire.id,
      offreId: offre.id,
      dateDebut: today,
      dateFin,
      statut: StatutAbonnement.ACTIF,
    },
    include: {
      offre: { select: { libelle: true, code: true } },
    },
  });

  console.log('\nAbonnement créé :');
  console.log(`  Prestataire : ${user.prestataire.nom} (${email})`);
  console.log(`  Offre       : ${abo.offre.libelle} (${abo.offre.code})`);
  console.log(`  Début       : ${abo.dateDebut.toISOString().slice(0, 10)}`);
  console.log(`  Fin         : ${abo.dateFin.toISOString().slice(0, 10)}`);
  console.log(`  Statut      : ${abo.statut}`);
  console.log(`  ID          : ${abo.id}`);
}

async function main() {
  for (const email of emails) {
    await createMonthlyForEmail(email);
  }
}

main()
  .catch((e) => {
    console.error(e instanceof Error ? e.message : e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
