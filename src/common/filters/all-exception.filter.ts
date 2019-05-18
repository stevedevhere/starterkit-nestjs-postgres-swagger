import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { WinstonLogger } from '../services/logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger: WinstonLogger = new WinstonLogger(AllExceptionsFilter.name);
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = (exception instanceof HttpException) ? exception.getStatus() : 500;
    const message = (exception instanceof HttpException) ? exception.getResponse() : 'Server Error';

    this.logger.error(`<= HTTP Status ${status}: ${message} for ${request.method} ${request.url}`, JSON.stringify(exception));

    response.status(status)
      .json({
        statusCode: status,
        message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
