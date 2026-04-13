import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module.js";
import { PaydunyaService } from "./paydunya.service.js";
import { PaydunyaDisburseWebhookService } from "./paydunya-disburse-webhook.service.js";
import { PaydunyaDisburseWebhookController } from "./paydunya-disburse-webhook.controller.js";

@Module({
  imports: [PrismaModule],
  providers: [PaydunyaService, PaydunyaDisburseWebhookService],
  controllers: [PaydunyaDisburseWebhookController],
  exports: [PaydunyaService],
})
export class PaydunyaModule {}
