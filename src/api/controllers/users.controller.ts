import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiImplicitParam, ApiImplicitQuery, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserEntity } from 'models/entities/users.entity';
import { UsersService } from 'providers/services/users.service';

@Controller('/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Get()
  @ApiOperation({ title: 'get all users', operationId: 'getUserList' })
  @ApiImplicitQuery({ name: 'limit', required: false })
  @ApiImplicitQuery({ name: 'offset', required: false })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    type: UserEntity,
    isArray: true,
  })
  async getUserList(
    @Req() request,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ): Promise<UserEntity[]> {
    throw new Error('not implemented');
  }

  @Get(':id')
  @ApiOperation({ title: 'get user by id', operationId: 'getUserById' })
  @ApiImplicitParam({ name: 'id', description: '-' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    type: UserEntity,
  })
  async getUserById(@Param('id') id: string): Promise<UserEntity> {
    throw new Error('not implemented');
  }
}
