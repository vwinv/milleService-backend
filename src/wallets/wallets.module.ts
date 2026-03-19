import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { WalletsService } from './wallets.service.js';
import { WalletsController } from './wallets.controller.js';

@Module({
  imports: [PrismaModule],
  providers: [WalletsService],
  controllers: [WalletsController],
  exports: [WalletsService],
})
export class WalletsModule {}

