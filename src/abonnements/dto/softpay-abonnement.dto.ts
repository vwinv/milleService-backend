import { Transform } from "class-transformer";
import { IsEmail, IsIn, IsOptional, IsString, MinLength } from "class-validator";
import {
  PRESTATION_SOFTPAY_METHODS,
  type PrestationSoftPayMethod,
} from "../../prestations/dto/softpay-prestation.dto.js";

/** Corps commun SoftPay abonnement (facture créée via `POST …/souscrire/paydunya/init`). */
export class SoftPayAbonnementBodyDto {
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @IsString()
  @MinLength(1)
  offreId!: string;

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
  @Transform(({ value }) =>
    typeof value === "string" ? value.trim() : value,
  )
  @IsEmail()
  email?: string;
}

export class SoftPayAbonnementDto extends SoftPayAbonnementBodyDto {
  @IsIn([...PRESTATION_SOFTPAY_METHODS])
  method!: PrestationSoftPayMethod;
}
