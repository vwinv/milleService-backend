import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module.js";
import { AuthModule } from "../auth/auth.module.js";
import { NotificationsModule } from "../notifications/notifications.module.js";
import { WalletsModule } from "../wallets/wallets.module.js";
import { PaydunyaModule } from "../paydunya/paydunya.module.js";
import { AbonnementsModule } from "../abonnements/abonnements.module.js";
import { AdminController } from "./admin.controller.js";

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    NotificationsModule,
    WalletsModule,
    PaydunyaModule,
    AbonnementsModule,
  ],
  controllers: [AdminController],
})
export class AdminModule {}
