/**
 * Met à jour les types de documents prestataires en base.
 * Usage : npm run db:sync-type-documents
 */
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { syncPrestataireTypeDocuments } from "../src/prestataires/type-documents.catalog";

let connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL est requis");
if (!connectionString.includes("sslmode=")) {
  connectionString +=
    (connectionString.includes("?") ? "&" : "?") + "sslmode=require";
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  await syncPrestataireTypeDocuments(prisma);
  const rows = await prisma.typeDocument.findMany({
    where: { actif: true },
    orderBy: { ordre: "asc" },
    select: { code: true, libelle: true, obligatoire: true },
  });
  console.log("Types de documents actifs :");
  for (const r of rows) {
    console.log(`  - ${r.code} : ${r.libelle}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
