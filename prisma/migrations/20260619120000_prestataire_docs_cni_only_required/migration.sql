-- Validation prestataire : seuls CNI recto/verso restent obligatoires.
UPDATE "type_documents"
SET "obligatoire" = false, "updated_at" = NOW()
WHERE "code" IN ('certificat_residence', 'diplome');

UPDATE "type_documents"
SET "obligatoire" = true, "updated_at" = NOW()
WHERE "code" IN ('cni_recto', 'cni_verso');
