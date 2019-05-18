import { Injectable } from '@nestjs/common';
import { NewToken } from './interfaces/newToken.interface';

@Injectable()
export class AuthService {
  constructor() { }

  async createToken(username: string, password: string): Promise<NewToken> {
    // ...
    return;
  }
}
