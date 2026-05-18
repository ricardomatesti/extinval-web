// Copyright © 2026 Pelayo Garrido Martinez — devpelayogarrido@gmail.com
// app/api/cms/route.js
// GET  /api/cms?page=home  → returns all content for that page (public)
// POST /api/cms            → upserts content changes (requires editor JWT)

import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { verifyEditorToken, COOKIE_NAME } from '@/lib/auth'
import { cookies } from 'next/headers'

/** Public: read all content for a page */
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page')
  if (!page) return NextResponse.json({ error: 'Missing page param' }, { status: 400 })

  // Supabase not configured — pages use hardcoded EditableField defaults
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    return NextResponse.json({})
  }

  try {
    const db = getSupabaseAdmin()
    const { data, error } = await db
      .from('cms_content')
      .select('content_key, content_html')
      .eq('page_key', page)

    if (error) throw error
    const map = {}
    for (const row of data ?? []) map[row.content_key] = row.content_html
    return NextResponse.json(map)
  } catch (err) {
    console.error('[CMS GET]', err)
    return NextResponse.json({})
  }
}

/** Protected: write content changes */
export async function POST(request) {
  // 1. Verify auth cookie
  const cookieStore = cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    await verifyEditorToken(token)
  } catch {
    return NextResponse.json({ error: 'Invalid or expired session' }, { status: 401 })
  }

  // 2. Parse and validate payload
  const body = await request.json()
  const { page, changes } = body
  if (!page || !changes || typeof changes !== 'object') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  // 3. Upsert to Supabase
  try {
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
    return NextResponse.json({ ok: true, saved: rows.length })
  } catch (err) {
    console.error('[CMS POST]', err)
    return NextResponse.json({ error: 'DB write failed' }, { status: 500 })
  }
}
