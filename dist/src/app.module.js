"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_js_1 = require("./app.controller.js");
const app_service_js_1 = require("./app.service.js");
const prisma_module_js_1 = require("./prisma/prisma.module.js");
const auth_module_js_1 = require("./auth/auth.module.js");
const cloudinary_module_js_1 = require("./cloudinary/cloudinary.module.js");
const documents_module_js_1 = require("./documents/documents.module.js");
const prestataires_module_js_1 = require("./prestataires/prestataires.module.js");
const prestations_module_js_1 = require("./prestations/prestations.module.js");
const notifications_module_js_1 = require("./notifications/notifications.module.js");
const geocoding_module_js_1 = require("./geocoding/geocoding.module.js");
const services_module_js_1 = require("./services/services.module.js");
const abonnements_module_js_1 = require("./abonnements/abonnements.module.js");
const wallets_module_js_1 = require("./wallets/wallets.module.js");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_js_1.PrismaModule,
            auth_module_js_1.AuthModule,
            cloudinary_module_js_1.CloudinaryModule,
            documents_module_js_1.DocumentsModule,
            prestataires_module_js_1.PrestatairesModule,
            prestations_module_js_1.PrestationsModule,
            notifications_module_js_1.NotificationsModule,
            geocoding_module_js_1.GeocodingModule,
            services_module_js_1.ServicesModule,
            abonnements_module_js_1.AbonnementsModule,
            wallets_module_js_1.WalletsModule,
        ],
        controllers: [app_controller_js_1.AppController],
        providers: [app_service_js_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map