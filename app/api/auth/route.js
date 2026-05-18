// Copyright © 2026 Pelayo Garrido Martinez — devpelayogarrido@gmail.com
// app/api/auth/route.js
// POST /api/auth  { password: string }  → sets httpOnly JWT cookie
// DELETE /api/auth                      → clears cookie (logout)

import { NextResponse } from 'next/server'
import { signEditorToken, verifyEditorToken, COOKIE_NAME, COOKIE_OPTS } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function POST(request) {
  try {
    const { password } = await request.json()
    const expected = process.env.CMS_PASSWORD
    if (!expected) {
      return NextResponse.json({ error: 'CMS not configured' }, { status: 500 })
    }
    if (password !== expected) {
      // Constant-time would be better; fine for this use-case
      return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 })
    }
    const token = await signEditorToken()
    const res = NextResponse.json({ ok: true })
    res.cookies.set(COOKIE_NAME, token, COOKIE_OPTS)
    return res
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE_NAME, '', { ...COOKIE_OPTS, maxAge: 0 })
  return res
}

export async function GET() {
  // Check if current user has a valid editor token
  const cookieStore = cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return NextResponse.json({ authenticated: false })
  try {
    await verifyEditorToken(token)
    return NextResponse.json({ authenticated: true })
  } catch {
    return NextResponse.json({ authenticated: false })
  }
}
