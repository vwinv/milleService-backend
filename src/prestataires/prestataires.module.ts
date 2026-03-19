import { Module } from '@nestjs/common';
import { PrestatairesController } from './prestataires.controller.js';
import { PrestatairesService } from './prestataires.service.js';
import { GeocodingModule } from '../geocoding/geocoding.module.js';
import { NotificationsModule } from '../notifications/notifications.module.js';

@Module({
  imports: [GeocodingModule, NotificationsModule],
  controllers: [PrestatairesController],
  providers: [PrestatairesService],
})
export class PrestatairesModule {}
