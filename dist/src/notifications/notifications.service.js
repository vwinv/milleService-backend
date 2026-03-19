"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../prisma/prisma.service.js");
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
        if (process.env.NODE_ENV !== 'test') {
            console.log('[NotificationsService] Push (stub)', { fcmToken: fcmToken.slice(0, 20) + '…', title: payload.title });
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