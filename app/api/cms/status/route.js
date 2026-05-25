import { NextResponse } from 'next/server'

export async function GET() {
  const supabaseConfigured = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY)
  const authConfigured = Boolean(process.env.CMS_EMAIL && process.env.CMS_PASSWORD && process.env.JWT_SECRET)

  return NextResponse.json({
    storage: supabaseConfigured ? 'supabase' : 'local',
    supabaseConfigured,
    authConfigured,
  })
}
