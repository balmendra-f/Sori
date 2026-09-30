import { supabase } from '@/lib/supabase';
import { ApiResponse, UserProfile } from '../types';

export async function createUser(
  profile: Partial<UserProfile> & { id: string; display_name: string }
): Promise<ApiResponse<UserProfile>> {
  try {
    const payload = {
      id: profile.id,
      display_name: profile.display_name.trim(),
      handle: profile.handle?.trim() || `@${profile.display_name.toLowerCase().replace(/\s+/g, '_')}`,
      email: profile.email?.trim(),
      bio: profile.bio?.trim() || '',
      location: profile.location?.trim() || '',
      avatar_url: profile.avatar_url || '',
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('profiles')
      .upsert(payload)
      .select()
      .single();

    if (error) {
      return { data: null, error: new Error(error.message) };
    }

    return { data: data as UserProfile, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: new Error(err?.message || 'Error al crear perfil de usuario'),
    };
  }
}

export default createUser;
