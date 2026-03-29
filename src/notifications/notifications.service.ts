import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import * as fs from 'fs';
import {
  type FirebaseServiceAccountJson,
  type FcmOutgoingMessage,
  getFirebaseAdminSdk,
} from './firebase-admin.runtime.js';

export interface SendNotificationPayload {
  title: string;
  body?: string;
  type?: string;
  data?: Record<string, unknown>;
}

/** Aperçu du token pour les logs (jamais le token complet). */
function fcmTokenFingerprint(token: string): string {
  const t = token.trim();
  if (!t) return '(vide)';
  if (t.length < 24) return `(token court len=${t.length})`;
  return `${t.slice(0, 10)}…${t.slice(-8)} (len=${t.length})`;
}

/**
 * Enregistre une notification en base et envoie une push au device si un FCM token est enregistré.
 * - Particulier : notifié à chaque changement d'état de la prestation.
 * - Prestataire : notifié à la création de la prestation et au paiement.
 */
@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async sendToUser(
    userId: string,
    payload: SendNotificationPayload,
  ): Promise<void> {
    if (process.env.NODE_ENV !== 'test') {
      this.logger.log(
        `[FCM trace] sendToUser début userId=${userId} title="${payload.title}" type=${payload.type ?? '—'}`,
      );
    }

    const notif = await this.prisma.notification.create({
      data: {
        userId,
        title: payload.title,
        body: payload.body ?? null,
        type: payload.type ?? null,
        ...(payload.data != null && { data: payload.data as object }),
      },
    });

    if (process.env.NODE_ENV !== 'test') {
      this.logger.log(
        `[FCM trace] notification DB créée id=${notif.id} userId=${userId}`,
      );
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { fcmToken: true },
    });
    if (!user?.fcmToken) {
      if (process.env.NODE_ENV !== 'test') {
        this.logger.warn(
          `[FCM trace] STOP: pas de fcmToken en BDD pour userId=${userId} → pas de push (vérifier PATCH /notifications/fcm-token depuis l'app).`,
        );
      }
      return;
    }

    if (process.env.NODE_ENV !== 'test') {
      this.logger.log(
        `[FCM trace] fcmToken BDD trouvé ${fcmTokenFingerprint(user.fcmToken)} → tentative sendPush`,
      );
    }
    await this.sendPush(user.fcmToken, payload);
  }

  /**
   * Envoi push (FCM). À brancher sur Firebase Admin SDK plus tard.
   * Pour l'instant on log ; l'app peut aussi consommer les notifications via l'API.
   */
  private async sendPush(
    fcmToken: string,
    payload: SendNotificationPayload,
  ): Promise<void> {
    if (process.env.NODE_ENV !== 'test') {
      this.logger.log(
        `[FCM trace] sendPush token=${fcmTokenFingerprint(fcmToken)} notification.title="${payload.title}"`,
      );
    }

    try {
      const serviceAccountJson = process.env.FCM_SERVICE_ACCOUNT_JSON;
      const serviceAccountFile = process.env.FCM_SERVICE_ACCOUNT_FILE;

      // Si la config FCM n'est pas présente, on ne bloque pas l'app (les notifications restent en base).
      if (!serviceAccountJson && !serviceAccountFile) {
        if (process.env.NODE_ENV !== 'test') {
          this.logger.warn(
            `[FCM trace] STOP: aucune variable FCM_SERVICE_ACCOUNT_JSON ni FCM_SERVICE_ACCOUNT_FILE → push non tentée.`,
          );
        }
        return;
      }

      if (process.env.NODE_ENV !== 'test') {
        this.logger.log(
          `[FCM trace] config: JSON=${Boolean(serviceAccountJson?.trim())} (len=${serviceAccountJson?.length ?? 0}) file=${serviceAccountFile ? 'oui' : 'non'}`,
        );
      }

      let serviceAccount: FirebaseServiceAccountJson;
      try {
        if (serviceAccountJson) {
          const trimmed = serviceAccountJson.trim();
          serviceAccount = JSON.parse(trimmed) as FirebaseServiceAccountJson;
        } else {
          const raw = fs.readFileSync(serviceAccountFile as string, 'utf8');
          serviceAccount = JSON.parse(raw) as FirebaseServiceAccountJson;
        }
      } catch (parseErr) {
        if (process.env.NODE_ENV !== 'test') {
          this.logger.error(
            `[FCM trace] Échec parse JSON compte de service Firebase: ${parseErr instanceof Error ? parseErr.message : String(parseErr)}`,
          );
        }
        return;
      }

      const projectId =
        (serviceAccount as { project_id?: string }).project_id ?? '—';
      if (process.env.NODE_ENV !== 'test') {
        this.logger.log(
          `[FCM trace] compte de service OK project_id=${projectId} client_email=${(serviceAccount as { client_email?: string }).client_email ?? '—'}`,
        );
      }

      const admin = getFirebaseAdminSdk();

      // Initialiser Firebase Admin une seule fois.
      if (!admin.apps.length) {
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });
        if (process.env.NODE_ENV !== 'test') {
          this.logger.log(`[FCM trace] Firebase Admin initializeApp (1ère fois)`);
        }
      } else if (process.env.NODE_ENV !== 'test') {
        this.logger.log(`[FCM trace] Firebase Admin déjà initialisé (app count=${admin.apps.length})`);
      }

      const dataPayload =
        payload.data != null
          ? Object.fromEntries(
              Object.entries(payload.data).map(([k, v]) => [
                k,
                typeof v === 'string'
                  ? v
                  : v == null
                    ? ''
                    : JSON.stringify(v),
              ]),
            )
          : undefined;

      /** Toujours dupliquer titre/corps en `data` (strings) : sur Android le client peut ne recevoir que `data`, et Flutter lit title/body depuis là. */
      const data: Record<string, string> = { ...(dataPayload ?? {}) };
      data.title = payload.title;
      data.body = payload.body ?? '';

      const message: FcmOutgoingMessage = {
        token: fcmToken,
        notification: {
          title: payload.title,
          body: payload.body ?? '',
        },
        data,
        android: {
          priority: 'high',
          notification: {
            channelId: 'mille_services_default',
            sound: 'default',
          },
        },
      };

      if (process.env.NODE_ENV !== 'test') {
        this.logger.log(
          `[FCM trace] messaging().send() → token=${fcmTokenFingerprint(fcmToken)} dataKeys=${message.data != null ? Object.keys(message.data).join(',') : '—'}`,
        );
      }

      const messageId = await admin.messaging().send(message);
      if (process.env.NODE_ENV !== 'test') {
        this.logger.log(
          `[FCM trace] SUCCÈS FCM messageId=${messageId} tokenFin=${fcmToken.slice(-8)}`,
        );
      }
    } catch (e) {
      // On ne casse jamais le flow métier : en cas d'erreur FCM, on garde l'enregistrement en base.
      if (process.env.NODE_ENV !== 'test') {
        const anyErr = e as {
          code?: string;
          errorInfo?: { code?: string; message?: string };
        };
        const code =
          anyErr?.code ??
          anyErr?.errorInfo?.code ??
          (e instanceof Error ? e.name : 'unknown');
        const msg = e instanceof Error ? e.message : String(e);
        this.logger.error(`[FCM trace] ÉCHEC FCM code=${code} message=${msg}`);
        if (anyErr?.errorInfo?.message) {
          this.logger.error(`[FCM trace] errorInfo.message=${anyErr.errorInfo.message}`);
        }
        if (e instanceof Error && e.stack) {
          this.logger.warn(e.stack);
        }
      }
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
    const fp =
      fcmToken && fcmToken.trim().length > 0
        ? fcmTokenFingerprint(fcmToken)
        : 'null';
    if (process.env.NODE_ENV !== 'test') {
      this.logger.log(`[FCM trace] registerFcmToken userId=${userId} token=${fp}`);
    }
    try {
      await this.prisma.user.update({
        where: { id: userId },
        data: { fcmToken: fcmToken ?? null },
      });
      if (process.env.NODE_ENV !== 'test') {
        this.logger.log(`[FCM trace] registerFcmToken OK userId=${userId}`);
      }
    } catch (err) {
      if (process.env.NODE_ENV !== 'test') {
        this.logger.error(
          `[FCM trace] registerFcmToken ERREUR userId=${userId} ${err instanceof Error ? err.message : String(err)}`,
        );
      }
      throw err;
    }
  }
}
