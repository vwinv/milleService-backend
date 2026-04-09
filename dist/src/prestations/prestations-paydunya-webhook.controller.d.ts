import { PrestationsService } from "./prestations.service.js";
export declare class PrestationsPaydunyaWebhookController {
    private readonly prestations;
    private readonly logger;
    constructor(prestations: PrestationsService);
    paydunya(body: Record<string, unknown>): Promise<{
        ok: false;
        error: string;
        ignored?: undefined;
        status?: undefined;
        scope?: undefined;
        alreadyPaid?: undefined;
    } | {
        ok: true;
        ignored: true;
        status: string;
        error?: undefined;
        scope?: undefined;
        alreadyPaid?: undefined;
    } | {
        ok: true;
        scope: "abonnement";
        error?: undefined;
        ignored?: undefined;
        status?: undefined;
        alreadyPaid?: undefined;
    } | {
        ok: true;
        alreadyPaid: true;
        error?: undefined;
        ignored?: undefined;
        status?: undefined;
        scope?: undefined;
    } | {
        ok: true;
        error?: undefined;
        ignored?: undefined;
        status?: undefined;
        scope?: undefined;
        alreadyPaid?: undefined;
    }>;
}
