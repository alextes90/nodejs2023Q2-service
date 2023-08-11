import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
  ) {}

  findAll() {
    return this.albumsRepository.find();
  }

  async findOne(id: string) {
    const album = await this.albumsRepository.findOneBy({ id });

    if (!album) {
      return 'no album';
    }

    return album;
  }

  async create(createAlbumDto: CreateAlbumDto) {
    const album = this.albumsRepository.create({
      ...createAlbumDto,
      isFavorite: false,
    });
    const result = await this.albumsRepository.save(album);
    return result;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.albumsRepository.findOneBy({
      id,
    });
    if (!album) return 'no albums';
    const result = { id, isFavorite: album.isFavorite, ...updateAlbumDto };
    return await this.albumsRepository.save(result);
  }

  async remove(id: string) {
    const album = await this.albumsRepository.findOneBy({
      id,
    });
    if (album) {
      return await this.albumsRepository.delete(id);
    } else return 'no album';
  }
}
