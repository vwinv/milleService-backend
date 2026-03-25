-- CreateEnum
CREATE TYPE "ParticulierStatut" AS ENUM ('ACTIF', 'INACTIF');

-- AlterTable
ALTER TABLE "particuliers" ADD COLUMN "statut" "ParticulierStatut" NOT NULL DEFAULT 'ACTIF';

-- Aligner avec l’ancien repère « actif » = email vérifié côté users
UPDATE "particuliers" p
SET "statut" = 'INACTIF'
FROM "users" u
WHERE p.user_id = u.id
  AND u.email_verified = false;
