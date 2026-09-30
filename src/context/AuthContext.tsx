import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import {
  signIn as apiSignIn,
  signUp as apiSignUp,
  signOut as apiSignOut,
  resetPassword as apiResetPassword,
  getSession as apiGetSession,
  onAuthStateChange as apiOnAuthStateChange,
} from '@/api/auth';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signInWithPassword: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, displayName?: string) => Promise<{ error: Error | null; data?: any }>;
  signOut: () => Promise<{ error: Error | null }>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Get initial session
    apiGetSession()
      .then(({ data, error }) => {
        if (error) {
          console.error('Error fetching initial auth session:', error);
        }
        setSession(data);
        setUser(data?.user ?? null);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error in getSession:', err);
        setIsLoading(false);
      });

    // 2. Listen for auth changes
    const { subscription } = apiOnAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signInWithPassword = async (email: string, password: string) => {
    const { error } = await apiSignIn(email, password);
    return { error };
  };

  const signUp = async (email: string, password: string, displayName?: string) => {
    const { data, error } = await apiSignUp(email, password, displayName);
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await apiSignOut();
    return { error };
  };

  const resetPassword = async (email: string) => {
    const { error } = await apiResetPassword(email);
    return { error };
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        isLoading,
        signInWithPassword,
        signUp,
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
