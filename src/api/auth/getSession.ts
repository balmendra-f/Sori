import { supabase } from '@/lib/supabase';
import { ApiResponse } from '../types';
import type { Session } from '@supabase/supabase-js';

export async function getSession(): Promise<ApiResponse<Session | null>> {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      return { data: null, error: new Error(error.message) };
    }
    return { data: data.session, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: new Error(err?.message || 'Error al obtener la sesión actual'),
    };
  }
}

export default getSession;
