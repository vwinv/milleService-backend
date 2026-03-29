import { WithdrawalMethod } from '../../../generated/prisma/client.js';
export declare class RequestWithdrawalDto {
    method: WithdrawalMethod;
    amount: number;
}
