import { IsEnum } from 'class-validator';
import { WithdrawalMethod } from '../../../generated/prisma/client.js';

export class RequestWithdrawalDto {
  @IsEnum(WithdrawalMethod)
  method: WithdrawalMethod;
}

