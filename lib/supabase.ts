// Backwards-compatible browser client export for the gallery surfaces.
// Server-rendered pages should prefer lib/supabase/server.ts.
import { createClient } from './supabase/client';

export const supabase = createClient();
