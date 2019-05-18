import { ApiModelProperty } from '@nestjs/swagger';

export class AuthModel {
  @ApiModelProperty()
  login: string;

  @ApiModelProperty()
  password: string;
}
