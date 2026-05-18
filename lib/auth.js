// Copyright © 2026 Pelayo Garrido Martinez — devpelayogarrido@gmail.com
// lib/auth.js — runs only in API routes / server components
import { SignJWT, jwtVerify } from 'jose'

function getSecret() {
  const s = process.env.JWT_SECRET
  if (!s) throw new Error('JWT_SECRET not set')
  return new TextEncoder().encode(s)
}

/** Issue a CMS editor token (24h expiry) */
export async function signEditorToken() {
  return new SignJWT({ role: 'editor' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(getSecret())
}

/** Verify a CMS editor token — throws if invalid/expired */
export async function verifyEditorToken(token) {
  const { payload } = await jwtVerify(token, getSecret())
  if (payload.role !== 'editor') throw new Error('Not an editor token')
  return payload
}

export const COOKIE_NAME = 'extinval_cms_token'
export const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
  maxAge: 60 * 60 * 24, // 24h
}
