import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service.js";
import { StatutAbonnement } from "../../../generated/prisma/client.js";
import type { CurrentUserPayload } from "../decorators/current-user.decorator.js";

/**
 * Bloque les prestataires sans abonnement actif (wallet, prestations métier, etc.).
 */
@Injectable()
export class PrestataireActiveAbonnementGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user as CurrentUserPayload | undefined;
    if (!user || user.role !== "PRESTATAIRE") return true;

    const prestataire = await this.prisma.prestataire.findUnique({
      where: { userId: user.userId },
      select: { id: true },
    });
    if (!prestataire) {
      throw new ForbiddenException("Profil prestataire introuvable");
    }

    const abo = await this.prisma.abonnement.findFirst({
      where: {
        prestataireId: prestataire.id,
        statut: StatutAbonnement.ACTIF,
        dateFin: { gte: new Date() },
      },
      select: { id: true },
    });
    if (!abo) {
      throw new ForbiddenException(
        "Votre abonnement a expiré. Veuillez le renouveler pour accéder à cette fonctionnalité.",
      );
    }
    return true;
  }
}
