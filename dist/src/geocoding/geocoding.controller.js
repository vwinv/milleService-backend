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
exports.GeocodingController = void 0;
const common_1 = require("@nestjs/common");
const geocoding_service_js_1 = require("./geocoding.service.js");
let GeocodingController = class GeocodingController {
    geocodingService;
    constructor(geocodingService) {
        this.geocodingService = geocodingService;
    }
    async geocode(address) {
        const q = (address ?? '').trim();
        if (q.length < 3) {
            return { lat: null, lng: null, found: false };
        }
        const result = await this.geocodingService.geocode(q);
        if (result)
            return { ...result, found: true };
        return { lat: null, lng: null, found: false };
    }
    async autocomplete(q) {
        const query = (q ?? '').trim();
        if (query.length < 2)
            return [];
        return this.geocodingService.autocomplete(query);
    }
};
exports.GeocodingController = GeocodingController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('address')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GeocodingController.prototype, "geocode", null);
__decorate([
    (0, common_1.Get)('autocomplete'),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GeocodingController.prototype, "autocomplete", null);
exports.GeocodingController = GeocodingController = __decorate([
    (0, common_1.Controller)('geocoding'),
    __metadata("design:paramtypes", [geocoding_service_js_1.GeocodingService])
], GeocodingController);
//# sourceMappingURL=geocoding.controller.js.map