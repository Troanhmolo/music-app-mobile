import { unknownTrackImageUri } from '@/constants/images';
import type { Song, Track } from '@/types';

export function mapSongsToQueue(songs: Song[]): Track[] {
  return songs.map(song => ({
    id: song._id,
    url: song.audioUrl,
    title: song.title,
    artwork: song.imageUrl ?? unknownTrackImageUri,
    artist: song.artist.name,
    album: song.album?.title ?? "Single",
    // add other fields as needed
  }));
}