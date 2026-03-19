import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

export interface SendNotificationPayload {
  title: string;
  body?: string;
  type?: string;
  data?: Record<string, unknown>;
}

/**
 * Enregistre une notification en base et envoie une push au device si un FCM token est enregistré.
 * - Particulier : notifié à chaque changement d'état de la prestation.
 * - Prestataire : notifié à la création de la prestation et au paiement.
 */
@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async sendToUser(
    userId: string,
    payload: SendNotificationPayload,
  ): Promise<void> {
    await this.prisma.notification.create({
      data: {
        userId,
        title: payload.title,
        body: payload.body ?? null,
        type: payload.type ?? null,
        ...(payload.data != null && { data: payload.data as object }),
      },
    });

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { fcmToken: true },
    });
    if (user?.fcmToken) {
      await this.sendPush(user.fcmToken, payload);
    }
  }

  /**
   * Envoi push (FCM). À brancher sur Firebase Admin SDK plus tard.
   * Pour l'instant on log ; l'app peut aussi consommer les notifications via l'API.
   */
  private async sendPush(
    fcmToken: string,
    payload: SendNotificationPayload,
  ): Promise<void> {
    // TODO: intégrer Firebase Admin SDK
    // await admin.messaging().send({ token: fcmToken, notification: { title, body }, data: payload.data });
    if (process.env.NODE_ENV !== 'test') {
      console.log('[NotificationsService] Push (stub)', { fcmToken: fcmToken.slice(0, 20) + '…', title: payload.title });
    }
  }

  async listForUser(userId: string, unreadOnly = false) {
    const list = await this.prisma.notification.findMany({
      where: { userId, ...(unreadOnly ? { lu: false } : {}) },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    return list.map((n) => ({
      id: n.id,
      title: n.title,
      body: n.body,
      type: n.type,
      data: n.data,
      lu: n.lu,
      createdAt: n.createdAt,
    }));
  }

  async markAsRead(userId: string, notificationId: string) {
    await this.prisma.notification.updateMany({
      where: { id: notificationId, userId },
      data: { lu: true },
    });
  }

  async markAllAsRead(userId: string) {
    await this.prisma.notification.updateMany({
      where: { userId },
      data: { lu: true },
    });
  }

  async registerFcmToken(userId: string, fcmToken: string | null) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { fcmToken: fcmToken ?? null },
    });
  }
}
