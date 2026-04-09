import { IsEmail, IsString, MinLength } from "class-validator";

export class ForgotPasswordDto {
  @IsEmail({}, { message: "L'email est invalide" })
  email: string;

  @IsString()
  @MinLength(6, { message: "Le numéro de téléphone est invalide" })
  telephone: string;

  @IsString()
  @MinLength(8, {
    message: "Le nouveau mot de passe doit contenir au moins 8 caractères",
  })
  newPassword: string;
}
