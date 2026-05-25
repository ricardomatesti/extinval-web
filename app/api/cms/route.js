// Copyright © 2026 Pelayo Garrido Martinez — devpelayogarrido@gmail.com
// app/api/cms/route.js
// GET  /api/cms?page=home  → returns all content for that page (public)
// POST /api/cms            → upserts content changes (requires editor JWT)

import { NextResponse } from 'next/server'
import { verifyEditorToken, COOKIE_NAME } from '@/lib/auth'
import { getCMSPage, saveCMSPage } from '@/lib/cmsStore'
import { cookies } from 'next/headers'

/** Public: read all content for a page */
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page')
  if (!page) return NextResponse.json({ error: 'Missing page param' }, { status: 400 })

  try {
    return NextResponse.json(await getCMSPage(page))
  } catch (err) {
    console.error('[CMS GET]', err)
    return NextResponse.json({})
  }
}

/** Protected: write content changes */
export async function POST(request) {
  // 1. Verify auth cookie
  const cookieStore = await cookies()
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
    const saved = await saveCMSPage(page, changes)
    return NextResponse.json({ ok: true, saved })
  } catch (err) {
    console.error('[CMS POST]', err)
    return NextResponse.json({ error: 'DB write failed' }, { status: 500 })
  }
}
