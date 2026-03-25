import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { WithdrawalMethod } from '../../../generated/prisma/client.js';

export class RequestWithdrawalDto {
  @IsEnum(WithdrawalMethod)
  method: WithdrawalMethod;

  /** Montant demandé (FCFA), stocké dans `meta` pour traitement admin. */
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  amount?: number;
}

