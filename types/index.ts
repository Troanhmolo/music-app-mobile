// Shapes of the JSON returned by the music-app backend.

export interface User {
  _id: string;
  username: string;
  email: string;
  profileImage: string;
  role: 'user' | 'admin';
}

export interface Artist {
  _id: string;
  name: string;
  imageUrl: string;
}

export interface Album {
  _id: string;
  title: string;
  artist: Artist;
  imageUrl: string;
  releaseYear: number;
}

export interface Song {
  _id: string;
  title: string;
  artist: Artist;
  album?: Album | null;
  imageUrl: string;
  audioUrl: string;
  duration: string;
  genre?: string;
}

// One entry in the playback queue.
export interface Track {
  id: string;
  url: string;
  title: string;
  artwork: string;
  artist: string;
  album: string;
}

export interface Playlist {
  _id: string;
  name: string;
  user: string;
  songs: string[];
}
