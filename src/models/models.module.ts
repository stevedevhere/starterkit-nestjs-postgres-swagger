import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/users.entity';

const models = TypeOrmModule.forFeature([
  UserEntity,
]);

@Module({
  imports: [models],
  controllers: [],
  providers: [],
  exports: [models],
})
export class ModelsModule { }
