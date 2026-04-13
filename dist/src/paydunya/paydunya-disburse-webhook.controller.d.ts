import { PaydunyaDisburseWebhookService } from "./paydunya-disburse-webhook.service.js";
export declare class PaydunyaDisburseWebhookController {
    private readonly handler;
    private readonly logger;
    constructor(handler: PaydunyaDisburseWebhookService);
    disburse(body: Record<string, unknown>): Promise<{
        ok: boolean;
    }>;
}
