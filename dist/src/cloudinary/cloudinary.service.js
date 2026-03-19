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
exports.CloudinaryService = exports.CLOUDINARY_FOLDER = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
exports.CLOUDINARY_FOLDER = 'milleservices/documents';
let CloudinaryService = class CloudinaryService {
    constructor() {
        cloudinary_1.v2.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    }
    async uploadDocument(buffer, originalName) {
        const isPdf = /\.pdf$/i.test(originalName);
        const resourceType = isPdf ? 'raw' : 'image';
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary_1.v2.uploader.upload_stream({
                folder: exports.CLOUDINARY_FOLDER,
                resource_type: resourceType,
                use_filename: true,
                unique_filename: true,
            }, (error, result) => {
                if (error)
                    return reject(error);
                if (!result || !result.secure_url) {
                    return reject(new Error('Upload failed: no result'));
                }
                resolve({
                    url: result.secure_url,
                    secureUrl: result.secure_url,
                    publicId: result.public_id ?? '',
                });
            });
            uploadStream.end(buffer);
        });
    }
};
exports.CloudinaryService = CloudinaryService;
exports.CloudinaryService = CloudinaryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CloudinaryService);
//# sourceMappingURL=cloudinary.service.js.map