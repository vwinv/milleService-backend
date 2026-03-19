-- CreateEnum
CREATE TYPE "StatutAbonnement" AS ENUM ('ACTIF', 'EXPIRE', 'ANNULE');

-- CreateTable
CREATE TABLE "offres" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "libelle" TEXT NOT NULL,
    "description" TEXT,
    "prix" DECIMAL(10,2) NOT NULL,
    "duree_mois" INTEGER NOT NULL,
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "ordre" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "offres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "abonnements" (
    "id" TEXT NOT NULL,
    "prestataire_id" TEXT NOT NULL,
    "offre_id" TEXT NOT NULL,
    "date_debut" DATE NOT NULL,
    "date_fin" DATE NOT NULL,
    "statut" "StatutAbonnement" NOT NULL DEFAULT 'ACTIF',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "abonnements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "offres_code_key" ON "offres"("code");

-- CreateIndex
CREATE INDEX "abonnements_prestataire_id_idx" ON "abonnements"("prestataire_id");

-- CreateIndex
CREATE INDEX "abonnements_statut_idx" ON "abonnements"("statut");

-- CreateIndex
CREATE INDEX "abonnements_date_fin_idx" ON "abonnements"("date_fin");

-- AddForeignKey
ALTER TABLE "abonnements" ADD CONSTRAINT "abonnements_prestataire_id_fkey" FOREIGN KEY ("prestataire_id") REFERENCES "prestataires"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "abonnements" ADD CONSTRAINT "abonnements_offre_id_fkey" FOREIGN KEY ("offre_id") REFERENCES "offres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
