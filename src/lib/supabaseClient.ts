import { createClient } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_API_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY as string;

export const browserClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_API_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_API_KEY!
  );

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
