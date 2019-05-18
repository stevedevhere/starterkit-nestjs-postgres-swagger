import { Injectable, MiddlewareFunction, NestMiddleware } from '@nestjs/common';
import { WinstonLogger } from '../../common/services/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger: WinstonLogger = new WinstonLogger(LoggerMiddleware.name);
  resolve(context: string): MiddlewareFunction {
    return (req, res, next) => {
      const startRequest = new Date().getTime();
      this.logger.log(`[${context}] => ${req.method} for ${req.url}`);
      next();
      const endResponse = new Date().getTime();
      this.logger.log(`[${context}] <= HTTP Status ${res.statusCode} for ${req.method} ${req.url} - ${endResponse - startRequest} ms`);
    };
  }
}
