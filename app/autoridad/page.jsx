// Copyright © 2026 Pelayo Garrido Martinez — devpelayogarrido@gmail.com
'use client'
import Link from 'next/link'
import EditableField from '@/components/EditableField'
import CMSLoader from '@/components/CMSLoader'
import { useTranslation } from '@/contexts/LangContext'

const PAGE = 'autoridad'

export default function AutoridadPage() {
  const t = useTranslation()

  return (
    <>
      <CMSLoader pageKey={PAGE} />

      <div
        className="page-hero"
        style={{
          backgroundImage: "url('/images/Cabecera Autoridad.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(11,30,58,0.6)' }} />
        <div className="container">
          <div className="ph-inner">
            <div className="breadcrumb">
              <Link href="/">{t('page.home')}</Link> ›{' '}
              <span style={{ color: 'var(--gold)' }}>{t('nav.authority')}</span>
            </div>
            <h1 className="page-title">
              <EditableField id="aut-pg-title">{t('aut.pg.title')}</EditableField>
            </h1>
            <p className="page-sub">
              <EditableField id="aut-pg-sub">{t('aut.pg.sub')}</EditableField>
            </p>
          </div>
        </div>
      </div>

      <section className="section"><div className="container">
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 3.5rem' }}>
          <div className="overline" style={{ justifyContent: 'center' }}>{t('aut.pg.overline')}</div>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(2rem,4vw,3rem)', color: 'var(--navy)', marginTop: '.75rem', letterSpacing: '.04em' }}>
            <EditableField id="aut-pg-h2">{t('aut.pg.h2')}</EditableField>
          </h2>
          <EditableField id="aut-pg-lead" tag="p" block style={{ fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.8, marginTop: '.75rem' }}>
            {t('aut.pg.lead')}
          </EditableField>
        </div>

        <div className="aut-grid">
          <div className="aut-card">
            <span className="aut-icon">🏅</span>
            <div className="aut-title"><EditableField id="aut-iacs-t">{t('aut.iacs.t')}</EditableField></div>
            <div className="aut-sub">{t('aut.iacs.sub')}</div>
            <div className="aut-badges">
              {['DNV', "Lloyd's Register", 'BV', 'ABS', 'RINA'].map(b => <span key={b} className="aut-badge">{b}</span>)}
            </div>
            <p className="aut-text"><EditableField id="aut-iacs-d">{t('aut.iacs.d')}</EditableField></p>
          </div>

          <div className="aut-card">
            <span className="aut-icon">🏴</span>
            <div className="aut-title"><EditableField id="aut-flag-t">{t('aut.flag.t')}</EditableField></div>
            <div className="aut-sub">{t('aut.flag.sub')}</div>
            <div className="aut-badges">
              {['Panamá', 'Liberia', 'Bahamas', t('badge.islas.marshall'), t('badge.espana.ue')].map(b => (
                <span key={b} className="aut-badge">{b}</span>
              ))}
            </div>
            <p className="aut-text"><EditableField id="aut-flag-d">{t('aut.flag.d')}</EditableField></p>
          </div>

          <div className="aut-card" id="partners">
            <span className="aut-icon">🔧</span>
            <div className="aut-title"><EditableField id="aut-oem-t">{t('aut.oem.t')}</EditableField></div>
            <div className="aut-sub">{t('aut.oem.sub')}</div>
            <div className="aut-badges">
              {['Hatecke', 'Global Davit', 'Viking', 'Zodiac/Survitec', 'ACR Electronics'].map(b => (
                <span key={b} className="aut-badge">{b}</span>
              ))}
            </div>
            <p className="aut-text"><EditableField id="aut-oem-d">{t('aut.oem.d')}</EditableField></p>
          </div>
        </div>

        {/* ISO */}
        <div className="iso-strip" style={{ marginTop: '3rem' }}>
          <div style={{ fontSize: '2.2rem' }}>✅</div>
          <div>
            <div className="iso-title">ISO 9001:2015</div>
            <div className="iso-sub">{t('aut.iso.sub')}</div>
          </div>
          <p className="iso-text"><EditableField id="aut-iso-d">{t('aut.iso.d')}</EditableField></p>
        </div>

        {/* Sociedades de Clasificación */}
        <div style={{ marginTop: '5rem', textAlign: 'center' }}>
          <div className="overline" style={{ justifyContent: 'center' }}>{t('aut.soc.overline')}</div>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(2rem,4vw,3rem)', color: 'var(--navy)', marginTop: '.75rem', letterSpacing: '.04em' }}>
            {t('aut.soc.h2')}
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.8, maxWidth: 580, margin: '.75rem auto 2.5rem' }}>
            {t('aut.soc.lead')}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2.5rem 3rem' }}>
            {[
              { src: '/images/dnv-gl-00001.webp',          label: 'DET NORSKE VERITAS' },
              { src: '/images/lloyds-register-00005.webp', label: "LLOYD'S REGISTER" },
              { src: '/images/bureau-veritas-00003.webp',  label: 'BUREAU VERITAS' },
              { src: '/images/abs-00002.webp',             label: 'AMERICAN BUREAU OF SHIPPING' },
              { src: '/images/classnk-00004.webp',         label: 'REGISTRO ITALIANO NAVALE' },
            ].map(({ src, label }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: 160 }}>
                <img src={src} alt={label} style={{ height: 90, width: '100%', objectFit: 'contain', filter: 'grayscale(20%)' }} />
                <div style={{ fontSize: '.7rem', fontWeight: 700, letterSpacing: '.08em', color: 'var(--navy)', textAlign: 'center', lineHeight: 1.3 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Repuestos */}
        <div style={{ marginTop: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="overline" style={{ justifyContent: 'center' }}>{t('aut.rep.overline')}</div>
            <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', color: 'var(--navy)', marginTop: '.75rem', letterSpacing: '.04em', whiteSpace: 'pre-line' }}>
              <EditableField id="aut-rep-title">{t('aut.rep.title')}</EditableField>
            </h2>
            <EditableField id="aut-rep-lead" tag="p" block style={{ fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.8, maxWidth: 580, margin: '.75rem auto 0' }}>
              {t('aut.rep.lead')}
            </EditableField>
          </div>
          <div className="aut-grid">
            {[
              ['🔗', 'aut-rep1-t', 'aut.rep1.t', 'aut-rep1-d', 'aut.rep1.d'],
              ['🧯', 'aut-rep2-t', 'aut.rep2.t', 'aut-rep2-d', 'aut.rep2.d'],
              ['📡', 'aut-rep3-t', 'aut.rep3.t', 'aut-rep3-d', 'aut.rep3.d'],
            ].map(([ic, tId, tKey, dId, dKey]) => (
              <div key={tId} className="aut-card">
                <span className="aut-icon">{ic}</span>
                <div className="aut-title"><EditableField id={tId}>{t(tKey)}</EditableField></div>
                <p className="aut-text"><EditableField id={dId}>{t(dKey)}</EditableField></p>
              </div>
            ))}
          </div>
        </div>
      </div></section>
    </>
  )
}
