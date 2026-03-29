import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { CurrentUser, CurrentUserPayload } from '../auth/decorators/current-user.decorator.js';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  private readonly logger = new Logger(NotificationsController.name);

  constructor(private readonly notifications: NotificationsService) {}

  @Get()
  list(
    @CurrentUser() user: CurrentUserPayload,
    @Query('unreadOnly') unreadOnly?: string,
  ) {
    return this.notifications.listForUser(user.userId, unreadOnly === 'true');
  }

  @Patch('mark-read')
  markAllAsRead(@CurrentUser() user: CurrentUserPayload) {
    return this.notifications.markAllAsRead(user.userId);
  }

  /** Avant toute route `@Patch(':id/...')` pour éviter qu’un segment littéral soit capturé par `:id`. */
  @Patch('fcm-token')
  async registerFcmToken(
    @CurrentUser() user: CurrentUserPayload,
    @Body() body: { fcmToken: string | null },
  ) {
    const raw = body?.fcmToken;
    const len = raw != null ? String(raw).length : 0;
    this.logger.log(
      `[FCM trace] PATCH /notifications/fcm-token userId=${user.userId} body.fcmToken=${raw == null ? 'null' : `présent (len=${len})`}`,
    );
    await this.notifications.registerFcmToken(user.userId, body?.fcmToken ?? null);
    return { ok: true };
  }

  @Patch(':id/read')
  markAsRead(@CurrentUser() user: CurrentUserPayload, @Param('id') id: string) {
    return this.notifications.markAsRead(user.userId, id);
  }
}
