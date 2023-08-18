import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TracksModule } from './tracks/tracks.module';
import { AlbumsModule } from './albums/albums.module';
import { ArtistsModule } from './artists/artists.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'src/datasource';
import { IamModule } from './iam/iam.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    TracksModule,
    AlbumsModule,
    ArtistsModule,
    FavoritesModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    IamModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
