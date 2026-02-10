import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

export type TypedSupabaseClient = SupabaseClient<Database>;

@Injectable()
export class SupabaseService {
  private readonly client: TypedSupabaseClient;

  constructor() {
    const url = process.env.SUPABASE_PROJECT_URL;
    const key = process.env.SUPABASE_SECRET_KEY;

    if (!url || !key) {
      throw new Error('Missing Supabase configuration');
    }

    this.client = createClient<Database>(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  getClient(): TypedSupabaseClient {
    return this.client;
  }
}
