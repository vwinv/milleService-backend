"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaydunyaModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_js_1 = require("../prisma/prisma.module.js");
const paydunya_service_js_1 = require("./paydunya.service.js");
const paydunya_disburse_webhook_service_js_1 = require("./paydunya-disburse-webhook.service.js");
const paydunya_disburse_webhook_controller_js_1 = require("./paydunya-disburse-webhook.controller.js");
let PaydunyaModule = class PaydunyaModule {
};
exports.PaydunyaModule = PaydunyaModule;
exports.PaydunyaModule = PaydunyaModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_js_1.PrismaModule],
        providers: [paydunya_service_js_1.PaydunyaService, paydunya_disburse_webhook_service_js_1.PaydunyaDisburseWebhookService],
        controllers: [paydunya_disburse_webhook_controller_js_1.PaydunyaDisburseWebhookController],
        exports: [paydunya_service_js_1.PaydunyaService],
    })
], PaydunyaModule);
//# sourceMappingURL=paydunya.module.js.map