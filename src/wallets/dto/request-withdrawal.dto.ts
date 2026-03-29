import { Type } from 'class-transformer';
import { IsEnum, IsNumber, Min } from 'class-validator';
import { WithdrawalMethod } from '../../../generated/prisma/client.js';

export class RequestWithdrawalDto {
  @IsEnum(WithdrawalMethod)
  method: WithdrawalMethod;

  /** Montant demandé (FCFA), ne peut pas dépasser le solde du wallet. */
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01, { message: 'Le montant doit être strictement positif' })
  amount: number;
}

