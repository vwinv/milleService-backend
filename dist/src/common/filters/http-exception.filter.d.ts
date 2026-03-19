import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
export interface ErrorApiResponse {
    success: boolean;
    data: null;
    message: string;
    status: number;
}
export declare class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger;
    catch(exception: unknown, host: ArgumentsHost): void;
}
