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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var PrestationsPaydunyaWebhookController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrestationsPaydunyaWebhookController = void 0;
const common_1 = require("@nestjs/common");
const prestations_service_js_1 = require("./prestations.service.js");
let PrestationsPaydunyaWebhookController = PrestationsPaydunyaWebhookController_1 = class PrestationsPaydunyaWebhookController {
    prestations;
    logger = new common_1.Logger(PrestationsPaydunyaWebhookController_1.name);
    constructor(prestations) {
        this.prestations = prestations;
    }
    async paydunya(body) {
        this.logger.verbose(`IPN PayDunya brut: ${JSON.stringify(body).slice(0, 600)}`);
        return this.prestations.handlePaydunyaIpn(body ?? {});
    }
};
exports.PrestationsPaydunyaWebhookController = PrestationsPaydunyaWebhookController;
__decorate([
    (0, common_1.Post)("paydunya"),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PrestationsPaydunyaWebhookController.prototype, "paydunya", null);
exports.PrestationsPaydunyaWebhookController = PrestationsPaydunyaWebhookController = PrestationsPaydunyaWebhookController_1 = __decorate([
    (0, common_1.Controller)("webhooks"),
    __metadata("design:paramtypes", [prestations_service_js_1.PrestationsService])
], PrestationsPaydunyaWebhookController);
//# sourceMappingURL=prestations-paydunya-webhook.controller.js.map