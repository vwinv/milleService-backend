/**
 * Crée ou met à jour un utilisateur avec le rôle ADMIN (backoffice).
 *
 * Variables d’environnement (optionnelles) :
 *   SUPER_ADMIN_EMAIL    (défaut : admin@milleservices.local)
 *   SUPER_ADMIN_PASSWORD (défaut : ChangeMeAdmin123!)
 *
 * Usage : npm run create-super-admin
 */
import 'dotenv/config';
import * as bcrypt from 'bcrypt';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Role } from '../generated/prisma/client';

let connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL est requis');
if (!connectionString.includes('sslmode=')) {
  connectionString += (connectionString.includes('?') ? '&' : '?') + 'sslmode=require';
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = (process.env.SUPER_ADMIN_EMAIL ?? 'admin@milleservices.local')
    .trim()
    .toLowerCase();
  const password = process.env.SUPER_ADMIN_PASSWORD ?? 'ChangeMeAdmin123!';

  if (password.length < 8) {
    throw new Error('SUPER_ADMIN_PASSWORD doit faire au moins 8 caractères');
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    create: {
      email,
      passwordHash,
      role: Role.ADMIN,
      emailVerified: true,
    },
    update: {
      passwordHash,
      role: Role.ADMIN,
      emailVerified: true,
    },
  });

  console.log('Super admin OK');
  console.log('  id   :', user.id);
  console.log('  email:', user.email);
  console.log('  role :', user.role);
  if (!process.env.SUPER_ADMIN_PASSWORD) {
    console.warn(
      '\n⚠️  Mot de passe par défaut utilisé. Définissez SUPER_ADMIN_PASSWORD dans .env puis relancez pour le changer.',
    );
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
