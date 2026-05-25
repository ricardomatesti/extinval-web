// Copyright © 2026 Pelayo Garrido Martinez — devpelayogarrido@gmail.com
'use client'
import Link from 'next/link'
import EditableField from '@/components/EditableField'
import CMSLoader from '@/components/CMSLoader'
import { useLang } from '@/contexts/LangContext'

const PAGE = 'nautica-recreo'

export default function NauticaRecreoPage() {
  const { lang, t } = useLang()

  return (
    <>
      <CMSLoader pageKey={PAGE} />

      {/* PAGE HERO */}
      <div
        className="page-hero"
        style={{
          backgroundImage: "url('/images/Cabecera_Home_Nautica2.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(11,30,58,0.4)' }} />
        <div className="container">
          <div className="ph-inner">
            <div className="breadcrumb">
              <Link href="/">{t('page.home')}</Link> ›{' '}
              <Link href="/#divisiones">{t('breadcrumb.services')}</Link> ›{' '}
              <span style={{ color: 'var(--gold)' }}>{t('nr.breadcrumb')}</span>
            </div>
            <div style={{ marginBottom: '.75rem' }}>
              <span style={{
                background: 'rgba(10,100,60,.2)', border: '1px solid rgba(10,100,60,.4)', color: '#6EE7B7',
                fontSize: '.68rem', fontFamily: 'var(--cond)', fontWeight: 700, letterSpacing: '.18em',
                textTransform: 'uppercase', padding: '.3rem .9rem', display: 'inline-block',
              }}>
                {t('nr.badge')}
              </span>
            </div>
            <h1 className="page-title">
              <EditableField id="nr-page-title">{t('nr.breadcrumb')}</EditableField>
            </h1>
            <p className="page-sub">
              <EditableField id="nr-page-subtitle">{t('nr.page.subtitle')}</EditableField>
            </p>
          </div>
        </div>
      </div>

      {/* INTRO */}
      <section className="section">
        <div className="container">
          <div className="svc-detail-grid">
            <div>
              <EditableField id="nr-intro" tag="p" block style={{ fontSize: '1.05rem', color: 'var(--muted)', lineHeight: 1.85, marginBottom: '2.5rem' }}>
                {t('nr.intro')}
              </EditableField>

              {/* ── SERVICIOS DE INSPECCIÓN Y MANTENIMIENTO ── */}
              <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontFamily: 'var(--display)', fontSize: '1.6rem', color: 'var(--navy)', marginBottom: '1.25rem', letterSpacing: '.04em' }}>
                  <EditableField id="nr-srv-title">{t('nr.srv.title')}</EditableField>
                </h2>

                {/* 1. FFE */}
                <div className="svc-section-title">
                  <EditableField id="nr-srv1-title">{t('nr.srv1.title')}</EditableField>
                </div>
                <div className="svc-item"><span className="svc-dot" /><div>
                  <strong className="svc-item-title"><EditableField id="nr-srv1-item1-title">{t('nr.srv1.item1.title')}</EditableField></strong>
                  <span className="svc-item-text"><EditableField id="nr-srv1-item1-text">{t('nr.srv1.item1.text')}</EditableField></span>
                </div></div>
                <div className="svc-item"><span className="svc-dot" /><div>
                  <strong className="svc-item-title"><EditableField id="nr-srv1-item2-title">{t('nr.srv1.item2.title')}</EditableField></strong>
                  <span className="svc-item-text"><EditableField id="nr-srv1-item2-text">{t('nr.srv1.item2.text')}</EditableField></span>
                </div></div>
                <div className="svc-item"><span className="svc-dot" /><div>
                  <strong className="svc-item-title"><EditableField id="nr-srv1-item3-title">{t('nr.srv1.item3.title')}</EditableField></strong>
                  <span className="svc-item-text"><EditableField id="nr-srv1-item3-text">{t('nr.srv1.item3.text')}</EditableField></span>
                </div></div>
                <div className="svc-item" style={{ marginBottom: '1.75rem' }}><span className="svc-dot" /><div>
                  <strong className="svc-item-title"><EditableField id="nr-srv1-item4-title">{t('nr.srv1.item4.title')}</EditableField></strong>
                  <span className="svc-item-text"><EditableField id="nr-srv1-item4-text">{t('nr.srv1.item4.text')}</EditableField></span>
                </div></div>

                {/* 2. Detección de Gases */}
                <div className="svc-section-title">
                  <EditableField id="nr-srv2-title">{t('nr.srv2.title')}</EditableField>
                </div>
                <div className="svc-item"><span className="svc-dot" /><div>
                  <strong className="svc-item-title"><EditableField id="nr-srv2-item1-title">{t('nr.srv2.item1.title')}</EditableField></strong>
                  <span className="svc-item-text"><EditableField id="nr-srv2-item1-text">{t('nr.srv2.item1.text')}</EditableField></span>
                </div></div>
                <div className="svc-item"><span className="svc-dot" /><div>
                  <strong className="svc-item-title"><EditableField id="nr-srv2-item2-title">{t('nr.srv2.item2.title')}</EditableField></strong>
                  <span className="svc-item-text"><EditableField id="nr-srv2-item2-text">{t('nr.srv2.item2.text')}</EditableField></span>
                </div></div>
                <div className="svc-item" style={{ marginBottom: '1.75rem' }}><span className="svc-dot" /><div>
                  <strong className="svc-item-title"><EditableField id="nr-srv2-item3-title">{t('nr.srv2.item3.title')}</EditableField></strong>
                  <span className="svc-item-text"><EditableField id="nr-srv2-item3-text">{t('nr.srv2.item3.text')}</EditableField></span>
                </div></div>

                {/* 3. LSA & GMDSS */}
                <div className="svc-section-title">
                  <EditableField id="nr-srv3-title">{t('nr.srv3.title')}</EditableField>
                </div>
                <div className="svc-item"><span className="svc-dot" /><div>
                  <strong className="svc-item-title"><EditableField id="nr-srv3-item1-title">{t('nr.srv3.item1.title')}</EditableField></strong>
                  <span className="svc-item-text"><EditableField id="nr-srv3-item1-text">{t('nr.srv3.item1.text')}</EditableField></span>
                </div></div>
                <div className="svc-item"><span className="svc-dot" /><div>
                  <strong className="svc-item-title"><EditableField id="nr-srv3-item2-title">{t('nr.srv3.item2.title')}</EditableField></strong>
                  <span className="svc-item-text"><EditableField id="nr-srv3-item2-text">{t('nr.srv3.item2.text')}</EditableField></span>
                </div></div>
                <div className="svc-item"><span className="svc-dot" /><div>
                  <strong className="svc-item-title"><EditableField id="nr-srv3-item3-title">{t('nr.srv3.item3.title')}</EditableField></strong>
                  <span className="svc-item-text"><EditableField id="nr-srv3-item3-text">{t('nr.srv3.item3.text')}</EditableField></span>
                </div></div>
                <div className="svc-item" style={{ marginBottom: '1.75rem' }}><span className="svc-dot" /><div>
                  <strong className="svc-item-title"><EditableField id="nr-srv3-item4-title">{t('nr.srv3.item4.title')}</EditableField></strong>
                  <span className="svc-item-text"><EditableField id="nr-srv3-item4-text">{t('nr.srv3.item4.text')}</EditableField></span>
                </div></div>
              </div>

              {/* ── SUMINISTROS ── */}
              <div>
                <h2 style={{ fontFamily: 'var(--display)', fontSize: '1.6rem', color: 'var(--navy)', marginBottom: '1.25rem', letterSpacing: '.04em' }}>
                  <EditableField id="nr-sup-title">{t('nr.sup.title')}</EditableField>
                </h2>

                {/* 1. Equipamiento de Diseño */}
                <div className="svc-section-title">
                  <EditableField id="nr-sup1-title">{t('nr.sup1.title')}</EditableField>
                </div>
                <div className="svc-item"><span className="svc-dot" /><div>
                  <strong className="svc-item-title"><EditableField id="nr-sup1-item1-title">{t('nr.sup1.item1.title')}</EditableField></strong>
                  <span className="svc-item-text"><EditableField id="nr-sup1-item1-text">{t('nr.sup1.item1.text')}</EditableField></span>
                </div></div>
                <div className="svc-item" style={{ marginBottom: '1.75rem' }}><span className="svc-dot" /><div>
                  <strong className="svc-item-title"><EditableField id="nr-sup1-item2-title">{t('nr.sup1.item2.title')}</EditableField></strong>
                  <span className="svc-item-text"><EditableField id="nr-sup1-item2-text">{t('nr.sup1.item2.text')}</EditableField></span>
                </div></div>

                {/* 2. Seguridad Personal */}
                <div className="svc-section-title">
                  <EditableField id="nr-sup2-title">{t('nr.sup2.title')}</EditableField>
                </div>
                <div className="svc-item"><span className="svc-dot" /><div>
                  <strong className="svc-item-title"><EditableField id="nr-sup2-item1-title">{t('nr.sup2.item1.title')}</EditableField></strong>
                  <span className="svc-item-text"><EditableField id="nr-sup2-item1-text">{t('nr.sup2.item1.text')}</EditableField></span>
                </div></div>
                <div className="svc-item"><span className="svc-dot" /><div>
                  <strong className="svc-item-title"><EditableField id="nr-sup2-item2-title">{t('nr.sup2.item2.title')}</EditableField></strong>
                  <span className="svc-item-text"><EditableField id="nr-sup2-item2-text">{t('nr.sup2.item2.text')}</EditableField></span>
                </div></div>
                <div className="svc-item" style={{ marginBottom: '1.75rem' }}><span className="svc-dot" /><div>
                  <strong className="svc-item-title"><EditableField id="nr-sup2-item3-title">{t('nr.sup2.item3.title')}</EditableField></strong>
                  <span className="svc-item-text"><EditableField id="nr-sup2-item3-text">{t('nr.sup2.item3.text')}</EditableField></span>
                </div></div>

                {/* 3. Pirotecnia y Supervivencia */}
                <div className="svc-section-title">
                  <EditableField id="nr-sup3-title">{t('nr.sup3.title')}</EditableField>
                </div>
                <div className="svc-item"><span className="svc-dot" /><div>
                  <strong className="svc-item-title"><EditableField id="nr-sup3-item1-title">{t('nr.sup3.item1.title')}</EditableField></strong>
                  <span className="svc-item-text"><EditableField id="nr-sup3-item1-text">{t('nr.sup3.item1.text')}</EditableField></span>
                </div></div>
                <div className="svc-item" style={{ marginBottom: '1.75rem' }}><span className="svc-dot" /><div>
                  <strong className="svc-item-title"><EditableField id="nr-sup3-item2-title">{t('nr.sup3.item2.title')}</EditableField></strong>
                  <span className="svc-item-text"><EditableField id="nr-sup3-item2-text">{t('nr.sup3.item2.text')}</EditableField></span>
                </div></div>

                {/* ── 4. Soluciones Ecológicas ── */}
                <div className="svc-section-title">
                  <EditableField id="nr-sup4-title">{t('nr.sup4.title')}</EditableField>
                </div>
                <div className="svc-item"><span className="svc-dot" /><div>
                  <strong className="svc-item-title">
                    <EditableField id="nr-sup4-item1-title">{t('nr.sup4.item1.title')}</EditableField>
                  </strong>
                  <span className="svc-item-text">
                    <EditableField id="nr-sup4-item1-text">{t('nr.sup4.item1.text')}</EditableField>
                  </span>
                </div></div>
              </div>
            </div>

            {/* STICKY SIDEBAR */}
            <div className="svc-sticky">
              <div className="svc-cta-box">
                <div className="svc-cta-title">{t('nr.sidebar.cta.title')}</div>
                <p className="svc-cta-text">{t('nr.sidebar.cta.text')}</p>
                <Link href={lang === 'en' ? '/contact' : '/contacto'} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  {t('nr.sidebar.cta.btn')}
                </Link>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontFamily: 'var(--cond)', fontSize: '.65rem', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '1rem', paddingBottom: '.6rem', borderBottom: '2px solid var(--red)' }}>
                  {t('nr.sidebar.supply')}
                </div>
                <div className="svc-supply-grid">
                  {[
                    ['⛵', 'nr.supply.item1.title', 'nr.supply.item1.text'],
                    ['🛟', 'nr.supply.item2.title', 'nr.supply.item2.text'],
                    ['📡', 'nr.supply.item3.title', 'nr.supply.item3.text'],
                    ['🌿', 'nr.supply.item4.title', 'nr.supply.item4.text'],
                  ].map(([ic, tk, tx]) => (
                    <div key={tk} className="svc-supply-item">
                      <div className="svc-supply-icon">{ic}</div>
                      <div className="svc-supply-title">{t(tk)}</div>
                      <div className="svc-supply-text">{t(tx)}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="svc-badge-area">
                <div className="svc-badge-title">{t('nr.sidebar.norm')}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.35rem' }}>
                  <span className="aut-badge">{t('badge.iso9650')}</span>
                  <span className="aut-badge">SOLAS</span>
                  <span className="aut-badge">{t('badge.marina.mercante')}</span>
                  <span className="aut-badge gold">ISO 9001:2015</span>
                  <span className="aut-badge">ACR Electronics</span>
                  <span className="aut-badge">GMDSS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED SERVICES */}
      <section className="section-sm section-gray">
        <div className="container">
          <div className="overline red" style={{ marginBottom: '1.5rem' }}>{t('nr.related.title')}</div>
          <div className="related-grid">
            {[
              { h: '/servicios/oil-gas',              i: '⚙', tk: 'nav.oilGas',      dk: 'related.og.d' },
              { h: '/servicios/buques-mercantes',      i: '⚓', tk: 'nav.merchant',    dk: 'related.bm.d' },
              { h: '/servicios/industrial-comercial',  i: '🏭', tk: 'nav.industrial',  dk: 'related.ic.d' },
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
