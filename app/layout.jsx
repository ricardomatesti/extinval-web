// Copyright © 2026 Pelayo Garrido Martinez — devpelayogarrido@gmail.com
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CMSProvider from '@/components/CMSProvider'
import { LangProvider } from '@/contexts/LangContext'
import LangHtmlSync from '@/components/LangHtmlSync'

export const metadata = {
  title: { default: 'Extinval Group — Seguridad Marítima e Industrial', template: '%s — Extinval Group' },
  description: 'Extinval Group: Soluciones integrales en Seguridad Marítima e Industrial. +40 años. Aprobaciones IACS: DNV, Lloyd\'s, BV, ABS, RINA. ISO 9001:2015.',
  keywords: 'seguridad maritima, extincion incendios, SOLAS, IACS, DNV, Lloyds, Oil Gas, buques mercantes, Valencia, Panamá',
}

export default function RootLayout({ children }) {
  return (
    // Default lang="es"; LangHtmlSync updates this attribute client-side
    <html lang="es">
      <body>
        <LangProvider>
          <LangHtmlSync />
          <CMSProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </CMSProvider>
        </LangProvider>
      </body>
    </html>
  )
}
