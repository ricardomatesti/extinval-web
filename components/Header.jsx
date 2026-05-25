// Copyright © 2026 Pelayo Garrido Martinez — devpelayogarrido@gmail.com
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useLang } from '@/contexts/LangContext'
import EditableImage from './EditableImage'

export default function Header() {
  const [scrolled,   setScrolled]   = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [ddOpen,     setDdOpen]     = useState(false)
  const ddRef = useRef(null)
  const path  = usePathname()
  const { lang, setLang, t } = useLang()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const fn = (e) => { if (ddRef.current && !ddRef.current.contains(e.target)) setDdOpen(false) }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  // Close dropdown on route change
  useEffect(() => { setDdOpen(false) }, [path])

  // Both ES and EN URL forms so active state works regardless of which was used to navigate
  const esEnMap = {
    '/nosotros':                    '/about',
    '/contacto':                    '/contact',
    '/autoridad':                   '/authority',
    '/servicios/oil-gas':           '/services/oil-gas',
    '/servicios/buques-mercantes':  '/services/merchant-vessels',
    '/servicios/nautica-recreo':    '/services/recreational-maritime',
    '/servicios/industrial-comercial': '/services/industrial-commercial',
    '/area-clientes':               '/client-area',
  }
  const enEsMap = Object.fromEntries(Object.entries(esEnMap).map(([k, v]) => [v, k]))

  const isActive = (href) => {
    const alt = esEnMap[href] || enEsMap[href] || href
    return path === href || path.startsWith(href + '/') ||
           path === alt  || path.startsWith(alt + '/')
  }

  const close = () => { setDrawerOpen(false); document.body.style.overflow = '' }
  const open  = () => { setDrawerOpen(true);  document.body.style.overflow = 'hidden' }

  const serviceLinks = lang === 'en'
    ? [
        { href: '/services/oil-gas',               icon: '⚙', key: 'nav.oilGas'       },
        { href: '/services/merchant-vessels',       icon: '⚓', key: 'nav.merchant'     },
        { href: '/services/recreational-maritime',  icon: '⛵', key: 'nav.recreational' },
        { href: '/services/industrial-commercial',  icon: '🏭', key: 'nav.industrial'   },
      ]
    : [
        { href: '/servicios/oil-gas',              icon: '⚙', key: 'nav.oilGas'       },
        { href: '/servicios/buques-mercantes',     icon: '⚓', key: 'nav.merchant'     },
        { href: '/servicios/nautica-recreo',       icon: '⛵', key: 'nav.recreational' },
        { href: '/servicios/industrial-comercial', icon: '🏭', key: 'nav.industrial'   },
      ]

  return (
    <>
      <div className="topbar">
        <div className="container">
          <div className="topbar-inner">
            <div className="tb-emergency">
            </div>
            <div className="tb-links">
              <Link href={lang === 'en' ? '/about'     : '/nosotros'}>{t('topbar.about')}</Link>
              <Link href={lang === 'en' ? '/authority' : '/autoridad'}>{t('topbar.certs')}</Link>
              <Link href={lang === 'en' ? '/contact'   : '/contacto'}>{t('topbar.contact')}</Link>
              <Link href="/panel-personal" className="tb-cta">{t('topbar.clientArea')}</Link>
            </div>
          </div>
        </div>
      </div>

      <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
        <div className="container">
          <div className="header-inner">
            <Link href="/" className="logo-wrap">
              <EditableImage
                id="global-logo"
                scope="global"
                src="/images/driveChanges/Logo_Extinval_FondoBlanco_largo.png"
                alt="Extinval Group"
                style={{ height: 62, width: 'auto', display: 'block' }}
              />
            </Link>

            <nav className="main-nav">
              {/* Click-based services dropdown */}
              <div className={`nav-dd${ddOpen ? ' open' : ''}`} ref={ddRef}>
                <button
                  className={`nav-dd-trigger${isActive('/servicios') ? ' active' : ''}`}
                  onClick={() => setDdOpen(o => !o)}
                  aria-expanded={ddOpen}
                >
                  {t('nav.services')}
                  <span className="nav-dd-arrow">▾</span>
                </button>
                <div className="dd-menu" role="menu">
                  {serviceLinks.map(s => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className={`dd-item${isActive(s.href) ? ' dd-item-active' : ''}`}
                      role="menuitem"
                      onClick={() => setDdOpen(false)}
                    >
                      <span className="dd-icon">{s.icon}</span>
                      {t(s.key)}
                    </Link>
                  ))}
                </div>
              </div>

              <Link href={lang === 'en' ? '/about'     : '/nosotros'}  className={isActive('/nosotros')   ? 'active' : ''}>{t('nav.about')}</Link>
              <Link href={lang === 'en' ? '/authority' : '/autoridad'} className={isActive('/autoridad')  ? 'active' : ''}>{t('nav.authority')}</Link>
              <Link href="/resources" className={isActive('/resources') ? 'active' : ''}>{t('nav.network')}</Link>
              <Link href={lang === 'en' ? '/contact'   : '/contacto'}  className={isActive('/contacto')   ? 'active' : ''}>{t('nav.contact')}</Link>
            </nav>

            <div className="header-actions">
              <div className="lang-switch">
                <button className={`lang-btn${lang==='es'?' lang-active':''}`} onClick={()=>setLang('es')}>ES</button>
                <span className="lang-sep">|</span>
                <button className={`lang-btn${lang==='en'?' lang-active':''}`} onClick={()=>setLang('en')}>EN</button>
              </div>
              <Link href={lang === 'en' ? '/contact' : '/contacto'} className="btn btn-primary btn-sm">{t('nav.cta')}</Link>
            </div>

            <div className="ham" onClick={open}><span/><span/><span/></div>
          </div>
        </div>
      </header>

      <div className={`mobile-scrim${drawerOpen ? ' show' : ''}`} onClick={close} />
      <div className={`mobile-drawer${drawerOpen ? ' open' : ''}`}>
        <button className="mobile-close" onClick={close}>✕</button>
        <div className="mobile-lang">
          <button className={`lang-btn${lang==='es'?' lang-active':''}`} onClick={()=>setLang('es')}>ES</button>
          <span className="lang-sep">|</span>
          <button className={`lang-btn${lang==='en'?' lang-active':''}`} onClick={()=>setLang('en')}>EN</button>
        </div>
        {serviceLinks.map(s => (
          <Link key={s.href} href={s.href} onClick={close}>{s.icon} {t(s.key)}</Link>
        ))}
        <Link href={lang === 'en' ? '/about'     : '/nosotros'}  onClick={close}>{t('nav.about')}</Link>
        <Link href={lang === 'en' ? '/authority' : '/autoridad'} onClick={close}>{t('nav.authority')}</Link>
        <Link href="/resources" onClick={close}>{t('nav.network')}</Link>
        <Link href={lang === 'en' ? '/contact'   : '/contacto'}  onClick={close} style={{color:'var(--gold)',marginTop:'1rem'}}>{t('nav.contact')}</Link>
      </div>
    </>
  )
}
