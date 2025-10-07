import { createClient } from '@supabase/supabase-js';
import type { Database } from './supabase-types';

const getSupabaseEnv = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return { url, anon };
};

// Client pour le côté navigateur (créé à la demande pour éviter les erreurs au build)
export const createBrowserSupabaseClient = () => {
  const { url, anon } = getSupabaseEnv();
  if (!url || !anon) {
    console.warn('⚠️  Supabase env vars missing - browser client will fail at runtime');
    return createClient<Database>(
      url || 'https://placeholder.supabase.co',
      anon || 'placeholder-anon-key',
      {
        auth: {
          storage: typeof window !== 'undefined' ? localStorage : undefined,
          persistSession: true,
          autoRefreshToken: true,
        },
      }
    );
  }
  return createClient<Database>(url, anon, {
    auth: {
      storage: typeof window !== 'undefined' ? localStorage : undefined,
      persistSession: true,
      autoRefreshToken: true,
    },
  });
};

// Client pour le côté serveur (créé à la demande, sans localStorage)
export const createServerSupabaseClient = () => {
  const { url, anon } = getSupabaseEnv();
  if (!url || !anon) {
    console.warn('⚠️  Supabase env vars missing - server client will fail at runtime');
    return createClient<Database>(
      url || 'https://placeholder.supabase.co',
      anon || 'placeholder-anon-key',
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    );
  }
  return createClient<Database>(url, anon, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};

// Client pour le côté serveur avec clé service role (désactive RLS). À utiliser uniquement côté serveur.
export const createServiceSupabaseClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  // Pendant le build, retourner un client factice au lieu de lever une erreur
  // Cela permet au build de passer sans avoir besoin des vraies variables
  if (!url || !serviceKey) {
    console.warn('⚠️  Supabase env vars missing - API routes will fail at runtime');
    // Retourner un objet mock pour éviter les erreurs pendant le build
    return createClient<Database>(
      url || 'https://placeholder.supabase.co',
      serviceKey || 'placeholder-key',
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    );
  }
  
  return createClient<Database>(url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};
