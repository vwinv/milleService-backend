import { PrismaService } from "../prisma/prisma.service.js";
export declare class PaydunyaDisburseWebhookService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    handleCallback(body: Record<string, unknown>): Promise<{
        ok: boolean;
    }>;
}
