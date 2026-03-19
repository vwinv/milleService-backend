import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  StatutDocument,
  StatutPrestation,
  StatutVerificationPrestataire,
} from '../../generated/prisma/client.js';
import { CreatePrestatairePhotoDto } from './dto/create-photo.dto.js';
import { GeocodingService } from '../geocoding/geocoding.service.js';
import { UpdateMePrestataireDto } from './dto/update-me.dto.js';
import { NotificationsService } from '../notifications/notifications.service.js';

const RAYON_METRES = 500;
const NOTE_MAX = 5;
const NOTE_MIN = 2; // seulement les prestataires avec note moyenne >= 2

/** Distance en mètres entre deux points (formule de Haversine) */
function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371000; // Rayon de la Terre en mètres
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toNumber(d: unknown): number | null {
  if (d == null) return null;
  return Number(d);
}

/** Début et fin de la semaine en cours (lundi 00:00 -> dimanche 23:59:59) */
function getCurrentWeekBounds(): { debut: Date; fin: Date } {
  const now = new Date();
  const jour = now.getDay();
  // dimanche=0, lundi=1... samedi=6
  const decalageLundi = jour === 0 ? -6 : 1 - jour;
  const lundi = new Date(now);
  lundi.setDate(now.getDate() + decalageLundi);
  lundi.setHours(0, 0, 0, 0);
  const dimanche = new Date(lundi);
  dimanche.setDate(lundi.getDate() + 6);
  dimanche.setHours(23, 59, 59, 999);
  return { debut: lundi, fin: dimanche };
}

