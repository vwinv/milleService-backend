import { Module } from '@nestjs/common';
import { PrestationsController } from './prestations.controller.js';
import { PrestationsService } from './prestations.service.js';
import { NotificationsModule } from '../notifications/notifications.module.js';
import { WalletsModule } from '../wallets/wallets.module.js';

@Module({
  imports: [NotificationsModule, WalletsModule],
  controllers: [PrestationsController],
  providers: [PrestationsService],
})
export class PrestationsModule {}
