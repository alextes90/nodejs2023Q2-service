import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { albumsDB, favoritesDB, tracksDB } from 'db';
import { randomUUID } from 'crypto';

@Injectable()
export class AlbumsService {
  private albums: Album[] = albumsDB;

  findAll() {
    return this.albums;
  }

  findOne(id: string) {
    const album = this.albums.find((album) => album.id === id);

    if (!album) {
      return 'no album';
    }

    return album;
  }

  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = {
      id: randomUUID(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    if (albumIndex >= 0) {
      this.albums[albumIndex].name = updateAlbumDto.name;
      this.albums[albumIndex].year = updateAlbumDto.year;
      this.albums[albumIndex].artistId = updateAlbumDto.artistId;
      return this.albums[albumIndex];
    } else return 'no albums';
  }

  remove(id: string) {
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    const albumIndexInTracks = tracksDB.findIndex(
      (track) => track.albumId === id,
    );
    const albumIndexInFav = favoritesDB.albums.findIndex(
      (albId) => albId === id,
    );
    if (albumIndexInFav >= 0) {
      favoritesDB.albums.splice(albumIndexInFav, 1);
    }
    if (albumIndexInTracks >= 0) {
      tracksDB[albumIndexInTracks].albumId = null;
    }
    if (albumIndex >= 0) {
      this.albums.splice(albumIndex, 1);
    } else return 'no album';
  }
}
