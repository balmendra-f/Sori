import { supabase } from '@/lib/supabase';
import { ApiResponse } from '../types';
import type { User } from '@supabase/supabase-js';

export async function getUser(): Promise<ApiResponse<User | null>> {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      return { data: null, error: new Error(error.message) };
    }
    return { data: data.user, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: new Error(err?.message || 'Error al obtener el usuario actual'),
    };
  }
}

export default getUser;
