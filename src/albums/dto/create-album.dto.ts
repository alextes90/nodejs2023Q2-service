import { IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  name: string;

  @IsNumber()
  year: number;

  @ValidateIf((object, value) => value !== null)
  artistId: string | null; // refers to Artist
}
