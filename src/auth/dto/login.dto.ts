import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { Role } from '../../../generated/prisma/client.js';

export class LoginDto {
  @IsOptional()
  @ValidateIf((o) => !o.email || `${o.email}`.trim().length === 0)
  @IsString()
  @MinLength(1, { message: 'Le telephone est requis' })
  telephone?: string;

  @IsOptional()
  @ValidateIf((o) => !o.telephone || `${o.telephone}`.trim().length === 0)
  @IsEmail({}, { message: "L'email est invalide" })
  email?: string;

  @IsString()
  @MinLength(1, { message: 'Le mot de passe est requis' })
  password: string;

  @IsOptional()
  @IsEnum(Role, { message: 'Rôle invalide' })
  role?: Role;
}
