/*
  Warnings:

  - You are about to drop the `disponibilites` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TypeRdv" AS ENUM ('SERVICE_SIMPLE', 'EXPRESS', 'URGENCE', 'PLANIFIE');

-- DropForeignKey
ALTER TABLE "disponibilites" DROP CONSTRAINT "disponibilites_prestataire_id_fkey";

-- AlterTable
ALTER TABLE "prestataires" ADD COLUMN     "types_rdv" TEXT;

-- AlterTable
ALTER TABLE "rendez_vous" ADD COLUMN     "type" "TypeRdv" NOT NULL DEFAULT 'SERVICE_SIMPLE';

-- DropTable
DROP TABLE "disponibilites";
