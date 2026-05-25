// Copyright © 2026 Pelayo Garrido Martinez — devpelayogarrido@gmail.com
'use client'
import Link from 'next/link'
import EditableField from '@/components/EditableField'
import CMSLoader from '@/components/CMSLoader'
import { useLang } from '@/contexts/LangContext'

const PAGE = 'oil-gas'

export default function OilGasPage() {
  const { lang, t } = useLang()

  return (
    <>
      <CMSLoader pageKey={PAGE} />

      <div
        className="page-hero"
        style={{
          backgroundImage: "url('/images/Cabecera_Oil & Gas.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(11,30,58,0.4)' }} />
        <div className="container">
          <div className="ph-inner">
            <div className="breadcrumb">
              <Link href="/">{t('page.home')}</Link> › <Link href="/#divisiones">{t('breadcrumb.services')}</Link> ›{' '}
              <span style={{ color: 'var(--gold)' }}>Oil &amp; Gas</span>
            </div>
            <div style={{ marginBottom: '.75rem' }}>
              <span style={{ background: 'rgba(192,39,45,.15)', border: '1px solid rgba(192,39,45,.3)', color: '#FF9A9A', fontSize: '.68rem', fontFamily: 'var(--cond)', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', padding: '.3rem .9rem', display: 'inline-block' }}>
                {t('og.badge')}
              </span>
            </div>
            <h1 className="page-title">
              <EditableField id="og-title">Oil &amp; Gas</EditableField>
            </h1>
            <p className="page-sub">
              <EditableField id="og-subtitle">{t('og.subtitle')}</EditableField>
            </p>
          </div>
        </div>
      </div>

      <section className="section"><div className="container">
        <div className="svc-detail-grid">

          {/* ── LEFT COLUMN ── */}
          <div>
            <EditableField id="og-intro" tag="p" block style={{ fontSize: '1.05rem', color: 'var(--muted)', lineHeight: 1.85, marginBottom: '2.5rem' }}>
              {t('og.intro')}
            </EditableField>

            <h2 style={{ fontFamily: 'var(--display)', fontSize: '1.55rem', color: 'var(--navy)', marginBottom: '1.25rem', letterSpacing: '.04em' }}>
              <EditableField id="og-srv-title">{t('og.srv.title')}</EditableField>
            </h2>

            <div className="svc-section-title">
              <EditableField id="og-s1-title">{t('og.s1.title')}</EditableField>
            </div>
            {[
              ['og-s1-i1-t', t('og.s1.i1.t'), 'og-s1-i1-d', t('og.s1.i1.d')],
              ['og-s1-i2-t', t('og.s1.i2.t'), 'og-s1-i2-d', t('og.s1.i2.d')],
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
              <EditableField id="og-s2-title">{t('og.s2.title')}</EditableField>
            </div>
            {[
              ['og-s2-i1-t', t('og.s2.i1.t'), 'og-s2-i1-d', t('og.s2.i1.d')],
              ['og-s2-i2-t', t('og.s2.i2.t'), 'og-s2-i2-d', t('og.s2.i2.d')],
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
              <EditableField id="og-s3-title">{t('og.s3.title')}</EditableField>
            </div>
            {[
              ['og-s3-i1-t', t('og.s3.i1.t'), 'og-s3-i1-d', t('og.s3.i1.d')],
              ['og-s3-i2-t', t('og.s3.i2.t'), 'og-s3-i2-d', t('og.s3.i2.d')],
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
              <EditableField id="og-s4-title">{t('og.s4.title')}</EditableField>
            </div>
            {[
              ['og-s4-i1-t', t('og.s4.i1.t'), 'og-s4-i1-d', t('og.s4.i1.d')],
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
              <EditableField id="og-sup-title">{t('og.sup.title')}</EditableField>
            </h2>

            <div className="svc-section-title">
              <EditableField id="og-sup1-title">{t('og.sup1.h')}</EditableField>
            </div>
            {[
              ['og-sup1-i1-t', t('og.sup1.i1.t'), 'og-sup1-i1-d', t('og.sup1.i1.d')],
              ['og-sup1-i2-t', t('og.sup1.i2.t'), 'og-sup1-i2-d', t('og.sup1.i2.d')],
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
              <EditableField id="og-sup2-title">{t('og.sup2.h')}</EditableField>
            </div>
            {[
              ['og-sup2-i1-t', t('og.sup2.i1.t'), 'og-sup2-i1-d', t('og.sup2.i1.d')],
              ['og-sup2-i2-t', t('og.sup2.i2.t'), 'og-sup2-i2-d', t('og.sup2.i2.d')],
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
              <EditableField id="og-sup3-title">{t('og.sup3.h')}</EditableField>
            </div>
            {[
              ['og-sup3-i1-t', t('og.sup3.i1.t'), 'og-sup3-i1-d', t('og.sup3.i1.d')],
              ['og-sup3-i2-t', t('og.sup3.i2.t'), 'og-sup3-i2-d', t('og.sup3.i2.d')],
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
              <div className="svc-cta-title">{t('og.sidebar.title')}</div>
              <p className="svc-cta-text">{t('og.sidebar.text')}</p>
              <Link href={lang === 'en' ? '/contact' : '/contacto'} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>{t('og.sidebar.btn')}</Link>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontFamily: 'var(--cond)', fontSize: '.65rem', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '1rem', paddingBottom: '.6rem', borderBottom: '2px solid var(--red)' }}>
                {t('og.sidebar.supply')}
              </div>
              <div className="svc-supply-grid">
                {[
                  ['🧴', t('og.sup1.title'), t('og.sup1.text')],
                  ['🔍', t('og.sup2.title'), t('og.sup2.text')],
                  ['📻', t('og.sup3.title'), t('og.sup3.text')],
                  ['🦺', t('og.sup4.title'), t('og.sup4.text')],
                ].map(([ic, ti, tx]) => (
                  <div key={ti} className="svc-supply-item">
                    <div className="svc-supply-icon">{ic}</div>
                    <div className="svc-supply-title">{ti}</div>
                    <div className="svc-supply-text">{tx}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="svc-badge-area">
              <div className="svc-badge-title">{t('sidebar.badges.title')}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.35rem' }}>
                {['DNV', "Lloyd's Register", 'BV', 'ABS', 'RINA', 'Panamá', 'Liberia', 'Bahamas', 'ATEX/IECEx'].map(b => (
                  <span key={b} className="aut-badge">{b}</span>
                ))}
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
            { h: '/servicios/buques-mercantes',     i: '⚓', tk: 'nav.merchant',    dk: 'related.bm.d' },
            { h: '/servicios/nautica-recreo',        i: '⛵', tk: 'nav.recreational', dk: 'related.nr.d' },
            { h: '/servicios/industrial-comercial',  i: '🏭', tk: 'nav.industrial',   dk: 'related.ic.d' },
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
