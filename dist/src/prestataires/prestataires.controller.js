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
exports.PrestatairesController = void 0;
const common_1 = require("@nestjs/common");
const prestataires_service_js_1 = require("./prestataires.service.js");
const jwt_auth_guard_js_1 = require("../auth/guards/jwt-auth.guard.js");
const roles_guard_js_1 = require("../auth/guards/roles.guard.js");
const roles_decorator_js_1 = require("../auth/decorators/roles.decorator.js");
const current_user_decorator_js_1 = require("../auth/decorators/current-user.decorator.js");
const favoris_query_dto_js_1 = require("./dto/favoris-query.dto.js");
const search_query_dto_js_1 = require("./dto/search-query.dto.js");
const create_avis_dto_js_1 = require("./dto/create-avis.dto.js");
const create_photo_dto_js_1 = require("./dto/create-photo.dto.js");
const update_me_dto_js_1 = require("./dto/update-me.dto.js");
const update_statut_verification_dto_js_1 = require("./dto/update-statut-verification.dto.js");
const update_documents_dto_js_1 = require("./dto/update-documents.dto.js");
let PrestatairesController = class PrestatairesController {
    prestatairesService;
    constructor(prestatairesService) {
        this.prestatairesService = prestatairesService;
    }
    createAvis(user, dto) {
        return this.prestatairesService.createOrUpdateAvis(user.userId, dto.prestataireId, dto.note, dto.commentaire);
    }
    getFavoris(user, query) {
        return this.prestatairesService.getPrestatairesFavoris(user.userId, query.lat, query.lng);
    }
    search(user, query) {
        return this.prestatairesService.search(user.userId, query.serviceId, query.tarifMin, query.tarifMax, query.date);
    }
    getPrestationStats(user) {
        return this.prestatairesService.getPrestationStats(user.userId);
    }
    getMyServiceIds(user) {
        return this.prestatairesService.getMyServiceIds(user.userId);
    }
    updateMe(user, dto) {
        return this.prestatairesService.updateMe(user.userId, dto);
    }
    getMyPhotos(user) {
        return this.prestatairesService.getMyPhotos(user.userId);
    }
    addPhoto(user, dto) {
        return this.prestatairesService.addPhoto(user.userId, dto);
    }
    getPhotosByPrestataire(prestataireId) {
        return this.prestatairesService.getPhotosByPrestataire(prestataireId);
    }
    getAvisByPrestataire(prestataireId) {
        return this.prestatairesService.getAvisByPrestataireId(prestataireId);
    }
    getMyVerificationStatus(user) {
        return this.prestatairesService.getMyVerificationStatus(user.userId);
    }
    getMyDocuments(user) {
        return this.prestatairesService.getMyDocuments(user.userId);
    }
    updateMyDocuments(user, dto) {
        return this.prestatairesService.updateMyDocuments(user.userId, dto.documents ?? []);
    }
    updateStatutVerification(prestataireId, dto) {
        return this.prestatairesService.updateStatutVerification(prestataireId, dto.statutVerification, dto.motifRefus);
    }
};
exports.PrestatairesController = PrestatairesController;
__decorate([
    (0, common_1.Post)('avis'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('PARTICULIER'),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_avis_dto_js_1.CreateAvisDto]),
    __metadata("design:returntype", void 0)
], PrestatairesController.prototype, "createAvis", null);
__decorate([
    (0, common_1.Get)('favoris'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('PARTICULIER'),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, favoris_query_dto_js_1.FavorisQueryDto]),
    __metadata("design:returntype", void 0)
], PrestatairesController.prototype, "getFavoris", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('PARTICULIER'),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, search_query_dto_js_1.SearchQueryDto]),
    __metadata("design:returntype", void 0)
], PrestatairesController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('me/prestation-stats'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('PRESTATAIRE'),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PrestatairesController.prototype, "getPrestationStats", null);
__decorate([
    (0, common_1.Get)('me/services'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('PRESTATAIRE'),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PrestatairesController.prototype, "getMyServiceIds", null);
__decorate([
    (0, common_1.Patch)('me'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('PRESTATAIRE'),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_me_dto_js_1.UpdateMePrestataireDto]),
    __metadata("design:returntype", void 0)
], PrestatairesController.prototype, "updateMe", null);
__decorate([
    (0, common_1.Get)('me/photos'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('PRESTATAIRE'),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PrestatairesController.prototype, "getMyPhotos", null);
__decorate([
    (0, common_1.Post)('me/photos'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('PRESTATAIRE'),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_photo_dto_js_1.CreatePrestatairePhotoDto]),
    __metadata("design:returntype", void 0)
], PrestatairesController.prototype, "addPhoto", null);
__decorate([
    (0, common_1.Get)(':id/photos'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PrestatairesController.prototype, "getPhotosByPrestataire", null);
__decorate([
    (0, common_1.Get)(':id/avis'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PrestatairesController.prototype, "getAvisByPrestataire", null);
__decorate([
    (0, common_1.Get)('me/verification-status'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('PRESTATAIRE'),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PrestatairesController.prototype, "getMyVerificationStatus", null);
__decorate([
    (0, common_1.Get)('me/documents'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('PRESTATAIRE'),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PrestatairesController.prototype, "getMyDocuments", null);
__decorate([
    (0, common_1.Patch)('me/documents'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('PRESTATAIRE'),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_documents_dto_js_1.UpdatePrestataireDocumentsDto]),
    __metadata("design:returntype", void 0)
], PrestatairesController.prototype, "updateMyDocuments", null);
__decorate([
    (0, common_1.Patch)(':id/statut-verification'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_statut_verification_dto_js_1.UpdateStatutVerificationPrestataireDto]),
    __metadata("design:returntype", void 0)
], PrestatairesController.prototype, "updateStatutVerification", null);
exports.PrestatairesController = PrestatairesController = __decorate([
    (0, common_1.Controller)('prestataires'),
    __metadata("design:paramtypes", [prestataires_service_js_1.PrestatairesService])
], PrestatairesController);
//# sourceMappingURL=prestataires.controller.js.map