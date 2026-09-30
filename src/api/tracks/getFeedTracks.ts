import { supabase } from '@/lib/supabase';
import { ApiResponse, Track } from '../types';

export async function getFeedTracks(
  category?: string
): Promise<ApiResponse<Track[]>> {
  try {
    let query = supabase
      .from('tracks')
      .select('*')
      .order('created_at', { ascending: false });

    if (category && category !== 'Todos') {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: new Error(error.message) };
    }

    return { data: (data as unknown as Track[]) || [], error: null };
  } catch (err: any) {
    return {
      data: null,
      error: new Error(err?.message || 'Error al obtener pistas del feed'),
    };
  }
}

export default getFeedTracks;
