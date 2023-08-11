// import { Album } from 'src/albums/entities/album.entity';
// import { Artist } from 'src/artists/entities/artist.entity';
// import { Track } from 'src/tracks/entities/track.entity';
// import { User } from 'src/users/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Album } from './albums/entities/album.entity';
import { Artist } from './artists/entities/artist.entity';
import { Track } from './tracks/entities/track.entity';
import { User } from './users/entities/user.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'postgres',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  username: process.env.POSTGRES_USERNAME || 'postgres',
  password: process.env.POSTGRES_PASSWORD || '1234567',
  database: process.env.POSTGRES_DB || 'postgres',
  synchronize: true,
  entities: [User, Album, Track, Artist],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
