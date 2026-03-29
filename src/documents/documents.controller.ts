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
  'image/heic',
  'image/heif',
  'application/pdf',
];

/** iOS / certains clients envoient octet-stream même pour un JPG/HEIC/PDF. */
const ALLOWED_NAME = /\.(jpe?g|png|gif|webp|pdf|heic|heif)$/i;

function isAllowedUpload(file: MulterFile): boolean {
  if (ALLOWED_MIMES.includes(file.mimetype)) return true;
  if (
    file.mimetype === 'application/octet-stream' &&
    ALLOWED_NAME.test(file.originalname)
  ) {
    return true;
  }
  return false;
}

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
    if (!isAllowedUpload(file)) {
      throw new BadRequestException(
        'Type de fichier non autorisé. Utilisez: JPEG, PNG, GIF, WebP, HEIC ou PDF.',
      );
    }
    const result = await this.cloudinary.uploadDocument(
      file.buffer,
      file.originalname,
      file.mimetype,
    );
    return {
      url: result.secureUrl,
      publicId: result.publicId,
      originalName: file.originalname,
    };
  }
}
