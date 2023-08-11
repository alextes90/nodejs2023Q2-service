import { Exclude } from 'class-transformer';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ nullable: true })
  artistId: string | null; // refers to Artist

  @Exclude()
  @Column()
  isFavorite: boolean;

  @ManyToOne(() => Artist, (el) => el.albums, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artistId' })
  artist: Artist;

  @OneToMany(() => Track, (el) => el.album)
  tracks: Track[];
}
