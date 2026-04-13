import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Request, Response } from "express";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  status: number;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<
  T,
  ApiResponse<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    const req = context.switchToHttp().getRequest<Request>();
    const path = req.path ?? req.url ?? "";
    if (
      path.includes("webhooks/paydunya") ||
      path.includes("webhooks/paydunya/disburse")
    ) {
      return next.handle() as unknown as Observable<ApiResponse<T>>;
    }
    const res = context.switchToHttp().getResponse<Response>();
    return next.handle().pipe(
      map((data: T) => {
        const status = res.statusCode ?? 200;
        return {
          success: true,
          data,
          message: "OK",
          status,
        };
      }),
    );
  }
}
