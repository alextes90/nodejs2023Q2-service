import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  findAll() {
    return this.artistsRepository.find();
  }

  async findOne(id: string) {
    const artist = await this.artistsRepository.findOneBy({ id });

    if (!artist) {
      return 'no artist';
    }

    return artist;
  }

  async create(createArtistDto: CreateArtistDto) {
    const artist = this.artistsRepository.create({
      ...createArtistDto,
      isFavorite: false,
    });
    const result = await this.artistsRepository.save(artist);
    return result;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.artistsRepository.findOneBy({
      id,
    });
    if (!artist) return 'no artist';
    const result = { id, isFavorite: artist.isFavorite, ...updateArtistDto };
    return await this.artistsRepository.save(result);
  }

  async remove(id: string) {
    const artist = await this.artistsRepository.findOneBy({ id });
    if (artist) {
      return await this.artistsRepository.delete(id);
    } else return 'no artist';
  }
}
