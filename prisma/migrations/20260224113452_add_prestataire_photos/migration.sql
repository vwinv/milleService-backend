-- CreateTable
CREATE TABLE "prestataire_photos" (
    "id" TEXT NOT NULL,
    "prestataire_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "titre" TEXT,
    "description" TEXT,
    "ordre" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "prestataire_photos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "prestataire_photos_prestataire_id_ordre_idx" ON "prestataire_photos"("prestataire_id", "ordre");

-- AddForeignKey
ALTER TABLE "prestataire_photos" ADD CONSTRAINT "prestataire_photos_prestataire_id_fkey" FOREIGN KEY ("prestataire_id") REFERENCES "prestataires"("id") ON DELETE CASCADE ON UPDATE CASCADE;
