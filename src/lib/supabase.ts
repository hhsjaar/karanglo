
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

// We don't throw here to avoid failing the build on Vercel if vars are missing during build time.
// Instead, we'll check it where it's used or handle the invalid client gracefully.
export const supabase = createClient(supabaseUrl, supabaseKey)
