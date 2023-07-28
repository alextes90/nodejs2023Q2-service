import { Injectable } from '@nestjs/common';
import { CreateTrakDto } from './dto/create-trak.dto';
import { UpdateTrakDto } from './dto/update-trak.dto';

@Injectable()
export class TraksService {
  create(createTrakDto: CreateTrakDto) {
    return 'This action adds a new trak';
  }

  findAll() {
    return `This action returns all traks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trak`;
  }

  update(id: number, updateTrakDto: UpdateTrakDto) {
    return `This action updates a #${id} trak`;
  }

  remove(id: number) {
    return `This action removes a #${id} trak`;
  }
}
