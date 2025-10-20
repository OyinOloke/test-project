import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiRresponse } from '../response-interface';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T,ApiRresponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiRresponse<T>> {
    return next.handle().pipe(
      map(data=>({
        status: context.switchToHttp().getResponse().statusCode,
        message: data?.message || "Success",
        data: data?.content ?? data ?? null,
        timestamp: new Date().toISOString(),
      })
    )
    );
  }
}
