import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller.js';
import { CloudinaryModule } from '../cloudinary/cloudinary.module.js';

@Module({
  imports: [CloudinaryModule],
  controllers: [DocumentsController],
})
export class DocumentsModule {}
