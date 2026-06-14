import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client.js";
import {
  describeDatabaseUrl,
  resolvePgPoolConfig,
} from "./database-url.util.js";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    const raw = process.env.DATABASE_URL;
    if (!raw) {
      throw new Error("DATABASE_URL is not set in environment");
    }
    // Passer PoolConfig, pas une instance Pool : sinon instanceof pg échoue et findMany plante.
    const poolConfig = resolvePgPoolConfig(raw);
    const adapter = new PrismaPg(poolConfig);
    super({ adapter });
    this.logger.log(`DB mode: ${describeDatabaseUrl(raw)}`);
  }

  async onModuleInit() {
    await this.$connect();
    await this.prestation.findMany({ take: 1 });
    this.logger.log("DB connection OK");
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
