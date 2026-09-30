import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from 'react';
import { Track, NowPlayingTrack, TrackComment } from './types';
import { toggleLikeTrack, createTrack, addTrackComment } from '@/api';

const WAVEFORM_1 = [
  0.35, 0.55, 0.8, 0.6, 0.95, 0.7, 0.85, 1.0, 0.75, 0.6, 0.9, 0.65, 0.75, 0.5,
  0.4, 0.5, 0.65, 0.55, 0.75, 0.45, 0.6, 0.45, 0.35, 0.5, 0.4, 0.25,
];

const WAVEFORM_2 = [
  0.25, 0.4, 0.6, 0.85, 0.7, 0.9, 0.6, 0.8, 0.95, 0.7, 0.55, 0.75, 0.9, 0.65,
  0.45, 0.6, 0.75, 0.65, 0.45, 0.55, 0.4, 0.5, 0.35, 0.45, 0.3, 0.2,
];

const WAVEFORM_3 = [
  0.2, 0.35, 0.55, 0.8, 0.65, 0.85, 0.6, 0.75, 0.9, 0.65, 0.5, 0.7, 0.85, 0.6,
  0.45, 0.55, 0.7, 0.6, 0.4, 0.5, 0.35, 0.45, 0.3, 0.25, 0.2, 0.15,
];

const WAVEFORM_4 = [
  0.4, 0.65, 0.5, 0.85, 0.7, 1.0, 0.8, 0.6, 0.75, 0.9, 0.65, 0.55, 0.7, 0.85,
  0.6, 0.45, 0.6, 0.5, 0.4, 0.55, 0.35, 0.4, 0.3, 0.2,
];

const WAVEFORM_5 = [
  0.3, 0.5, 0.7, 0.9, 0.65, 0.85, 1.0, 0.75, 0.85, 0.6, 0.75, 0.55, 0.4, 0.6,
  0.7, 0.5, 0.65, 0.8, 0.6, 0.45, 0.35, 0.5, 0.3, 0.2,
];

export const INITIAL_FEED_TRACKS: Track[] = [
  {
    id: '1',
    author: {
      id: 'a1',
      name: 'Elena Synth',
      handle: '@elena_synth',
      avatarUrl:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      isVerified: true,
    },
    title: 'Neon Horizons',
    bpm: 124,
    duration: '0:45',
    waveformBars: WAVEFORM_1,
    playedRatio: 0.35,
    isPlaying: false,
    likes: '1.2k',
    isLiked: true,
    comments: '84',
    actionType: 'remix',
    actionLabel: 'Remix',
    category: 'Tendencias',
    genre: 'Synthwave',
  },
  {
    id: '2',
    author: {
      id: 'a2',
      name: 'Kaelen',
      handle: '@kaelen_beats',
      avatarUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      isVerified: false,
    },
    title: 'Deep Sub Bass 808',
    bpm: 140,
    duration: '0:30',
    waveformBars: WAVEFORM_2,
    playedRatio: 0,
    isPlaying: false,
    likes: '482',
    isLiked: false,
    comments: '19',
    actionType: 'use',
    actionLabel: 'Usar',
    category: 'Stems',
    genre: 'Cyberpunk',
  },
  {
    id: '3',
    author: {
      id: 'a3',
      name: 'Sofía Vocals',
      handle: '@sofia_vocals',
      avatarUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
      isVerified: true,
    },
    title: 'Soulful Hook Vocals',
    bpm: 96,
    duration: '0:22',
    waveformBars: WAVEFORM_3,
    playedRatio: 0,
    isPlaying: false,
    likes: '830',
    isLiked: false,
    comments: '62',
    actionType: 'use',
    actionLabel: 'Usar',
    category: 'Nuevos',
    genre: 'Lo-Fi',
  },
  {
    id: '4',
    author: {
      id: 'a4',
      name: 'Nexus Pulse',
      handle: '@nexus_pulse',
      avatarUrl:
        'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
      isVerified: true,
    },
    title: 'Tokyo Raindrops (Club Edit)',
    bpm: 128,
    duration: '0:50',
    waveformBars: WAVEFORM_4,
    playedRatio: 0,
    isPlaying: false,
    likes: '1.9k',
    isLiked: false,
    comments: '112',
    actionType: 'remix',
    actionLabel: 'Remix',
    category: 'Remixes',
    genre: 'Electro',
  },
  {
    id: '5',
    author: {
      id: 'a5',
      name: 'Aura Sound',
      handle: '@aura_sound',
      avatarUrl:
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=80',
      isVerified: false,
    },
    title: 'Analog Euphoria Arp',
    bpm: 118,
    duration: '0:35',
    waveformBars: WAVEFORM_5,
    playedRatio: 0,
    isPlaying: false,
    likes: '715',
    isLiked: true,
    comments: '38',
    actionType: 'use',
    actionLabel: 'Usar',
    category: 'Stems',
    genre: 'Ambient',
  },
];

