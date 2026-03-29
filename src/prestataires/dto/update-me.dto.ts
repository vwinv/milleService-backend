import { IsOptional, IsString, IsNumber, IsArray, MaxLength } from 'class-validator';

export class UpdateMePrestataireDto {
  @IsOptional()
  @IsString()
  nom?: string;

  @IsOptional()
  @IsString()
  telephone?: string;

  @IsOptional()
  @IsString()
  adresse?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  serviceIds?: string[];

  /** URL de la photo de profil (ex. Cloudinary). Chaîne vide = suppression. */
  @IsOptional()
  @IsString()
  @MaxLength(2048)
  avatarUrl?: string;
}

