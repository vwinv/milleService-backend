import { IsInt, IsOptional, IsString, Max, MaxLength, Min } from "class-validator";

export class NoterPrestationDto {
  @IsInt()
  @Min(1, { message: "La note doit être entre 1 et 5" })
  @Max(5, { message: "La note doit être entre 1 et 5" })
  note!: number;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  commentaire?: string;
}
