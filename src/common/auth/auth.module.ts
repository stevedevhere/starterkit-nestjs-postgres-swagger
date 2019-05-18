import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as config from 'config';
import { ModelsModule } from '../../models/models.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secretOrPrivateKey: config.auth.secret,
      signOptions: {
        expiresIn: config.auth.expireIn,
      },
    }),
    ModelsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
