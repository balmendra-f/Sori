export interface Author {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
  isVerified?: boolean;
}

export interface Track {
  id: string;
  author: Author;
  title: string;
  bpm: number;
  duration: string; // e.g. "0:45"
  waveformBars: number[];
  playedRatio: number; // 0 to 1
  isPlaying: boolean;
  likes: string;
  isLiked?: boolean;
  comments: string;
  actionType: 'remix' | 'use';
  actionLabel?: string;
  category?: 'Tendencias' | 'Nuevos' | 'Remixes' | 'Stems' | 'Para Ti';
  genre?: string;
}

export interface NowPlayingTrack {
  id?: string;
  title: string;
  bpm: number;
  subtitle: string;
  progress: number; // 0 to 1
  isPlaying: boolean;
  durationSeconds?: number;
}

export interface TrackComment {
  id: string;
  trackId: string;
  authorName: string;
  authorHandle: string;
  avatarUrl?: string;
  text: string;
  createdAt: string;
}
