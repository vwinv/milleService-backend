import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

export interface ErrorApiResponse {
  success: boolean;
  data: null;
  message: string;
  status: number;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    let status: number;
    let message: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const response = exception.getResponse();
      message =
        typeof response === 'string'
          ? response
          : (response as { message?: string | string[] })?.message
            ? Array.isArray(
                (response as { message: string | string[] }).message,
              )
              ? (response as { message: string[] }).message.join(', ')
              : (response as { message: string }).message
            : exception.message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message =
        exception instanceof Error ? exception.message : 'Erreur interne du serveur';
      this.logger.error(
        exception instanceof Error ? exception.stack : String(exception),
      );
    }

    const body: ErrorApiResponse = {
      success: false,
      data: null,
      message,
      status,
    };

    res.status(status).json(body);
  }
}
