"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const prisma_service_js_1 = require("../prisma/prisma.service.js");
const client_js_1 = require("../../generated/prisma/client.js");
const geocoding_service_js_1 = require("../geocoding/geocoding.service.js");
const abonnements_service_js_1 = require("../abonnements/abonnements.service.js");
let AuthService = AuthService_1 = class AuthService {
    prisma;
    jwtService;
    geocodingService;
    abonnementsService;
    logger = new common_1.Logger(AuthService_1.name);
    constructor(prisma, jwtService, geocodingService, abonnementsService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.geocodingService = geocodingService;
        this.abonnementsService = abonnementsService;
    }
    async register(dto) {
        try {
            const existing = await this.prisma.user.findUnique({
                where: { email: dto.email.toLowerCase() },
            });
            if (existing) {
                throw new common_1.ConflictException('Un compte existe déjà avec cet email');
            }
            const passwordHash = await bcrypt.hash(dto.password, 10);
            const role = dto.role;
            if (role === client_js_1.Role.PARTICULIER) {
                if (!dto.nom || !dto.prenom) {
                    throw new common_1.ConflictException('Nom et prénom requis pour un particulier');
                }
                let lat = dto.latitude != null ? dto.latitude : null;
                let lng = dto.longitude != null ? dto.longitude : null;
                const adresseParticulier = dto.adresse?.trim();
                if ((lat == null || lng == null) && adresseParticulier && adresseParticulier.length >= 3) {
                    try {
                        const coords = await this.geocodingService.geocodeWithFallbacks(adresseParticulier);
                        if (coords) {
                            lat = coords.lat;
                            lng = coords.lng;
                        }
                    }
                    catch (_) {
                    }
                }
                const user = await this.prisma.user.create({
                    data: {
                        email: dto.email.toLowerCase(),
                        passwordHash,
                        role: client_js_1.Role.PARTICULIER,
                    },
                });
                await this.prisma.particulier.create({
                    data: {
                        userId: user.id,
                        nom: dto.nom,
                        prenom: dto.prenom,
                        telephone: dto.telephone ?? null,
                        adresse: dto.adresse ?? null,
                        latitude: lat,
                        longitude: lng,
                    },
                });
                const withProfile = await this.prisma.user.findUnique({
                    where: { id: user.id },
                    include: { particulier: true },
                });
                const access_token = this.jwtService.sign({ sub: user.id, email: user.email, role: user.role }, { expiresIn: '15m' });
                const refresh_token = this.jwtService.sign({ sub: user.id, type: 'refresh' }, { expiresIn: '7d' });
                return {
                    access_token,
                    refresh_token,
                    user: this.sanitizeUser(withProfile),
                };
            }
            if (role === client_js_1.Role.PRESTATAIRE) {
                if (!dto.name) {
                    throw new common_1.ConflictException('Nom requis pour un prestataire');
                }
                let lat = dto.latitude != null ? dto.latitude : null;
                let lng = dto.longitude != null ? dto.longitude : null;
                const adressePrestataire = dto.adresse?.trim();
                if ((lat == null || lng == null) && adressePrestataire && adressePrestataire.length >= 3) {
                    try {
                        const coords = await this.geocodingService.geocodeWithFallbacks(adressePrestataire);
                        if (coords) {
                            lat = coords.lat;
                            lng = coords.lng;
                        }
                    }
                    catch (_) {
                    }
                }
                const user = await this.prisma.user.create({
                    data: {
                        email: dto.email.toLowerCase(),
                        passwordHash,
                        role: client_js_1.Role.PRESTATAIRE,
                    },
                });
                const prestataire = await this.prisma.prestataire.create({
                    data: {
                        userId: user.id,
                        nom: dto.name,
                        telephone: dto.telephone ?? null,
                        adresse: dto.adresse?.trim() ?? null,
                        bio: dto.bio ?? null,
                        zoneIntervention: dto.zoneIntervention ?? [],
                        latitude: lat,
                        longitude: lng,
                    },
                });
                const serviceIds = dto.serviceIds?.filter((id) => typeof id === 'string' && id.trim().length > 0) ?? [];
                if (serviceIds.length > 0) {
                    await Promise.all(serviceIds.map((serviceId) => this.prisma.prestataireService.upsert({
                        where: {
                            prestataireId_serviceId: {
                                prestataireId: prestataire.id,
                                serviceId,
                            },
                        },
                        create: {
                            prestataireId: prestataire.id,
                            serviceId,
                            actif: true,
                        },
                        update: {
                            actif: true,
                        },
                    })));
                }
                if (dto.documents && dto.documents.length > 0) {
                    await this.ensureTypeDocumentsExist();
                    for (const doc of dto.documents) {
                        const typeDoc = await this.prisma.typeDocument.findUnique({
                            where: { code: doc.typeCode },
                        });
                        if (typeDoc) {
                            await this.prisma.prestataireDocument.upsert({
                                where: {
                                    prestataireId_typeDocumentId: {
                                        prestataireId: prestataire.id,
                                        typeDocumentId: typeDoc.id,
                                    },
                                },
                                create: {
                                    prestataireId: prestataire.id,
                                    typeDocumentId: typeDoc.id,
                                    fichierUrl: doc.fichierUrl,
                                    nomFichier: doc.nomFichier ?? null,
                                },
                                update: {
                                    fichierUrl: doc.fichierUrl,
                                    nomFichier: doc.nomFichier ?? null,
                                    statut: client_js_1.StatutDocument.EN_ATTENTE,
                                },
                            });
                        }
                    }
                }
                const withProfile = await this.prisma.user.findUnique({
                    where: { id: user.id },
                    include: { prestataire: true },
                });
                const access_token = this.jwtService.sign({ sub: user.id, email: user.email, role: user.role }, { expiresIn: '15m' });
                const refresh_token = this.jwtService.sign({ sub: user.id, type: 'refresh' }, { expiresIn: '7d' });
                return {
                    access_token,
                    refresh_token,
                    user: this.sanitizeUser(withProfile),
                };
            }
            throw new common_1.ConflictException('Rôle non supporté');
        }
        catch (err) {
            this.logger.error('register() erreur:', err instanceof Error ? err.message : String(err));
            if (err instanceof Error && err.stack) {
                this.logger.error(err.stack);
            }
            throw err;
        }
    }
    async login(dto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email.toLowerCase() },
            include: { particulier: true, prestataire: true },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Email ou mot de passe incorrect');
        }
        const ok = await bcrypt.compare(dto.password, user.passwordHash);
        if (!ok) {
            throw new common_1.UnauthorizedException('Email ou mot de passe incorrect');
        }
        if (dto.role && user.role !== dto.role) {
            if (dto.role === client_js_1.Role.PRESTATAIRE) {
                throw new common_1.UnauthorizedException('Ce compte est actuellement client. Connectez-vous depuis l’espace particulier.');
            }
            if (dto.role === client_js_1.Role.PARTICULIER) {
                throw new common_1.UnauthorizedException('Ce compte est actuellement prestataire. Connectez-vous depuis l’espace prestataire.');
            }
            throw new common_1.UnauthorizedException('Rôle de connexion invalide pour ce compte.');
        }
        if (user.role === client_js_1.Role.PRESTATAIRE && user.prestataire && user.prestataire.actif === false) {
            throw new common_1.UnauthorizedException('Votre compte a été désactivé. Veuillez contacter notre équipe pour la réactivation.');
        }
        const access_token = this.jwtService.sign({ sub: user.id, email: user.email, role: user.role }, { expiresIn: '15m' });
        const refresh_token = this.jwtService.sign({ sub: user.id, type: 'refresh' }, { expiresIn: '7d' });
        let abonnement = null;
        if (user.role === client_js_1.Role.PRESTATAIRE) {
            try {
                abonnement = await this.abonnementsService.getAbonnementCourant(user.id);
            }
            catch {
                abonnement = null;
            }
        }
        return {
            access_token,
            refresh_token,
            user: this.sanitizeUser(user),
            abonnement,
        };
    }
    async refresh(refreshToken) {
        try {
            const payload = this.jwtService.verify(refreshToken);
            if (payload?.type !== 'refresh') {
                throw new common_1.UnauthorizedException('Refresh token invalide');
            }
            const user = await this.prisma.user.findUnique({
                where: { id: payload.sub },
                include: { particulier: true, prestataire: true },
            });
            if (!user) {
                throw new common_1.UnauthorizedException('Utilisateur introuvable');
            }
            const access_token = this.jwtService.sign({ sub: user.id, email: user.email, role: user.role }, { expiresIn: '15m' });
            const new_refresh_token = this.jwtService.sign({ sub: user.id, type: 'refresh' }, { expiresIn: '7d' });
            let abonnement = null;
            if (user.role === client_js_1.Role.PRESTATAIRE) {
                try {
                    abonnement = await this.abonnementsService.getAbonnementCourant(user.id);
                }
                catch {
                    abonnement = null;
                }
            }
            return {
                access_token,
                refresh_token: new_refresh_token,
                user: this.sanitizeUser(user),
                abonnement,
            };
        }
        catch {
            throw new common_1.UnauthorizedException('Refresh token expiré ou invalide');
        }
    }
    async deactivateAccount(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { prestataire: true },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Utilisateur introuvable');
        }
        if (user.role === client_js_1.Role.PRESTATAIRE) {
            if (!user.prestataire) {
                throw new common_1.BadRequestException('Profil prestataire introuvable');
            }
            await this.prisma.prestataire.update({
                where: { id: user.prestataire.id },
                data: { actif: false },
            });
            return {
                success: true,
                message: 'Votre compte prestataire a été désactivé. Pour une réactivation, contactez notre équipe.',
            };
        }
        throw new common_1.BadRequestException('La désactivation n’est pas disponible pour ce type de compte.');
    }
    async updateParticulierProfile(userId, dto) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { particulier: true },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Utilisateur introuvable');
        }
        const part = user.particulier;
        if (!part) {
            throw new common_1.BadRequestException('Profil particulier introuvable');
        }
        let lat = dto.latitude != null && !Number.isNaN(dto.latitude)
            ? dto.latitude
            : null;
        let lng = dto.longitude != null && !Number.isNaN(dto.longitude)
            ? dto.longitude
            : null;
        const adresse = dto.adresse?.trim();
        if ((lat == null || lng == null) && adresse && adresse.length >= 3) {
            try {
                const coords = await this.geocodingService.geocodeWithFallbacks(adresse);
                if (coords) {
                    lat = coords.lat;
                    lng = coords.lng;
                }
            }
            catch {
            }
        }
        const data = {};
        if (dto.nom !== undefined) {
            const nom = dto.nom.trim();
            if (!nom) {
                throw new common_1.BadRequestException('Le nom ne peut pas être vide');
            }
            data.nom = nom;
        }
        if (dto.prenom !== undefined) {
            data.prenom = dto.prenom.trim();
        }
        if (dto.telephone !== undefined) {
            data.telephone = dto.telephone.trim();
        }
        if (dto.adresse !== undefined) {
            data.adresse = dto.adresse.trim();
        }
        if (lat != null) {
            data.latitude = lat;
        }
        if (lng != null) {
            data.longitude = lng;
        }
        if (Object.keys(data).length === 0) {
            throw new common_1.BadRequestException('Aucune donnée à mettre à jour');
        }
        const updated = await this.prisma.particulier.update({
            where: { id: part.id },
            data,
        });
        return {
            success: true,
            data: {
                id: updated.id,
                nom: updated.nom,
                prenom: updated.prenom,
                telephone: updated.telephone,
                adresse: updated.adresse,
                latitude: updated.latitude != null ? this.toNumber(updated.latitude) : null,
                longitude: updated.longitude != null ? this.toNumber(updated.longitude) : null,
            },
        };
    }
    async becomePrestataire(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { particulier: true, prestataire: true },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Utilisateur introuvable');
        }
        if (user.role === client_js_1.Role.PRESTATAIRE) {
            throw new common_1.BadRequestException('Vous êtes déjà prestataire.');
        }
        const part = user.particulier;
        if (!part) {
            throw new common_1.BadRequestException('Profil particulier introuvable');
        }
        let lat = this.toNumber(part.latitude);
        let lng = this.toNumber(part.longitude);
        const adresse = (part.adresse ?? '').trim();
        if ((lat == null || lng == null) && adresse.length >= 3) {
            try {
                const coords = await this.geocodingService.geocodeWithFallbacks(adresse);
                if (coords) {
                    lat = coords.lat;
                    lng = coords.lng;
                }
            }
            catch {
            }
        }
        const existingPrest = user.prestataire;
        if (!existingPrest) {
            const nomComplet = `${part.prenom ?? ''} ${part.nom ?? ''}`.trim();
            await this.prisma.prestataire.create({
                data: {
                    userId: user.id,
                    nom: nomComplet.length > 0 ? nomComplet : part.nom,
                    telephone: part.telephone ?? null,
                    bio: null,
                    zoneIntervention: [],
                    latitude: lat,
                    longitude: lng,
                    actif: true,
                },
            });
        }
        else if (existingPrest.actif === false) {
            await this.prisma.prestataire.update({
                where: { id: existingPrest.id },
                data: { actif: true },
            });
        }
        await this.prisma.user.update({
            where: { id: user.id },
            data: { role: client_js_1.Role.PRESTATAIRE },
        });
        const updatedUser = await this.prisma.user.findUnique({
            where: { id: user.id },
            include: { particulier: true, prestataire: true },
        });
        const access_token = this.jwtService.sign({ sub: user.id, email: user.email, role: client_js_1.Role.PRESTATAIRE }, { expiresIn: '15m' });
        const refresh_token = this.jwtService.sign({ sub: user.id, type: 'refresh' }, { expiresIn: '7d' });
        let abonnement = null;
        try {
            abonnement = await this.abonnementsService.getAbonnementCourant(user.id);
        }
        catch {
            abonnement = null;
        }
        return {
            access_token,
            refresh_token,
            user: this.sanitizeUser(updatedUser),
            abonnement,
        };
    }
    async becomeParticulier(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { particulier: true, prestataire: true },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Utilisateur introuvable');
        }
        if (user.role === client_js_1.Role.PARTICULIER) {
            throw new common_1.BadRequestException('Vous êtes déjà client.');
        }
        const prest = user.prestataire;
        if (!prest) {
            throw new common_1.BadRequestException('Profil prestataire introuvable');
        }
        const existingPart = user.particulier;
        if (!existingPart) {
            const nom = prest.nom ?? 'Client';
            await this.prisma.particulier.create({
                data: {
                    userId: user.id,
                    nom,
                    prenom: '',
                    telephone: prest.telephone ?? null,
                    adresse: null,
                    latitude: this.toNumber(prest.latitude),
                    longitude: this.toNumber(prest.longitude),
                },
            });
        }
        await this.prisma.user.update({
            where: { id: user.id },
            data: { role: client_js_1.Role.PARTICULIER },
        });
        const updatedUser = await this.prisma.user.findUnique({
            where: { id: user.id },
            include: { particulier: true, prestataire: true },
        });
        const access_token = this.jwtService.sign({ sub: user.id, email: user.email, role: client_js_1.Role.PARTICULIER }, { expiresIn: '15m' });
        const refresh_token = this.jwtService.sign({ sub: user.id, type: 'refresh' }, { expiresIn: '7d' });
        return {
            access_token,
            refresh_token,
            user: this.sanitizeUser(updatedUser),
            abonnement: null,
        };
    }
    async ensureTypeDocumentsExist() {
        const count = await this.prisma.typeDocument.count();
        if (count > 0)
            return;
        await this.prisma.typeDocument.createMany({
            data: [
                { code: 'cni_recto', libelle: 'CNI / Passeport (recto)', ordre: 1 },
                { code: 'cni_verso', libelle: 'CNI / Passeport (verso)', ordre: 2 },
                { code: 'casier_judiciaire', libelle: 'Casier judiciaire', ordre: 3 },
                {
                    code: 'certificat_bonne_moeurs',
                    libelle: 'Certificat de bonne mœurs',
                    ordre: 4,
                },
            ],
        });
    }
    toNumber(value) {
        if (value == null)
            return null;
        if (typeof value === 'number' && !Number.isNaN(value))
            return value;
        if (typeof value === 'object' && value !== null && 'toNumber' in value) {
            return value.toNumber();
        }
        const n = Number(value);
        return Number.isNaN(n) ? null : n;
    }
    sanitizeUser(user) {
        const mapProfile = (p) => {
            if (!p)
                return undefined;
            const { latitude, longitude, ...rest } = p;
            return {
                ...rest,
                latitude: this.toNumber(latitude),
                longitude: this.toNumber(longitude),
            };
        };
        return {
            id: user.id,
            email: user.email,
            role: user.role,
            emailVerified: user.emailVerified,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            particulier: mapProfile(user.particulier),
            prestataire: mapProfile(user.prestataire),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService,
        jwt_1.JwtService,
        geocoding_service_js_1.GeocodingService,
        abonnements_service_js_1.AbonnementsService])
], AuthService);
//# sourceMappingURL=auth.service.js.map