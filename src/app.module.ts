import { HttpModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileController } from 'api/controllers/file.controller';
import * as config from 'config';
import { ApiModule } from './api/api.module';
import { UsersController } from './api/controllers/users.controller';
import { AuthModule } from './common/auth/auth.module';
import { AuthMiddleware } from './common/middlewares/auth.middleware';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { ModelsModule } from './models/models.module';
import { ProvidersModule } from './providers/providers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config.db.pg),
    HttpModule,
    AuthModule,
    ApiModule,
    ProvidersModule,
    ModelsModule,
  ],
  controllers: [],
  providers: [],
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .with('ApplicationModule')
      .forRoutes(
        UsersController,
        FileController,
      )
      .apply(AuthMiddleware)
      .with('ApplicationModule')
      .forRoutes(
        UsersController,
        FileController,
      );
  }
}
