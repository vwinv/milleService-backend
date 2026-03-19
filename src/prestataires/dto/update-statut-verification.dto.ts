import { IsEnum, IsOptional, IsString } from 'class-validator';
import { StatutVerificationPrestataire } from '../../../generated/prisma/client.js';

export class UpdateStatutVerificationPrestataireDto {
  @IsEnum(StatutVerificationPrestataire)
  statutVerification: StatutVerificationPrestataire;

  @IsOptional()
  @IsString()
  motifRefus?: string;
}

