import '../globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CMSGlobalLoader from '@/components/CMSGlobalLoader'
import CMSProvider from '@/components/CMSProvider'

export default function SiteLayout({ children }) {
  return (
    <CMSProvider>
      <CMSGlobalLoader />
      <Header />
      <main>{children}</main>
      <Footer />
    </CMSProvider>
  )
}
