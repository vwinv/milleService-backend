import {
  IsInt,
  Min,
  Max,
  IsOptional,
  IsString,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export class CreateAvisDto {
  @IsNotEmpty({ message: 'prestataireId est requis' })
  @IsString()
  prestataireId!: string;

  @IsInt()
  @Min(1, { message: 'La note doit être entre 1 et 5' })
  @Max(5, { message: 'La note doit être entre 1 et 5' })
  note!: number;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  commentaire?: string;
}
