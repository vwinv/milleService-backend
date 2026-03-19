import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';

export class UpdatePrestataireDocumentItemDto {
  @IsString()
  typeCode!: string;

  @IsString()
  fichierUrl!: string;

  @IsOptional()
  @IsString()
  nomFichier?: string;
}

export class UpdatePrestataireDocumentsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdatePrestataireDocumentItemDto)
  documents!: UpdatePrestataireDocumentItemDto[];
}

