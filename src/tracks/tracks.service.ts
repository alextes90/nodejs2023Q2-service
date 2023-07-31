import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { favoritesDB, tracksDB } from 'db';
import { randomUUID } from 'crypto';

@Injectable()
export class TracksService {
  private tracks: Track[] = tracksDB;

  findAll() {
    return this.tracks;
  }

  findOne(id: string) {
    const track = this.tracks.find((track) => track.id === id);

    if (!track) {
      return 'no track';
    }

    return track;
  }

  create(createTrackDto: CreateTrackDto) {
    const newTrack = {
      id: randomUUID(),
      name: createTrackDto.name,
      artistId: createTrackDto.artistId,
      albumId: createTrackDto.albumId,
      duration: createTrackDto.duration,
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    if (trackIndex >= 0) {
      this.tracks[trackIndex].name = updateTrackDto.name;
      this.tracks[trackIndex].albumId = updateTrackDto.albumId;
      this.tracks[trackIndex].duration = updateTrackDto.duration;
      this.tracks[trackIndex].artistId = updateTrackDto.artistId;
      return this.tracks[trackIndex];
    } else return 'no track';
  }

  remove(id: string) {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    const trackIndexInFav = favoritesDB.tracks.findIndex(
      (trackId) => trackId === id,
    );
    if (trackIndexInFav >= 0) {
      favoritesDB.tracks.splice(trackIndexInFav, 1);
    }
    if (trackIndex >= 0) {
      this.tracks.splice(trackIndex, 1);
    } else return 'no track';
  }
}
