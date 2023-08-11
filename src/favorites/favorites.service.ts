import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { Repository } from 'typeorm';

const returnEntity = (entity: Artist | Track | Album) => {
  if (entity instanceof Artist) {
    const { grammy, name, id } = entity;
    return { grammy, name, id };
  } else if (entity instanceof Track) {
    const { artistId, id, name, albumId, duration } = entity;
    return { artistId, id, name, albumId, duration };
  } else if (entity instanceof Album) {
    const { artistId, id, name, year } = entity;
    return { artistId, id, name, year };
  }
};

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,

    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,

    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  async findAll() {
    const favArtists = await this.artistsRepository.find({
      where: {
        isFavorite: true,
      },
    });
    const favAlbums = await this.albumsRepository.find({
      where: {
        isFavorite: true,
      },
    });
    const favTracks = await this.tracksRepository.find({
      where: {
        isFavorite: true,
      },
    });
    return {
      artists: favArtists.map((i) => returnEntity(i)),
      albums: favAlbums.map((i) => returnEntity(i)),
      tracks: favTracks.map((i) => returnEntity(i)),
    };
  }

  async postTrack(id: string) {
    const result = await this.tracksRepository.findOneBy({
      id,
    });
    if (!result) return 'no such track id';
    // result.isFavorite = true;
    // this.tracksRepository.save(result);
    await this.tracksRepository.update(id, { isFavorite: true });
    return returnEntity(result);
  }

  async postArtist(id: string) {
    const result = await this.artistsRepository.findOneBy({
      id,
    });
    if (!result) return 'no such artist id';
    // result.isFavorite = true;
    // this.artistsRepository.save(result);
    await this.artistsRepository.update(id, { isFavorite: true });
    const result2 = await this.artistsRepository.findOneBy({
      id,
    });
    console.log(result2);
    return returnEntity(result);
  }

  async postAlbum(id: string) {
    const result = await this.albumsRepository.findOne({ where: { id } });
    if (!result) return 'no such album id';
    // result.isFavorite = true;
    // this.albumsRepository.save(result);
    await this.albumsRepository.update(id, { isFavorite: true });
    return returnEntity(result);
  }

  async deleteTrack(id: string) {
    const result = await this.tracksRepository.findOneBy({
      id,
    });
    if (!result) return 'no track';
    // result.isFavorite = false;
    // this.tracksRepository.save(result);
    await this.tracksRepository.update(id, { isFavorite: false });
    return undefined;
  }

  async deleteArtist(id: string) {
    const result = await this.artistsRepository.findOneBy({
      id,
    });
    if (!result) return 'no artist';
    // result.isFavorite = false;
    // this.artistsRepository.save(result);
    await this.artistsRepository.update(id, { isFavorite: false });
    return undefined;
  }

  async deleteAlbums(id: string) {
    const result = await this.albumsRepository.findOneBy({
      id,
    });
    if (!result) return 'no album';
    // result.isFavorite = false;
    // this.albumsRepository.save(result);
    await this.albumsRepository.update(id, { isFavorite: false });
    return undefined;
  }
}
