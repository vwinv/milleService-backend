import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { AuthModule } from '../auth/auth.module.js';
import { AdminController } from './admin.controller.js';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [AdminController],
})
export class AdminModule {}
