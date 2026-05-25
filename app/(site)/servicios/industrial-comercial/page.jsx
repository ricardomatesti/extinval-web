// Copyright © 2026 Pelayo Garrido Martinez — devpelayogarrido@gmail.com
'use client'
import Link from 'next/link'
import EditableField from '@/components/EditableField'
import EditableBackground from '@/components/EditableBackground'
import CMSLoader from '@/components/CMSLoader'
import { useLang } from '@/contexts/LangContext'

const PAGE = 'industrial-comercial'

export default function IndustrialComercialPage() {
  const { lang, t } = useLang()

  return (
    <>
      <CMSLoader pageKey={PAGE} />

      <EditableBackground
        id="ic-hero-bg"
        className="page-hero"
        image="/images/Cabecera_Home_Industrial2.jpg"
        style={{ backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(11,30,58,0.4)' }} />
        <div className="container">
          <div className="ph-inner">
            <div className="breadcrumb">
              <Link href="/">{t('page.home')}</Link> ›{' '}
              <Link href="/#divisiones">{t('breadcrumb.services')}</Link> ›{' '}
              <span style={{ color: 'var(--gold)' }}>{t('nav.industrial')}</span>
            </div>
            <div style={{ marginBottom: '.75rem' }}>
              <span style={{ background: 'rgba(100,70,10,.2)', border: '1px solid rgba(201,168,76,.35)', color: 'var(--gold)', fontSize: '.68rem', fontFamily: 'var(--cond)', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', padding: '.3rem .9rem', display: 'inline-block' }}>
                {t('ic.badge')}
              </span>
            </div>
            <h1 className="page-title">
              <EditableField id="ic-page-title">Industrial &amp; Comercial</EditableField>
            </h1>
            <p className="page-sub">
              <EditableField id="ic-page-subtitle">{t('ic.page.subtitle')}</EditableField>
            </p>
          </div>
        </div>
      </EditableBackground>

      <section className="section">
        <div className="container">
          <div className="svc-detail-grid">
            <div>
              <EditableField id="ic-intro" tag="p" block style={{ fontSize: '1.05rem', color: 'var(--muted)', lineHeight: 1.85, marginBottom: '2.5rem' }}>
                {t('ic.intro')}
              </EditableField>

              {/* ── SERVICIOS ── */}
              <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontFamily: 'var(--display)', fontSize: '1.6rem', color: 'var(--navy)', marginBottom: '1.25rem', letterSpacing: '.04em' }}>
                  <EditableField id="ic-srv-title">{t('ic.srv.title')}</EditableField>
                </h2>

                <div className="svc-section-title">
                  <EditableField id="ic-srv1-title">{t('ic.srv1.title')}</EditableField>
                </div>
                <div className="svc-item">
                  <span className="svc-dot" /><div>
                    <strong className="svc-item-title"><EditableField id="ic-srv1-item1-title">{t('ic.srv1.item1.title')}</EditableField></strong>
                    <span className="svc-item-text"><EditableField id="ic-srv1-item1-text">{t('ic.srv1.item1.text')}</EditableField></span>
                  </div>
                </div>
                <div className="svc-item" style={{ marginBottom: '1.75rem' }}>
                  <span className="svc-dot" /><div>
                    <strong className="svc-item-title"><EditableField id="ic-srv1-item2-title">{t('ic.srv1.item2.title')}</EditableField></strong>
                    <span className="svc-item-text"><EditableField id="ic-srv1-item2-text">{t('ic.srv1.item2.text')}</EditableField></span>
                  </div>
                </div>

                <div className="svc-section-title">
                  <EditableField id="ic-srv2-title">{t('ic.srv2.title')}</EditableField>
                </div>
                <div className="svc-item">
                  <span className="svc-dot" /><div>
                    <strong className="svc-item-title"><EditableField id="ic-srv2-item1-title">{t('ic.srv2.item1.title')}</EditableField></strong>
                    <span className="svc-item-text"><EditableField id="ic-srv2-item1-text">{t('ic.srv2.item1.text')}</EditableField></span>
                  </div>
                </div>
                <div className="svc-item" style={{ marginBottom: '1.75rem' }}>
                  <span className="svc-dot" /><div>
                    <strong className="svc-item-title"><EditableField id="ic-srv2-item2-title">{t('ic.srv2.item2.title')}</EditableField></strong>
                    <span className="svc-item-text"><EditableField id="ic-srv2-item2-text">{t('ic.srv2.item2.text')}</EditableField></span>
                  </div>
                </div>

                <div className="svc-section-title">
                  <EditableField id="ic-srv3-title">{t('ic.srv3.title')}</EditableField>
                </div>
                <div className="svc-item">
                  <span className="svc-dot" /><div>
                    <strong className="svc-item-title"><EditableField id="ic-srv3-item1-title">{t('ic.srv3.item1.title')}</EditableField></strong>
                    <span className="svc-item-text"><EditableField id="ic-srv3-item1-text">{t('ic.srv3.item1.text')}</EditableField></span>
                  </div>
                </div>
                <div className="svc-item" style={{ marginBottom: '1.75rem' }}>
                  <span className="svc-dot" /><div>
                    <strong className="svc-item-title"><EditableField id="ic-srv3-item2-title">{t('ic.srv3.item2.title')}</EditableField></strong>
                    <span className="svc-item-text"><EditableField id="ic-srv3-item2-text">{t('ic.srv3.item2.text')}</EditableField></span>
                  </div>
                </div>
              </div>

              {/* ── SUMINISTROS ── */}
              <div>
                <h2 style={{ fontFamily: 'var(--display)', fontSize: '1.6rem', color: 'var(--navy)', marginBottom: '1.25rem', letterSpacing: '.04em' }}>
                  <EditableField id="ic-sup-title">{t('ic.sup.title')}</EditableField>
                </h2>

                <div className="svc-section-title">
                  <EditableField id="ic-sup1-title">{t('ic.sup1.title')}</EditableField>
                </div>
                <div className="svc-item">
                  <span className="svc-dot" /><div>
                    <strong className="svc-item-title"><EditableField id="ic-sup1-item1-title">{t('ic.sup1.item1.title')}</EditableField></strong>
                    <span className="svc-item-text"><EditableField id="ic-sup1-item1-text">{t('ic.sup1.item1.text')}</EditableField></span>
                  </div>
                </div>

                <div className="svc-section-title" style={{ marginTop: '1.75rem' }}>
                  <EditableField id="ic-sup2-title">{t('ic.sup2.title')}</EditableField>
                </div>
                <div className="svc-item">
                  <span className="svc-dot" /><div>
                    <strong className="svc-item-title"><EditableField id="ic-sup2-item1-title">{t('ic.sup2.item1.title')}</EditableField></strong>
                    <span className="svc-item-text"><EditableField id="ic-sup2-item1-text">{t('ic.sup2.item1.text')}</EditableField></span>
                  </div>
                </div>

                <div className="svc-section-title" style={{ marginTop: '1.75rem' }}>
                  <EditableField id="ic-sup3-title">{t('ic.sup3.title')}</EditableField>
                </div>
                <div className="svc-item">
                  <span className="svc-dot" /><div>
                    <strong className="svc-item-title"><EditableField id="ic-sup3-item1-title">{t('ic.sup3.item1.title')}</EditableField></strong>
                    <span className="svc-item-text"><EditableField id="ic-sup3-item1-text">{t('ic.sup3.item1.text')}</EditableField></span>
                  </div>
                </div>
                <div className="svc-item">
                  <span className="svc-dot" /><div>
                    <strong className="svc-item-title"><EditableField id="ic-sup3-item2-title">{t('ic.sup3.item2.title')}</EditableField></strong>
                    <span className="svc-item-text"><EditableField id="ic-sup3-item2-text">{t('ic.sup3.item2.text')}</EditableField></span>
                  </div>
                </div>
              </div>
            </div>

            {/* STICKY SIDEBAR */}
            <div className="svc-sticky">
              <div className="svc-cta-box">
                <div className="svc-cta-title">{t('ic.sidebar.title')}</div>
                <p className="svc-cta-text">{t('ic.sidebar.text')}</p>
                <Link href={lang === 'en' ? '/contact' : '/contacto'} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>{t('ic.sidebar.btn')}</Link>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontFamily: 'var(--cond)', fontSize: '.65rem', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '1rem', paddingBottom: '.6rem', borderBottom: '2px solid var(--red)' }}>
                  {t('ic.sidebar.tech')}
                </div>
                <div className="svc-supply-grid">
                  {[
                    ['🌿', t('ic.tech1.title'), t('ic.tech1.text')],
                    ['📡', t('ic.tech2.title'), t('ic.tech2.text')],
                    ['🧪', t('ic.tech3.title'), t('ic.tech3.text')],
                    ['🔥', t('ic.tech4.title'), t('ic.tech4.text')],
                  ].map(([ic, ti, tx]) => (
                    <div key={ti} className="svc-supply-item">
                      <div className="svc-supply-icon">{ic}</div>
                      <div className="svc-supply-title">{ti}</div>
                      <div className="svc-supply-text">{tx}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: 'var(--navy)', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ fontFamily: 'var(--cond)', fontSize: '.65rem', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>
                  {t('ic.sidebar.adv')}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
                  {[
                    [t('ic.adv1.label'), t('ic.adv1.text')],
                    [t('ic.adv2.label'), t('ic.adv2.text')],
                    [t('ic.adv3.label'), t('ic.adv3.text')],
                  ].map(([label, text]) => (
                    <div key={label} style={{ display: 'flex', gap: '.75rem', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--gold)', fontSize: '.7rem', marginTop: '.15rem', flexShrink: 0 }}>✓</span>
                      <div>
                        <strong style={{ color: '#fff', fontSize: '.82rem', display: 'block', marginBottom: '.1rem' }}>{label}</strong>
                        <span style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.5)', lineHeight: 1.5 }}>{text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="svc-badge-area">
                <div className="svc-badge-title">{t('ic.sidebar.sectors')}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.35rem' }}>
                  {[
                    t('ic.sector1'), t('ic.sector2'), t('ic.sector3'), t('ic.sector4'),
                    t('ic.sector5'), t('ic.sector6'), t('ic.sector7'), t('ic.sector8'),
                  ].map(s => (
                    <span key={s} className="aut-badge">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="section-sm section-gray">
        <div className="container">
          <div className="overline red" style={{ marginBottom: '1.5rem' }}>{t('related.title')}</div>
          <div className="related-grid">
            {[
              { h: '/servicios/oil-gas',             i: '⚙', tk: 'nav.oilGas',      dk: 'related.og.d' },
              { h: '/servicios/buques-mercantes',    i: '⚓', tk: 'nav.merchant',    dk: 'related.bm.d' },
              { h: '/servicios/nautica-recreo',      i: '⛵', tk: 'nav.recreational', dk: 'related.nr.d' },
            ].map(c => (
              <Link key={c.h} href={c.h} className="related-card">
                <div className="rc-icon">{c.i}</div>
                <div className="rc-title">{t(c.tk)}</div>
                <div className="rc-text">{t(c.dk)}</div>
                <div className="rc-link">{t('related.cta')}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