export const INITIAL_PROFILE_TRACKS: Track[] = [
  {
    id: 'p1',
    author: {
      id: 'me',
      name: 'Sorae Creator',
      handle: '@sorae_user',
      avatarUrl: '',
      isVerified: true,
    },
    title: 'Neon Horizons',
    bpm: 124,
    duration: '0:45',
    waveformBars: WAVEFORM_1,
    playedRatio: 0.35,
    isPlaying: false,
    likes: '1.2k',
    isLiked: true,
    comments: '84',
    actionType: 'remix',
    actionLabel: 'Remix',
    category: 'Tendencias',
    genre: 'Synthwave',
  },
  {
    id: 'p2',
    author: {
      id: 'me',
      name: 'Sorae Creator',
      handle: '@sorae_user',
      avatarUrl: '',
      isVerified: true,
    },
    title: 'Cyber Dreams (VIP Mix)',
    bpm: 128,
    duration: '0:38',
    waveformBars: WAVEFORM_4,
    playedRatio: 0,
    isPlaying: false,
    likes: '640',
    isLiked: false,
    comments: '31',
    actionType: 'remix',
    actionLabel: 'Remix',
    category: 'Remixes',
    genre: 'Cyberpunk',
  },
  {
    id: 'p3',
    author: {
      id: 'me',
      name: 'Sorae Creator',
      handle: '@sorae_user',
      avatarUrl: '',
      isVerified: true,
    },
    title: 'Retrograde Pulse',
    bpm: 120,
    duration: '0:52',
    waveformBars: WAVEFORM_2,
    playedRatio: 0,
    isPlaying: false,
    likes: '520',
    isLiked: true,
    comments: '44',
    actionType: 'use',
    actionLabel: 'Usar',
    category: 'Stems',
    genre: 'Synthwave',
  },
];

const INITIAL_COMMENTS: Record<string, TrackComment[]> = {
  '1': [
    {
      id: 'c1',
      trackId: '1',
      authorName: 'Marcus Vibe',
      authorHandle: '@marcus_vibe',
      text: '¡Esa línea de bajo analógica está increíble! Voy a hacerle un remix hoy mismo 🔥',
      createdAt: 'Hace 2 horas',
    },
    {
      id: 'c2',
      trackId: '1',
      authorName: 'Luna Beats',
      authorHandle: '@luna_beats',
      text: 'Sonido súper limpio, ¿qué sintetizador usaste para los acordes de intro?',
      createdAt: 'Hace 4 horas',
    },
    {
      id: 'c3',
      trackId: '1',
      authorName: 'Sorae Sound',
      authorHandle: '@sorae_official',
      text: 'Destacado en el feed principal de Sorae ✨',
      createdAt: 'Hace 1 día',
    },
  ],
  '2': [
    {
      id: 'c4',
      trackId: '2',
      authorName: 'Elena Synth',
      authorHandle: '@elena_synth',
      text: 'Este 808 retumba con fuerza, muy bueno para trap o cyberpunk.',
      createdAt: 'Hace 1 hora',
    },
  ],
  '3': [
    {
      id: 'c5',
      trackId: '3',
      authorName: 'Dave Producer',
      authorHandle: '@dave_producer',
      text: 'La textura vocal tiene un aire muy emotivo. Gran toma vocal.',
      createdAt: 'Hace 3 horas',
    },
  ],
};

