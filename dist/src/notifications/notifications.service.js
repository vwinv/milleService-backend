"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NotificationsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../prisma/prisma.service.js");
const fs = __importStar(require("fs"));
const firebase_admin_runtime_js_1 = require("./firebase-admin.runtime.js");
function fcmTokenFingerprint(token) {
    const t = token.trim();
    if (!t)
        return '(vide)';
    if (t.length < 24)
        return `(token court len=${t.length})`;
    return `${t.slice(0, 10)}…${t.slice(-8)} (len=${t.length})`;
}
let NotificationsService = NotificationsService_1 = class NotificationsService {
    prisma;
    logger = new common_1.Logger(NotificationsService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async sendToUser(userId, payload) {
        if (process.env.NODE_ENV !== 'test') {
            this.logger.log(`[FCM trace] sendToUser début userId=${userId} title="${payload.title}" type=${payload.type ?? '—'}`);
        }
        const notif = await this.prisma.notification.create({
            data: {
                userId,
                title: payload.title,
                body: payload.body ?? null,
                type: payload.type ?? null,
                ...(payload.data != null && { data: payload.data }),
            },
        });
        if (process.env.NODE_ENV !== 'test') {
            this.logger.log(`[FCM trace] notification DB créée id=${notif.id} userId=${userId}`);
        }
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { fcmToken: true },
        });
        if (!user?.fcmToken) {
            if (process.env.NODE_ENV !== 'test') {
                this.logger.warn(`[FCM trace] STOP: pas de fcmToken en BDD pour userId=${userId} → pas de push (vérifier PATCH /notifications/fcm-token depuis l'app).`);
            }
            return;
        }
        if (process.env.NODE_ENV !== 'test') {
            this.logger.log(`[FCM trace] fcmToken BDD trouvé ${fcmTokenFingerprint(user.fcmToken)} → tentative sendPush`);
        }
        await this.sendPush(user.fcmToken, payload);
    }
    async sendPush(fcmToken, payload) {
        if (process.env.NODE_ENV !== 'test') {
            this.logger.log(`[FCM trace] sendPush token=${fcmTokenFingerprint(fcmToken)} notification.title="${payload.title}"`);
        }
        try {
            const serviceAccountJson = process.env.FCM_SERVICE_ACCOUNT_JSON;
            const serviceAccountFile = process.env.FCM_SERVICE_ACCOUNT_FILE;
            if (!serviceAccountJson && !serviceAccountFile) {
                if (process.env.NODE_ENV !== 'test') {
                    this.logger.warn(`[FCM trace] STOP: aucune variable FCM_SERVICE_ACCOUNT_JSON ni FCM_SERVICE_ACCOUNT_FILE → push non tentée.`);
                }
                return;
            }
            if (process.env.NODE_ENV !== 'test') {
                this.logger.log(`[FCM trace] config: JSON=${Boolean(serviceAccountJson?.trim())} (len=${serviceAccountJson?.length ?? 0}) file=${serviceAccountFile ? 'oui' : 'non'}`);
            }
            let serviceAccount;
            try {
                if (serviceAccountJson) {
                    const trimmed = serviceAccountJson.trim();
                    serviceAccount = JSON.parse(trimmed);
                }
                else {
                    const raw = fs.readFileSync(serviceAccountFile, 'utf8');
                    serviceAccount = JSON.parse(raw);
                }
            }
            catch (parseErr) {
                if (process.env.NODE_ENV !== 'test') {
                    this.logger.error(`[FCM trace] Échec parse JSON compte de service Firebase: ${parseErr instanceof Error ? parseErr.message : String(parseErr)}`);
                }
                return;
            }
            const projectId = serviceAccount.project_id ?? '—';
            if (process.env.NODE_ENV !== 'test') {
                this.logger.log(`[FCM trace] compte de service OK project_id=${projectId} client_email=${serviceAccount.client_email ?? '—'}`);
            }
            const admin = (0, firebase_admin_runtime_js_1.getFirebaseAdminSdk)();
            if (!admin.apps.length) {
                admin.initializeApp({
                    credential: admin.credential.cert(serviceAccount),
                });
                if (process.env.NODE_ENV !== 'test') {
                    this.logger.log(`[FCM trace] Firebase Admin initializeApp (1ère fois)`);
                }
            }
            else if (process.env.NODE_ENV !== 'test') {
                this.logger.log(`[FCM trace] Firebase Admin déjà initialisé (app count=${admin.apps.length})`);
            }
            const dataPayload = payload.data != null
                ? Object.fromEntries(Object.entries(payload.data).map(([k, v]) => [
                    k,
                    typeof v === 'string'
                        ? v
                        : v == null
                            ? ''
                            : JSON.stringify(v),
                ]))
                : undefined;
            const data = { ...(dataPayload ?? {}) };
            data.title = payload.title;
            data.body = payload.body ?? '';
            const message = {
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
                this.logger.log(`[FCM trace] messaging().send() → token=${fcmTokenFingerprint(fcmToken)} dataKeys=${message.data != null ? Object.keys(message.data).join(',') : '—'}`);
            }
            const messageId = await admin.messaging().send(message);
            if (process.env.NODE_ENV !== 'test') {
                this.logger.log(`[FCM trace] SUCCÈS FCM messageId=${messageId} tokenFin=${fcmToken.slice(-8)}`);
            }
        }
        catch (e) {
            if (process.env.NODE_ENV !== 'test') {
                const anyErr = e;
                const code = anyErr?.code ??
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
    async listForUser(userId, unreadOnly = false) {
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
    async markAsRead(userId, notificationId) {
        await this.prisma.notification.updateMany({
            where: { id: notificationId, userId },
            data: { lu: true },
        });
    }
    async markAllAsRead(userId) {
        await this.prisma.notification.updateMany({
            where: { userId },
            data: { lu: true },
        });
    }
    async registerFcmToken(userId, fcmToken) {
        const fp = fcmToken && fcmToken.trim().length > 0
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
        }
        catch (err) {
            if (process.env.NODE_ENV !== 'test') {
                this.logger.error(`[FCM trace] registerFcmToken ERREUR userId=${userId} ${err instanceof Error ? err.message : String(err)}`);
            }
            throw err;
        }
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = NotificationsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map