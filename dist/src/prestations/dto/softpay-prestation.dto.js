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
exports.SoftPayPrestationDto = exports.SoftPayPrestationBodyDto = exports.PRESTATION_SOFTPAY_METHODS = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
exports.PRESTATION_SOFTPAY_METHODS = [
    "wave_sn",
    "orange_money_sn",
    "free_money_sn",
];
class SoftPayPrestationBodyDto {
    invoiceToken;
    prenom;
    nom;
    telephone;
    email;
}
exports.SoftPayPrestationBodyDto = SoftPayPrestationBodyDto;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => (typeof value === "string" ? value.trim() : value)),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    __metadata("design:type", String)
], SoftPayPrestationBodyDto.prototype, "invoiceToken", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => (typeof value === "string" ? value.trim() : value)),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], SoftPayPrestationBodyDto.prototype, "prenom", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => (typeof value === "string" ? value.trim() : value)),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], SoftPayPrestationBodyDto.prototype, "nom", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => (typeof value === "string" ? value.trim() : value)),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8, { message: "Numéro de téléphone invalide" }),
    __metadata("design:type", String)
], SoftPayPrestationBodyDto.prototype, "telephone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], SoftPayPrestationBodyDto.prototype, "email", void 0);
class SoftPayPrestationDto extends SoftPayPrestationBodyDto {
    method;
}
exports.SoftPayPrestationDto = SoftPayPrestationDto;
__decorate([
    (0, class_validator_1.IsIn)([...exports.PRESTATION_SOFTPAY_METHODS]),
    __metadata("design:type", String)
], SoftPayPrestationDto.prototype, "method", void 0);
//# sourceMappingURL=softpay-prestation.dto.js.map