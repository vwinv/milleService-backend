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
exports.PrestatairesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../prisma/prisma.service.js");
const client_js_1 = require("../../generated/prisma/client.js");
const geocoding_service_js_1 = require("../geocoding/geocoding.service.js");
const notifications_service_js_1 = require("../notifications/notifications.service.js");
const RAYON_METRES = 500;
const NOTE_MAX = 5;
const NOTE_MIN = 2;
const FAVORIS_PLUS_PROCHES_LIMIT = 20;
function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371000;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a = Math.sin(dLat / 2) ** 2 +
        Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}
function toNumber(d) {
    if (d == null)
        return null;
    return Number(d);
}
function getCurrentWeekBounds() {
    const now = new Date();
    const jour = now.getDay();
    const decalageLundi = jour === 0 ? -6 : 1 - jour;
    const lundi = new Date(now);
    lundi.setDate(now.getDate() + decalageLundi);
    lundi.setHours(0, 0, 0, 0);
    const dimanche = new Date(lundi);
    dimanche.setDate(lundi.getDate() + 6);
    dimanche.setHours(23, 59, 59, 999);
    return { debut: lundi, fin: dimanche };
}
let PrestatairesService = class PrestatairesService {
    prisma;
    geocodingService;
    notifications;
    constructor(prisma, geocodingService, notifications) {
        this.prisma = prisma;
        this.geocodingService = geocodingService;
        this.notifications = notifications;
    }
    async getPrestatairesFavoris(userId, lat, lng) {
        const particulier = await this.prisma.particulier.findUnique({
            where: { userId },
            select: { latitude: true, longitude: true },
        });
        if (!particulier) {
            throw new common_1.BadRequestException('Profil particulier introuvable');
        }
        let userLat = toNumber(particulier.latitude);
        let userLng = toNumber(particulier.longitude);
        if (lat != null && lng != null) {
            userLat = lat;
            userLng = lng;
        }
        if (userLat == null || userLng == null) {
            throw new common_1.BadRequestException('Position requise : renseignez latitude et longitude dans votre profil ou en paramètres (lat, lng)');
        }
        const { debut, fin } = getCurrentWeekBounds();
        const prestationsCetteSemaine = await this.prisma.prestation.findMany({
            where: {
                statut: client_js_1.StatutPrestation.TERMINEE,
                completedAt: { gte: debut, lte: fin },
            },
            select: { prestataireId: true },
        });
        const prestataireIds = [...new Set(prestationsCetteSemaine.map((p) => p.prestataireId))];
        let avecNoteEtDistance = [];
        let listeProximite = false;
        if (prestataireIds.length > 0) {
            const prestatairesSemaine = await this.prisma.prestataire.findMany({
                where: {
                    id: { in: prestataireIds },
                    actif: true,
                    statutVerification: client_js_1.StatutVerificationPrestataire.VERIFIE,
                    latitude: { not: null },
                    longitude: { not: null },
                },
                include: {
                    avis: { select: { note: true } },
                    servicesProposes: {
                        where: { actif: true },
                        include: { service: true },
                    },
                },
            });
            avecNoteEtDistance = prestatairesSemaine
                .map((p) => {
                const plat = toNumber(p.latitude);
                const plng = toNumber(p.longitude);
                if (plat == null || plng == null)
                    return null;
                const distance = haversineDistance(userLat, userLng, plat, plng);
                const notes = p.avis.map((a) => a.note);
                const noteMoyenne = notes.length > 0
                    ? notes.reduce((s, n) => s + n, 0) / notes.length
                    : 0;
                if (noteMoyenne < NOTE_MIN)
                    return null;
                return {
                    prestataire: p,
                    noteMoyenne,
                    nbAvis: notes.length,
                    distanceMetres: Math.round(distance),
                };
            })
                .filter((x) => x != null);
        }
        if (avecNoteEtDistance.length === 0) {
            const tousPrestataires = await this.prisma.prestataire.findMany({
                where: {
                    actif: true,
                    statutVerification: client_js_1.StatutVerificationPrestataire.VERIFIE,
                    latitude: { not: null },
                    longitude: { not: null },
                },
                include: {
                    avis: { select: { note: true } },
                    servicesProposes: {
                        where: { actif: true },
                        include: { service: true },
                    },
                },
            });
            avecNoteEtDistance = tousPrestataires
                .map((p) => {
                const plat = toNumber(p.latitude);
                const plng = toNumber(p.longitude);
                if (plat == null || plng == null)
                    return null;
                const distance = haversineDistance(userLat, userLng, plat, plng);
                const notes = p.avis.map((a) => a.note);
                const noteMoyenne = notes.length > 0
                    ? notes.reduce((s, n) => s + n, 0) / notes.length
                    : 0;
                if (noteMoyenne < 3)
                    return null;
                return {
                    prestataire: p,
                    noteMoyenne,
                    nbAvis: notes.length,
                    distanceMetres: Math.round(distance),
                };
            })
                .filter((x) => x != null);
        }
        if (avecNoteEtDistance.length === 0) {
            const proches = await this.prisma.prestataire.findMany({
                where: {
                    actif: true,
                    statutVerification: client_js_1.StatutVerificationPrestataire.VERIFIE,
                    latitude: { not: null },
                    longitude: { not: null },
                },
                include: {
                    avis: { select: { note: true } },
                    servicesProposes: {
                        where: { actif: true },
                        include: { service: true },
                    },
                },
            });
            const parDistance = proches
                .map((p) => {
                const plat = toNumber(p.latitude);
                const plng = toNumber(p.longitude);
                if (plat == null || plng == null)
                    return null;
                const distance = haversineDistance(userLat, userLng, plat, plng);
                const notes = p.avis.map((a) => a.note);
                const noteMoyenne = notes.length > 0
                    ? notes.reduce((s, n) => s + n, 0) / notes.length
                    : 0;
                return {
                    prestataire: p,
                    noteMoyenne,
                    nbAvis: notes.length,
                    distanceMetres: Math.round(distance),
                };
            })
                .filter((x) => x != null)
                .sort((a, b) => a.distanceMetres - b.distanceMetres)
                .slice(0, FAVORIS_PLUS_PROCHES_LIMIT);
            if (parDistance.length > 0) {
                listeProximite = true;
                avecNoteEtDistance = parDistance;
            }
        }
        const ordonnes = listeProximite
            ? avecNoteEtDistance
            : [...avecNoteEtDistance].sort((a, b) => b.noteMoyenne - a.noteMoyenne);
        const prestataires = ordonnes.map(({ prestataire, noteMoyenne, nbAvis, distanceMetres }) => ({
            id: prestataire.id,
            nom: prestataire.nom,
            adresse: prestataire.adresse,
            telephone: prestataire.telephone,
            bio: prestataire.bio,
            avatarUrl: prestataire.avatarUrl,
            zoneIntervention: prestataire.zoneIntervention,
            statutVerification: prestataire.statutVerification,
            noteMoyenne: Math.round(noteMoyenne * 10) / 10,
            noteSur: NOTE_MAX,
            nbAvis,
            distanceMetres,
            latitude: prestataire.latitude != null ? Number(prestataire.latitude) : null,
            longitude: prestataire.longitude != null ? Number(prestataire.longitude) : null,
            services: Array.isArray(prestataire.servicesProposes)
                ? prestataire.servicesProposes.map((ps) => ({
                    id: ps.service?.id,
                    prestataireServiceId: ps.id,
                    libelle: ps.service?.libelle,
                    slug: ps.service?.slug,
                    tarifHoraire: ps.tarifHoraire != null ? Number(ps.tarifHoraire) : null,
                    description: ps.description ?? null,
                }))
                : [],
        }));
        return { listeProximite, prestataires };
    }
    async createOrUpdateAvis(userId, prestataireId, note, commentaire) {
        const particulier = await this.prisma.particulier.findUnique({
            where: { userId },
            select: { id: true },
        });
        if (!particulier) {
            throw new common_1.BadRequestException('Profil particulier introuvable');
        }
        const prestataire = await this.prisma.prestataire.findUnique({
            where: { id: prestataireId },
        });
        if (!prestataire) {
            throw new common_1.BadRequestException('Prestataire introuvable');
        }
        const avis = await this.prisma.avisPrestataire.upsert({
            where: {
                particulierId_prestataireId: {
                    particulierId: particulier.id,
                    prestataireId,
                },
            },
            create: {
                particulierId: particulier.id,
                prestataireId,
                note,
                commentaire: commentaire ?? null,
            },
            update: {
                note,
                commentaire: commentaire ?? undefined,
            },
        });
        return avis;
    }
    async search(userId, serviceId, tarifMin, tarifMax, date) {
        const particulier = await this.prisma.particulier.findUnique({
            where: { userId },
            select: { latitude: true, longitude: true },
        });
        if (!particulier) {
            throw new common_1.BadRequestException('Profil particulier introuvable');
        }
        const userLat = toNumber(particulier.latitude);
        const userLng = toNumber(particulier.longitude);
        if (userLat == null || userLng == null) {
            throw new common_1.BadRequestException('Position requise : renseignez latitude et longitude dans votre profil');
        }
        const tarifFilter = tarifMin != null && tarifMax != null
            ? { gte: tarifMin, lte: tarifMax }
            : tarifMin != null
                ? { gte: tarifMin }
                : tarifMax != null
                    ? { lte: tarifMax }
                    : undefined;
        const hasTarif = tarifMin != null || tarifMax != null;
        const hasService = !!serviceId && serviceId.trim() !== '';
        const hasDateFilter = date != null && String(date).trim() !== '';
        const hadFilters = hasService || hasTarif || hasDateFilter;
        const baseWhere = {
            actif: true,
            statutVerification: client_js_1.StatutVerificationPrestataire.VERIFIE,
            latitude: { not: null },
            longitude: { not: null },
        };
        const include = {
            avis: { select: { note: true } },
            servicesProposes: {
                where: { actif: true },
                include: { service: true },
            },
        };
        let where = { ...baseWhere };
        if (hasService || hasTarif) {
            const serviceFilter = { actif: true };
            if (hasService) {
                serviceFilter.serviceId = serviceId;
            }
            if (tarifFilter) {
                serviceFilter.tarifHoraire = tarifFilter;
            }
            where = {
                ...baseWhere,
                servicesProposes: { some: serviceFilter },
            };
        }
        let prestataires = await this.prisma.prestataire.findMany({
            where: where,
            include,
        });
        if (prestataires.length === 0 && hadFilters) {
            prestataires = await this.prisma.prestataire.findMany({
                where: baseWhere,
                include,
            });
        }
        const avecNoteEtDistance = prestataires.map((p) => {
            const notes = p.avis.map((a) => a.note);
            const noteMoyenne = notes.length > 0
                ? notes.reduce((s, n) => s + n, 0) / notes.length
                : 0;
            let distanceMetres = Number.MAX_SAFE_INTEGER;
            const plat = toNumber(p.latitude);
            const plng = toNumber(p.longitude);
            if (plat != null && plng != null) {
                distanceMetres = Math.round(haversineDistance(userLat, userLng, plat, plng));
            }
            return {
                prestataire: p,
                noteMoyenne,
                nbAvis: notes.length,
                distanceMetres,
            };
        });
        const ordonnes = avecNoteEtDistance.sort((a, b) => {
            const distDiff = a.distanceMetres - b.distanceMetres;
            if (distDiff !== 0)
                return distDiff;
            return b.noteMoyenne - a.noteMoyenne;
        });
        return ordonnes.map(({ prestataire, noteMoyenne, nbAvis, distanceMetres }) => ({
            id: prestataire.id,
            nom: prestataire.nom,
            adresse: prestataire.adresse,
            telephone: prestataire.telephone,
            bio: prestataire.bio,
            avatarUrl: prestataire.avatarUrl,
            zoneIntervention: prestataire.zoneIntervention,
            statutVerification: prestataire.statutVerification,
            noteMoyenne: Math.round(noteMoyenne * 10) / 10,
            noteSur: NOTE_MAX,
            nbAvis,
            distanceMetres,
            latitude: prestataire.latitude != null ? Number(prestataire.latitude) : null,
            longitude: prestataire.longitude != null ? Number(prestataire.longitude) : null,
            services: Array.isArray(prestataire.servicesProposes)
                ? prestataire.servicesProposes.map((ps) => ({
                    id: ps.service?.id,
                    prestataireServiceId: ps.id,
                    libelle: ps.service?.libelle,
                    slug: ps.service?.slug,
                    tarifHoraire: ps.tarifHoraire != null ? Number(ps.tarifHoraire) : null,
                    description: ps.description ?? null,
                }))
                : [],
        }));
    }
    async getPrestationStats(prestataireUserId) {
        const prestataire = await this.prisma.prestataire.findUnique({
            where: { userId: prestataireUserId },
            select: { id: true },
        });
        if (!prestataire) {
            throw new common_1.BadRequestException('Profil prestataire introuvable');
        }
        const [enAttente, terminee] = await Promise.all([
            this.prisma.prestation.count({
                where: {
                    prestataireId: prestataire.id,
                    statut: client_js_1.StatutPrestation.EN_ATTENTE,
                },
            }),
            this.prisma.prestation.count({
                where: {
                    prestataireId: prestataire.id,
                    statut: { in: [client_js_1.StatutPrestation.TERMINEE, client_js_1.StatutPrestation.PAYEE] },
                },
            }),
        ]);
        return { enAttente, terminee };
    }
    async updateStatutVerification(prestataireId, statut, motifRefus) {
        const prestataire = await this.prisma.prestataire.update({
            where: { id: prestataireId },
            data: {
                statutVerification: statut,
                ...(statut === client_js_1.StatutVerificationPrestataire.VERIFIE
                    ? { actif: true }
                    : {}),
            },
            include: {
                user: { select: { id: true } },
            },
        });
        let title = null;
        let body = null;
        let type;
        if (statut === client_js_1.StatutVerificationPrestataire.VERIFIE) {
            title = 'Profil vérifié';
            body =
                'Vos documents ont été validés. Votre profil est maintenant visible dans les recherches.';
            type = 'prestataire_documents_valides';
        }
        else if (statut === client_js_1.StatutVerificationPrestataire.REFUSE) {
            title = 'Profil refusé';
            body =
                motifRefus && motifRefus.trim().length > 0
                    ? motifRefus
                    : "Vos documents n'ont pas été validés. Merci de vérifier les informations envoyées et de les soumettre à nouveau.";
            type = 'prestataire_documents_refuses';
        }
        if (title) {
            await this.notifications.sendToUser(prestataire.userId, {
                title,
                body: body ?? undefined,
                type,
                data: { prestataireId: prestataire.id },
            });
        }
        return {
            id: prestataire.id,
            statutVerification: prestataire.statutVerification,
        };
    }
    async updateMyDocuments(userId, documents) {
        const prestataire = await this.prisma.prestataire.findUnique({
            where: { userId },
            select: { id: true },
        });
        if (!prestataire) {
            throw new common_1.BadRequestException('Profil prestataire introuvable');
        }
        await this.ensureTypeDocumentsExist();
        let upsertedCount = 0;
        for (const doc of documents) {
            const typeDoc = await this.prisma.typeDocument.findUnique({
                where: { code: doc.typeCode },
                select: { id: true },
            });
            if (!typeDoc) {
                continue;
            }
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
                    statut: client_js_1.StatutDocument.EN_ATTENTE,
                },
                update: {
                    fichierUrl: doc.fichierUrl,
                    nomFichier: doc.nomFichier ?? null,
                    statut: client_js_1.StatutDocument.EN_ATTENTE,
                    validePar: null,
                    valideAt: null,
                    motifRefus: null,
                },
            });
            upsertedCount += 1;
        }
        if (upsertedCount === 0) {
            throw new common_1.BadRequestException('Aucun document valide n’a été envoyé. Vérifiez les types de documents.');
        }
        const updated = await this.prisma.prestataire.update({
            where: { id: prestataire.id },
            data: { statutVerification: client_js_1.StatutVerificationPrestataire.EN_ATTENTE },
            select: { id: true, statutVerification: true },
        });
        return {
            id: updated.id,
            statutVerification: updated.statutVerification,
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
    async getMyVerificationStatus(userId) {
        const prestataire = await this.prisma.prestataire.findUnique({
            where: { userId },
            select: { id: true, statutVerification: true },
        });
        if (!prestataire) {
            throw new common_1.BadRequestException('Profil prestataire introuvable');
        }
        const docs = await this.prisma.prestataireDocument.findMany({
            where: { prestataireId: prestataire.id },
            orderBy: [{ createdAt: 'asc' }],
            include: {
                typeDocument: {
                    select: {
                        code: true,
                        libelle: true,
                        obligatoire: true,
                    },
                },
            },
        });
        return {
            statutVerification: prestataire.statutVerification,
            documents: docs.map((d) => ({
                id: d.id,
                typeCode: d.typeDocument.code,
                typeLibelle: d.typeDocument.libelle,
                obligatoire: d.typeDocument.obligatoire,
                statut: d.statut,
                motifRefus: d.motifRefus,
                fichierUrl: d.fichierUrl,
                nomFichier: d.nomFichier,
                updatedAt: d.updatedAt,
            })),
        };
    }
    async getMyDocuments(userId) {
        const status = await this.getMyVerificationStatus(userId);
        return status.documents;
    }
    async getMyPhotos(userId) {
        const prestataire = await this.prisma.prestataire.findUnique({
            where: { userId },
            select: { id: true },
        });
        if (!prestataire) {
            throw new common_1.BadRequestException('Profil prestataire introuvable');
        }
        return this.prisma.prestatairePhoto.findMany({
            where: { prestataireId: prestataire.id },
            orderBy: [{ ordre: 'asc' }, { createdAt: 'asc' }],
        });
    }
    async addPhoto(userId, dto) {
        const prestataire = await this.prisma.prestataire.findUnique({
            where: { userId },
            select: { id: true },
        });
        if (!prestataire) {
            throw new common_1.BadRequestException('Profil prestataire introuvable');
        }
        const created = await this.prisma.prestatairePhoto.create({
            data: {
                prestataireId: prestataire.id,
                url: dto.url,
                titre: dto.titre ?? null,
                description: dto.description ?? null,
                ordre: dto.ordre ?? 0,
            },
        });
        return created;
    }
    async getMyServiceIds(userId) {
        const prestataire = await this.prisma.prestataire.findUnique({
            where: { userId },
            select: { id: true },
        });
        if (!prestataire) {
            throw new common_1.BadRequestException('Profil prestataire introuvable');
        }
        const rows = await this.prisma.prestataireService.findMany({
            where: { prestataireId: prestataire.id, actif: true },
            select: { serviceId: true },
        });
        return {
            serviceIds: rows.map((r) => r.serviceId),
        };
    }
    async getPhotosByPrestataire(prestataireId) {
        return this.prisma.prestatairePhoto.findMany({
            where: { prestataireId },
            orderBy: [{ ordre: 'asc' }, { createdAt: 'asc' }],
        });
    }
    async getAvisByPrestataireId(prestataireId) {
        const rows = await this.prisma.avisPrestataire.findMany({
            where: { prestataireId },
            orderBy: { createdAt: 'desc' },
            include: {
                particulier: { select: { nom: true, prenom: true } },
            },
        });
        return rows.map((a) => ({
            id: a.id,
            nomClient: [a.particulier.prenom, a.particulier.nom].filter(Boolean).join(' ').trim() || 'Client',
            note: a.note,
            commentaire: a.commentaire ?? null,
        }));
    }
    async getAvisPublicLanding(limit = 80) {
        const rows = await this.prisma.avisPrestataire.findMany({
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: {
                particulier: {
                    select: { nom: true, prenom: true, avatarUrl: true },
                },
            },
        });
        return rows.map((a) => ({
            id: a.id,
            nomClient: [a.particulier.prenom, a.particulier.nom].filter(Boolean).join(' ').trim() || 'Client',
            note: a.note,
            commentaire: a.commentaire ?? null,
            avatarUrl: a.particulier.avatarUrl ?? null,
        }));
    }
    async updateMe(userId, dto) {
        const prestataire = await this.prisma.prestataire.findUnique({
            where: { userId },
            select: { id: true },
        });
        if (!prestataire) {
            throw new common_1.BadRequestException('Profil prestataire introuvable');
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
        if (dto.telephone !== undefined) {
            data.telephone = dto.telephone.trim();
        }
        if (dto.adresse !== undefined) {
            data.adresse = dto.adresse.trim().length > 0 ? dto.adresse.trim() : null;
        }
        if (dto.bio !== undefined) {
            const bio = dto.bio.trim();
            data.bio = bio.length > 0 ? bio : null;
        }
        if (lat != null) {
            data.latitude = lat;
        }
        if (lng != null) {
            data.longitude = lng;
        }
        if (dto.avatarUrl !== undefined) {
            const raw = (dto.avatarUrl ?? '').trim();
            data.avatarUrl = raw.length > 0 ? raw : null;
        }
        if (Object.keys(data).length === 0 && dto.serviceIds === undefined) {
            throw new common_1.BadRequestException('Aucune donnée à mettre à jour');
        }
        const updated = Object.keys(data).length
            ? await this.prisma.prestataire.update({
                where: { id: prestataire.id },
                data,
            })
            : await this.prisma.prestataire.findUniqueOrThrow({
                where: { id: prestataire.id },
            });
        const serviceIdsRaw = dto.serviceIds;
        if (serviceIdsRaw !== undefined) {
            const serviceIds = serviceIdsRaw
                .filter((id) => typeof id === 'string' && id.trim().length > 0)
                .map((id) => id.trim());
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
                await this.prisma.prestataireService.updateMany({
                    where: {
                        prestataireId: prestataire.id,
                        serviceId: { notIn: serviceIds },
                    },
                    data: { actif: false },
                });
            }
            else {
                await this.prisma.prestataireService.updateMany({
                    where: { prestataireId: prestataire.id },
                    data: { actif: false },
                });
            }
        }
        return {
            id: updated.id,
            nom: updated.nom,
            telephone: updated.telephone,
            adresse: updated.adresse,
            bio: updated.bio,
            avatarUrl: updated.avatarUrl,
            latitude: updated.latitude != null ? Number(updated.latitude) : null,
            longitude: updated.longitude != null ? Number(updated.longitude) : null,
        };
    }
};
exports.PrestatairesService = PrestatairesService;
exports.PrestatairesService = PrestatairesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService,
        geocoding_service_js_1.GeocodingService,
        notifications_service_js_1.NotificationsService])
], PrestatairesService);
//# sourceMappingURL=prestataires.service.js.map