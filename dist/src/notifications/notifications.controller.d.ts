import { NotificationsService } from './notifications.service.js';
import { CurrentUserPayload } from '../auth/decorators/current-user.decorator.js';
export declare class NotificationsController {
    private readonly notifications;
    private readonly logger;
    constructor(notifications: NotificationsService);
    list(user: CurrentUserPayload, unreadOnly?: string): Promise<{
        id: string;
        title: string;
        body: string | null;
        type: string | null;
        data: import("@prisma/client/runtime/client.js").JsonValue;
        lu: boolean;
        createdAt: Date;
    }[]>;
    markAllAsRead(user: CurrentUserPayload): Promise<void>;
    registerFcmToken(user: CurrentUserPayload, body: {
        fcmToken: string | null;
    }): Promise<{
        ok: boolean;
    }>;
    markAsRead(user: CurrentUserPayload, id: string): Promise<void>;
}
