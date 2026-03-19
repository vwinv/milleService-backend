/**
 * Declarations for the 'cloudinary' module (fixes "Cannot find module" with nodenext).
 * The package is in dependencies; this file only satisfies TypeScript resolution.
 */
declare module 'cloudinary' {
  export interface UploadApiResponse {
    secure_url?: string;
    public_id?: string;
  }

  export interface UploadStreamCallback {
    (error: Error | null, result?: UploadApiResponse): void;
  }

  export interface ConfigOptions {
    cloud_name?: string;
    api_key?: string;
    api_secret?: string;
  }

  export interface UploadStreamOptions {
    folder?: string;
    resource_type?: string;
    use_filename?: boolean;
    unique_filename?: boolean;
  }

  export interface Uploader {
    upload_stream: (
      options: UploadStreamOptions,
      callback: UploadStreamCallback,
    ) => NodeJS.WritableStream;
  }

  export interface V2Api {
    config: (options: ConfigOptions) => void;
    uploader: Uploader;
  }

  export const v2: V2Api;
}
