import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
  ) {}

  findAll() {
    return this.tracksRepository.find();
  }

  async findOne(id: string) {
    const track = await this.tracksRepository.findOneBy({ id });

    if (!track) {
      return 'no track';
    }

    return track;
  }

  async create(createTrackDto: CreateTrackDto) {
    const track = this.tracksRepository.create({
      ...createTrackDto,
      isFavorite: false,
    });
    const result = await this.tracksRepository.save(track);
    return result;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.tracksRepository.findOneBy({
      id,
    });
    if (!track) return 'no track';
    const result = { id, isFavorite: track.isFavorite, ...updateTrackDto };
    return await this.tracksRepository.save(result);
  }

  async remove(id: string) {
    const track = await this.tracksRepository.findOneBy({ id });
    if (!track) return 'no track';
    return await this.tracksRepository.delete(id);
  }
}
