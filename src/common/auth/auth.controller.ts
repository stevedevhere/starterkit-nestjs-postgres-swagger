import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiImplicitBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthModel } from 'models/swagger/dto/auth.dto';
import { TokenModel } from 'models/swagger/token.swagger';
import { AuthService } from './auth.service';
import { AuthOptions } from './decorators/authOptions.decorator';
import { NewToken } from './interfaces/newToken.interface';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login')
  @AuthOptions('pass')
  @ApiOperation({ title: 'create authToken', operationId: 'getToken' })
  @ApiImplicitBody({ name: 'new Token', type: AuthModel })
  @ApiResponse({
    status: 200,
    type: TokenModel,
  })
  async getToken(@Body() body): Promise<NewToken> {
    return await this.authService.createToken(body.username, body.password);
  }

  @Post('/logout')
  @HttpCode(204)
  @ApiOperation({ title: 'logout, set the Auth header to none', operationId: 'logout' })
  @ApiBearerAuth()
  logout() {
    // ...
  }
}