const INITIAL_NOW_PLAYING: NowPlayingTrack = {
  id: '1',
  title: 'Neon Horizons (124 BPM)',
  bpm: 124,
  subtitle: 'Elena Synth • Main Mix',
  progress: 0.35,
  isPlaying: false,
  durationSeconds: 45,
};

interface AudioContextType {
  feedTracks: Track[];
  profileTracks: Track[];
  nowPlaying: NowPlayingTrack | null;
  isPlayerExpanded: boolean;
  isShuffle: boolean;
  isRepeat: boolean;
  activeStem: string;
  commentsMap: Record<string, TrackComment[]>;
  togglePlayTrack: (id: string) => void;
  togglePlayNowPlaying: () => void;
  toggleLike: (id: string) => void;
  seekTo: (ratio: number) => void;
  expandPlayer: () => void;
  closePlayer: () => void;
  closeNowPlaying: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  setActiveStem: (stem: string) => void;
  addComment: (trackId: string, text: string, authorName?: string) => void;
  addTrack: (track: Partial<Track>) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [feedTracks, setFeedTracks] = useState<Track[]>(INITIAL_FEED_TRACKS);
  const [profileTracks, setProfileTracks] = useState<Track[]>(INITIAL_PROFILE_TRACKS);
  const [nowPlaying, setNowPlaying] = useState<NowPlayingTrack | null>(INITIAL_NOW_PLAYING);
  const [isPlayerExpanded, setIsPlayerExpanded] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [activeStem, setActiveStem] = useState('Master');
  const [commentsMap, setCommentsMap] = useState<Record<string, TrackComment[]>>(INITIAL_COMMENTS);

  // Use a ref for repeat so the interval callback always reads fresh state
  const isRepeatRef = useRef(isRepeat);
  useEffect(() => {
    isRepeatRef.current = isRepeat;
  }, [isRepeat]);

