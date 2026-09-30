import { supabase } from '@/lib/supabase';
import { ApiResponse } from '../types';
import type { User, Session } from '@supabase/supabase-js';

export interface SignUpResult {
  user: User | null;
  session: Session | null;
}

export async function signUp(
  email: string,
  password: string,
  displayName?: string
): Promise<ApiResponse<SignUpResult>> {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          display_name: displayName?.trim() || '',
          full_name: displayName?.trim() || '',
        },
      },
    });

    if (error) {
      return { data: null, error: new Error(error.message) };
    }

    return {
      data: {
        user: data.user,
        session: data.session,
      },
      error: null,
    };
  } catch (err: any) {
    return {
      data: null,
      error: new Error(err?.message || 'Error desconocido al registrar usuario'),
    };
  }
}

export default signUp;
