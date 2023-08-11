import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { validate } from 'uuid';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Track } from './entities/track.entity';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @ApiOkResponse({
    description: 'The track records',
    type: Track,
    isArray: true,
  })
  @Get()
  findAll() {
    return this.tracksService.findAll();
  }

  @ApiOkResponse({
    description: 'The track record',
    type: Track,
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
    const result = await this.tracksService.findOne(id);
    if (result === 'no track') {
      throw new HttpException(`Id - is not found`, HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @ApiCreatedResponse({
    type: Track,
  })
  @ApiBadRequestResponse({
    description: 'does not contained required fields',
  })
  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @ApiOkResponse({
    description: 'The user record',
    type: Track,
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
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const isValidUUID = validate(id);
    if (!isValidUUID) {
      throw new HttpException(
        `Id - is not a valid UUID`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = await this.tracksService.update(id, updateTrackDto);
    if (result === 'no track') {
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
    const result = await this.tracksService.remove(id);
    if (result === 'no track') {
      throw new HttpException(`Id - is not found`, HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
