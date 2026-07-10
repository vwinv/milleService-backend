import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import { CreateBetaTesteurDto } from "./dto/create-beta-testeur.dto.js";

@Injectable()
export class BetaTesteursService {
  constructor(private readonly prisma: PrismaService) {}

  async register(dto: CreateBetaTesteurDto) {
    const email = dto.email.trim().toLowerCase();
    const nom = dto.nom.trim();
    const prenom = dto.prenom.trim();
    const telephone = dto.telephone.trim();

    const row = await this.prisma.betaTesteurInscription.upsert({
      where: { email },
      create: { nom, prenom, email, telephone },
      update: { nom, prenom, telephone },
    });

    return {
      id: row.id,
      registered: true,
    };
  }
}
