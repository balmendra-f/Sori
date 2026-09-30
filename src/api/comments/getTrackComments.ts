import { supabase } from '@/lib/supabase';
import { ApiResponse, TrackComment } from '../types';

export async function getTrackComments(
  trackId: string
): Promise<ApiResponse<TrackComment[]>> {
  try {
    const { data, error } = await supabase
      .from('track_comments')
      .select('*')
      .eq('track_id', trackId)
      .order('created_at', { ascending: false });

    if (error) {
      return { data: null, error: new Error(error.message) };
    }

    return { data: (data as unknown as TrackComment[]) || [], error: null };
  } catch (err: any) {
    return {
      data: null,
      error: new Error(err?.message || 'Error al obtener comentarios'),
    };
  }
}

export default getTrackComments;
