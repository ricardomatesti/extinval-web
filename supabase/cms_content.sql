CREATE TABLE IF NOT EXISTS cms_content (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  page_key text NOT NULL,
  content_key text NOT NULL,
  content_html text NOT NULL DEFAULT '',
  updated_at timestamptz DEFAULT now(),
  UNIQUE(page_key, content_key)
);

CREATE INDEX IF NOT EXISTS idx_cms_page ON cms_content(page_key);

ALTER TABLE cms_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read" ON cms_content;
CREATE POLICY "public_read" ON cms_content FOR SELECT USING (true);

-- La escritura no se expone al cliente.
-- Solo la API del servidor usa SUPABASE_SERVICE_KEY.
