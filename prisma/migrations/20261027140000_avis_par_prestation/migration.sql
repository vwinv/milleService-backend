-- Un avis peut maintenant être lié à une prestation payée.
DROP INDEX IF EXISTS "avis_prestataire_particulier_id_prestataire_id_key";

ALTER TABLE "avis_prestataire" ADD COLUMN "prestation_id" TEXT;

CREATE UNIQUE INDEX "avis_prestataire_prestation_id_key" ON "avis_prestataire"("prestation_id");

CREATE INDEX "avis_prestataire_particulier_id_prestataire_id_idx" ON "avis_prestataire"("particulier_id", "prestataire_id");

ALTER TABLE "avis_prestataire" ADD CONSTRAINT "avis_prestataire_prestation_id_fkey" FOREIGN KEY ("prestation_id") REFERENCES "prestations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
