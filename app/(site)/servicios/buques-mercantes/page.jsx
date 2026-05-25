// Copyright © 2026 Pelayo Garrido Martinez — devpelayogarrido@gmail.com
'use client'
import Link from 'next/link'
import EditableField from '@/components/EditableField'
import EditableBackground from '@/components/EditableBackground'
import CMSLoader from '@/components/CMSLoader'
import { useLang } from '@/contexts/LangContext'

const PAGE = 'buques-mercantes'

export default function BuquesMercantesPage() {
  const { lang, t } = useLang()

  return (
    <>
      <CMSLoader pageKey={PAGE} />

      <EditableBackground
        id="bm-hero-bg"
        className="page-hero"
        image="/images/Cabecera_Home_Mercantes3.jpg"
        style={{ backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(11,30,58,0.4)' }} />
        <div className="container">
          <div className="ph-inner">
            <div className="breadcrumb">
              <Link href="/">{t('page.home')}</Link> › <Link href="/#divisiones">{t('breadcrumb.services')}</Link> ›{' '}
              <span style={{ color: 'var(--gold)' }}>{t('nav.merchant')}</span>
            </div>
            <div style={{ marginBottom: '.75rem' }}>
              <span style={{ background: 'rgba(30,58,138,.25)', border: '1px solid rgba(30,58,138,.45)', color: '#93C5FD', fontSize: '.68rem', fontFamily: 'var(--cond)', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', padding: '.3rem .9rem', display: 'inline-block' }}>
                {t('bm.badge')}
              </span>
            </div>
            <h1 className="page-title">
              <EditableField id="bm-title">{t('bm.title')}</EditableField>
            </h1>
            <p className="page-sub">
              <EditableField id="bm-subtitle">{t('bm.subtitle')}</EditableField>
            </p>
          </div>
        </div>
      </EditableBackground>

      <section className="section"><div className="container">
        <div className="svc-detail-grid">

          {/* ── LEFT COLUMN ── */}
          <div>
            <EditableField id="bm-intro" tag="p" block style={{ fontSize: '1.05rem', color: 'var(--muted)', lineHeight: 1.85, marginBottom: '2.5rem' }}>
              {t('bm.intro')}
            </EditableField>

            <h2 style={{ fontFamily: 'var(--display)', fontSize: '1.55rem', color: 'var(--navy)', marginBottom: '1.25rem', letterSpacing: '.04em' }}>
              <EditableField id="bm-srv-title">{t('bm.srv.title')}</EditableField>
            </h2>

            <div className="svc-section-title">
              <EditableField id="bm-s1-title">{t('bm.s1.title')}</EditableField>
            </div>
            {[
              ['bm-s1-i1-t', t('bm.s1.i1.t'), 'bm-s1-i1-d', t('bm.s1.i1.d')],
              ['bm-s1-i2-t', t('bm.s1.i2.t'), 'bm-s1-i2-d', t('bm.s1.i2.d')],
            ].map(([tId, tDef, dId, dDef]) => (
              <div key={tId} className="svc-item">
                <span className="svc-dot" />
                <div>
                  <strong className="svc-item-title"><EditableField id={tId}>{tDef}</EditableField></strong>
                  <span className="svc-item-text"><EditableField id={dId}>{dDef}</EditableField></span>
                </div>
              </div>
            ))}

            <div className="svc-section-title" style={{ marginTop: '1.5rem' }}>
              <EditableField id="bm-s2-title">{t('bm.s2.title')}</EditableField>
            </div>
            {[
              ['bm-s2-i1-t', t('bm.s2.i1.t'), 'bm-s2-i1-d', t('bm.s2.i1.d')],
              ['bm-s2-i2-t', t('bm.s2.i2.t'), 'bm-s2-i2-d', t('bm.s2.i2.d')],
            ].map(([tId, tDef, dId, dDef]) => (
              <div key={tId} className="svc-item">
                <span className="svc-dot" />
                <div>
                  <strong className="svc-item-title"><EditableField id={tId}>{tDef}</EditableField></strong>
                  <span className="svc-item-text"><EditableField id={dId}>{dDef}</EditableField></span>
                </div>
              </div>
            ))}

            <div className="svc-section-title" style={{ marginTop: '1.5rem' }}>
              <EditableField id="bm-s3-title">{t('bm.s3.title')}</EditableField>
            </div>
            {[
              ['bm-s3-i1-t', t('bm.s3.i1.t'), 'bm-s3-i1-d', t('bm.s3.i1.d')],
              ['bm-s3-i2-t', t('bm.s3.i2.t'), 'bm-s3-i2-d', t('bm.s3.i2.d')],
            ].map(([tId, tDef, dId, dDef]) => (
              <div key={tId} className="svc-item">
                <span className="svc-dot" />
                <div>
                  <strong className="svc-item-title"><EditableField id={tId}>{tDef}</EditableField></strong>
                  <span className="svc-item-text"><EditableField id={dId}>{dDef}</EditableField></span>
                </div>
              </div>
            ))}

            <h2 style={{ fontFamily: 'var(--display)', fontSize: '1.55rem', color: 'var(--navy)', margin: '2.5rem 0 1.25rem', letterSpacing: '.04em' }}>
              <EditableField id="bm-sup-title">{t('bm.sup.title')}</EditableField>
            </h2>

            <div className="svc-section-title">
              <EditableField id="bm-sup1-title">{t('bm.sup1.title')}</EditableField>
            </div>
            {[
              ['bm-sup1-i1-t', t('bm.sup1.i1.t'), 'bm-sup1-i1-d', t('bm.sup1.i1.d')],
            ].map(([tId, tDef, dId, dDef]) => (
              <div key={tId} className="svc-item">
                <span className="svc-dot" />
                <div>
                  <strong className="svc-item-title"><EditableField id={tId}>{tDef}</EditableField></strong>
                  <span className="svc-item-text"><EditableField id={dId}>{dDef}</EditableField></span>
                </div>
              </div>
            ))}

            <div className="svc-section-title" style={{ marginTop: '1.5rem' }}>
              <EditableField id="bm-sup2-title">{t('bm.sup2.title')}</EditableField>
            </div>
            {[
              ['bm-sup2-i1-t', t('bm.sup2.i1.t'), 'bm-sup2-i1-d', t('bm.sup2.i1.d')],
              ['bm-sup2-i2-t', t('bm.sup2.i2.t'), 'bm-sup2-i2-d', t('bm.sup2.i2.d')],
              ['bm-sup2-i3-t', t('bm.sup2.i3.t'), 'bm-sup2-i3-d', t('bm.sup2.i3.d')],
            ].map(([tId, tDef, dId, dDef]) => (
              <div key={tId} className="svc-item">
                <span className="svc-dot" />
                <div>
                  <strong className="svc-item-title"><EditableField id={tId}>{tDef}</EditableField></strong>
                  <span className="svc-item-text"><EditableField id={dId}>{dDef}</EditableField></span>
                </div>
              </div>
            ))}

            <div className="svc-section-title" style={{ marginTop: '1.5rem' }}>
              <EditableField id="bm-sup3-title">{t('bm.sup3.title')}</EditableField>
            </div>
            {[
              ['bm-sup3-i1-t', t('bm.sup3.i1.t'), 'bm-sup3-i1-d', t('bm.sup3.i1.d')],
              ['bm-sup3-i2-t', t('bm.sup3.i2.t'), 'bm-sup3-i2-d', t('bm.sup3.i2.d')],
              ['bm-sup3-i3-t', t('bm.sup3.i3.t'), 'bm-sup3-i3-d', t('bm.sup3.i3.d')],
            ].map(([tId, tDef, dId, dDef]) => (
              <div key={tId} className="svc-item">
                <span className="svc-dot" />
                <div>
                  <strong className="svc-item-title"><EditableField id={tId}>{tDef}</EditableField></strong>
                  <span className="svc-item-text"><EditableField id={dId}>{dDef}</EditableField></span>
                </div>
              </div>
            ))}
          </div>

          {/* ── STICKY SIDEBAR ── */}
          <div className="svc-sticky">
            <div className="svc-cta-box">
              <div className="svc-cta-title">{t('bm.sidebar.title')}</div>
              <p className="svc-cta-text">{t('bm.sidebar.text')}</p>
              <Link href={lang === 'en' ? '/contact' : '/contacto'} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>{t('bm.sidebar.btn')}</Link>
            </div>

            <div style={{ background: 'var(--off)', border: '1px solid var(--border)', padding: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ fontFamily: 'var(--cond)', fontSize: '.65rem', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '1rem' }}>
                {t('bm.sidebar.logistics')}
              </div>
              {[
                ['1', t('bm.log1.title'), t('bm.log1.text')],
                ['2', t('bm.log2.title'), t('bm.log2.text')],
                ['3', t('bm.log3.title'), t('bm.log3.text')],
              ].map(([n, ti, tx]) => (
                <div key={n} style={{ display: 'flex', gap: '.75rem', alignItems: 'flex-start', marginBottom: '.75rem' }}>
                  <span style={{ fontFamily: 'var(--display)', fontSize: '1.4rem', color: 'rgba(196,18,48,.18)', lineHeight: 1, minWidth: '1.6rem' }}>{n}</span>
                  <div>
                    <strong style={{ fontSize: '.84rem', color: 'var(--navy)', display: 'block', marginBottom: '.15rem' }}>{ti}</strong>
                    <span style={{ fontSize: '.78rem', color: 'var(--muted)', lineHeight: 1.5 }}>{tx}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="svc-badge-area">
              <div className="svc-badge-title">{t('bm.sidebar.approvals')}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.35rem' }}>
                {['DNV', "Lloyd's Register", 'BV', 'ABS', 'RINA', 'Panamá', 'Liberia', 'Bahamas'].map(b => (
                  <span key={b} className="aut-badge">{b}</span>
                ))}
                <span className="aut-badge">{t('badge.islas.marshall')}</span>
                <span className="aut-badge">{t('badge.espana.ue')}</span>
                <span className="aut-badge gold">ISO 9001:2015</span>
              </div>
            </div>
          </div>

        </div>
      </div></section>

      {/* RELATED */}
      <section className="section-sm section-gray"><div className="container">
        <div className="overline red" style={{ marginBottom: '1.5rem' }}>{t('related.title')}</div>
        <div className="related-grid">
          {[
            { h: '/servicios/oil-gas',               i: '⚙', tk: 'nav.oilGas',      dk: 'related.og.d' },
            { h: '/servicios/nautica-recreo',         i: '⛵', tk: 'nav.recreational', dk: 'related.nr.d' },
            { h: '/servicios/industrial-comercial',   i: '🏭', tk: 'nav.industrial',   dk: 'related.ic.d' },
          ].map(c => (
            <Link key={c.h} href={c.h} className="related-card">
              <div className="rc-icon">{c.i}</div>
              <div className="rc-title">{t(c.tk)}</div>
              <div className="rc-text">{t(c.dk)}</div>
              <div className="rc-link">{t('related.cta')}</div>
            </Link>
          ))}
        </div>
      </div></section>
    </>
  )
}
