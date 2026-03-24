-- CreateEnum
CREATE TYPE "PrestataireWalletStatut" AS ENUM ('ACTIF', 'BLOQUE');

-- AlterTable
ALTER TABLE "wallets" ADD COLUMN     "balance_plafond" DECIMAL(14,2),
ADD COLUMN     "statut_prestataire_wallet" "PrestataireWalletStatut" NOT NULL DEFAULT 'ACTIF';
