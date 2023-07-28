import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TraksService } from './traks.service';
import { CreateTrakDto } from './dto/create-trak.dto';
import { UpdateTrakDto } from './dto/update-trak.dto';

@Controller('traks')
export class TraksController {
  constructor(private readonly traksService: TraksService) {}

  @Post()
  create(@Body() createTrakDto: CreateTrakDto) {
    return this.traksService.create(createTrakDto);
  }

  @Get()
  findAll() {
    return this.traksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.traksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrakDto: UpdateTrakDto) {
    return this.traksService.update(+id, updateTrakDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.traksService.remove(+id);
  }
}
