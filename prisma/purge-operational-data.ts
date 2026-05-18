/**
 * Vide les données opérationnelles. Catalogue toujours conservé :
 *   - services (métiers), offres
 *
 * PURGE_KEEP_PROFILES=1 — conserve aussi users, particuliers, prestataires, type_documents
 *
 * Usage :
 *   PURGE_CONFIRM=OUI_PURGER npm run db:purge
 *   PURGE_KEEP_PROFILES=1 PURGE_CONFIRM=OUI_PURGER npm run db:purge
 */
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

function connectionStringWithSsl(): string {
  let url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL est requis');
  if (!url.includes('sslmode=')) {
    url += (url.includes('?') ? '&' : '?') + 'sslmode=require';
  }
  return url;
}

function tablesToTruncate(keepProfiles: boolean, keepTypeDocuments: boolean): string[] {
  const operational = [
    'wallet_transactions',
    'withdrawal_requests',
    'notifications',
    'avis_prestataire',
    'prestations',
    'abonnements',
    'prestataire_documents',
    'prestataire_photos',
    'prestataire_services',
    'wallets',
  ];

  if (keepProfiles) {
    if (!keepTypeDocuments) {
      operational.push('type_documents');
    }
    return operational;
  }

  return [
    ...operational,
    'particuliers',
    'prestataires',
    'users',
    ...(keepTypeDocuments ? [] : ['type_documents']),
  ];
}

function tablesKept(keepProfiles: boolean, keepTypeDocuments: boolean): string[] {
  const kept = ['services', 'offres'];
  if (keepProfiles) {
    kept.push('users', 'particuliers', 'prestataires');
    if (keepTypeDocuments) kept.push('type_documents');
  } else if (keepTypeDocuments) {
    kept.push('type_documents');
  }
  return kept;
}

async function main() {
  if (process.env.PURGE_CONFIRM !== 'OUI_PURGER') {
    console.error(
      [
        'Refusé : définir PURGE_CONFIRM=OUI_PURGER pour confirmer.',
        'Exemple : PURGE_CONFIRM=OUI_PURGER npm run db:purge',
        '',
        'Avant d’exécuter : sauvegardez la base (pg_dump ou backup Render).',
      ].join('\n'),
    );
    process.exit(1);
  }

  const keepProfiles = process.env.PURGE_KEEP_PROFILES === '1';
  const keepTypeDocuments =
    process.env.PURGE_KEEP_TYPE_DOCUMENTS === '1' || keepProfiles;
  const dryRun = process.env.PURGE_DRY_RUN === '1';
  const toTruncate = tablesToTruncate(keepProfiles, keepTypeDocuments);
  const kept = tablesKept(keepProfiles, keepTypeDocuments);
  const quoted = toTruncate.map((t) => `"${t}"`).join(',\n  ');

  const sql = `
BEGIN;
TRUNCATE TABLE
  ${quoted}
RESTART IDENTITY CASCADE;
COMMIT;
`.trim();

  console.log('Tables conservées :', kept.join(', '));
  console.log('Tables vidées :', toTruncate.join(', '));
  console.log('');

  if (dryRun) {
    console.log('--- PURGE_DRY_RUN (aucune modification) ---\n');
    console.log(sql);
    return;
  }

  const adapter = new PrismaPg({ connectionString: connectionStringWithSsl() });
  const prisma = new PrismaClient({ adapter });

  try {
    const before = {
      services: await prisma.service.count(),
      offres: await prisma.offre.count(),
      users: await prisma.user.count(),
      particuliers: await prisma.particulier.count(),
      prestataires: await prisma.prestataire.count(),
      prestations: await prisma.prestation.count(),
    };

    await prisma.$executeRawUnsafe(sql);

    const after = {
      services: await prisma.service.count(),
      offres: await prisma.offre.count(),
      users: await prisma.user.count(),
      particuliers: await prisma.particulier.count(),
      prestataires: await prisma.prestataire.count(),
      prestations: await prisma.prestation.count(),
    };

    console.log('Avant → après');
    for (const key of Object.keys(before) as (keyof typeof before)[]) {
      console.log(`  ${key.padEnd(14)}: ${before[key]} → ${after[key]}`);
    }
    console.log('');
    console.log('Purge terminée.');
    if (!keepProfiles) {
      console.log('  npm run create-super-admin   # recréer un compte admin');
    } else {
      console.log(
        '  Les comptes sont conservés ; wallets/prestations/notifications ont été réinitialisés.',
      );
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
