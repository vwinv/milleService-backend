"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("../generated/prisma/client");
const type_documents_catalog_1 = require("../src/prestataires/type-documents.catalog");
let connectionString = process.env.DATABASE_URL;
if (!connectionString)
    throw new Error("DATABASE_URL est requis");
if (!connectionString.includes("sslmode=")) {
    connectionString +=
        (connectionString.includes("?") ? "&" : "?") + "sslmode=require";
}
const adapter = new adapter_pg_1.PrismaPg({ connectionString });
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    await (0, type_documents_catalog_1.syncPrestataireTypeDocuments)(prisma);
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
//# sourceMappingURL=sync-type-documents.js.map