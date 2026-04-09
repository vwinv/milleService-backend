import { Body, Controller, HttpCode, Logger, Post } from "@nestjs/common";
import { PrestationsService } from "./prestations.service.js";

/**
 * Endpoint public (sans JWT) pour l’IPN PayDunya.
 * Configurer l’URL exacte : {PUBLIC_API_URL}/webhooks/paydunya
 */
@Controller("webhooks")
export class PrestationsPaydunyaWebhookController {
  private readonly logger = new Logger(
    PrestationsPaydunyaWebhookController.name,
  );

  constructor(private readonly prestations: PrestationsService) {}

  @Post("paydunya")
  @HttpCode(200)
  async paydunya(@Body() body: Record<string, unknown>) {
    this.logger.verbose(
      `IPN PayDunya brut: ${JSON.stringify(body).slice(0, 600)}`,
    );
    return this.prestations.handlePaydunyaIpn(body ?? {});
  }
}
