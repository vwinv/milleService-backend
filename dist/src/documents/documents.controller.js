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
exports.DocumentsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const cloudinary_service_js_1 = require("../cloudinary/cloudinary.service.js");
const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED_MIMES = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/heic',
    'image/heif',
    'application/pdf',
];
const ALLOWED_NAME = /\.(jpe?g|png|gif|webp|pdf|heic|heif)$/i;
function isAllowedUpload(file) {
    if (ALLOWED_MIMES.includes(file.mimetype))
        return true;
    if (file.mimetype === 'application/octet-stream' &&
        ALLOWED_NAME.test(file.originalname)) {
        return true;
    }
    return false;
}
let DocumentsController = class DocumentsController {
    cloudinary;
    constructor(cloudinary) {
        this.cloudinary = cloudinary;
    }
    async upload(file) {
        if (!file) {
            throw new common_1.BadRequestException('Aucun fichier envoyé');
        }
        if (!isAllowedUpload(file)) {
            throw new common_1.BadRequestException('Type de fichier non autorisé. Utilisez: JPEG, PNG, GIF, WebP, HEIC ou PDF.');
        }
        const result = await this.cloudinary.uploadDocument(file.buffer, file.originalname, file.mimetype);
        return {
            url: result.secureUrl,
            publicId: result.publicId,
            originalName: file.originalname,
        };
    }
};
exports.DocumentsController = DocumentsController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.memoryStorage)(),
        limits: { fileSize: MAX_SIZE },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "upload", null);
exports.DocumentsController = DocumentsController = __decorate([
    (0, common_1.Controller)('documents'),
    __metadata("design:paramtypes", [cloudinary_service_js_1.CloudinaryService])
], DocumentsController);
//# sourceMappingURL=documents.controller.js.map