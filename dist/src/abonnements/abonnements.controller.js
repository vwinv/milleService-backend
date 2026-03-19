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
};
exports.AbonnementsController = AbonnementsController;
__decorate([
    (0, common_1.Get)('offres'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AbonnementsController.prototype, "getOffres", null);
__decorate([
    (0, common_1.Get)('courant'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('PRESTATAIRE'),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AbonnementsController.prototype, "getCourant", null);
__decorate([
    (0, common_1.Post)('souscrire'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('PRESTATAIRE'),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, souscrire_abonnement_dto_js_1.SouscrireAbonnementDto]),
    __metadata("design:returntype", void 0)
], AbonnementsController.prototype, "souscrire", null);
exports.AbonnementsController = AbonnementsController = __decorate([
    (0, common_1.Controller)('abonnements'),
    __metadata("design:paramtypes", [abonnements_service_js_1.AbonnementsService])
], AbonnementsController);
//# sourceMappingURL=abonnements.controller.js.map