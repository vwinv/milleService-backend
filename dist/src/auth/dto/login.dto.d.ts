import { Role } from '../../../generated/prisma/client.js';
export declare class LoginDto {
    telephone?: string;
    email?: string;
    password: string;
    role?: Role;
}
