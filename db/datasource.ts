import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { User } from 'src/users/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'host.docker.internal',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSRTGRES_USERNAME || 'postgres',
  password: process.env.POSTGRES_PASSWORD || '1234567',
  database: 'postgres',
  synchronize: true,
  entities: [User, Album, Track, Artist],
  // entities: ['dist/**/*.entity.js'],
  // migrations: ['dist/db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
