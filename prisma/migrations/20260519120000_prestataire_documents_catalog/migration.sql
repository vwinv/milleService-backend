-- Remplace casier judiciaire / certificat de bonne mœurs par certificat de résidence et diplôme.

UPDATE "type_documents"
SET "actif" = false, "obligatoire" = false, "updated_at" = NOW()
WHERE "code" IN ('casier_judiciaire', 'certificat_bonne_moeurs');

INSERT INTO "type_documents" ("id", "code", "libelle", "obligatoire", "ordre", "actif", "created_at", "updated_at")
VALUES
  (gen_random_uuid()::text, 'certificat_residence', 'Certificat de résidence', true, 3, true, NOW(), NOW()),
  (gen_random_uuid()::text, 'diplome', 'Diplôme', true, 4, true, NOW(), NOW())
ON CONFLICT ("code") DO UPDATE SET
  "libelle" = EXCLUDED."libelle",
  "obligatoire" = true,
  "ordre" = EXCLUDED."ordre",
  "actif" = true,
  "updated_at" = NOW();

UPDATE "type_documents"
SET "ordre" = 1, "libelle" = 'CNI / Passeport (recto)', "obligatoire" = true, "actif" = true, "updated_at" = NOW()
WHERE "code" = 'cni_recto';

UPDATE "type_documents"
SET "ordre" = 2, "libelle" = 'CNI / Passeport (verso)', "obligatoire" = true, "actif" = true, "updated_at" = NOW()
WHERE "code" = 'cni_verso';
