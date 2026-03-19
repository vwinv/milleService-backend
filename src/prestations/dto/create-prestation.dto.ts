import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePrestationDto {
  @IsNotEmpty({ message: 'Le prestataire est requis' })
  @IsString()
  prestataireId: string;

  @IsNotEmpty({ message: 'Le service est requis' })
  @IsString()
  prestataireServiceId: string;

  @IsOptional()
  @IsString()
  typeDeTache?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsNumber()
  budget?: number;

  @IsOptional()
  @IsString()
  adresse?: string;

  @IsOptional()
  @IsString()
  codePostal?: string;

  @IsOptional()
  @IsString()
  ville?: string;

  @IsOptional()
  @IsString()
  noteParticulier?: string;
}
