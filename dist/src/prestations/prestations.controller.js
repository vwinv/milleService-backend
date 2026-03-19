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
exports.PrestationsController = void 0;
const common_1 = require("@nestjs/common");
const prestations_service_js_1 = require("./prestations.service.js");
const create_prestation_dto_js_1 = require("./dto/create-prestation.dto.js");
const jwt_auth_guard_js_1 = require("../auth/guards/jwt-auth.guard.js");
const roles_guard_js_1 = require("../auth/guards/roles.guard.js");
const roles_decorator_js_1 = require("../auth/decorators/roles.decorator.js");
const current_user_decorator_js_1 = require("../auth/decorators/current-user.decorator.js");
let PrestationsController = class PrestationsController {
    prestations;
    constructor(prestations) {
        this.prestations = prestations;
    }
    create(user, dto) {
        return this.prestations.create(user.userId, dto);
    }
    listMine(user) {
        return this.prestations.listForUser(user.userId, user.role);
    }
    findById(user, id) {
        return this.prestations.findById(id, user.userId, user.role);
    }
    accepter(user, id) {
        return this.prestations.accepter(user.userId, id);
    }
    demarrer(user, id) {
        return this.prestations.demarrer(user.userId, id);
    }
    refuser(user, id) {
        return this.prestations.refuser(user.userId, id);
    }
    terminer(user, id) {
        return this.prestations.terminer(user.userId, id);
    }
    marquerPayee(user, id) {
        return this.prestations.marquerPayee(user.userId, id);
    }
};
exports.PrestationsController = PrestationsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('PARTICULIER'),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_prestation_dto_js_1.CreatePrestationDto]),
    __metadata("design:returntype", void 0)
], PrestationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PrestationsController.prototype, "listMine", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], PrestationsController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)(':id/accepter'),
    (0, common_1.UseGuards)(roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('PRESTATAIRE'),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], PrestationsController.prototype, "accepter", null);
__decorate([
    (0, common_1.Patch)(':id/demarrer'),
    (0, common_1.UseGuards)(roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('PRESTATAIRE'),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], PrestationsController.prototype, "demarrer", null);
__decorate([
    (0, common_1.Patch)(':id/refuser'),
    (0, common_1.UseGuards)(roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('PRESTATAIRE'),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], PrestationsController.prototype, "refuser", null);
__decorate([
    (0, common_1.Patch)(':id/terminer'),
    (0, common_1.UseGuards)(roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('PRESTATAIRE'),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], PrestationsController.prototype, "terminer", null);
__decorate([
    (0, common_1.Patch)(':id/payer'),
    (0, common_1.UseGuards)(roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('PARTICULIER'),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], PrestationsController.prototype, "marquerPayee", null);
exports.PrestationsController = PrestationsController = __decorate([
    (0, common_1.Controller)('prestations'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard),
    __metadata("design:paramtypes", [prestations_service_js_1.PrestationsService])
], PrestationsController);
//# sourceMappingURL=prestations.controller.js.map