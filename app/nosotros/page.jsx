// Copyright © 2026 Pelayo Garrido Martinez — devpelayogarrido@gmail.com
'use client'
import Link from 'next/link'
import EditableField from '@/components/EditableField'
import CMSLoader from '@/components/CMSLoader'
import { useTranslation } from '@/contexts/LangContext'

const PAGE = 'nosotros'

export default function NosotrosPage() {
  const t = useTranslation()

  const locations = [
    {
      flag: 'ESP', bg: 'var(--red)',
      nameKey: 'rg.loc.esp', hq: true, id: 'rg-esp',
      def: t('eje.esp.desc'),
      tags: ['Valencia', 'Algeciras', 'Barcelona'],
    },
    {
      flag: 'CNR', bg: '#1565C0',
      nameKey: 'rg.loc.cnr', hq: false, id: 'rg-cnr',
      def: t('eje.cnr.desc'),
      tags: ['Las Palmas', 'S/C de Tenerife'],
    },
    {
      flag: 'PAN', bg: '#0A5C36',
      nameKey: 'rg.loc.pan', hq: false, id: 'rg-pan',
      def: t('eje.pan.desc'),
      tags: ['Canal de Panamá', 'Ciudad de Panamá'],
    },
    {
      flag: 'USA', bg: '#B71C1C',
      nameKey: 'rg.loc.usa', hq: false, id: 'rg-usa',
      def: t('eje.usa.desc'),
      tags: ['Houston', 'Miami', 'Canadá'],
    },
  ]

  const pins = [
    { city: 'Valencia, España',           regionKey: 'rg.pin.hq',  hq: true },
    { city: 'Algeciras / Barcelona',       regionKey: 'rg.pin.med'           },
    { city: 'Las Palmas de Gran Canaria',  regionKey: 'rg.pin.atl'           },
    { city: 'Canal de Panamá',             regionKey: 'rg.pin.pan'           },
    { city: 'Houston · Miami · Canadá',    regionKey: 'rg.pin.usa'           },
  ]

  return (
    <>
      <CMSLoader pageKey={PAGE} />

      <div
        className="page-hero"
        style={{
          backgroundImage: "url('/images/Cabecera Quienes Somos.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(11,30,58,0.6)' }} />
        <div className="container">
          <div className="ph-inner">
            <div className="breadcrumb">
              <Link href="/">{t('page.home')}</Link> ›{' '}
              <span style={{ color: 'var(--gold)' }}>{t('nav.about')}</span>
            </div>
            <h1 className="page-title">
              <EditableField id="nos-title">{t('nos.title')}</EditableField>
            </h1>
            <p className="page-sub">
              <EditableField id="nos-sub">{t('nos.sub')}</EditableField>
            </p>
          </div>
        </div>
      </div>

      {/* TRAYECTORIA + LOGÍSTICA */}
      <section className="section"><div className="container">
        <div className="nos-two-col">
          <div>
            <div className="overline" id="trayectoria">{t('nos.overline1')}</div>
            <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(2rem,4vw,3rem)', color: 'var(--navy)', margin: '.75rem 0', letterSpacing: '.04em' }}>
              <EditableField id="nos-h1">{t('nos.h1')}</EditableField>
            </h2>
            <div style={{ width: '3rem', height: '2px', background: 'var(--red)', margin: '1.5rem 0' }} />
            <EditableField id="nos-p1" tag="p" block style={{ fontSize: '1.05rem', color: 'var(--muted)', lineHeight: 1.85, marginBottom: '1.5rem' }}>
              {t('nos.p1')}
            </EditableField>
            <EditableField id="nos-p2" tag="p" block style={{ fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.85, marginBottom: '1.5rem' }}>
              {t('nos.p2')}
            </EditableField>
            <blockquote style={{ borderLeft: '3px solid var(--red)', paddingLeft: '1.4rem', margin: '1.75rem 0' }}>
              <EditableField id="nos-quote" tag="p" style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--navy)', lineHeight: 1.65 }}>
                {t('nos.quote')}
              </EditableField>
            </blockquote>
          </div>

          <div>
            <div className="overline">{t('nos.overline2')}</div>
            <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(2rem,4vw,3rem)', color: 'var(--navy)', margin: '.75rem 0', letterSpacing: '.04em' }}>
              <EditableField id="nos-log-title">{t('nos.log.title')}</EditableField>
            </h2>
            <div style={{ width: '3rem', height: '2px', background: 'var(--red)', margin: '1.5rem 0' }} />
            <div className="about-features">
              {[
                ['nos-log1-t', 'nos.log1.t', 'nos-log1-d', 'nos.log1.d'],
                ['nos-log2-t', 'nos.log2.t', 'nos-log2-d', 'nos.log2.d'],
                ['nos-log3-t', 'nos.log3.t', 'nos-log3-d', 'nos.log3.d'],
              ].map(([tId, tKey, dId, dKey], i) => (
                <div key={tId} className="af-item">
                  <div className="af-num">{i + 1}</div>
                  <div>
                    <div className="af-title"><EditableField id={tId}>{t(tKey)}</EditableField></div>
                    <div className="af-text"><EditableField id={dId}>{t(dKey)}</EditableField></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div></section>

      {/* PROPUESTA DE VALOR */}
      <section className="section section-gray"><div className="container">
        <div style={{ textAlign: 'center', maxWidth: 620, margin: '0 auto 3.5rem' }}>
          <div className="overline" style={{ justifyContent: 'center' }}>{t('nos.overline3')}</div>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(2rem,4vw,3rem)', color: 'var(--navy)', marginTop: '.75rem', letterSpacing: '.04em', whiteSpace: 'pre-line' }}>
            <EditableField id="nos-pv-title">{t('nos.pv.title')}</EditableField>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }}>
          {[
            ['nos-pv1-t', 'nos.pv1.t', 'nos-pv1-d', 'nos.pv1.d'],
            ['nos-pv2-t', 'nos.pv2.t', 'nos-pv2-d', 'nos.pv2.d'],
            ['nos-pv3-t', 'nos.pv3.t', 'nos-pv3-d', 'nos.pv3.d'],
          ].map(([tId, tKey, dId, dKey]) => (
            <div key={tId} className="aut-card">
              <div className="aut-title"><EditableField id={tId}>{t(tKey)}</EditableField></div>
              <p className="aut-text"><EditableField id={dId}>{t(dKey)}</EditableField></p>
            </div>
          ))}
        </div>
      </div></section>

      {/* SECURITY AXIS */}
      <section className="section"><div className="container">
        <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 3.5rem' }}>
          <div className="overline" style={{ justifyContent: 'center' }}>{t('rg.overline')}</div>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(2rem,4vw,3rem)', color: 'var(--navy)', marginTop: '.75rem', letterSpacing: '.04em' }}>
            <EditableField id="nos-eje-h2">{t('rg.h2')}</EditableField>
          </h2>
          <EditableField id="nos-eje-lead" tag="p" block style={{ fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.8, marginTop: '.75rem' }}>
            {t('nos.eje.lead')}
          </EditableField>
        </div>

        <div className="eje-split">
          <div>
            <div className="eje-list">
              {locations.map(loc => (
                <div key={loc.flag} className="eje-row">
                  <div className="eje-flag" style={{ background: loc.bg }}>{loc.flag}</div>
                  <div className="eje-body">
                    <div className="eje-name">
                      {t(loc.nameKey)}
                      {loc.hq && <span className="eje-hq">{t('rg.hq')}</span>}
                    </div>
                    <div className="eje-desc"><EditableField id={loc.id}>{loc.def}</EditableField></div>
                    <div className="eje-tags">{loc.tags.map(tag => <span key={tag} className="eje-tag">{tag}</span>)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="eje-map">
              <div className="eje-map-dots" />
              <div style={{ fontFamily: 'var(--cond)', fontSize: '.6rem', fontWeight: 700, letterSpacing: '.2em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '1rem', position: 'relative', zIndex: 2 }}>
                {t('rg.mapLabel')}
              </div>
              <div className="eje-pins">
                {pins.map(p => (
                  <div key={p.city} className="eje-pin">
                    <span className={`pin-dot${p.hq ? ' hq' : ''}`} />
                    <div>
                      <div className="pin-city">{p.city}</div>
                      <div className="pin-region">{t(p.regionKey)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div></section>
    </>
  )
}
