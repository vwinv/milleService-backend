/*
  Warnings:

  - You are about to drop the column `types_rdv` on the `prestataires` table. All the data in the column will be lost.
  - You are about to drop the `rendez_vous` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "StatutPrestation" AS ENUM ('EN_ATTENTE', 'EN_COURS', 'TERMINEE', 'ANNULEE', 'PAYEE');

-- DropForeignKey
ALTER TABLE "rendez_vous" DROP CONSTRAINT "rendez_vous_particulier_id_fkey";

-- DropForeignKey
ALTER TABLE "rendez_vous" DROP CONSTRAINT "rendez_vous_prestataire_id_fkey";

-- DropForeignKey
ALTER TABLE "rendez_vous" DROP CONSTRAINT "rendez_vous_prestataire_service_id_fkey";

-- AlterTable
ALTER TABLE "prestataires" DROP COLUMN "types_rdv";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "fcm_token" TEXT;

-- DropTable
DROP TABLE "rendez_vous";

-- DropEnum
DROP TYPE "StatutRdv";

-- DropEnum
DROP TYPE "TypeRdv";

-- CreateTable
CREATE TABLE "prestations" (
    "id" TEXT NOT NULL,
    "particulier_id" TEXT NOT NULL,
    "prestataire_id" TEXT NOT NULL,
    "prestataire_service_id" TEXT NOT NULL,
    "adresse" TEXT,
    "code_postal" TEXT,
    "ville" TEXT,
    "note_particulier" TEXT,
    "statut" "StatutPrestation" NOT NULL DEFAULT 'EN_ATTENTE',
    "accepted_at" TIMESTAMP(3),
    "completed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prestations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT,
    "type" TEXT,
    "data" JSONB,
    "lu" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "prestations_particulier_id_idx" ON "prestations"("particulier_id");

-- CreateIndex
CREATE INDEX "prestations_prestataire_id_idx" ON "prestations"("prestataire_id");

-- CreateIndex
CREATE INDEX "prestations_statut_idx" ON "prestations"("statut");

-- CreateIndex
CREATE INDEX "notifications_user_id_idx" ON "notifications"("user_id");

-- CreateIndex
CREATE INDEX "notifications_user_id_lu_idx" ON "notifications"("user_id", "lu");

-- AddForeignKey
ALTER TABLE "prestations" ADD CONSTRAINT "prestations_particulier_id_fkey" FOREIGN KEY ("particulier_id") REFERENCES "particuliers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prestations" ADD CONSTRAINT "prestations_prestataire_id_fkey" FOREIGN KEY ("prestataire_id") REFERENCES "prestataires"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prestations" ADD CONSTRAINT "prestations_prestataire_service_id_fkey" FOREIGN KEY ("prestataire_service_id") REFERENCES "prestataire_services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
