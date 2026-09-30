import { supabase } from '@/lib/supabase';
import { ApiResponse } from '../types';
import type { Session } from '@supabase/supabase-js';

export async function signIn(
  email: string,
  password: string
): Promise<ApiResponse<Session>> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      return { data: null, error: new Error(error.message) };
    }

    return { data: data.session, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: new Error(err?.message || 'Error desconocido al iniciar sesión'),
    };
  }
}

export default signIn;
