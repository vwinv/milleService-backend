import { Role } from '../../../generated/prisma/client.js';
export declare class LoginDto {
    email: string;
    password: string;
    role?: Role;
}
