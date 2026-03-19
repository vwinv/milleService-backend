import { Module } from '@nestjs/common';
import { AbonnementsController } from './abonnements.controller.js';
import { AbonnementsService } from './abonnements.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { WalletsModule } from '../wallets/wallets.module.js';

@Module({
  imports: [PrismaModule, WalletsModule],
  controllers: [AbonnementsController],
  providers: [AbonnementsService],
  exports: [AbonnementsService],
})
export class AbonnementsModule {}
