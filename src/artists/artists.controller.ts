import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Put,
  HttpCode,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { validate } from 'uuid';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Artist } from './entities/artist.entity';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @ApiOkResponse({
    description: 'The artist records',
    type: Artist,
    isArray: true,
  })
  @Get()
  findAll() {
    return this.artistsService.findAll();
  }

  @ApiOkResponse({
    description: 'The artist record',
    type: Artist,
  })
  @ApiBadRequestResponse({
    description: 'id is not a valid uuid',
  })
  @ApiNotFoundResponse({
    description: 'no such id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    const isValidUUID = validate(id);
    if (!isValidUUID) {
      throw new HttpException(
        `Id - is not a valid UUID`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = this.artistsService.findOne(id);
    if (result === 'no artist') {
      throw new HttpException(`Id - is not found`, HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @ApiCreatedResponse({
    type: Artist,
  })
  @ApiBadRequestResponse({
    description: 'does not contained required fields',
  })
  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @ApiOkResponse({
    type: Artist,
  })
  @ApiNotFoundResponse({
    description: 'no such id',
  })
  @ApiBadRequestResponse({
    description: 'id is not a valid uuid',
  })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    const isValidUUID = validate(id);
    if (!isValidUUID) {
      throw new HttpException(
        `Id - is not a valid UUID`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = this.artistsService.update(id, updateArtistDto);
    if (result === 'no artist') {
      throw new HttpException(`Id - is not found`, HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @ApiNoContentResponse({
    description: 'deleted successfully',
  })
  @ApiBadRequestResponse({
    description: 'id is not a valid uuid',
  })
  @ApiNotFoundResponse({
    description: 'no such id',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    const isValidUUID = validate(id);
    if (!isValidUUID) {
      throw new HttpException(
        `Id - is not a valid UUID`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = this.artistsService.remove(id);
    if (result === 'no artist') {
      throw new HttpException(`Id - is not found`, HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
