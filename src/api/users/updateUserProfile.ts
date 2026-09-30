import { supabase } from '@/lib/supabase';
import { ApiResponse, UserProfile } from '../types';

export async function updateUserProfile(
  userId: string,
  updates: Partial<Omit<UserProfile, 'id'>>
): Promise<ApiResponse<UserProfile>> {
  try {
    const payload = {
      ...updates,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('profiles')
      .update(payload)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      return { data: null, error: new Error(error.message) };
    }

    return { data: data as UserProfile, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: new Error(err?.message || 'Error al actualizar perfil de usuario'),
    };
  }
}

export default updateUserProfile;
