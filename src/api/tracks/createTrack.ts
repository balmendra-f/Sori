import { supabase } from '@/lib/supabase';
import { ApiResponse, Track } from '../types';

export interface CreateTrackInput {
  title: string;
  bpm?: number;
  duration?: string;
  genre?: string;
  category?: 'Tendencias' | 'Nuevos' | 'Remixes' | 'Stems' | 'Para Ti';
  actionType?: 'remix' | 'use';
  actionLabel?: string;
  waveformBars?: number[];
  author?: {
    id: string;
    name: string;
    handle: string;
    avatarUrl: string;
    isVerified?: boolean;
  };
}

export async function createTrack(
  input: CreateTrackInput
): Promise<ApiResponse<Track>> {
  try {
    const payload = {
      title: input.title.trim(),
      bpm: input.bpm || 120,
      duration: input.duration || '0:30',
      genre: input.genre || 'Electronic',
      category: input.category || 'Nuevos',
      action_type: input.actionType || 'remix',
      action_label: input.actionLabel || 'Remix',
      waveform_bars: input.waveformBars || [],
      author: input.author || null,
      likes_count: 0,
      comments_count: 0,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('tracks')
      .insert(payload)
      .select()
      .single();

    if (error) {
      return { data: null, error: new Error(error.message) };
    }

    return { data: data as unknown as Track, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: new Error(err?.message || 'Error al crear la pista'),
    };
  }
}

export default createTrack;
