import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from './database.types';

export const SUPABASE_CLIENT = Symbol('SUPABASE_CLIENT');

export type TypedSupabaseClient = SupabaseClient<Database>;

export const buildSupabaseClient = (): TypedSupabaseClient => {
  const url = process.env.SUPABASE_PROJECT_URL;
  const key = process.env.SUPABASE_SECRET_KEY;

  if (!url || !key) {
    throw new Error('Missing Supabase configuration');
  }

  return createClient<Database>(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};
