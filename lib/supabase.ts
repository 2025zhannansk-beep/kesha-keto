import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fzomggtselekihpmegzq.supabase.co'
const supabaseAnonKey = 'sb_publishable_ntL2FCQRQlFG8DEDPgJX5w_Xd-Jvfbv'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
