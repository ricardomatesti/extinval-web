import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { getSupabaseAdmin } from '@/lib/supabase'

const DATA_DIR = path.join(process.cwd(), 'data')
const DATA_FILE = path.join(DATA_DIR, 'cms-content.json')

async function readLocalStore() {
  try {
    const raw = await readFile(DATA_FILE, 'utf8')
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

async function writeLocalStore(data) {
  await mkdir(DATA_DIR, { recursive: true })
  await writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8')
}

export async function getCMSPage(page) {
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY) {
    const db = getSupabaseAdmin()
    const { data, error } = await db
      .from('cms_content')
      .select('content_key, content_html')
      .eq('page_key', page)

    if (error) throw error
    const map = {}
    for (const row of data ?? []) map[row.content_key] = row.content_html
    return map
  }

  const store = await readLocalStore()
  return store[page] ?? {}
}

export async function saveCMSPage(page, changes) {
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY) {
    const db = getSupabaseAdmin()
    const rows = Object.entries(changes).map(([content_key, content_html]) => ({
      page_key: page,
      content_key,
      content_html: String(content_html),
      updated_at: new Date().toISOString(),
    }))

    const { error } = await db
      .from('cms_content')
      .upsert(rows, { onConflict: 'page_key,content_key' })

    if (error) throw error
    return rows.length
  }

  const store = await readLocalStore()
  store[page] = {
    ...(store[page] ?? {}),
    ...Object.fromEntries(
      Object.entries(changes).map(([key, value]) => [key, String(value)])
    ),
  }
  await writeLocalStore(store)
  return Object.keys(changes).length
}
