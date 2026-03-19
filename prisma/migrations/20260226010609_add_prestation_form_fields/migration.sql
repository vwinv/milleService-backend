-- AlterTable
ALTER TABLE "prestations" ADD COLUMN     "budget" DECIMAL(10,2),
ADD COLUMN     "description" TEXT,
ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "type_de_tache" TEXT;
