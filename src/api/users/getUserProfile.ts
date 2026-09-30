import { supabase } from '@/lib/supabase';
import { ApiResponse, UserProfile } from '../types';

export async function getUserProfile(
  userId: string
): Promise<ApiResponse<UserProfile>> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      return { data: null, error: new Error(error.message) };
    }

    return { data: data as UserProfile, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: new Error(err?.message || 'Error al obtener perfil de usuario'),
    };
  }
}

export default getUserProfile;
