import { PrismaService } from '../prisma/prisma.service.js';
export interface ServiceDto {
    id: string;
    libelle: string;
    slug: string;
}
export declare class ServicesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<ServiceDto[]>;
}
