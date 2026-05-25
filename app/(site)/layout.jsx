import '../globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CMSProvider from '@/components/CMSProvider'

export default function SiteLayout({ children }) {
  return (
    <CMSProvider>
      <Header />
      <main>{children}</main>
      <Footer />
    </CMSProvider>
  )
}
