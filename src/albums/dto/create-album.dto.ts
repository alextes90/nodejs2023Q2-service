import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty({ description: 'name of the album', example: 'Korol i Shut' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'year of creation', example: '1997' })
  @IsNumber()
  year: number;

  @ApiProperty({
    description: 'id of artist',
    example: '3af3d2ca-9d3c-4308-b47c-9829123f3335 | null',
  })
  @ValidateIf((object, value) => value !== null)
  artistId: string | null; // refers to Artist
}
