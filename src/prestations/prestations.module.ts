import { Module } from "@nestjs/common";
import { PrestationsController } from "./prestations.controller.js";
import { PrestationsPaydunyaWebhookController } from "./prestations-paydunya-webhook.controller.js";
import { PrestationsService } from "./prestations.service.js";
import { NotificationsModule } from "../notifications/notifications.module.js";
import { WalletsModule } from "../wallets/wallets.module.js";
import { PaydunyaModule } from "../paydunya/paydunya.module.js";
import { AbonnementsModule } from "../abonnements/abonnements.module.js";

@Module({
  imports: [
    NotificationsModule,
    WalletsModule,
    PaydunyaModule,
    AbonnementsModule,
  ],
  controllers: [PrestationsController, PrestationsPaydunyaWebhookController],
  providers: [PrestationsService],
})
export class PrestationsModule {}
