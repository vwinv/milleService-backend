import { Module } from "@nestjs/common";
import { PrestationsController } from "./prestations.controller.js";
import { PrestationsService } from "./prestations.service.js";
import { PrestataireActiveAbonnementGuard } from "../auth/guards/prestataire-active-abonnement.guard.js";
import { PrismaModule } from "../prisma/prisma.module.js";
import { NotificationsModule } from "../notifications/notifications.module.js";
import { WalletsModule } from "../wallets/wallets.module.js";
import { SamirPayModule } from "../samirpay/samirpay.module.js";
import { AbonnementsModule } from "../abonnements/abonnements.module.js";

@Module({
  imports: [
    PrismaModule,
    NotificationsModule,
    WalletsModule,
    SamirPayModule,
    AbonnementsModule,
  ],
  controllers: [PrestationsController],
  providers: [PrestationsService, PrestataireActiveAbonnementGuard],
})
export class PrestationsModule {}
