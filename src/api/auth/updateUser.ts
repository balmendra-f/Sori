import { supabase } from '@/lib/supabase';
import { ApiResponse } from '../types';
import type { User, UserAttributes } from '@supabase/supabase-js';

export async function updateUser(
  attributes: UserAttributes
): Promise<ApiResponse<User>> {
  try {
    const { data, error } = await supabase.auth.updateUser(attributes);
    if (error) {
      return { data: null, error: new Error(error.message) };
    }
    return { data: data.user, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: new Error(err?.message || 'Error al actualizar el usuario'),
    };
  }
}

export default updateUser;
