import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

let connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL is required');
// Render et bases cloud exigent souvent SSL pour les connexions externes
if (!connectionString.includes('sslmode=')) {
  connectionString += (connectionString.includes('?') ? '&' : '?') + 'sslmode=require';
}
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Services (catégories)
  const services = [
    { libelle: 'Menuiserie', slug: 'menuiserie' },
    { libelle: 'Plomberie', slug: 'plomberie' },
    { libelle: 'Carrelage', slug: 'carrelage' },
    { libelle: 'Electricite', slug: 'electricite' },
    { libelle: 'Maçonnerie', slug: 'maconnerie' },
  ];
  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      create: { libelle: s.libelle, slug: s.slug, actif: true },
      update: { libelle: s.libelle, actif: true },
    });
  }
  console.log('Seed services OK');

  const offres = [
    {
      code: 'mensuel',
      libelle: 'Mensuel',
      description: 'Abonnement 1 mois',
      prix: 5000,
      dureeMois: 1,
      ordre: 1,
    },
    {
      code: 'trimestriel',
      libelle: 'Trimestriel',
      description: 'Abonnement 3 mois (économisez 15%)',
      prix: 12750,
      dureeMois: 3,
      ordre: 2,
    },
    {
      code: 'annuel',
      libelle: 'Annuel',
      description: 'Abonnement 12 mois (économisez 25%)',
      prix: 45000,
      dureeMois: 12,
      ordre: 3,
    },
  ];

  for (const o of offres) {
    await prisma.offre.upsert({
      where: { code: o.code },
      create: o,
      update: { libelle: o.libelle, description: o.description, prix: o.prix, dureeMois: o.dureeMois, ordre: o.ordre },
    });
  }
  console.log('Seed offres OK');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
