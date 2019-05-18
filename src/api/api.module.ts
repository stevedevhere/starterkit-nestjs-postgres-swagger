import { Module } from '@nestjs/common';
import { ProvidersModule } from '../providers/providers.module';
import { FileController } from './controllers/file.controller';
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [
    ProvidersModule,
  ],
  controllers: [
    UsersController,
    FileController,
  ],
  providers: [],
})
export class ApiModule { }
