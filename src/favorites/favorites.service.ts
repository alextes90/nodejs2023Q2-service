import { Injectable } from '@nestjs/common';
import { Favorite } from './entities/favorite.entity';
import { albumsDB, artistsDB, favoritesDB, tracksDB } from 'db';

@Injectable()
export class FavoritesService {
  private favorites: Favorite = favoritesDB;

  findAll() {
    const favArtists = this.favorites.artists.map((artId) => {
      const result = artistsDB.find((artist) => artist.id === artId);
      return result;
    });
    const favAlbums = this.favorites.albums.map((albId) => {
      const result = albumsDB.find((album) => album.id === albId);
      return result;
    });
    const favTracks = this.favorites.tracks.map((trackId) => {
      const result = tracksDB.find((track) => track.id === trackId);
      return result;
    });
    return {
      artists: favArtists,
      albums: favAlbums,
      tracks: favTracks,
    };
  }

  postTrack(id: string) {
    const trackIndex = tracksDB.findIndex((track) => track.id === id);
    if (trackIndex >= 0) {
      this.favorites.tracks.push(id);
    } else return 'no such track id';
  }

  postArtist(id: string) {
    const artistIndex = artistsDB.findIndex((artist) => artist.id === id);
    if (artistIndex >= 0) {
      this.favorites.artists.push(id);
    } else return 'no such artist id';
  }

  postAlbum(id: string) {
    const albumIndex = albumsDB.findIndex((album) => album.id === id);
    if (albumIndex >= 0) {
      this.favorites.albums.push(id);
    } else return 'no such album id';
  }

  deleteTrack(id: string) {
    const trackIndex = this.favorites.tracks.findIndex((track) => track === id);
    if (trackIndex >= 0) {
      this.favorites.tracks.splice(trackIndex, 1);
    } else return 'no track';
  }

  deleteArtist(id: string) {
    const artistIndex = this.favorites.artists.findIndex(
      (artist) => artist === id,
    );
    if (artistIndex >= 0) {
      this.favorites.artists.splice(artistIndex, 1);
    } else return 'no artist';
  }

  deleteAlbums(id: string) {
    const albumIndex = this.favorites.albums.findIndex((album) => album === id);
    if (albumIndex >= 0) {
      this.favorites.albums.splice(albumIndex, 1);
    } else return 'no album';
  }
}
