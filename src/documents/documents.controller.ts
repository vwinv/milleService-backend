import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { CloudinaryService } from '../cloudinary/cloudinary.service.js';

/** Type du fichier reçu par Multer (memoryStorage) — évite la dépendance à Express.Multer */
interface MulterFile {
  buffer: Buffer;
  originalname: string;
  mimetype: string;
}

const MAX_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_MIMES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'application/pdf',
];

@Controller('documents')
export class DocumentsController {
  constructor(private readonly cloudinary: CloudinaryService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: MAX_SIZE },
    }),
  )
  async upload(@UploadedFile() file: MulterFile | undefined) {
    if (!file) {
      throw new BadRequestException('Aucun fichier envoyé');
    }
    if (!ALLOWED_MIMES.includes(file.mimetype)) {
      throw new BadRequestException(
        'Type de fichier non autorisé. Utilisez: JPEG, PNG, GIF, WebP ou PDF.',
      );
    }
    const result = await this.cloudinary.uploadDocument(
      file.buffer,
      file.originalname,
    );
    return {
      url: result.secureUrl,
      publicId: result.publicId,
      originalName: file.originalname,
    };
  }
}
