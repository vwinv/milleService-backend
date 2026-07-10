import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateBetaTesteurDto {
  @IsNotEmpty({ message: "Le nom est requis" })
  @IsString()
  @MaxLength(120)
  nom!: string;

  @IsNotEmpty({ message: "Le prénom est requis" })
  @IsString()
  @MaxLength(120)
  prenom!: string;

  @IsNotEmpty({ message: "L'email est requis" })
  @IsEmail({}, { message: "Email invalide" })
  @MaxLength(255)
  email!: string;

  @IsNotEmpty({ message: "Le téléphone est requis" })
  @IsString()
  @MaxLength(30)
  telephone!: string;
}
