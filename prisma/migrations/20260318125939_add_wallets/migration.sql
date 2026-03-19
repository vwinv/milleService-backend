-- CreateEnum
CREATE TYPE "WalletType" AS ENUM ('GENERAL', 'PRESTATAIRE');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('PRESTATION', 'ABONNEMENT');

-- CreateTable
CREATE TABLE "wallets" (
    "id" TEXT NOT NULL,
    "type" "WalletType" NOT NULL,
    "prestataire_id" TEXT,
    "balance" DECIMAL(14,2) NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wallets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wallet_transactions" (
    "id" TEXT NOT NULL,
    "wallet_id" TEXT NOT NULL,
    "type" "TransactionType" NOT NULL,
    "amount" DECIMAL(14,2) NOT NULL,
    "prestation_id" TEXT,
    "abonnement_id" TEXT,
    "offre_id" TEXT,
    "meta" JSONB,
    "created_by_user_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wallet_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "wallets_prestataire_id_key" ON "wallets"("prestataire_id");

-- CreateIndex
CREATE UNIQUE INDEX "wallets_type_key" ON "wallets"("type");

-- CreateIndex
CREATE INDEX "wallet_transactions_wallet_id_created_at_idx" ON "wallet_transactions"("wallet_id", "created_at");

-- CreateIndex
CREATE INDEX "wallet_transactions_type_created_at_idx" ON "wallet_transactions"("type", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "wallet_transactions_wallet_id_type_prestation_id_key" ON "wallet_transactions"("wallet_id", "type", "prestation_id");

-- CreateIndex
CREATE UNIQUE INDEX "wallet_transactions_wallet_id_type_abonnement_id_key" ON "wallet_transactions"("wallet_id", "type", "abonnement_id");

-- AddForeignKey
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_prestataire_id_fkey" FOREIGN KEY ("prestataire_id") REFERENCES "prestataires"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallet_transactions" ADD CONSTRAINT "wallet_transactions_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallet_transactions" ADD CONSTRAINT "wallet_transactions_prestation_id_fkey" FOREIGN KEY ("prestation_id") REFERENCES "prestations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallet_transactions" ADD CONSTRAINT "wallet_transactions_abonnement_id_fkey" FOREIGN KEY ("abonnement_id") REFERENCES "abonnements"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallet_transactions" ADD CONSTRAINT "wallet_transactions_offre_id_fkey" FOREIGN KEY ("offre_id") REFERENCES "offres"("id") ON DELETE SET NULL ON UPDATE CASCADE;
