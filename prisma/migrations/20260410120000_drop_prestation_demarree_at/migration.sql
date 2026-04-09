-- Revert colonne ajoutée pour le compteur « en cours » (retour au schéma précédent).
ALTER TABLE "prestations" DROP COLUMN IF EXISTS "demarree_at";
