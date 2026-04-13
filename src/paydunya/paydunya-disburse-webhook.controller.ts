import { Body, Controller, HttpCode, Logger, Post } from "@nestjs/common";
import { PaydunyaDisburseWebhookService } from "./paydunya-disburse-webhook.service.js";

/**
 * IPN publique PayDunya — déboursement (callback_url).
 * URL utilisée par défaut : {PUBLIC_API_URL ou PAYDUNYA_CALLBACK_BASE_URL}/webhooks/paydunya/disburse
 * (ou PAYDUNYA_DISBURSE_CALLBACK_URL si vous forcez une URL complète).
 */
@Controller("webhooks")
export class PaydunyaDisburseWebhookController {
  private readonly logger = new Logger(PaydunyaDisburseWebhookController.name);

  constructor(private readonly handler: PaydunyaDisburseWebhookService) {}

  @Post("paydunya/disburse")
  @HttpCode(200)
  async disburse(@Body() body: Record<string, unknown>) {
    this.logger.verbose(
      `IPN PayDunya disburse: ${JSON.stringify(body ?? {}).slice(0, 500)}`,
    );
    return this.handler.handleCallback(body ?? {});
  }
}
