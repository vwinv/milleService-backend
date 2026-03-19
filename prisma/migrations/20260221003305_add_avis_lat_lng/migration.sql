-- AlterTable
ALTER TABLE "particuliers" ADD COLUMN     "latitude" DECIMAL(10,7),
ADD COLUMN     "longitude" DECIMAL(10,7);

-- AlterTable
ALTER TABLE "prestataires" ADD COLUMN     "latitude" DECIMAL(10,7),
ADD COLUMN     "longitude" DECIMAL(10,7);

-- CreateTable
CREATE TABLE "avis_prestataire" (
    "id" TEXT NOT NULL,
    "particulier_id" TEXT NOT NULL,
    "prestataire_id" TEXT NOT NULL,
    "note" INTEGER NOT NULL,
    "commentaire" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "avis_prestataire_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "avis_prestataire_prestataire_id_idx" ON "avis_prestataire"("prestataire_id");

-- CreateIndex
CREATE UNIQUE INDEX "avis_prestataire_particulier_id_prestataire_id_key" ON "avis_prestataire"("particulier_id", "prestataire_id");

-- AddForeignKey
ALTER TABLE "avis_prestataire" ADD CONSTRAINT "avis_prestataire_particulier_id_fkey" FOREIGN KEY ("particulier_id") REFERENCES "particuliers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avis_prestataire" ADD CONSTRAINT "avis_prestataire_prestataire_id_fkey" FOREIGN KEY ("prestataire_id") REFERENCES "prestataires"("id") ON DELETE CASCADE ON UPDATE CASCADE;
