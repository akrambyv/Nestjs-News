import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Request, response } from "express";
import { Observable, lastValueFrom, map, tap } from "rxjs";

export class LogRequestTimeInterceptor implements NestInterceptor {
   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      let now = Date.now();
      let req: Request = context.switchToHttp().getRequest();
      console.log('Request started', req.baseUrl, req.method);

      return next.handle().pipe(
         map((response) => ({ status: 'success', response })),
         tap(() => {
            console.log(`Request has finished`, Date.now() - now, 'ms');
         }),
      );
   }
}