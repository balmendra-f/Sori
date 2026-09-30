import { supabase } from '@/lib/supabase';
import { ApiResponse } from '../types';

export interface ToggleLikeResult {
  trackId: string;
  isLiked: boolean;
}

export async function toggleLikeTrack(
  trackId: string,
  userId?: string,
  currentlyLiked?: boolean
): Promise<ApiResponse<ToggleLikeResult>> {
  try {
    const nextState = !currentlyLiked;

    // If userId provided, persist in track_likes table
    if (userId) {
      if (nextState) {
        await supabase
          .from('track_likes')
          .insert({ track_id: trackId, user_id: userId });
      } else {
        await supabase
          .from('track_likes')
          .delete()
          .eq('track_id', trackId)
          .eq('user_id', userId);
      }
    }

    return {
      data: {
        trackId,
        isLiked: nextState,
      },
      error: null,
    };
  } catch (err: any) {
    return {
      data: null,
      error: new Error(err?.message || 'Error al cambiar like de la pista'),
    };
  }
}

export default toggleLikeTrack;
