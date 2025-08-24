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
    throw new Error('Supabase env vars are missing');
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
    throw new Error('Supabase env vars are missing');
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
  if (!url || !serviceKey) {
    throw new Error('Supabase service role env vars are missing');
  }
  return createClient<Database>(url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};
