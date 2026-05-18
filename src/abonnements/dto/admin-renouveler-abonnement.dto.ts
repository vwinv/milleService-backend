import { Transform } from "class-transformer";
import { IsIn, IsOptional, IsString, MinLength } from "class-validator";

export class AdminRenouvelerAbonnementDto {
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @IsString()
  @MinLength(1)
  offreId!: string;

  @IsIn(["cash", "wave_sn", "orange_money_sn"])
  method!: "cash" | "wave_sn" | "orange_money_sn";

  @IsOptional()
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @IsString()
  telephone?: string;
}
