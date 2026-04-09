import { Transform } from "class-transformer";
import { IsEmail, IsIn, IsOptional, IsString, MinLength } from "class-validator";

export const PRESTATION_SOFTPAY_METHODS = [
  "wave_sn",
  "orange_money_sn",
  "free_money_sn",
] as const;

export type PrestationSoftPayMethod = (typeof PRESTATION_SOFTPAY_METHODS)[number];

/** Corps commun sans `method` — utilisé par les routes `/wave`, `/orange-money`, `/free-money`. */
export class SoftPayPrestationBodyDto {
  /** Token renvoyé par `POST …/paiement/paydunya/init` (facture déjà créée). */
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @IsString()
  @MinLength(8)
  invoiceToken!: string;

  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @IsString()
  @MinLength(1)
  prenom!: string;

  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @IsString()
  @MinLength(1)
  nom!: string;

  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @IsString()
  @MinLength(8, { message: "Numéro de téléphone invalide" })
  telephone!: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}

export class SoftPayPrestationDto extends SoftPayPrestationBodyDto {
  @IsIn([...PRESTATION_SOFTPAY_METHODS])
  method!: PrestationSoftPayMethod;
}
