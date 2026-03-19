export declare const CLOUDINARY_FOLDER = "milleservices/documents";
export interface UploadResult {
    url: string;
    publicId: string;
    secureUrl: string;
}
export declare class CloudinaryService {
    constructor();
    uploadDocument(buffer: Buffer, originalName: string): Promise<UploadResult>;
}
