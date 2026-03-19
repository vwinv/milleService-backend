-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PARTICULIER', 'PRESTATAIRE', 'ADMIN');

-- CreateEnum
CREATE TYPE "StatutVerificationPrestataire" AS ENUM ('NON_VERIFIE', 'EN_ATTENTE', 'VERIFIE', 'REFUSE');

-- CreateEnum
CREATE TYPE "StatutDocument" AS ENUM ('EN_ATTENTE', 'VALIDE', 'REFUSE');

-- CreateEnum
CREATE TYPE "StatutRdv" AS ENUM ('DEMANDE', 'CONFIRME', 'ANNULE', 'TERMINE', 'NO_SHOW');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "particuliers" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "telephone" TEXT,
    "avatar_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "particuliers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prestataires" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "telephone" TEXT,
    "bio" TEXT,
    "avatar_url" TEXT,
    "zone_intervention" TEXT[],
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "statut_verification" "StatutVerificationPrestataire" NOT NULL DEFAULT 'NON_VERIFIE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prestataires_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "type_documents" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "libelle" TEXT NOT NULL,
    "description" TEXT,
    "obligatoire" BOOLEAN NOT NULL DEFAULT true,
    "ordre" INTEGER NOT NULL DEFAULT 0,
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "type_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prestataire_documents" (
    "id" TEXT NOT NULL,
    "prestataire_id" TEXT NOT NULL,
    "type_document_id" TEXT NOT NULL,
    "fichier_url" TEXT NOT NULL,
    "nom_fichier" TEXT,
    "statut" "StatutDocument" NOT NULL DEFAULT 'EN_ATTENTE',
    "valide_par" TEXT,
    "valide_at" TIMESTAMP(3),
    "motif_refus" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prestataire_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "libelle" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "icone" TEXT,
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prestataire_services" (
    "id" TEXT NOT NULL,
    "prestataire_id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,
    "tarif_horaire" DECIMAL(10,2),
    "duree_defaut_min" INTEGER,
    "description" TEXT,
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prestataire_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "disponibilites" (
    "id" TEXT NOT NULL,
    "prestataire_id" TEXT NOT NULL,
    "jour_semaine" INTEGER,
    "date" DATE,
    "heure_debut" TEXT NOT NULL,
    "heure_fin" TEXT NOT NULL,
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "disponibilites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rendez_vous" (
    "id" TEXT NOT NULL,
    "particulier_id" TEXT NOT NULL,
    "prestataire_id" TEXT NOT NULL,
    "prestataire_service_id" TEXT NOT NULL,
    "date_heure" TIMESTAMP(3) NOT NULL,
    "duree_minutes" INTEGER NOT NULL DEFAULT 60,
    "statut" "StatutRdv" NOT NULL DEFAULT 'DEMANDE',
    "adresse" TEXT,
    "code_postal" TEXT,
    "ville" TEXT,
    "note_particulier" TEXT,
    "note_prestataire" TEXT,
    "annule_at" TIMESTAMP(3),
    "annule_raison" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rendez_vous_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "particuliers_user_id_key" ON "particuliers"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "prestataires_user_id_key" ON "prestataires"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "type_documents_code_key" ON "type_documents"("code");

-- CreateIndex
CREATE INDEX "prestataire_documents_prestataire_id_idx" ON "prestataire_documents"("prestataire_id");

-- CreateIndex
CREATE INDEX "prestataire_documents_statut_idx" ON "prestataire_documents"("statut");

-- CreateIndex
CREATE UNIQUE INDEX "prestataire_documents_prestataire_id_type_document_id_key" ON "prestataire_documents"("prestataire_id", "type_document_id");

-- CreateIndex
CREATE UNIQUE INDEX "services_slug_key" ON "services"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "prestataire_services_prestataire_id_service_id_key" ON "prestataire_services"("prestataire_id", "service_id");

-- CreateIndex
CREATE INDEX "rendez_vous_particulier_id_date_heure_idx" ON "rendez_vous"("particulier_id", "date_heure");

-- CreateIndex
CREATE INDEX "rendez_vous_prestataire_id_date_heure_idx" ON "rendez_vous"("prestataire_id", "date_heure");

-- CreateIndex
CREATE INDEX "rendez_vous_statut_idx" ON "rendez_vous"("statut");

-- AddForeignKey
ALTER TABLE "particuliers" ADD CONSTRAINT "particuliers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prestataires" ADD CONSTRAINT "prestataires_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prestataire_documents" ADD CONSTRAINT "prestataire_documents_prestataire_id_fkey" FOREIGN KEY ("prestataire_id") REFERENCES "prestataires"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prestataire_documents" ADD CONSTRAINT "prestataire_documents_type_document_id_fkey" FOREIGN KEY ("type_document_id") REFERENCES "type_documents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prestataire_services" ADD CONSTRAINT "prestataire_services_prestataire_id_fkey" FOREIGN KEY ("prestataire_id") REFERENCES "prestataires"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prestataire_services" ADD CONSTRAINT "prestataire_services_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disponibilites" ADD CONSTRAINT "disponibilites_prestataire_id_fkey" FOREIGN KEY ("prestataire_id") REFERENCES "prestataires"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rendez_vous" ADD CONSTRAINT "rendez_vous_particulier_id_fkey" FOREIGN KEY ("particulier_id") REFERENCES "particuliers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rendez_vous" ADD CONSTRAINT "rendez_vous_prestataire_id_fkey" FOREIGN KEY ("prestataire_id") REFERENCES "prestataires"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rendez_vous" ADD CONSTRAINT "rendez_vous_prestataire_service_id_fkey" FOREIGN KEY ("prestataire_service_id") REFERENCES "prestataire_services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
