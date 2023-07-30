import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { albumsDB, artistsDB, tracksDB } from 'db';
import { randomUUID } from 'crypto';

@Injectable()
export class ArtistsService {
  private artists: Artist[] = artistsDB;

  findAll() {
    return this.artists;
  }

  findOne(id: string) {
    const artist = this.artists.find((artist) => artist.id === id);

    if (!artist) {
      return 'no artist';
    }

    return artist;
  }

  create(createArtistDto: CreateArtistDto) {
    const newArtist = {
      id: randomUUID(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    if (artistIndex >= 0) {
      this.artists[artistIndex].name = updateArtistDto.name;
      this.artists[artistIndex].grammy = updateArtistDto.grammy;
      return this.artists[artistIndex];
    } else return 'no artist';
  }

  remove(id: string) {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    const artistIndexInTracks = tracksDB.findIndex(
      (track) => track.artistId === id,
    );
    const artistIndexInAlbums = albumsDB.findIndex(
      (album) => album.artistId === id,
    );
    if (artistIndexInAlbums >= 0) {
      albumsDB[artistIndexInAlbums].artistId = null;
    }

    if (artistIndexInTracks >= 0) {
      tracksDB[artistIndexInTracks].artistId = null;
    }
    if (artistIndex >= 0) {
      this.artists.splice(artistIndex, 1);
    } else return 'no artist';
  }
}
