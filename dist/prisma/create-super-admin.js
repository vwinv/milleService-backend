"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const bcrypt = __importStar(require("bcrypt"));
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("../generated/prisma/client");
let connectionString = process.env.DATABASE_URL;
if (!connectionString)
    throw new Error('DATABASE_URL est requis');
if (!connectionString.includes('sslmode=')) {
    connectionString += (connectionString.includes('?') ? '&' : '?') + 'sslmode=require';
}
const adapter = new adapter_pg_1.PrismaPg({ connectionString });
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    const email = (process.env.SUPER_ADMIN_EMAIL ?? 'admin@milleservices.local')
        .trim()
        .toLowerCase();
    const password = process.env.SUPER_ADMIN_PASSWORD ?? 'ChangeMeAdmin123!';
    if (password.length < 8) {
        throw new Error('SUPER_ADMIN_PASSWORD doit faire au moins 8 caractères');
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.upsert({
        where: { email },
        create: {
            email,
            passwordHash,
            role: client_1.Role.ADMIN,
            emailVerified: true,
        },
        update: {
            passwordHash,
            role: client_1.Role.ADMIN,
            emailVerified: true,
        },
    });
    console.log('Super admin OK');
    console.log('  id   :', user.id);
    console.log('  email:', user.email);
    console.log('  role :', user.role);
    if (!process.env.SUPER_ADMIN_PASSWORD) {
        console.warn('\n⚠️  Mot de passe par défaut utilisé. Définissez SUPER_ADMIN_PASSWORD dans .env puis relancez pour le changer.');
    }
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=create-super-admin.js.map