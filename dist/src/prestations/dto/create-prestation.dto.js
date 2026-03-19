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
exports.CreatePrestationDto = void 0;
const class_validator_1 = require("class-validator");
class CreatePrestationDto {
    prestataireId;
    prestataireServiceId;
    typeDeTache;
    description;
    imageUrl;
    budget;
    adresse;
    codePostal;
    ville;
    noteParticulier;
}
exports.CreatePrestationDto = CreatePrestationDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Le prestataire est requis' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePrestationDto.prototype, "prestataireId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Le service est requis' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePrestationDto.prototype, "prestataireServiceId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePrestationDto.prototype, "typeDeTache", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePrestationDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePrestationDto.prototype, "imageUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePrestationDto.prototype, "budget", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePrestationDto.prototype, "adresse", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePrestationDto.prototype, "codePostal", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePrestationDto.prototype, "ville", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePrestationDto.prototype, "noteParticulier", void 0);
//# sourceMappingURL=create-prestation.dto.js.map