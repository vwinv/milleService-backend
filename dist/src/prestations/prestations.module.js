"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrestationsModule = void 0;
const common_1 = require("@nestjs/common");
const prestations_controller_js_1 = require("./prestations.controller.js");
const prestations_service_js_1 = require("./prestations.service.js");
const notifications_module_js_1 = require("../notifications/notifications.module.js");
const wallets_module_js_1 = require("../wallets/wallets.module.js");
let PrestationsModule = class PrestationsModule {
};
exports.PrestationsModule = PrestationsModule;
exports.PrestationsModule = PrestationsModule = __decorate([
    (0, common_1.Module)({
        imports: [notifications_module_js_1.NotificationsModule, wallets_module_js_1.WalletsModule],
        controllers: [prestations_controller_js_1.PrestationsController],
        providers: [prestations_service_js_1.PrestationsService],
    })
], PrestationsModule);
//# sourceMappingURL=prestations.module.js.map