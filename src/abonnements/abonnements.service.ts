import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { StatutAbonnement, TransactionType } from '../../generated/prisma/client.js';
import { WalletsService } from '../wallets/wallets.service.js';

@Injectable()
export class AbonnementsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly wallets: WalletsService,
  ) {}

  /**
   * Liste des offres d'abonnement actives (pour la souscription prestataire).
   */
  async getOffres() {
    const offres = await this.prisma.offre.findMany({
      where: { actif: true },
      orderBy: [
        { ordre: 'asc' },
        { prix: 'asc' },
      ],
      select: {
        id: true,
        code: true,
        libelle: true,
        description: true,
        prix: true,
        dureeMois: true,
        ordre: true,
      },
    });
    return offres.map((o) => ({
      ...o,
      prix: o.prix != null ? Number(o.prix) : 0,
    }));
  }

  /**
   * Retourne l'abonnement actif du prestataire connecté, ou null.
   */
  async getAbonnementCourant(userId: string) {
    const prestataire = await this.prisma.prestataire.findUnique({
      where: { userId },
      select: { id: true },
    });
    if (!prestataire) {
      throw new BadRequestException('Profil prestataire introuvable');
    }

    const abo = await this.prisma.abonnement.findFirst({
      where: {
        prestataireId: prestataire.id,
        statut: StatutAbonnement.ACTIF,
        dateFin: { gte: new Date() },
      },
      include: {
        offre: {
          select: {
            id: true,
            code: true,
            libelle: true,
            prix: true,
            dureeMois: true,
          },
        },
      },
      orderBy: { dateFin: 'desc' },
    });

    if (!abo) return null;

    return {
      id: abo.id,
      dateDebut: abo.dateDebut,
      dateFin: abo.dateFin,
      statut: abo.statut,
      offre: {
        ...abo.offre,
        prix: abo.offre.prix != null ? Number(abo.offre.prix) : 0,
      },
    };
  }

  /**
   * Souscription à une offre : crée un nouvel abonnement et expire l'éventuel abonnement actif.
   */
  async souscrire(userId: string, offreId: string) {
    const prestataire = await this.prisma.prestataire.findUnique({
      where: { userId },
      select: { id: true },
    });
    if (!prestataire) {
      throw new BadRequestException('Profil prestataire introuvable');
    }

    const offre = await this.prisma.offre.findUnique({
      where: { id: offreId, actif: true },
    });
    if (!offre) {
      throw new BadRequestException('Offre introuvable ou inactive');
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dateFin = new Date(today);
    dateFin.setMonth(dateFin.getMonth() + offre.dureeMois);

    const newAbo = await this.prisma.$transaction(async (tx) => {
      await tx.abonnement.updateMany({
        where: {
          prestataireId: prestataire.id,
          statut: StatutAbonnement.ACTIF,
        },
        data: { statut: StatutAbonnement.EXPIRE },
      });

      const created = await tx.abonnement.create({
        data: {
          prestataireId: prestataire.id,
          offreId: offre.id,
          dateDebut: today,
          dateFin,
          statut: StatutAbonnement.ACTIF,
        },
      });

      const generalWallet = await this.wallets.ensureGeneralWallet(tx);
      await this.wallets.creditWallet({
        tx,
        walletId: generalWallet.id,
        amount: Number(offre.prix),
        type: TransactionType.ABONNEMENT,
        abonnementId: created.id,
        offreId: offre.id,
        createdByUserId: userId,
        meta: { prestataireId: prestataire.id },
      });

      return created;
    });

    // Retourner l'abonnement courant (avec offre)
    return this.getAbonnementCourant(userId);
  }
}
