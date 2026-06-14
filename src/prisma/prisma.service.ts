import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool, type PoolConfig } from "pg";
import { PrismaClient } from "../../generated/prisma/client.js";
import {
  appendSslModeIfNeeded,
  databaseUrlNeedsSsl,
} from "./database-url.util.js";

/** Local / Render internal : pas de SSL. External Render : sslmode=require + certificat auto-signé. */
function resolvePgPoolConfig(): PoolConfig {
  const raw = process.env.DATABASE_URL;
  if (!raw) {
    throw new Error("DATABASE_URL is not set in environment");
  }
  const connectionString = appendSslModeIfNeeded(raw);
  const config: PoolConfig = { connectionString };
  if (databaseUrlNeedsSsl(raw)) {
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
