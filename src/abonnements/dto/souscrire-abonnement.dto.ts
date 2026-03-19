import { IsString, IsNotEmpty } from 'class-validator';

export class SouscrireAbonnementDto {
  @IsString()
  @IsNotEmpty()
  offreId: string;
}
