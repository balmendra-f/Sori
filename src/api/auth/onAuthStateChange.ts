import { supabase } from '@/lib/supabase';
import type { AuthChangeEvent, Session, Subscription } from '@supabase/supabase-js';

export type AuthStateChangeCallback = (
  event: AuthChangeEvent,
  session: Session | null
) => void;

export function onAuthStateChange(
  callback: AuthStateChangeCallback
): { subscription: Subscription } {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(callback);
  return { subscription };
}

export default onAuthStateChange;
