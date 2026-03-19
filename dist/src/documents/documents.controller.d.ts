import { CloudinaryService } from '../cloudinary/cloudinary.service.js';
interface MulterFile {
    buffer: Buffer;
    originalname: string;
    mimetype: string;
}
export declare class DocumentsController {
    private readonly cloudinary;
    constructor(cloudinary: CloudinaryService);
    upload(file: MulterFile | undefined): Promise<{
        url: string;
        publicId: string;
        originalName: string;
    }>;
}
export {};
