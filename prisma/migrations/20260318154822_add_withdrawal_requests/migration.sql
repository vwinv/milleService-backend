-- CreateEnum
CREATE TYPE "WithdrawalMethod" AS ENUM ('ORANGE_MONEY', 'WAVE', 'FREE_MONEY', 'RIB');

-- CreateEnum
CREATE TYPE "WithdrawalStatus" AS ENUM ('EN_ATTENTE', 'TRAITE', 'REFUSE');

-- CreateTable
CREATE TABLE "withdrawal_requests" (
    "id" TEXT NOT NULL,
    "prestataire_id" TEXT NOT NULL,
    "method" "WithdrawalMethod" NOT NULL,
    "status" "WithdrawalStatus" NOT NULL DEFAULT 'EN_ATTENTE',
    "meta" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "withdrawal_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "withdrawal_requests_prestataire_id_idx" ON "withdrawal_requests"("prestataire_id");

-- AddForeignKey
ALTER TABLE "withdrawal_requests" ADD CONSTRAINT "withdrawal_requests_prestataire_id_fkey" FOREIGN KEY ("prestataire_id") REFERENCES "prestataires"("id") ON DELETE CASCADE ON UPDATE CASCADE;
