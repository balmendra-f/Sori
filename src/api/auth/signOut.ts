import { supabase } from '@/lib/supabase';
import { ApiResponse } from '../types';

export async function signOut(): Promise<ApiResponse<null>> {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return { data: null, error: new Error(error.message) };
    }
    return { data: null, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: new Error(err?.message || 'Error desconocido al cerrar sesión'),
    };
  }
}

export default signOut;
