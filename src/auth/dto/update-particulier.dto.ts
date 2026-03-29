import { IsOptional, IsString, IsNumber, MaxLength } from 'class-validator';

export class UpdateParticulierDto {
  @IsOptional()
  @IsString()
  nom?: string;

  @IsOptional()
  @IsString()
  prenom?: string;

  @IsOptional()
  @IsString()
  telephone?: string;

  @IsOptional()
  @IsString()
  adresse?: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  /** URL de la photo de profil (ex. Cloudinary). Chaîne vide = suppression. */
  @IsOptional()
  @IsString()
  @MaxLength(2048)
  avatarUrl?: string;
}

