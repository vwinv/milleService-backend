-- Super admin : email admin@milleservices.local / mot de passe ChangeMeAdmin123!
-- À exécuter dans psql, Render « SQL », ou tout client PostgreSQL connecté à la même base.
-- Changez l’email ou le hash après la première connexion.

INSERT INTO users (id, email, password_hash, role, email_verified, created_at, updated_at)
VALUES (
  gen_random_uuid()::text,
  'admin@milleservices.local',
  '$2b$10$P7Dl5TEe9yzlQ1rXpRs98OMn663ivezOAUZTJe.lsDYXTH6M4rxwe',
  'ADMIN',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (email) DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  role = 'ADMIN',
  email_verified = true,
  updated_at = NOW();
