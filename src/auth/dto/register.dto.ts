import {
  IsEmail,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

/** Un document envoyé à l'inscription prestataire (URL après upload Cloudinary). */
export class RegisterDocumentDto {
  @IsString()
  typeCode: string;

  @IsString()
  fichierUrl: string;

  @IsOptional()
  @IsString()
  nomFichier?: string;
}

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' })
  password: string;

  @IsIn(['PARTICULIER', 'PRESTATAIRE'])
  role: 'PARTICULIER' | 'PRESTATAIRE';

  // Particulier
  @IsOptional()
  @IsString()
  nom?: string;

  @IsOptional()
  @IsString()
  prenom?: string;

  @IsOptional()
  @IsString()
  telephone?: string;

  // Prestataire
  @IsOptional()
  @IsString()
  name?: string; // nom entreprise ou nom

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  zoneIntervention?: string[];

  @IsOptional()
  @IsString()
  adresse?: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  /** Documents prestataire (URLs après upload) : typeCode = cni_recto | cni_verso | casier_judiciaire | certificat_bonne_moeurs */
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RegisterDocumentDto)
  documents?: RegisterDocumentDto[];

  /** Liste des services proposés par le prestataire à l'inscription. */
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  serviceIds?: string[];
}
