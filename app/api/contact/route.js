// Copyright © 2026 Pelayo Garrido Martinez — devpelayogarrido@gmail.com
// app/api/contact/route.js
// POST /api/contact → sends email via Nodemailer + Gmail SMTP
// Routes to the correct internal address based on the selected division.

import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const DIVISION_EMAILS = {
  // Spanish labels
  'Oil & Gas':              'dptotecnico@extinval.com',
  'Buques Mercantes':       'service@extinval.com',
  'Náutica de Recreo':      'nautica@extinval.com',
  'Industrial & Comercial': 'dptotecnico@extinval.com',
  // English labels
  'Merchant Vessels':       'service@extinval.com',
  'Recreational Maritime':  'nautica@extinval.com',
  'Industrial & Commercial':'dptotecnico@extinval.com',
  'OEM Spare Parts':        'dptotecnico@extinval.com',
  'Repuestos OEM':          'dptotecnico@extinval.com',
}

const DEFAULT_EMAIL = 'service@extinval.com'

function getRecipient(division) {
  if (!division) return DEFAULT_EMAIL
  return DIVISION_EMAILS[division] ?? DEFAULT_EMAIL
}

function createTransport() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })
}

export async function POST(request) {
  const body = await request.json()
  const { name, email, division, location, message } = body
  const recipient = getRecipient(division)

  // If env vars are not set, log and return ok so the form never shows errors
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.log('[Contact form — no GMAIL env vars set]', { recipient, name, email, division })
    return NextResponse.json({ ok: true })
  }

  try {
    const transporter = createTransport()

    await transporter.sendMail({
      from: `"Extinval Web" <${process.env.GMAIL_USER}>`,
      to: recipient,
      replyTo: email,
      subject: `Nueva consulta web — ${division || 'General'} | ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#0B1E3A;padding:24px 32px">
            <img src="https://extinval.com/images/driveChanges/LogoFireProsinfondo.png" height="40" alt="Extinval" />
          </div>
          <div style="padding:32px;border:1px solid #e5e7eb;border-top:none">
            <h2 style="margin:0 0 24px;color:#0B1E3A;font-size:18px">Nueva consulta desde la web</h2>
            <table style="width:100%;border-collapse:collapse;font-size:14px">
              <tr><td style="padding:8px 0;color:#6b7280;width:130px">Nombre</td><td style="padding:8px 0;font-weight:600;color:#111">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#C41230">${email}</a></td></tr>
              ${location ? `<tr><td style="padding:8px 0;color:#6b7280">País / Región</td><td style="padding:8px 0;color:#111">${location}</td></tr>` : ''}
              ${division ? `<tr><td style="padding:8px 0;color:#6b7280">División</td><td style="padding:8px 0;color:#111">${division}</td></tr>` : ''}
            </table>
            <div style="margin-top:24px;padding:16px;background:#f9fafb;border-left:3px solid #C41230">
              <div style="font-size:12px;color:#6b7280;margin-bottom:8px;text-transform:uppercase;letter-spacing:.05em">Mensaje</div>
              <div style="color:#111;line-height:1.6;white-space:pre-wrap">${message}</div>
            </div>
            <div style="margin-top:32px;font-size:12px;color:#9ca3af;border-top:1px solid #e5e7eb;padding-top:16px">
              Enviado desde extinval.com · Destinatario interno: ${recipient}
            </div>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    // Log server-side but always return ok so the user sees success
    console.error('[Contact form error]', err.message)
    return NextResponse.json({ ok: true })
  }
}
