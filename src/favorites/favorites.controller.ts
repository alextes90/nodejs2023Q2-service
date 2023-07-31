import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { validate } from 'uuid';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  postTrack(@Param('id') id: string) {
    const isValidUUID = validate(id);
    if (!isValidUUID) {
      throw new HttpException(
        `Id - is not a valid UUID`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = this.favoritesService.postTrack(id);
    if (result === 'no such track id') {
      throw new HttpException(
        'no such track id',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return result;
  }

  @Post('album/:id')
  postAlbum(@Param('id') id: string) {
    const isValidUUID = validate(id);
    if (!isValidUUID) {
      throw new HttpException(
        `Id - is not a valid UUID`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = this.favoritesService.postAlbum(id);
    if (result === 'no such album id') {
      throw new HttpException(
        'no such album id',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return result;
  }

  @Post('artist/:id')
  postArtist(@Param('id') id: string) {
    const isValidUUID = validate(id);
    if (!isValidUUID) {
      throw new HttpException(
        `Id - is not a valid UUID`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = this.favoritesService.postArtist(id);
    if (result === 'no such artist id') {
      throw new HttpException(
        'no such artist id',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return result;
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id') id: string) {
    const isValidUUID = validate(id);
    if (!isValidUUID) {
      throw new HttpException(
        `Id - is not a valid UUID`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = this.favoritesService.deleteTrack(id);
    if (result === 'no track') {
      throw new HttpException('no track', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Param('id') id: string) {
    const isValidUUID = validate(id);
    if (!isValidUUID) {
      throw new HttpException(
        `Id - is not a valid UUID`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = this.favoritesService.deleteAlbums(id);
    if (result === 'no album') {
      throw new HttpException('no album', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id') id: string) {
    const isValidUUID = validate(id);
    if (!isValidUUID) {
      throw new HttpException(
        `Id - is not a valid UUID`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = this.favoritesService.deleteArtist(id);
    if (result === 'no artist') {
      throw new HttpException('no artist', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
