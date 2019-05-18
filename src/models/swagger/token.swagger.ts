import { ApiModelProperty } from '@nestjs/swagger';

export class TokenModel {
  @ApiModelProperty()
  token: string;
}