@Injectable()
export class PrestatairesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly geocodingService: GeocodingService,
    private readonly notifications: NotificationsService,
  ) {}

  /**
   * Retourne les prestataires les mieux notés de la semaine en cours :
   * - ont eu au moins une prestation (RDV terminé) dans la semaine en cours
   * - situés dans un rayon de 500m
   * - note moyenne >= 2
   * - triés par note décroissante (5 -> 2)
   */
  async getPrestatairesFavoris(
    userId: string,
    lat?: number,
    lng?: number,
  ) {
    const particulier = await this.prisma.particulier.findUnique({
      where: { userId },
      select: { latitude: true, longitude: true },
    });
    if (!particulier) {
      throw new BadRequestException('Profil particulier introuvable');
    }

    let userLat = toNumber(particulier.latitude);
    let userLng = toNumber(particulier.longitude);
    if (lat != null && lng != null) {
      userLat = lat;
      userLng = lng;
    }
    if (userLat == null || userLng == null) {
      throw new BadRequestException(
        'Position requise : renseignez latitude et longitude dans votre profil ou en paramètres (lat, lng)',
      );
    }

    const { debut, fin } = getCurrentWeekBounds();

    // Prestataires ayant eu au moins une prestation terminée cette semaine
    const prestationsCetteSemaine = await this.prisma.prestation.findMany({
      where: {
        statut: StatutPrestation.TERMINEE,
        completedAt: { gte: debut, lte: fin },
      },
      select: { prestataireId: true },
    });
    const prestataireIds = [...new Set(prestationsCetteSemaine.map((p) => p.prestataireId))];

    let avecNoteEtDistance: {
      prestataire: any;
      noteMoyenne: number;
      nbAvis: number;
      distanceMetres: number;
    }[] = [];

    if (prestataireIds.length > 0) {
      const prestatairesSemaine = await this.prisma.prestataire.findMany({
        where: {
          id: { in: prestataireIds },
          actif: true,
          statutVerification: StatutVerificationPrestataire.VERIFIE,
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
          if (plat == null || plng == null) return null;
          const distance = haversineDistance(userLat!, userLng!, plat, plng);
          const notes = p.avis.map((a) => a.note);
          const noteMoyenne =
            notes.length > 0
              ? notes.reduce((s, n) => s + n, 0) / notes.length
              : 0;
          if (noteMoyenne < NOTE_MIN) return null;
          return {
            prestataire: p,
            noteMoyenne,
            nbAvis: notes.length,
            distanceMetres: Math.round(distance),
          };
        })
        .filter((x): x is NonNullable<typeof x> => x != null);
    }

    // Fallback : si aucun favori de la semaine,
    // on retourne les mieux notés (>= 3 étoiles) dans le rayon.
    if (avecNoteEtDistance.length === 0) {
      const tousPrestataires = await this.prisma.prestataire.findMany({
        where: {
          actif: true,
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
          if (plat == null || plng == null) return null;
          const distance = haversineDistance(userLat!, userLng!, plat, plng);
          const notes = p.avis.map((a) => a.note);
          const noteMoyenne =
            notes.length > 0
              ? notes.reduce((s, n) => s + n, 0) / notes.length
              : 0;
          if (noteMoyenne < 3) return null; // seulement 5, 4, 3 étoiles
          return {
            prestataire: p,
            noteMoyenne,
            nbAvis: notes.length,
            distanceMetres: Math.round(distance),
          };
        })
        .filter((x): x is NonNullable<typeof x> => x != null);
    }

    // Tri décroissant par note (5 -> 2)
    const ordonnes = avecNoteEtDistance.sort(
      (a, b) => b.noteMoyenne - a.noteMoyenne,
    );

    return ordonnes.map(
      ({ prestataire, noteMoyenne, nbAvis, distanceMetres }) => ({
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
        latitude:
          prestataire.latitude != null ? Number(prestataire.latitude) : null,
        longitude:
          prestataire.longitude != null ? Number(prestataire.longitude) : null,
        services: Array.isArray(prestataire.servicesProposes)
          ? prestataire.servicesProposes.map((ps: any) => ({
              id: ps.service?.id,
              prestataireServiceId: ps.id,
              libelle: ps.service?.libelle,
              slug: ps.service?.slug,
              tarifHoraire:
                ps.tarifHoraire != null ? Number(ps.tarifHoraire) : null,
              description: ps.description ?? null,
            }))
          : [],
      }),
    );
  }

  /**
   * Crée ou met à jour un avis d'un particulier sur un prestataire.
   * Un particulier ne peut donner qu'un seul avis par prestataire (mise à jour si déjà existant).
   */
  async createOrUpdateAvis(
    userId: string,
    prestataireId: string,
    note: number,
    commentaire?: string,
  ) {
    const particulier = await this.prisma.particulier.findUnique({
      where: { userId },
      select: { id: true },
    });
    if (!particulier) {
      throw new BadRequestException('Profil particulier introuvable');
    }

    const prestataire = await this.prisma.prestataire.findUnique({
      where: { id: prestataireId },
    });
    if (!prestataire) {
      throw new BadRequestException('Prestataire introuvable');
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

  /**
   * Recherche de prestataires par service, fourchette de tarif et optionnellement par date (planifier).
   * Retourne le même format que getPrestatairesFavoris (note, distance si position disponible).
   */
  async search(
    userId: string,
    serviceId?: string,
    tarifMin?: number,
    tarifMax?: number,
    date?: string,
  ) {
    const particulier = await this.prisma.particulier.findUnique({
      where: { userId },
      select: { latitude: true, longitude: true },
    });
    if (!particulier) {
      throw new BadRequestException('Profil particulier introuvable');
    }

    const userLat = toNumber(particulier.latitude);
    const userLng = toNumber(particulier.longitude);
    if (userLat == null || userLng == null) {
      throw new BadRequestException(
        'Position requise : renseignez latitude et longitude dans votre profil',
      );
    }

    const tarifFilter =
      tarifMin != null && tarifMax != null
        ? { gte: tarifMin, lte: tarifMax }
        : tarifMin != null
          ? { gte: tarifMin }
          : tarifMax != null
            ? { lte: tarifMax }
            : undefined;

    const hasTarif = tarifMin != null || tarifMax != null;
    const hasService = !!serviceId && serviceId.trim() !== '';

    const where: any = {
      actif: true,
      statutVerification: StatutVerificationPrestataire.VERIFIE,
      latitude: { not: null },
      longitude: { not: null },
    };

    if (hasService || hasTarif) {
      const serviceFilter: any = { actif: true };
      if (hasService) {
        serviceFilter.serviceId = serviceId;
      }
      if (tarifFilter) {
        serviceFilter.tarifHoraire = tarifFilter;
      }
      where.servicesProposes = { some: serviceFilter };
    }

    const prestataires = await this.prisma.prestataire.findMany({
      where,
      include: {
        avis: { select: { note: true } },
        servicesProposes: {
          where: { actif: true },
          include: { service: true },
        },
      },
    });

    const avecNoteEtDistance = prestataires.map((p) => {
      const notes = p.avis.map((a) => a.note);
      const noteMoyenne =
        notes.length > 0
          ? notes.reduce((s, n) => s + n, 0) / notes.length
          : 0;

      // Distance par rapport à la position de référence (profil particulier)
      let distanceMetres = Number.MAX_SAFE_INTEGER;
      const plat = toNumber(p.latitude);
      const plng = toNumber(p.longitude);
      if (plat != null && plng != null) {
        distanceMetres = Math.round(
          haversineDistance(userLat, userLng, plat, plng),
        );
      }
      return {
        prestataire: p,
        noteMoyenne,
        nbAvis: notes.length,
        distanceMetres,
      };
    });

    const ordonnes = avecNoteEtDistance.sort((a, b) => {
      // D'abord les plus proches de l'adresse de référence,
      // puis à note égale, les mieux notés.
      const distDiff = a.distanceMetres - b.distanceMetres;
      if (distDiff !== 0) return distDiff;
      return b.noteMoyenne - a.noteMoyenne;
    });

    return ordonnes.map(
      ({ prestataire, noteMoyenne, nbAvis, distanceMetres }) => ({
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
        latitude:
          prestataire.latitude != null ? Number(prestataire.latitude) : null,
        longitude:
          prestataire.longitude != null ? Number(prestataire.longitude) : null,
        services: Array.isArray(prestataire.servicesProposes)
          ? prestataire.servicesProposes.map((ps: any) => ({
              id: ps.service?.id,
              prestataireServiceId: ps.id,
              libelle: ps.service?.libelle,
              slug: ps.service?.slug,
              tarifHoraire:
                ps.tarifHoraire != null ? Number(ps.tarifHoraire) : null,
              description: ps.description ?? null,
            }))
          : [],
      }),
    );
  }

  /**
   * Nombre de prestations en attente et terminées pour le prestataire connecté.
   */
  async getPrestationStats(prestataireUserId: string) {
    const prestataire = await this.prisma.prestataire.findUnique({
      where: { userId: prestataireUserId },
      select: { id: true },
    });
    if (!prestataire) {
      throw new BadRequestException('Profil prestataire introuvable');
    }
    const [enAttente, terminee] = await Promise.all([
      this.prisma.prestation.count({
        where: {
          prestataireId: prestataire.id,
          statut: StatutPrestation.EN_ATTENTE,
        },
      }),
      this.prisma.prestation.count({
        where: {
          prestataireId: prestataire.id,
          statut: { in: [StatutPrestation.TERMINEE, StatutPrestation.PAYEE] },
        },
      }),
    ]);
    return { enAttente, terminee };
  }

  /**
   * Mise à jour du statut de vérification d'un prestataire (par un admin).
   * Envoie une notification au prestataire quand ses documents sont validés ou refusés.
   */
  async updateStatutVerification(
    prestataireId: string,
    statut: StatutVerificationPrestataire,
    motifRefus?: string,
  ) {
    const prestataire = await this.prisma.prestataire.update({
      where: { id: prestataireId },
      data: { statutVerification: statut },
      include: {
        user: { select: { id: true } },
      },
    });

    let title: string | null = null;
    let body: string | null = null;
    let type: string | undefined;

    if (statut === StatutVerificationPrestataire.VERIFIE) {
      title = 'Profil vérifié';
      body =
        'Vos documents ont été validés. Votre profil est maintenant visible dans les recherches.';
      type = 'prestataire_documents_valides';
    } else if (statut === StatutVerificationPrestataire.REFUSE) {
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

  /**
   * Permet au prestataire connecté de renvoyer/mettre à jour ses documents.
   * - Met à jour ou crée les PrestataireDocument correspondants
   * - Remet leur statut à EN_ATTENTE
   * - Replace le statut global de vérification à EN_ATTENTE
   */
  async updateMyDocuments(
    userId: string,
    documents: { typeCode: string; fichierUrl: string; nomFichier?: string }[],
  ) {
    const prestataire = await this.prisma.prestataire.findUnique({
      where: { userId },
      select: { id: true },
    });
    if (!prestataire) {
      throw new BadRequestException('Profil prestataire introuvable');
    }

    for (const doc of documents) {
      const typeDoc = await this.prisma.typeDocument.findUnique({
        where: { code: doc.typeCode },
        select: { id: true },
      });
      if (!typeDoc) {
        // Type de document inconnu : on l'ignore silencieusement pour éviter de bloquer tout l'envoi.
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
          statut: StatutDocument.EN_ATTENTE,
        },
        update: {
          fichierUrl: doc.fichierUrl,
          nomFichier: doc.nomFichier ?? null,
          statut: StatutDocument.EN_ATTENTE,
          validePar: null,
          valideAt: null,
          motifRefus: null,
        },
      });
    }

    const updated = await this.prisma.prestataire.update({
      where: { id: prestataire.id },
      data: { statutVerification: StatutVerificationPrestataire.EN_ATTENTE },
      select: { id: true, statutVerification: true },
    });

    return {
      id: updated.id,
      statutVerification: updated.statutVerification,
    };
  }

  /**
   * Retourne le statut de vérification du prestataire connecté
   * ainsi que le détail de chacun de ses documents (statut, motif, type, etc.).
   */
  async getMyVerificationStatus(userId: string) {
    const prestataire = await this.prisma.prestataire.findUnique({
      where: { userId },
      select: { id: true, statutVerification: true },
    });
    if (!prestataire) {
      throw new BadRequestException('Profil prestataire introuvable');
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

  /**
   * Retourne uniquement la liste des documents du prestataire connecté.
   */
  async getMyDocuments(userId: string) {
    const status = await this.getMyVerificationStatus(userId);
    return status.documents;
  }

  /**
   * Liste des photos du catalogue pour le prestataire connecté.
   */
  async getMyPhotos(userId: string) {
    const prestataire = await this.prisma.prestataire.findUnique({
      where: { userId },
      select: { id: true },
    });
    if (!prestataire) {
      throw new BadRequestException('Profil prestataire introuvable');
    }
    return this.prisma.prestatairePhoto.findMany({
      where: { prestataireId: prestataire.id },
      orderBy: [{ ordre: 'asc' }, { createdAt: 'asc' }],
    });
  }

  /**
   * Ajoute une photo au catalogue du prestataire connecté.
   */
  async addPhoto(userId: string, dto: CreatePrestatairePhotoDto) {
    const prestataire = await this.prisma.prestataire.findUnique({
      where: { userId },
      select: { id: true },
    });
    if (!prestataire) {
      throw new BadRequestException('Profil prestataire introuvable');
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

  /**
   * Liste des IDs des services actifs proposés par le prestataire connecté.
   */
  async getMyServiceIds(userId: string): Promise<{ serviceIds: string[] }> {
    const prestataire = await this.prisma.prestataire.findUnique({
      where: { userId },
      select: { id: true },
    });
    if (!prestataire) {
      throw new BadRequestException('Profil prestataire introuvable');
    }
    const rows = await this.prisma.prestataireService.findMany({
      where: { prestataireId: prestataire.id, actif: true },
      select: { serviceId: true },
    });
    return {
      serviceIds: rows.map((r) => r.serviceId),
    };
  }

  /**
   * Photos du catalogue pour un prestataire donné (profil public).
   */
  async getPhotosByPrestataire(prestataireId: string) {
    return this.prisma.prestatairePhoto.findMany({
      where: { prestataireId },
      orderBy: [{ ordre: 'asc' }, { createdAt: 'asc' }],
    });
  }

  /**
   * Liste des avis clients pour un prestataire (nom du client, note, commentaire).
   */
  async getAvisByPrestataireId(prestataireId: string) {
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

  /**
   * Met à jour les informations de base du prestataire connecté
   * (nom, téléphone, coordonnées GPS à partir de l'adresse, services proposés).
   */
  async updateMe(userId: string, dto: UpdateMePrestataireDto) {
    const prestataire = await this.prisma.prestataire.findUnique({
      where: { userId },
      select: { id: true },
    });
    if (!prestataire) {
      throw new BadRequestException('Profil prestataire introuvable');
    }

    let lat =
      dto.latitude != null && !Number.isNaN(dto.latitude)
        ? dto.latitude
        : null;
    let lng =
      dto.longitude != null && !Number.isNaN(dto.longitude)
        ? dto.longitude
        : null;

    const adresse = dto.adresse?.trim();
    if ((lat == null || lng == null) && adresse && adresse.length >= 3) {
      try {
        const coords = await this.geocodingService.geocodeWithFallbacks(
          adresse,
        );
        if (coords) {
          lat = coords.lat;
          lng = coords.lng;
        }
      } catch {
        // silencieux si géocodage échoue
      }
    }

    const data: Record<string, unknown> = {};
    if (dto.nom !== undefined) {
      const nom = dto.nom.trim();
      if (!nom) {
        throw new BadRequestException('Le nom ne peut pas être vide');
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

    if (Object.keys(data).length === 0 && dto.serviceIds === undefined) {
      throw new BadRequestException('Aucune donnée à mettre à jour');
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
        await Promise.all(
          serviceIds.map((serviceId) =>
            this.prisma.prestataireService.upsert({
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
            }),
          ),
        );

        await this.prisma.prestataireService.updateMany({
          where: {
            prestataireId: prestataire.id,
            serviceId: { notIn: serviceIds },
          },
          data: { actif: false },
        });
      } else {
        // Si une liste vide est envoyée, désactiver tous les services
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
      latitude:
        updated.latitude != null ? Number(updated.latitude) : null,
      longitude:
        updated.longitude != null ? Number(updated.longitude) : null,
    };
  }
}
