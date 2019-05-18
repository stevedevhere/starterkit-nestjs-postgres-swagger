import { HttpException, Injectable, MiddlewareFunction, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  resolve(context: string): MiddlewareFunction {
    return (req, res, next) => {
      const authKey = req.get('Authorization');

      if (authKey) {
        req.authToken = authKey.split(' ')[1];
      } else {
        throw new HttpException('Unauthorized', 401);
      }

      next();
    };
  }
}
