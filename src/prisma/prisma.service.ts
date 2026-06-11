import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client.js";

/** Render / hébergeurs distants exigent SSL ; aligné sur les scripts prisma/*. */
function resolveDatabaseUrl(): string {
  let connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set in environment");
  }
  const isLocal =
    connectionString.includes("localhost") ||
    connectionString.includes("127.0.0.1");
  if (!isLocal && !connectionString.includes("sslmode=")) {
    connectionString +=
      (connectionString.includes("?") ? "&" : "?") + "sslmode=require";
  }
  return connectionString;
}

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const adapter = new PrismaPg({ connectionString: resolveDatabaseUrl() });
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
