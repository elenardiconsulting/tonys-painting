import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Minimal Supabase client for public site usage (forms, reviews)
// This file is tracked by Git, unlike src/integrations/supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
