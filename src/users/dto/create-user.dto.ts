import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'your login',
    example: 'alex',
  })
  @IsString()
  readonly login: string;

  @ApiProperty({
    description: 'password',
    example: '123qwer!',
  })
  @IsString()
  readonly password: string;
}
