import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

export const CLOUDINARY_FOLDER = 'milleservices/documents';

export interface UploadResult {
  url: string;
  publicId: string;
  secureUrl: string;
}

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  /**
   * Upload a file buffer to Cloudinary in the folder milleservices/documents.
   * @param buffer File buffer (image or PDF)
   * @param originalName Original filename (for context / resource_type)
   * @returns Upload result with secure_url and public_id
   */
  async uploadDocument(
    buffer: Buffer,
    originalName: string,
    mimetype?: string,
  ): Promise<UploadResult> {
    const mt = (mimetype ?? '').toLowerCase();
    const isPdf =
      /\.pdf$/i.test(originalName) ||
      mt === 'application/pdf' ||
      mt === 'application/x-pdf';
    const resourceType = isPdf ? 'raw' : 'image';

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: CLOUDINARY_FOLDER,
          resource_type: resourceType,
          use_filename: true,
          unique_filename: true,
        },
        (error, result) => {
          if (error) return reject(error);
          if (!result || !result.secure_url) {
            return reject(new Error('Upload failed: no result'));
          }
          resolve({
            url: result.secure_url,
            secureUrl: result.secure_url,
            publicId: result.public_id ?? '',
          });
        },
      );
      uploadStream.end(buffer);
    });
  }
}
