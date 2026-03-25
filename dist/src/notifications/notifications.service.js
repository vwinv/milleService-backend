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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../prisma/prisma.service.js");
const admin = __importStar(require("firebase-admin"));
const fs = __importStar(require("fs"));
let NotificationsService = class NotificationsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async sendToUser(userId, payload) {
        await this.prisma.notification.create({
            data: {
                userId,
                title: payload.title,
                body: payload.body ?? null,
                type: payload.type ?? null,
                ...(payload.data != null && { data: payload.data }),
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
    async sendPush(fcmToken, payload) {
        try {
            const serviceAccountJson = process.env.FCM_SERVICE_ACCOUNT_JSON;
            const serviceAccountFile = process.env.FCM_SERVICE_ACCOUNT_FILE;
            if (!serviceAccountJson && !serviceAccountFile) {
                if (process.env.NODE_ENV !== 'test') {
                    console.log('[NotificationsService] Push ignoré (FCM non configuré)', { fcmToken: fcmToken.slice(0, 20) + '…', title: payload.title });
                }
                return;
            }
            let serviceAccount;
            if (serviceAccountJson) {
                serviceAccount = JSON.parse(serviceAccountJson);
            }
            else {
                const raw = fs.readFileSync(serviceAccountFile, 'utf8');
                serviceAccount = JSON.parse(raw);
            }
            if (!admin.apps.length) {
                admin.initializeApp({
                    credential: admin.credential.cert(serviceAccount),
                });
            }
            const data = payload.data != null
                ? Object.fromEntries(Object.entries(payload.data).map(([k, v]) => [
                    k,
                    typeof v === 'string'
                        ? v
                        : v == null
                            ? ''
                            : JSON.stringify(v),
                ]))
                : undefined;
            await admin.messaging().send({
                token: fcmToken,
                notification: {
                    title: payload.title,
                    body: payload.body ?? '',
                },
                data,
            });
        }
        catch (e) {
            if (process.env.NODE_ENV !== 'test') {
                console.error('[NotificationsService] Push (FCM) erreur', e);
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
        await this.prisma.user.update({
            where: { id: userId },
            data: { fcmToken: fcmToken ?? null },
        });
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map