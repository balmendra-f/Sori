export interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
}

export interface UserProfile {
  id: string;
  email?: string;
  display_name: string;
  handle: string;
  bio?: string;
  location?: string;
  avatar_url?: string;
  updated_at?: string;
}

export type { Track, TrackComment, Author } from '@/components/sorae/types';
