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
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { validate } from 'uuid';
import { Album } from './entities/album.entity';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @ApiOkResponse({
    description: 'The album records',
    type: Album,
    isArray: true,
  })
  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @ApiOkResponse({
    description: 'The album record',
    type: Album,
  })
  @ApiBadRequestResponse({
    description: 'id is not a valid uuid',
  })
  @ApiNotFoundResponse({
    description: 'no such id',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const isValidUUID = validate(id);
    if (!isValidUUID) {
      throw new HttpException(
        `Id - is not a valid UUID`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = await this.albumsService.findOne(id);
    if (result === 'no album') {
      throw new HttpException(`Id - is not found`, HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @ApiCreatedResponse({
    type: Album,
  })
  @ApiBadRequestResponse({
    description: 'does not contained required fields',
  })
  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @ApiOkResponse({
    type: Album,
  })
  @ApiNotFoundResponse({
    description: 'no such id',
  })
  @ApiBadRequestResponse({
    description: 'id is not a valid uuid',
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const isValidUUID = validate(id);
    if (!isValidUUID) {
      throw new HttpException(
        `Id - is not a valid UUID`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = await this.albumsService.update(id, updateAlbumDto);
    if (result === 'no albums') {
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
  async remove(@Param('id') id: string) {
    const isValidUUID = validate(id);
    if (!isValidUUID) {
      throw new HttpException(
        `Id - is not a valid UUID`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = await this.albumsService.remove(id);
    if (result === 'no album') {
      throw new HttpException(`Id - is not found`, HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
