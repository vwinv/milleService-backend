import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module.js";
import { SamirPayService } from "./samirpay.service.js";

@Module({
  imports: [PrismaModule],
  providers: [SamirPayService],
  exports: [SamirPayService],
})
export class SamirPayModule {}
