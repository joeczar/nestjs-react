import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class AuthExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    console.log(request.url);
    if (!request.cookies.Authentication){
      response.redirect('/welcome')
    }
    // 
      // .status(status)
      // .json({
      //   statusCode: status,
      //   timestamp: new Date().toISOString(),
      //   path: request.url,
      // });
  }
}
