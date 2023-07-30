import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { User } from 'src/users/entities/user.entity';

export const userDB: User[] = [];

export const tracksDB: Track[] = [];

export const artistsDB: Artist[] = [];

export const albumsDB: Album[] = [];

export const favoritesDB: Favorite = { artists: [], albums: [], tracks: [] };