  // Dynamic live playback timer
  useEffect(() => {
    if (!nowPlaying || !nowPlaying.isPlaying) return;

    const intervalMs = 250;
    const durationSec = nowPlaying.durationSeconds || 45;
    const stepRatio = (intervalMs / 1000) / durationSec;

    const timer = setInterval(() => {
      setNowPlaying((prev) => {
        if (!prev || !prev.isPlaying) return prev;
        const nextProgress = prev.progress + stepRatio;

        if (nextProgress >= 1.0) {
          if (isRepeatRef.current) {
            return { ...prev, progress: 0 };
          } else {
            // Automatically loop or advance
            return { ...prev, progress: 0 };
          }
        }
        return { ...prev, progress: nextProgress };
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [nowPlaying?.isPlaying, nowPlaying?.id, nowPlaying?.durationSeconds]);

  // Keep playedRatio in tracks synchronized with nowPlaying.progress
  useEffect(() => {
    if (!nowPlaying) return;
    const currentId = nowPlaying.id;
    if (!currentId) return;

    const updateRatio = (list: Track[]) =>
      list.map((t) =>
        t.id === currentId
          ? { ...t, playedRatio: nowPlaying.progress, isPlaying: nowPlaying.isPlaying }
          : t
      );

    setFeedTracks(updateRatio);
    setProfileTracks(updateRatio);
  }, [nowPlaying?.progress, nowPlaying?.isPlaying, nowPlaying?.id]);

  const togglePlayTrack = (id: string) => {
    let selectedTrack: Track | undefined;

    const updateList = (list: Track[]) =>
      list.map((t) => {
        if (t.id === id) {
          const nextPlaying = !t.isPlaying;
          selectedTrack = t;
          return {
            ...t,
            isPlaying: nextPlaying,
          };
        }
        return { ...t, isPlaying: false };
      });

    setFeedTracks(updateList);
    setProfileTracks(updateList);

    if (selectedTrack) {
      const isCurrentlyPlayingThis = nowPlaying?.id === id && nowPlaying.isPlaying;
      setNowPlaying({
        id: selectedTrack.id,
        title: `${selectedTrack.title} (${selectedTrack.bpm} BPM)`,
        bpm: selectedTrack.bpm,
        subtitle: `${selectedTrack.author.name} • ${selectedTrack.actionLabel || 'Original'}`,
        progress: selectedTrack.playedRatio || 0,
        isPlaying: !isCurrentlyPlayingThis,
        durationSeconds: parseDurationToSeconds(selectedTrack.duration),
      });
    }
  };

  const togglePlayNowPlaying = () => {
    setNowPlaying((prev) => {
      if (!prev) return null;
      const nextPlaying = !prev.isPlaying;

      // Also update tracks
      if (prev.id) {
        const updatePlaying = (list: Track[]) =>
          list.map((t) => (t.id === prev.id ? { ...t, isPlaying: nextPlaying } : t));
        setFeedTracks(updatePlaying);
        setProfileTracks(updatePlaying);
      }

      return { ...prev, isPlaying: nextPlaying };
    });
  };

  const seekTo = (ratio: number) => {
    const clamped = Math.max(0, Math.min(1, ratio));
    setNowPlaying((prev) => (prev ? { ...prev, progress: clamped } : null));

    if (nowPlaying?.id) {
      const updateSeek = (list: Track[]) =>
        list.map((t) =>
          t.id === nowPlaying.id ? { ...t, playedRatio: clamped } : t
        );
      setFeedTracks(updateSeek);
      setProfileTracks(updateSeek);
    }
  };

  const toggleLike = (id: string) => {
    let wasLiked = false;
    const updateList = (list: Track[]) =>
      list.map((t) => {
        if (t.id === id) {
          wasLiked = !!t.isLiked;
          const currentCount = parseCount(t.likes);
          const nextCount = wasLiked ? Math.max(0, currentCount - 1) : currentCount + 1;

          return {
            ...t,
            isLiked: !wasLiked,
            likes: formatCount(nextCount),
          };
        }
        return t;
      });

    setFeedTracks(updateList);
    setProfileTracks(updateList);

    // Call backend API
    toggleLikeTrack(id, undefined, wasLiked).catch((err) => {
      console.warn('Error toggling like on backend:', err);
    });
  };

  const nextTrack = () => {
    if (!feedTracks.length) return;
    const currentIndex = feedTracks.findIndex((t) => t.id === nowPlaying?.id);
    let nextIndex = 0;

    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * feedTracks.length);
    } else {
      nextIndex = currentIndex >= 0 ? (currentIndex + 1) % feedTracks.length : 0;
    }

    const t = feedTracks[nextIndex];
    togglePlayTrack(t.id);
  };

  const previousTrack = () => {
    if (!feedTracks.length) return;
    // If more than 3 seconds in, seek to beginning
    if (nowPlaying && nowPlaying.progress > 0.08) {
      seekTo(0);
      return;
    }

    const currentIndex = feedTracks.findIndex((t) => t.id === nowPlaying?.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : feedTracks.length - 1;
    const t = feedTracks[prevIndex];
    togglePlayTrack(t.id);
  };

  const toggleShuffle = () => setIsShuffle((prev) => !prev);
  const toggleRepeat = () => setIsRepeat((prev) => !prev);

  const expandPlayer = () => setIsPlayerExpanded(true);
  const closePlayer = () => setIsPlayerExpanded(false);
  const closeNowPlaying = () => {
    setNowPlaying(null);
    setFeedTracks((list) => list.map((t) => ({ ...t, isPlaying: false })));
    setProfileTracks((list) => list.map((t) => ({ ...t, isPlaying: false })));
  };

  const addComment = (trackId: string, text: string, authorName = 'Tú') => {
    if (!text.trim()) return;

    const newComment: TrackComment = {
      id: `c_${Date.now()}`,
      trackId,
      authorName,
      authorHandle: `@${authorName.toLowerCase().replace(/\s+/g, '_')}`,
      text: text.trim(),
      createdAt: 'Ahora mismo',
    };

    setCommentsMap((prev) => ({
      ...prev,
      [trackId]: [newComment, ...(prev[trackId] || [])],
    }));

    // Update track comments count
    const updateCount = (list: Track[]) =>
      list.map((t) => {
        if (t.id === trackId) {
          const current = parseCount(t.comments);
          return { ...t, comments: `${current + 1}` };
        }
        return t;
      });

    setFeedTracks(updateCount);
    setProfileTracks(updateCount);

    // Call backend API
    addTrackComment({
      trackId,
      text: text.trim(),
      authorName,
    }).catch((err) => {
      console.warn('Error saving comment on backend:', err);
    });
  };

  const addTrack = (trackData: Partial<Track>) => {
    const newTrack: Track = {
      id: `tr_${Date.now()}`,
      author: {
        id: 'me',
        name: trackData.author?.name || 'Sorae Creator',
        handle: trackData.author?.handle || '@sorae_user',
        avatarUrl: trackData.author?.avatarUrl || '',
        isVerified: true,
      },
      title: trackData.title || 'Nuevo Track Sorae',
      bpm: trackData.bpm || 126,
      duration: trackData.duration || '0:40',
      waveformBars: WAVEFORM_1,
      playedRatio: 0,
      isPlaying: false,
      likes: '1',
      isLiked: true,
      comments: '0',
      actionType: trackData.actionType || 'remix',
      actionLabel: trackData.actionLabel || 'Remix',
      category: 'Nuevos',
      genre: trackData.genre || 'Electronic',
    };

    setFeedTracks((prev) => [newTrack, ...prev]);
    setProfileTracks((prev) => [newTrack, ...prev]);

    // Call backend API
    createTrack({
      title: newTrack.title,
      bpm: newTrack.bpm,
      duration: newTrack.duration,
      genre: newTrack.genre,
      category: newTrack.category,
      actionType: newTrack.actionType,
      actionLabel: newTrack.actionLabel,
      waveformBars: newTrack.waveformBars,
      author: newTrack.author,
    }).catch((err) => {
      console.warn('Error persisting track on backend:', err);
    });
  };

  return (
    <AudioContext.Provider
      value={{
        feedTracks,
        profileTracks,
        nowPlaying,
        isPlayerExpanded,
        isShuffle,
        isRepeat,
        activeStem,
        commentsMap,
        togglePlayTrack,
        togglePlayNowPlaying,
        toggleLike,
        seekTo,
        expandPlayer,
        closePlayer,
        closeNowPlaying,
        nextTrack,
        previousTrack,
        toggleShuffle,
        toggleRepeat,
        setActiveStem,
        addComment,
        addTrack,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudioPlayer() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudioPlayer must be used within an AudioProvider');
  }
  return context;
}

// Helper utilities
function parseDurationToSeconds(durationStr: string): number {
  const parts = durationStr.split(':');
  if (parts.length === 2) {
    const min = parseInt(parts[0], 10) || 0;
    const sec = parseInt(parts[1], 10) || 0;
    return min * 60 + sec;
  }
  return 45;
}

function parseCount(str: string): number {
  if (str.endsWith('k')) {
    return Math.round(parseFloat(str) * 1000);
  }
  return parseInt(str, 10) || 0;
}

function formatCount(num: number): string {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  return `${num}`;
}
