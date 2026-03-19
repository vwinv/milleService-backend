import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  Role,
  StatutDocument,
} from '../../generated/prisma/client.js';
import type { RegisterDto } from './dto/register.dto.js';
import type { LoginDto } from './dto/login.dto.js';
import type { UpdateParticulierDto } from './dto/update-particulier.dto.js';
import { GeocodingService } from '../geocoding/geocoding.service.js';
import { AbonnementsService } from '../abonnements/abonnements.service.js';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly geocodingService: GeocodingService,
    private readonly abonnementsService: AbonnementsService,
  ) { }

  async register(dto: RegisterDto) {
    try {
      const existing = await this.prisma.user.findUnique({
        where: { email: dto.email.toLowerCase() },
      });
      if (existing) {
        throw new ConflictException('Un compte existe déjà avec cet email');
      }

      const passwordHash = await bcrypt.hash(dto.password, 10);
      const role = dto.role as Role;

      if (role === Role.PARTICULIER) {
        if (!dto.nom || !dto.prenom) {
          throw new ConflictException('Nom et prénom requis pour un particulier');
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
          } catch (_) {
            /* ignoré si géocodage échoue */
          }
        }
        const user = await this.prisma.user.create({
          data: {
            email: dto.email.toLowerCase(),
            passwordHash,
            role: Role.PARTICULIER,
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
        const access_token = this.jwtService.sign(
          { sub: user.id, email: user.email, role: user.role },
          { expiresIn: '15m' },
        );
        const refresh_token = this.jwtService.sign(
          { sub: user.id, type: 'refresh' },
          { expiresIn: '7d' },
        );
        return {
          access_token,
          refresh_token,
          user: this.sanitizeUser(withProfile!),
        };
      }

      if (role === Role.PRESTATAIRE) {
        if (!dto.name) {
          throw new ConflictException('Nom requis pour un prestataire');
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
          } catch (_) {
            /* ignoré si géocodage échoue */
          }
        }
        const user = await this.prisma.user.create({
          data: {
            email: dto.email.toLowerCase(),
            passwordHash,
            role: Role.PRESTATAIRE,
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
        const serviceIds =
          dto.serviceIds?.filter(
            (id) => typeof id === 'string' && id.trim().length > 0,
          ) ?? [];
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
                  statut: StatutDocument.EN_ATTENTE,
                },
              });
            }
          }
        }
        const withProfile = await this.prisma.user.findUnique({
          where: { id: user.id },
          include: { prestataire: true },
        });
        const access_token = this.jwtService.sign(
          { sub: user.id, email: user.email, role: user.role },
          { expiresIn: '15m' },
        );
        const refresh_token = this.jwtService.sign(
          { sub: user.id, type: 'refresh' },
          { expiresIn: '7d' },
        );
        return {
          access_token,
          refresh_token,
          user: this.sanitizeUser(withProfile!),
        };
      }

      throw new ConflictException('Rôle non supporté');
    } catch (err: unknown) {
      this.logger.error('register() erreur:', err instanceof Error ? err.message : String(err));
      if (err instanceof Error && err.stack) {
        this.logger.error(err.stack);
      }
      throw err;
    }
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
      include: { particulier: true, prestataire: true },
    });
    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }
    const ok = await bcrypt.compare(dto.password, user.passwordHash);
    if (!ok) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }
    // Si un rôle est explicitement demandé, s'assurer qu'il correspond
    if (dto.role && user.role !== dto.role) {
      if (dto.role === Role.PRESTATAIRE) {
        throw new UnauthorizedException(
          'Ce compte est actuellement client. Connectez-vous depuis l’espace particulier.',
        );
      }
      if (dto.role === Role.PARTICULIER) {
        throw new UnauthorizedException(
          'Ce compte est actuellement prestataire. Connectez-vous depuis l’espace prestataire.',
        );
      }
      throw new UnauthorizedException('Rôle de connexion invalide pour ce compte.');
    }
    if (user.role === Role.PRESTATAIRE && user.prestataire && (user.prestataire as any).actif === false) {
      throw new UnauthorizedException(
        'Votre compte a été désactivé. Veuillez contacter notre équipe pour la réactivation.',
      );
    }
    const access_token = this.jwtService.sign(
      { sub: user.id, email: user.email, role: user.role },
      { expiresIn: '15m' },
    );
    const refresh_token = this.jwtService.sign(
      { sub: user.id, type: 'refresh' },
      { expiresIn: '7d' },
    );
    let abonnement: Awaited<ReturnType<AbonnementsService['getAbonnementCourant']>> = null;
    if (user.role === Role.PRESTATAIRE) {
      try {
        abonnement = await this.abonnementsService.getAbonnementCourant(user.id);
      } catch {
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

  async refresh(refreshToken: string) {
    try {
      const payload = this.jwtService.verify<{
        sub: string;
        type?: string;
      }>(refreshToken);
      if (payload?.type !== 'refresh') {
        throw new UnauthorizedException('Refresh token invalide');
      }
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
        include: { particulier: true, prestataire: true },
      });
      if (!user) {
        throw new UnauthorizedException('Utilisateur introuvable');
      }
      const access_token = this.jwtService.sign(
        { sub: user.id, email: user.email, role: user.role },
        { expiresIn: '15m' },
      );
      const new_refresh_token = this.jwtService.sign(
        { sub: user.id, type: 'refresh' },
        { expiresIn: '7d' },
      );
      let abonnement: Awaited<ReturnType<AbonnementsService['getAbonnementCourant']>> = null;
      if (user.role === Role.PRESTATAIRE) {
        try {
          abonnement = await this.abonnementsService.getAbonnementCourant(user.id);
        } catch {
          abonnement = null;
        }
      }
      return {
        access_token,
        refresh_token: new_refresh_token,
        user: this.sanitizeUser(user),
        abonnement,
      };
    } catch {
      throw new UnauthorizedException('Refresh token expiré ou invalide');
    }
  }

  /** Désactive le compte utilisateur (actuellement: désactive le profil prestataire). */
  async deactivateAccount(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { prestataire: true },
    });
    if (!user) {
      throw new UnauthorizedException('Utilisateur introuvable');
    }

    if (user.role === Role.PRESTATAIRE) {
      if (!user.prestataire) {
        throw new BadRequestException('Profil prestataire introuvable');
      }
      await this.prisma.prestataire.update({
        where: { id: (user.prestataire as { id: string }).id },
        data: { actif: false },
      });
      return {
        success: true,
        message:
          'Votre compte prestataire a été désactivé. Pour une réactivation, contactez notre équipe.',
      };
    }

    throw new BadRequestException(
      'La désactivation n’est pas disponible pour ce type de compte.',
    );
  }

  /** Met à jour le profil particulier du compte connecté. */
  async updateParticulierProfile(userId: string, dto: UpdateParticulierDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { particulier: true },
    });
    if (!user) {
      throw new UnauthorizedException('Utilisateur introuvable');
    }
    const part = user.particulier;
    if (!part) {
      throw new BadRequestException('Profil particulier introuvable');
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
      throw new BadRequestException('Aucune donnée à mettre à jour');
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
        latitude:
          updated.latitude != null ? this.toNumber(updated.latitude) : null,
        longitude:
          updated.longitude != null ? this.toNumber(updated.longitude) : null,
      },
    };
  }

  /** Passe d'un compte PARTICULIER à PRESTATAIRE, en créant le profil prestataire si nécessaire. */
  async becomePrestataire(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { particulier: true, prestataire: true },
    });
    if (!user) {
      throw new UnauthorizedException('Utilisateur introuvable');
    }
    if (user.role === Role.PRESTATAIRE) {
      throw new BadRequestException('Vous êtes déjà prestataire.');
    }
    const part = user.particulier as
      | {
          nom: string;
          prenom: string;
          telephone: string | null;
          adresse: string | null;
          latitude: unknown;
          longitude: unknown;
        }
      | null
      | undefined;
    if (!part) {
      throw new BadRequestException('Profil particulier introuvable');
    }

    let lat = this.toNumber(part.latitude);
    let lng = this.toNumber(part.longitude);
    const adresse = (part.adresse ?? '').trim();
    if ((lat == null || lng == null) && adresse.length >= 3) {
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

    const existingPrest = user.prestataire as
      | { id: string; actif: boolean | null }
      | null
      | undefined;
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
    } else if (existingPrest.actif === false) {
      await this.prisma.prestataire.update({
        where: { id: existingPrest.id },
        data: { actif: true },
      });
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: { role: Role.PRESTATAIRE },
    });

    const updatedUser = await this.prisma.user.findUnique({
      where: { id: user.id },
      include: { particulier: true, prestataire: true },
    });

    const access_token = this.jwtService.sign(
      { sub: user.id, email: user.email, role: Role.PRESTATAIRE },
      { expiresIn: '15m' },
    );
    const refresh_token = this.jwtService.sign(
      { sub: user.id, type: 'refresh' },
      { expiresIn: '7d' },
    );
    let abonnement: Awaited<
      ReturnType<AbonnementsService['getAbonnementCourant']>
    > = null;
    try {
      abonnement = await this.abonnementsService.getAbonnementCourant(user.id);
    } catch {
      abonnement = null;
    }

    return {
      access_token,
      refresh_token,
      user: this.sanitizeUser(updatedUser!),
      abonnement,
    };
  }

  /** Passe d'un compte PRESTATAIRE à PARTICULIER, en créant le profil particulier si nécessaire. */
  async becomeParticulier(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { particulier: true, prestataire: true },
    });
    if (!user) {
      throw new UnauthorizedException('Utilisateur introuvable');
    }
    if (user.role === Role.PARTICULIER) {
      throw new BadRequestException('Vous êtes déjà client.');
    }
    const prest = user.prestataire as
      | {
          id: string;
          nom: string;
          telephone: string | null;
          latitude: unknown;
          longitude: unknown;
        }
      | null
      | undefined;
    if (!prest) {
      throw new BadRequestException('Profil prestataire introuvable');
    }

    const existingPart = user.particulier as
      | { id: string }
      | null
      | undefined;
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
      data: { role: Role.PARTICULIER },
    });

    const updatedUser = await this.prisma.user.findUnique({
      where: { id: user.id },
      include: { particulier: true, prestataire: true },
    });

    const access_token = this.jwtService.sign(
      { sub: user.id, email: user.email, role: Role.PARTICULIER },
      { expiresIn: '15m' },
    );
    const refresh_token = this.jwtService.sign(
      { sub: user.id, type: 'refresh' },
      { expiresIn: '7d' },
    );

    return {
      access_token,
      refresh_token,
      user: this.sanitizeUser(updatedUser!),
      abonnement: null,
    };
  }

  /** Crée les types de documents prestataire s'ils n'existent pas. */
  private async ensureTypeDocumentsExist() {
    const count = await this.prisma.typeDocument.count();
    if (count > 0) return;
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

  private toNumber(value: unknown): number | null {
    if (value == null) return null;
    if (typeof value === 'number' && !Number.isNaN(value)) return value;
    if (typeof value === 'object' && value !== null && 'toNumber' in value) {
      return (value as { toNumber: () => number }).toNumber();
    }
    const n = Number(value);
    return Number.isNaN(n) ? null : n;
  }

  private sanitizeUser(user: {
    id: string;
    email: string;
    role: Role;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    particulier?: Record<string, unknown> | null;
    prestataire?: Record<string, unknown> | null;
  }) {
    const mapProfile = (p: Record<string, unknown> | null | undefined) => {
      if (!p) return undefined;
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
      particulier: mapProfile(user.particulier as Record<string, unknown> | null | undefined),
      prestataire: mapProfile(user.prestataire as Record<string, unknown> | null | undefined),
    };
  }
}
