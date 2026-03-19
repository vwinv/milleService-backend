import { IsOptional, IsString, IsNumber, IsDateString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchQueryDto {
  @IsOptional()
  @IsString()
  serviceId?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  tarifMin?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  tarifMax?: number;

  /** Date pour filtre "Planifier" (ISO date YYYY-MM-DD). */
  @IsOptional()
  @IsDateString()
  date?: string;
}
