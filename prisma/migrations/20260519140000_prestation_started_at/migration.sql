-- Décompte prestation : commence à l'arrivée du prestataire (pas à l'acceptation).

ALTER TABLE "prestations" ADD COLUMN IF NOT EXISTS "started_at" TIMESTAMP(3);

UPDATE "prestations"
SET "started_at" = "accepted_at"
WHERE "started_at" IS NULL
  AND "statut" IN ('EN_COURS', 'TERMINEE', 'PAYEE')
  AND "accepted_at" IS NOT NULL;
