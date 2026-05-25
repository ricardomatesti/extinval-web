'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CMSProvider from '@/components/CMSProvider'

function isLandingPath(pathname) {
  return /^\/landing-[^/]+/.test(pathname || '')
}

export default function AppShell({ children }) {
  const pathname = usePathname()

  if (isLandingPath(pathname)) {
    return children
  }

  return (
    <CMSProvider>
      <Header />
      <main>{children}</main>
      <Footer />
    </CMSProvider>
  )
}
