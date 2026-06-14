import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool, type PoolConfig } from "pg";
import { PrismaClient } from "../../generated/prisma/client.js";

function isLocalDatabaseUrl(connectionString: string): boolean {
  return (
    connectionString.includes("localhost") ||
    connectionString.includes("127.0.0.1")
  );
}

/** Render / hébergeurs distants : SSL requis ; certificat souvent non reconnu par Node sans rejectUnauthorized: false. */
function resolvePgPoolConfig(): PoolConfig {
  let connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set in environment");
  }
  const isLocal = isLocalDatabaseUrl(connectionString);
  if (!isLocal && !connectionString.includes("sslmode=")) {
    connectionString +=
      (connectionString.includes("?") ? "&" : "?") + "sslmode=require";
  }
  const config: PoolConfig = { connectionString };
  if (!isLocal) {
    config.ssl = { rejectUnauthorized: false };
  }
  return config;
}

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly pool: Pool;

  constructor() {
    const pool = new Pool(resolvePgPoolConfig());
    const adapter = new PrismaPg(pool, { disposeExternalPool: true });
    super({ adapter });
    this.pool = pool;
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
    await this.pool.end();
  }
}
