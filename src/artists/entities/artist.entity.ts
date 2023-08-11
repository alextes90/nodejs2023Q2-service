import { Exclude } from 'class-transformer';
import { Album } from 'src/albums/entities/album.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @Exclude()
  @Column()
  isFavorite: boolean;

  @OneToMany(() => Album, (el) => el.artist)
  albums: Album[];

  @OneToMany(() => Track, (el) => el.artist)
  tracks: Track[];
}
