import { Controller, Get, Patch, Param, Query, Body, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { CurrentUser, CurrentUserPayload } from '../auth/decorators/current-user.decorator.js';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
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

  @Patch(':id/read')
  markAsRead(@CurrentUser() user: CurrentUserPayload, @Param('id') id: string) {
    return this.notifications.markAsRead(user.userId, id);
  }

  @Patch('fcm-token')
  registerFcmToken(
    @CurrentUser() user: CurrentUserPayload,
    @Body() body: { fcmToken: string | null },
  ) {
    return this.notifications.registerFcmToken(user.userId, body?.fcmToken ?? null);
  }
}
