import { Injectable } from '@nestjs/common';
import { UserEntity } from 'models/entities/users.entity';
import { InjectRepository, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  // ...
}
