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

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const isValidUUID = validate(id);
    if (!isValidUUID) {
      throw new HttpException(
        `Id - is not a valid UUID`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = this.tracksService.findOne(id);
    if (result === 'no track') {
      throw new HttpException(`Id - is not found`, HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    const isValidUUID = validate(id);
    if (!isValidUUID) {
      throw new HttpException(
        `Id - is not a valid UUID`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = this.tracksService.update(id, updateTrackDto);
    if (result === 'no track') {
      throw new HttpException(`Id - is not found`, HttpStatus.NOT_FOUND);
    }
    return result;
  }

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
    const result = this.tracksService.remove(id);
    if (result === 'no track') {
      throw new HttpException(`Id - is not found`, HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
