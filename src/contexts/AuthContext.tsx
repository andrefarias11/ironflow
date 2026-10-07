import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { UserProfile } from '../types/auth';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (name: string, email: string, password: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const PRESET_COLORS = ['#FF6B00', '#00E5FF', '#10B981', '#A855F7', '#EC4899', '#F59E0B'];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carrega o perfil do usuário a partir da tabela profiles
  const loadProfile = async (userId: string, userEmail?: string, fallbackName?: string) => {
    if (!isSupabaseConfigured) return;

    try {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (data) {
        setProfile({
          id: data.id,
          name: data.name,
          color: data.color || '#FF6B00',
          avatar_url: data.avatar_url,
        });
      } else {
        // Se ainda não existir perfil (ex: signup sem trigger), cria um
        const defaultName = fallbackName || (userEmail ? userEmail.split('@')[0] : 'Atleta');
        const defaultColor = PRESET_COLORS[Math.floor(Math.random() * PRESET_COLORS.length)];
        
        const newProfile: UserProfile = {
          id: userId,
          name: defaultName,
          color: defaultColor,
          avatar_url: null,
        };

        await supabase.from('profiles').upsert(newProfile);
        setProfile(newProfile);
      }
    } catch (err) {
      console.error('Erro ao carregar perfil', err);
    }
  };

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setIsLoading(false);
      return;
    }

    // Verifica sessão existente
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        loadProfile(session.user.id, session.user.email);
      }
      setIsLoading(false);
    });

    // Escuta mudanças de auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        await loadProfile(session.user.id, session.user.email);
      } else {
        setProfile(null);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      return { error: new Error('Supabase não configurado. Adicione as chaves no arquivo .env') };
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error as Error | null };
  };

  const signUp = async (name: string, email: string, password: string) => {
    if (!isSupabaseConfigured) {
      return { error: new Error('Supabase não configurado. Adicione as chaves no arquivo .env') };
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }
      }
    });

    if (!error && data.user) {
      await loadProfile(data.user.id, email, name);
    }
    return { error: error as Error | null };
  };

  const signInWithGoogle = async () => {
    if (!isSupabaseConfigured) {
      return { error: new Error('Supabase não configurado. Adicione as chaves no arquivo .env') };
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
    return { error: error as Error | null };
  };

  const signOut = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setSession(null);
    setProfile(null);
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user || !profile || !isSupabaseConfigured) {
      return { error: new Error('Usuário não autenticado') };
    }

    const updatedProfile = { ...profile, ...updates, updated_at: new Date().toISOString() };
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id);

    if (!error) {
      setProfile(updatedProfile);
    }
    return { error: error as Error | null };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        isLoading,
        isConfigured: isSupabaseConfigured,
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
