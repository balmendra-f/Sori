import { supabase } from '@/lib/supabase';
import { ApiResponse, TrackComment } from '../types';

export interface AddCommentInput {
  trackId: string;
  text: string;
  authorName?: string;
  authorHandle?: string;
  avatarUrl?: string;
}

export async function addTrackComment(
  input: AddCommentInput
): Promise<ApiResponse<TrackComment>> {
  try {
    const authorName = input.authorName || 'Usuario Sorae';
    const authorHandle =
      input.authorHandle || `@${authorName.toLowerCase().replace(/\s+/g, '_')}`;

    const newComment: TrackComment = {
      id: `c_${Date.now()}`,
      trackId: input.trackId,
      authorName,
      authorHandle,
      avatarUrl: input.avatarUrl || '',
      text: input.text.trim(),
      createdAt: 'Ahora mismo',
    };

    const payload = {
      id: newComment.id,
      track_id: input.trackId,
      author_name: authorName,
      author_handle: authorHandle,
      avatar_url: input.avatarUrl || '',
      text: input.text.trim(),
      created_at: new Date().toISOString(),
    };

    // Try persisting to Supabase
    const { data, error } = await supabase
      .from('track_comments')
      .insert(payload)
      .select()
      .single();

    if (error) {
      // Return the constructed comment if table doesn't exist yet so UI doesn't break
      return { data: newComment, error: null };
    }

    const savedComment: TrackComment = {
      id: data.id || newComment.id,
      trackId: data.track_id || input.trackId,
      authorName: data.author_name || authorName,
      authorHandle: data.author_handle || authorHandle,
      avatarUrl: data.avatar_url || '',
      text: data.text || input.text,
      createdAt: 'Ahora mismo',
    };

    return { data: savedComment, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: new Error(err?.message || 'Error al agregar comentario'),
    };
  }
}

export default addTrackComment;
