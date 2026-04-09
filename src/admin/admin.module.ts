import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module.js";
import { AuthModule } from "../auth/auth.module.js";
import { NotificationsModule } from "../notifications/notifications.module.js";
import { WalletsModule } from "../wallets/wallets.module.js";
import { AdminController } from "./admin.controller.js";

@Module({
  imports: [PrismaModule, AuthModule, NotificationsModule, WalletsModule],
  controllers: [AdminController],
})
export class AdminModule {}
