import { PrismaService } from '../prisma/prisma.service.js';
export interface SendNotificationPayload {
    title: string;
    body?: string;
    type?: string;
    data?: Record<string, unknown>;
}
export declare class NotificationsService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    sendToUser(userId: string, payload: SendNotificationPayload): Promise<void>;
    private sendPush;
    listForUser(userId: string, unreadOnly?: boolean): Promise<{
        id: string;
        title: string;
        body: string | null;
        type: string | null;
        data: import("@prisma/client/runtime/client.js").JsonValue;
        lu: boolean;
        createdAt: Date;
    }[]>;
    markAsRead(userId: string, notificationId: string): Promise<void>;
    markAllAsRead(userId: string): Promise<void>;
    registerFcmToken(userId: string, fcmToken: string | null): Promise<void>;
}
