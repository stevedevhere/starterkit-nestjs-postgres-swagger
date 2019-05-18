import { HttpModule, Module } from '@nestjs/common';
import { ModelsModule } from '../models/models.module';
import { FileService } from './services/file.service';
import { UsersService } from './services/users.service';

const services = [
  UsersService,
  FileService,
];

@Module({
  imports: [
    ModelsModule,
    HttpModule,
  ],
  controllers: [],
  providers: services,
  exports: services,
})
export class ProvidersModule { }
