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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbonnementsController = void 0;
const common_1 = require("@nestjs/common");
const abonnements_service_js_1 = require("./abonnements.service.js");
const jwt_auth_guard_js_1 = require("../auth/guards/jwt-auth.guard.js");
const roles_guard_js_1 = require("../auth/guards/roles.guard.js");
const roles_decorator_js_1 = require("../auth/decorators/roles.decorator.js");
const current_user_decorator_js_1 = require("../auth/decorators/current-user.decorator.js");
const souscrire_abonnement_dto_js_1 = require("./dto/souscrire-abonnement.dto.js");
const softpay_abonnement_dto_js_1 = require("./dto/softpay-abonnement.dto.js");
let AbonnementsController = class AbonnementsController {
    abonnementsService;
    constructor(abonnementsService) {
        this.abonnementsService = abonnementsService;
    }
    getOffres() {
        return this.abonnementsService.getOffres();
    }
    getCourant(user) {
        return this.abonnementsService.getAbonnementCourant(user.userId);
    }
    souscrire(user, dto) {
        return this.abonnementsService.souscrire(user.userId, dto.offreId);
    }
    initPaydunya(user, dto) {
        return this.abonnementsService.initPaydunyaCheckout(user.userId, dto.offreId);
    }
    invoicePaid(user, invoiceToken) {
        return this.abonnementsService.isPaydunyaInvoicePaidForPrestataire(user.userId, invoiceToken ?? "");
    }
    softPay(user, dto) {
        return this.abonnementsService.softPayAbonnement(user.userId, dto);
    }
    payWave(user, dto) {
        return this.abonnementsService.softPayAbonnement(user.userId, {
            ...dto,
            method: "wave_sn",
        });
    }
    payOrangeMoney(user, dto) {
        return this.abonnementsService.softPayAbonnement(user.userId, {
            ...dto,
            method: "orange_money_sn",
        });
    }
    payFreeMoney(user, dto) {
        return this.abonnementsService.softPayAbonnement(user.userId, {
            ...dto,
            method: "free_money_sn",
        });
    }
};
exports.AbonnementsController = AbonnementsController;
__decorate([
    (0, common_1.Get)("offres"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AbonnementsController.prototype, "getOffres", null);
__decorate([
    (0, common_1.Get)("courant"),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)("PRESTATAIRE"),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AbonnementsController.prototype, "getCourant", null);
__decorate([
    (0, common_1.Post)("souscrire"),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)("PRESTATAIRE"),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, souscrire_abonnement_dto_js_1.SouscrireAbonnementDto]),
    __metadata("design:returntype", void 0)
], AbonnementsController.prototype, "souscrire", null);
__decorate([
    (0, common_1.Post)("souscrire/paydunya/init"),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)("PRESTATAIRE"),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, souscrire_abonnement_dto_js_1.SouscrireAbonnementDto]),
    __metadata("design:returntype", void 0)
], AbonnementsController.prototype, "initPaydunya", null);
__decorate([
    (0, common_1.Get)("souscrire/paydunya/invoice-paid"),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)("PRESTATAIRE"),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)()),
    __param(1, (0, common_1.Query)("invoiceToken")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AbonnementsController.prototype, "invoicePaid", null);
__decorate([
    (0, common_1.Post)("souscrire/paydunya/softpay"),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)("PRESTATAIRE"),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, softpay_abonnement_dto_js_1.SoftPayAbonnementDto]),
    __metadata("design:returntype", void 0)
], AbonnementsController.prototype, "softPay", null);
__decorate([
    (0, common_1.Post)("souscrire/paydunya/wave"),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)("PRESTATAIRE"),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, softpay_abonnement_dto_js_1.SoftPayAbonnementBodyDto]),
    __metadata("design:returntype", void 0)
], AbonnementsController.prototype, "payWave", null);
__decorate([
    (0, common_1.Post)("souscrire/paydunya/orange-money"),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)("PRESTATAIRE"),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, softpay_abonnement_dto_js_1.SoftPayAbonnementBodyDto]),
    __metadata("design:returntype", void 0)
], AbonnementsController.prototype, "payOrangeMoney", null);
__decorate([
    (0, common_1.Post)("souscrire/paydunya/free-money"),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)("PRESTATAIRE"),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, softpay_abonnement_dto_js_1.SoftPayAbonnementBodyDto]),
    __metadata("design:returntype", void 0)
], AbonnementsController.prototype, "payFreeMoney", null);
exports.AbonnementsController = AbonnementsController = __decorate([
    (0, common_1.Controller)("abonnements"),
    __metadata("design:paramtypes", [abonnements_service_js_1.AbonnementsService])
], AbonnementsController);
//# sourceMappingURL=abonnements.controller.js.map