import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL || 'https://myegwtoonxqbupfbspti.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY || process.env.REACT_APP_SUPABASE_PUBLISHABLE_DEFAULT_KEY || 'sb_publishable_gEwJxGhn8DegAF-3tJ478g_hsfLsei3';

export const supabase = createClient(supabaseUrl, supabaseKey);
