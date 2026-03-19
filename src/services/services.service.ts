import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

export interface ServiceDto {
  id: string;
  libelle: string;
  slug: string;
}

@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Liste des catégories de services actives (pour formulaire "Demander un service").
   */
  async findAll(): Promise<ServiceDto[]> {
    const rows = await this.prisma.service.findMany({
      where: { actif: true },
      orderBy: { libelle: 'asc' },
      select: { id: true, libelle: true, slug: true },
    });
    return rows;
  }
}
