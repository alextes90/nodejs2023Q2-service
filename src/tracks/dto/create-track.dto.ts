import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreateTrackDto {
  @ApiProperty({ description: 'name of track', example: 'Korol i Shut' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'id of artist',
    example: 'dd3a192c-d498-4483-afeb-2a170b695c18 | null',
  })
  @IsString()
  @ValidateIf((object, value) => value !== null)
  artistId: string | null; // refers to Artist

  @ApiProperty({
    description: 'id of album',
    example: 'dd3a192c-d498-4483-afeb-2a170b695c18 | null',
  })
  @IsString()
  @ValidateIf((object, value) => value !== null)
  albumId: string | null; // refers to Album

  @ApiProperty({
    description: 'duaration in sec',
    example: '300',
  })
  @IsNumber()
  duration: number; // integer number
}
