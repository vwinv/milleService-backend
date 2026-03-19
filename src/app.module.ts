import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';
import { CloudinaryModule } from './cloudinary/cloudinary.module.js';
import { DocumentsModule } from './documents/documents.module.js';
import { PrestatairesModule } from './prestataires/prestataires.module.js';
import { PrestationsModule } from './prestations/prestations.module.js';
import { NotificationsModule } from './notifications/notifications.module.js';
import { GeocodingModule } from './geocoding/geocoding.module.js';
import { ServicesModule } from './services/services.module.js';
import { AbonnementsModule } from './abonnements/abonnements.module.js';
import { WalletsModule } from './wallets/wallets.module.js';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    CloudinaryModule,
    DocumentsModule,
    PrestatairesModule,
    PrestationsModule,
    NotificationsModule,
    GeocodingModule,
    ServicesModule,
    AbonnementsModule,
    WalletsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
