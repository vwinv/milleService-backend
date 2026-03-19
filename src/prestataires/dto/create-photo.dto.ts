import { IsNotEmpty, IsOptional, IsString, IsInt, Min } from 'class-validator';

export class CreatePrestatairePhotoDto {
  @IsString()
  @IsNotEmpty()
  url!: string;

  @IsString()
  @IsOptional()
  titre?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  ordre?: number;
}

