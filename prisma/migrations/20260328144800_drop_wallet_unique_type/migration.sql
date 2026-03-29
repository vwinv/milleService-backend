-- La contrainte unique sur `type` interdisait plusieurs wallets PRESTATAIRE (un seul en base).
-- Le wallet plateforme GENERAL est identifié par type=GENERAL et prestataire_id NULL (logique applicative).
DROP INDEX IF EXISTS "wallets_type_key";
