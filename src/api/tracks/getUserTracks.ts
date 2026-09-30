import { supabase } from '@/lib/supabase';
import { ApiResponse, Track } from '../types';

export async function getUserTracks(
  userId: string
): Promise<ApiResponse<Track[]>> {
  try {
    const { data, error } = await supabase
      .from('tracks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      return { data: null, error: new Error(error.message) };
    }

    return { data: (data as unknown as Track[]) || [], error: null };
  } catch (err: any) {
    return {
      data: null,
      error: new Error(err?.message || 'Error al obtener pistas del usuario'),
    };
  }
}

export default getUserTracks;
