// Copyright © 2026 Pelayo Garrido Martinez — devpelayogarrido@gmail.com
// lib/supabase.js
// This file is ONLY imported by API routes (server-side).
// It uses the SERVICE_KEY which has full DB access.
// Never import this from a client component or page.

import { createClient } from '@supabase/supabase-js'

let _client = null

export function getSupabaseAdmin() {
  if (_client) return _client
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_KEY
  if (!url || !key) throw new Error('Missing Supabase env vars (server-side)')
  _client = createClient(url, key, {
    auth: { persistSession: false },
  })
  return _client
}

// SQL to run once in your Supabase SQL Editor to create the CMS table:
export const SETUP_SQL = `
CREATE TABLE IF NOT EXISTS cms_content (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  page_key    text NOT NULL,
  content_key text NOT NULL,
  content_html text NOT NULL DEFAULT '',
  updated_at  timestamptz DEFAULT now(),
  UNIQUE(page_key, content_key)
);
CREATE INDEX IF NOT EXISTS idx_cms_page ON cms_content(page_key);

-- Public read (visitors see updated content)
ALTER TABLE cms_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read" ON cms_content FOR SELECT USING (true);
-- Only service_role key can write (our API route)
-- No INSERT/UPDATE policies needed for anon — we use service_role
`
