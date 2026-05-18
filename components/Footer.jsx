// Copyright © 2026 Pelayo Garrido Martinez — devpelayogarrido@gmail.com
'use client'
import Link from 'next/link'
import EditableField from './EditableField'
import { useLang } from '@/contexts/LangContext'

export default function Footer() {
  const { lang, t } = useLang()
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="ft-grid">
          <div>
            <Link href="/" className="logo-wrap" style={{ display:'inline-block', marginBottom:'1.25rem' }}>
              EXTINVAL
            </Link>
            <EditableField id="ft-desc" tag="p" className="ft-brand-text">
              {t('footer.tagline')}
            </EditableField>
            <div className="ft-iso">
              <span style={{ background:'var(--gold)', color:'var(--navy)', fontWeight:800, fontSize:'.65rem', padding:'.12rem .4rem' }}>ISO</span>
              <span style={{ fontSize:'.62rem', letterSpacing:'.12em', color:'rgba(255,255,255,.28)' }}>9001:2015 CERTIFIED</span>
            </div>
          </div>

          <div>
            <div className="ft-col-title">{t('footer.services')}</div>
            <div className="ft-links">
              <Link href={lang === 'en' ? '/services/oil-gas'              : '/servicios/oil-gas'}>Oil &amp; Gas</Link>
              <Link href={lang === 'en' ? '/services/merchant-vessels'     : '/servicios/buques-mercantes'}>{t('nav.merchant')}</Link>
              <Link href={lang === 'en' ? '/services/recreational-maritime': '/servicios/nautica-recreo'}>{t('nav.recreational')}</Link>
              <Link href={lang === 'en' ? '/services/industrial-commercial': '/servicios/industrial-comercial'}>{t('nav.industrial')}</Link>
              <Link href={lang === 'en' ? '/contact' : '/contacto'}>{t('footer.oem')}</Link>
            </div>
          </div>

          <div>
            <div className="ft-col-title">{t('footer.company')}</div>
            <div className="ft-links">
              <Link href={lang === 'en' ? '/about'              : '/nosotros'}>{t('footer.nosotros')}</Link>
              <Link href={lang === 'en' ? '/about#trayectoria'  : '/nosotros#trayectoria'}>{t('footer.trayectoria')}</Link>
              <Link href={lang === 'en' ? '/authority'          : '/autoridad'}>{t('footer.certs')}</Link>
              <Link href={lang === 'en' ? '/authority#partners' : '/autoridad#partners'}>{t('footer.partners')}</Link>
              <Link href="/faq">{t('footer.faqs')}</Link>
            </div>
          </div>

          <div>
            <div className="ft-col-title">{t('footer.contactTitle')}</div>
            <div className="ft-contact">
              <div className="ft-ci">
                <span className="ft-ci-icon">📍</span>
                <EditableField id="ft-address">
                  <span>Sede Central: Carrer Serra d&apos;Espadà, 28, Aldaia (Valencia)<br />Canarias · Almería · Panamá · EE.UU. · Canadá</span>
                </EditableField>
              </div>
              
              <div className="ft-ci">
                <span className="ft-ci-icon">✉</span>
                <EditableField id="ft-email">service@extinval.com</EditableField>
              </div>
            </div>
          </div>
        </div>

        <div className="ft-bottom">
          <div className="ft-copy">{t('footer.copy', { year })}</div>
          <div className="ft-legal">
            <Link href="/legal">{t('footer.legal')}</Link>
            <Link href="/privacidad">{t('footer.privacy')}</Link>
            <Link href="/cookies">{t('footer.cookies')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
