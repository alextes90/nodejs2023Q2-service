import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({ description: 'name of artist', example: 'Korol i Shut' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'name of artist', example: 'false' })
  @IsBoolean()
  grammy: boolean;
}
