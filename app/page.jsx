// Copyright © 2026 Pelayo Garrido Martinez — devpelayogarrido@gmail.com
'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import EditableField from '@/components/EditableField'
import CMSLoader from '@/components/CMSLoader'
import { useLang, useTranslation } from '@/contexts/LangContext'

const PAGE = 'home'

export default function HomePage() {
  const t = useTranslation()
  const { lang } = useLang()
  const [slide, setSlide] = useState(0)
  const TOTAL = 4

  useEffect(() => {
    const timer = setInterval(() => setSlide(s => (s + 1) % TOTAL), 5500)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return
      document.querySelectorAll('[data-count]').forEach(el => {
        const target = +el.dataset.count, dur = 1400
        let start = null
        const step = ts => {
          if (!start) start = ts
          const p = Math.min((ts - start) / dur, 1)
          el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)))
          if (p < 1) requestAnimationFrame(step); else el.textContent = target
        }
        requestAnimationFrame(step)
      })
      obs.disconnect()
    }, { threshold: .3 })
    const el = document.getElementById('cifras-trigger')
    if (el) obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const ro = new IntersectionObserver(entries =>
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target) }
      }),
      { threshold: .08, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal').forEach(el => ro.observe(el))
    return () => ro.disconnect()
  }, [])

  // ── 4 SLIDES — uno por división ──────────────────────────────────────────
  const slides = [
    {
      division: t('slide1.division'),
      divHref:  '/servicios/oil-gas',
      claim:    [t('slide1.claim1'), t('slide1.claim2')],
      emIdx:    1,
      lead:     t('slide1.lead'),
      image:    '/images/Cabecera_Oil & Gas.jpg',
    },
    {
      division: t('slide2.division'),
      divHref:  '/servicios/buques-mercantes',
      claim:    [t('slide2.claim1'), t('slide2.claim2'), t('slide2.claim3')],
      emIdx:    2,
      lead:     t('slide2.lead'),
      image:    '/images/Cabecera_Home_Mercantes2.jpg',
    },
    {
      division: t('slide3.division'),
      divHref:  '/servicios/nautica-recreo',
      claim:    [t('slide3.claim1'), t('slide3.claim2'), t('slide3.claim3')],
      subtitle: t('slide3.subtitle'),
      emIdx:    2,
      lead:     t('slide3.lead'),
      image:    '/images/Cabecera_Home_Nautica.jpg',
    },
    {
      division: t('slide4.division'),
      divHref:  '/servicios/industrial-comercial',
      claim:    [t('slide4.claim1'), t('slide4.claim2'), t('slide4.claim3')],
      emIdx:    2,
      lead:     t('slide4.lead'),
      image:    '/images/Cabecera_Home_Industrial.jpg',
    },
  ]
  // ─────────────────────────────────────────────────────────────────────────

  const services = [
    { n:'01', image:'⚙',   titleKey:'srv1.title', subKey:'srv1.sub', textKey:'srv1.text', ctaKey:'srv1.cta', href: lang === 'en' ? '/services/oil-gas'               : '/servicios/oil-gas',              cmsId:'1' },
    { n:'02', image:'⚓',    titleKey:'srv2.title', subKey:'srv2.sub', textKey:'srv2.text', ctaKey:'srv2.cta', href: lang === 'en' ? '/services/merchant-vessels'      : '/servicios/buques-mercantes',     cmsId:'2' },
    { n:'03', image:'⛵', titleKey:'srv3.title', subKey:'srv3.sub', textKey:'srv3.text', ctaKey:'srv3.cta', href: lang === 'en' ? '/services/recreational-maritime'  : '/servicios/nautica-recreo',       cmsId:'3' },
    { n:'04', image:'🏭',     titleKey:'srv4.title', subKey:'srv4.sub', textKey:'srv4.text', ctaKey:'srv4.cta', href: lang === 'en' ? '/services/industrial-commercial' : '/servicios/industrial-comercial', cmsId:'4' },
  ]

  const ptRow1 = [
    { cat:t('pt1.cat'), name:t('pt1.name'), desc:t('pt1.desc'), icon:'🔥', image:'/images/1. Sistemas fijos CO2-2.jpg',                         large:true  },
    { cat:t('pt2.cat'), name:t('pt2.name'), desc:t('pt2.desc'), icon:'⚓', image:'/images/2. Botes & Pescantes Caida Libre.jpeg',                large:false },
    { cat:t('pt3.cat'), name:t('pt3.name'), desc:t('pt3.desc'), icon:'🧪', image:'/images/3. Calibracion Gases H₂S _ LEL.jpg',                  large:false },
  ]

  const ptRow2 = [
    { cat:t('pt4.cat'), name:t('pt4.name'), desc:t('pt4.desc'), icon:'🛟', image:'/images/4. Balsas Iso.jpg'                                              },
    { cat:t('pt5.cat'), name:t('pt5.name'), desc:t('pt5.desc'), icon:'📡', image:'/images/5. Epirb-AIS.jpg'                                               },
    { cat:t('pt6.cat'), name:t('pt6.name'), desc:t('pt6.desc'), icon:'🏭', image:'/images/6. Aerosoles y deteccion wireless Ext Ecologica.jpg'             },
    { cat:t('pt7.cat'), name:t('pt7.name'), desc:t('pt7.desc'), icon:'🔧', image:'/images/7. Stock estrategico.jpg'                                        },
  ]

  return (
    <>
      <CMSLoader pageKey={PAGE} />

      <style>{`
        .eje-split-custom {
          display: grid;
          grid-template-columns: 4fr 1.5fr;
          gap: 2rem;
          align-items: start;
        }
        @media (max-width: 1024px) {
          .eje-split-custom { grid-template-columns: 1fr; }
        }
        .about-split-custom {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        @media (max-width: 1024px) {
          .about-split-custom { grid-template-columns: 1fr; gap: 3rem; }
        }

        /* Etiqueta de división en cada slide */
        .slide-division-tag {
          display: inline-flex;
          align-items: center;
          gap: .65rem;
          margin-bottom: 2rem;
        }
        .slide-division-line {
          width: 2rem;
          height: 2px;
          background: var(--red);
          flex-shrink: 0;
        }
        .slide-division-name {
          font-family: var(--cond);
          font-size: .9rem;
          font-weight: 700;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: var(--gold);
        }

        /* Subtítulo de apoyo (solo Náutica) */
        .slide-subtitle {
          font-family: var(--cond);
          font-size: .95rem;
          font-weight: 600;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: rgba(255,255,255,.5);
          margin-top: -.75rem;
          margin-bottom: 1.5rem;
        }

        /* Icono circular en las tarjetas de servicio */
        .sc-icon-circle {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: var(--off);
          border: 2px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          overflow: hidden;
          flex-shrink: 0;
        }
        .sc-icon-circle img {
          width: 48px;
          height: 48px;
          object-fit: contain;
        }
        .srv-card:hover .sc-icon-circle {
          background: rgba(255,255,255,.08);
          border-color: rgba(255,255,255,.2);
        }

        /* Mapa Eje de Seguridad — responsive sin recorte */
        .eje-map-img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: contain;
        }
      `}</style>

      {/* ═══ HERO — 4 slides, uno por división ═══ */}
      <section className="hero">
        <div className="hero-grid-bg" />
        <div className="hero-circle" />

        <div className="hero-body" style={{ minHeight: '88vh', position: 'relative' }}>
          {slides.map((sl, i) => (
            <div
              key={i}
              className={`hero-slide${slide === i ? ' active' : ''}`}
              style={{
                backgroundImage: `url('${sl.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(168deg, rgba(11,30,58,.82) 40%, rgba(11,30,58,.55) 100%)',
                pointerEvents: 'none',
              }} />

              <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>
                <div className="slide-division-tag">
                  <span className="slide-division-line" />
                  <span className="slide-division-name">{sl.division}</span>
                  <span className="slide-division-line" />
                </div>

                <h1 className="hero-title">
                  {sl.claim.map((line, li) => (
                    <span key={li}>
                      {li === sl.emIdx ? <em>{line}</em> : line}
                      {li < sl.claim.length - 1 && <br />}
                    </span>
                  ))}
                </h1>

                {sl.subtitle && (
                  <div className="slide-subtitle">{sl.subtitle}</div>
                )}

                <p className="hero-lead" style={{ marginTop: sl.subtitle ? '.5rem' : undefined }}>
                  {sl.lead}
                </p>
              </div>
            </div>
          ))}

          <div className="hero-nav">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`hero-dot${slide === i ? ' active' : ''}`}
                onClick={() => setSlide(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DIVISIONES ═══ */}
      <section className="section services-strip" id="divisiones">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }} className="reveal">
            <div className="overline" style={{ justifyContent: 'center' }}>{t('div.overline')}</div>
            <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(2rem,4vw,3.2rem)', color: 'var(--navy)', marginTop: '.75rem', letterSpacing: '.04em' }}>
              <EditableField id="div-title">{t('div.title')}</EditableField>
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--muted)', maxWidth: 520, margin: '.75rem auto 0', lineHeight: 1.8 }}>
              <EditableField id="div-lead">{t('div.lead')}</EditableField>
            </p>
          </div>
        </div>
        <div className="container-wide">
          <div className="srv-grid reveal">
            {services.map(s => (
              <div key={s.n} className="srv-card" onClick={() => window.location.href = s.href} style={{ cursor: 'pointer' }}>
                <div className="sc-num">{s.n}</div>
                {/* 1.1 — Icono dentro del círculo original */}
                <div className="sc-icon">
                  {s.image.startsWith('/') ? <img src={s.image} alt={t(s.titleKey)} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} /> : <span style={{ fontSize: '1.6rem', lineHeight: 1 }}>{s.image}</span>}
                </div>
                <div className="sc-title"><EditableField id={`srv${s.cmsId}-title`}>{t(s.titleKey)}</EditableField></div>
                <div className="sc-sub">{t(s.subKey)}</div>
                <p className="sc-text"><EditableField id={`srv${s.cmsId}-text`}>{t(s.textKey)}</EditableField></p>
                <Link href={s.href} className="sc-link" onClick={e => e.stopPropagation()}>{t(s.ctaKey)} <span>→</span></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CIFRAS ═══ */}
      <section className="section cifras-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }} className="reveal">
            <div className="overline gold" style={{ justifyContent: 'center' }}>{t('cifras.overline')}</div>
            <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(2rem,4vw,3.2rem)', color: '#fff', marginTop: '.75rem', letterSpacing: '.04em' }}>
              <EditableField id="cifras-title">{t('cifras.title')}</EditableField>
            </h2>
          </div>
          <div className="cifras-grid reveal" id="cifras-trigger">
            {[
              { count: 40, suffix: '+', key: 'cifra1' },
              { count: 4,  suffix: '',  key: 'cifra2' },
              { count: 5,  suffix: '',  key: 'cifra3' },
              { count: null, special: true, key: 'cifra4' },
            ].map((c, i) => (
              <div key={i} className="cifra-item">
                <div className="cifra-val">
                  {c.special ? <>24<span className="accent">/7</span></> : <><span data-count={c.count}>0</span><span className="accent">{c.suffix}</span></>}
                </div>
                <div className="cifra-label"><EditableField id={`cifra${i+1}-label`}>{t(c.key)}</EditableField></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EJE DE SEGURIDAD — 1.2 mapa con versión ES/EN ═══ */}
      <section className="section section-gray" id="red-global">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="reveal">
            <div className="overline" style={{ justifyContent: 'center' }}>{t('eje.overline')}</div>
            <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(2rem,4vw,3.2rem)', color: 'var(--navy)', marginTop: '.75rem', letterSpacing: '.04em' }}>
              <EditableField id="eje-title">{t('eje.title')}</EditableField>
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--muted)', maxWidth: 560, margin: '.75rem auto 0', lineHeight: 1.8 }}>
              <EditableField id="eje-lead">{t('eje.lead')}</EditableField>
            </p>
          </div>
          <div className="eje-split-custom">
            <div className="reveal">
              {/* 1.2 — Mapa según idioma, sin recorte */}
              <img
                key={lang}
                src={'/images/mapa_azul.jpg'}
                alt={lang === 'en' ? 'Extinval Global Network — Security Axis' : 'Red Global Extinval — Eje de Seguridad'}
                className="eje-map-img"
              />
            </div>
            <div className="reveal d2">
              <div className="eje-map" style={{ padding: '1.75rem' }}>
                <div className="eje-map-dots" />
                <div style={{ fontFamily: 'var(--cond)', fontSize: '.6rem', fontWeight: 700, letterSpacing: '.2em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '1rem', position: 'relative', zIndex: 2 }}>
                  {t('eje.mapLabel')}
                </div>
                <div className="eje-pins">
                  {[
                    { city: 'Valencia, España',          region: t('rg.pin.hq'),  hq: true  },
                    { city: 'Algeciras / Barcelona',      region: t('rg.pin.med')            },
                    { city: 'Las Palmas de G.C.',         region: t('rg.pin.atl')            },
                    { city: 'Canal de Panamá',            region: t('rg.pin.pan')            },
                    { city: 'Houston · Canadá',           region: t('rg.pin.usa')            },
                  ].map(p => (
                    <div key={p.city} className="eje-pin">
                      <span className={`pin-dot${p.hq ? ' hq' : ''}`} />
                      <div>
                        <div className="pin-city">{p.city}</div>
                        <div className="pin-region">{p.region}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TRAYECTORIA & MISIÓN ═══ */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }} className="reveal">
            <div className="overline" style={{ justifyContent: 'center' }}>{t('about.overline')}</div>
            <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(2.2rem,4.5vw,3.5rem)', color: 'var(--navy)', marginTop: '.75rem', letterSpacing: '.04em' }}>
              <EditableField id="about-title">{t('about.title')}</EditableField>
            </h2>
          </div>
          <div className="about-split-custom">
            <div className="reveal">
              <img
                src="/images/Cabecera_Home_Mercantes5.jpg"
                alt="Extinval Group — Trayectoria y Misión"
                style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div className="reveal d2">
              <p style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.5, marginBottom: '2rem' }}>
                <EditableField id="about-lead">{t('about.lead')}</EditableField>
              </p>
              <div style={{ width: '3rem', height: '2px', background: 'var(--red)', marginBottom: '1.75rem' }} />
              <blockquote style={{ borderLeft: '3px solid var(--red)', paddingLeft: '1.4rem', marginBottom: '1.5rem' }}>
                <EditableField id="about-quote" tag="p" style={{ fontSize: '.97rem', fontWeight: 600, color: 'var(--navy)', lineHeight: 1.65 }}>
                  {t('about.quote')}
                </EditableField>
              </blockquote>
              <p style={{ fontSize: '.9rem', color: 'var(--muted)', lineHeight: 1.8, marginBottom: '2.25rem' }}>
                <EditableField id="about-body">{t('about.body')}</EditableField>
              </p>
              <Link href={lang === 'en' ? '/contact' : '/contacto'} className="btn btn-primary">{t('about.cta2')}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PORTFOLIO — 7 recuadros ═══ */}
      <section className="section-sm" style={{ background: 'var(--off)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap', marginBottom: '2.5rem' }} className="reveal">
            <div>
              <div className="overline red">{t('pt.overline')}</div>
              <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(2rem,4vw,3rem)', color: 'var(--navy)', marginTop: '.6rem', letterSpacing: '.04em' }}>
                <EditableField id="pt-title">{t('pt.title')}</EditableField>
              </h2>
            </div>
            {/* 1.3 — CTA fondo rojo, texto blanco */}
            <Link
              href={lang === 'en' ? '/contact' : '/contacto'}
              className="btn"
              style={{ flexShrink: 0, background: 'var(--red)', color: '#fff', border: 'none' }}
            >
              {t('pt.cta')}
            </Link>
          </div>
        </div>
        <div className="container-wide">
          <div className="pt-grid reveal">
            {ptRow1.map(item => (
              <div key={item.cat} className={`pt-item${item.large ? ' pt-item-lg' : ''}`}>
                <div className="pt-bg" style={{ backgroundImage: `url('${item.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div className="pt-icon">{item.icon}</div>
                <div className="pt-overlay" />
                <div className="pt-content">
                  <div className="pt-cat">{item.cat}</div>
                  <div className="pt-name">{item.name}</div>
                  <div className="pt-desc">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-grid-2 reveal d1">
            {ptRow2.map(item => (
              <div key={item.cat} className="pt-item">
                <div className="pt-bg" style={{ backgroundImage: `url('${item.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div className="pt-icon">{item.icon}</div>
                <div className="pt-overlay" />
                <div className="pt-content">
                  <div className="pt-cat">{item.cat}</div>
                  <div className="pt-name">{item.name}</div>
                  <div className="pt-desc">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ AUTORIDAD ═══ */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 580, margin: '0 auto 3.5rem' }} className="reveal">
            <div className="overline" style={{ justifyContent: 'center' }}>{t('aut.overline')}</div>
            <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(2rem,4vw,3rem)', color: 'var(--navy)', marginTop: '.75rem', letterSpacing: '.04em' }}>
              <EditableField id="aut-title">{t('aut.title')}</EditableField>
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--muted)', marginTop: '.75rem', lineHeight: 1.8 }}>
              <EditableField id="aut-lead">{t('aut.lead')}</EditableField>
            </p>
          </div>
          <div className="aut-grid reveal">
            {[
              { icon: '🏅', titleId: 'aut1-title', titleKey: 'aut1.title', sub: 'aut1.sub', badges: ['DNV', "Lloyd's Register", 'BV', 'ABS', 'RINA'],                  textId: 'aut1-text', textKey: 'aut1.text' },
              { icon: '🏴', titleId: 'aut2-title', titleKey: 'aut2.title', sub: 'aut2.sub', badges: ['Panamá', 'Liberia', 'Bahamas', 'Islas Marshall', 'España/UE'],     textId: 'aut2-text', textKey: 'aut2.text' },
              { icon: '🔧', titleId: 'aut3-title', titleKey: 'aut3.title', sub: 'aut3.sub', badges: ['Hatecke', 'Global Davit', 'Viking', 'Zodiac', 'ACR Electronics'], textId: 'aut3-text', textKey: 'aut3.text' },
            ].map(c => (
              <div key={c.titleId} className="aut-card">
                <span className="aut-icon">{c.icon}</span>
                <div className="aut-title"><EditableField id={c.titleId}>{t(c.titleKey)}</EditableField></div>
                <div className="aut-sub">{t(c.sub)}</div>
                <div className="aut-badges">{c.badges.map(b => <span key={b} className="aut-badge">{b}</span>)}</div>
                <p className="aut-text"><EditableField id={c.textId}>{t(c.textKey)}</EditableField></p>
              </div>
            ))}
          </div>
          <div className="iso-strip reveal">
            <div style={{ fontSize: '2.2rem' }}>✅</div>
            <div>
              <div className="iso-title">ISO 9001:2015</div>
              <div className="iso-sub">{t('iso.sub')}</div>
            </div>
            <p className="iso-text"><EditableField id="iso-text">{t('iso.text')}</EditableField></p>
            <Link href={lang === 'en' ? '/authority' : '/autoridad'} className="btn btn-navy btn-sm" style={{ flexShrink: 0 }}>{t('iso.cta')}</Link>
          </div>
        </div>
      </section>

      {/* ═══ PARTNERS — 1.6 añadir FirePro ═══ */}
      <div className="partners-bar" style={{ padding: '5.5rem 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--off)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ fontFamily: 'var(--cond)', fontSize: 'clamp(1.2rem,2.5vw,1.7rem)', fontWeight: 700, letterSpacing: '.18em', color: 'var(--navy)', textTransform: 'uppercase', marginBottom: '.5rem' }}>
              {t('partners.label')}
            </p>
            <div style={{ width: '3rem', height: '2px', background: 'var(--red)', margin: '.75rem auto 0' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.67rem', flexWrap: 'wrap' }}>
            {['HATECKE', 'GLOBAL DAVIT', 'VIKING', 'ZODIAC', 'ACR','FIREPRO'].map(p => (
              <span key={p} style={{ display: 'contents' }}>
                <span
                  style={{ fontFamily: 'var(--cond)', fontWeight: 900, fontSize: 'clamp(1.4rem,2.2vw,2rem)', color: 'var(--navy)', letterSpacing: '.06em', opacity: .75, transition: 'opacity .25s', cursor: 'default' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = 1}
                  onMouseLeave={e => e.currentTarget.style.opacity = .75}
                >{p}</span>
                <span style={{ width: 1, height: 40, background: 'var(--border)', flexShrink: 0 }} />
              </span>
            ))}
            
          </div>
        </div>
      </div>

      {/* ═══ CONTACTO ═══ */}
      <section className="section contact-dark" id="contacto">
        <div className="container">
          <div className="contact-grid">
            <div className="reveal">
              <div className="overline light">{t('contact.overline')}</div>
              <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(2rem,4vw,3rem)', color: '#fff', margin: '.75rem 0 .5rem', letterSpacing: '.04em' }}>
                <EditableField id="contact-title">{t('contact.title')}</EditableField>
              </h2>
              <p style={{ fontSize: '.92rem', color: 'rgba(255,255,255,.5)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                <EditableField id="contact-lead">{t('contact.lead')}</EditableField>
              </p>
              {[
                { icon: '📍', labelKey: 'contact.addr.label',  id: 'contact-addr',  def: 'Valencia, España · Algeciras · Barcelona · Canarias · Panamá · Houston · Canadá' },
                { icon: '📞', labelKey: 'contact.phone.label', id: 'contact-phone', def: '+34 96 367 40 53' },
                { icon: '✉',  labelKey: 'contact.email.label', id: 'contact-email', def: 'service@extinval.com' },
              ].map(item => (
                <div key={item.id} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                  <span style={{ color: 'var(--gold)', fontSize: '1rem' }}>{item.icon}</span>
                  <div>
                    <div style={{ fontFamily: 'var(--cond)', fontSize: '.62rem', fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,.32)', marginBottom: '.15rem' }}>
                      {t(item.labelKey)}
                    </div>
                    <EditableField id={item.id} style={{ fontSize: '.87rem', color: 'rgba(255,255,255,.6)' }}>{item.def}</EditableField>
                  </div>
                </div>
              ))}
            </div>
            <div className="reveal d2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

/* ═══ FORMULARIO ═══ */
function ContactForm() {
  const t = useTranslation()
  const [status, setStatus] = useState('idle')
  const [countries, setCountries] = useState([])

  // 1.4 — Cargar países para el campo Ubicación
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name')
      .then(r => r.json())
      .then(data => {
        const sorted = data
          .map(c => c.name.common)
          .sort((a, b) => a.localeCompare(b))
        setCountries(sorted)
      })
      .catch(() => {
        // Si falla la API, lista mínima de países más comunes en la industria
        setCountries([
          'Spain', 'Panama', 'United States', 'Canada', 'United Kingdom',
          'Germany', 'France', 'Italy', 'Netherlands', 'Norway',
          'Greece', 'Cyprus', 'Malta', 'Bahamas', 'Liberia',
          'Marshall Islands', 'Singapore', 'Japan', 'China', 'South Korea',
        ])
      })
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    const fd = new FormData(e.target)
    const data = Object.fromEntries(fd)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
    } catch {}
    setStatus('done')
  }

  if (status === 'done') {
    return (
      <div style={{ padding: '2rem', background: 'rgba(16,185,129,.1)', border: '1px solid rgba(16,185,129,.3)', color: '#6EE7B7', lineHeight: 1.7 }}>
        <strong style={{ display: 'block', marginBottom: '.35rem' }}>{t('contact.form.ok.title')}</strong>
        {t('contact.form.ok.body')}
      </div>
    )
  }

  const fieldStyle = { background: 'rgba(255,255,255,.18)', borderColor: 'rgba(255,255,255,.28)' }
  const selectStyle = { width: '100%', marginBottom: '.7rem', background: 'rgba(21,43,78,.9)', borderColor: 'rgba(255,255,255,.28)' }

  return (
    <form onSubmit={handleSubmit}>
      <div className="cf-section-title" style={{ color: '#fff' }}>{t('contact.form.title')}</div>
      <div className="cf-row">
        <input className="cf-input" name="name"  placeholder={t('contact.form.name')}  required style={fieldStyle} />
        <input className="cf-input" name="email" placeholder={t('contact.form.email')} required type="email" style={fieldStyle} />
      </div>
      <div className="cf-row">
        <input className="cf-input" name="phone"  placeholder={t('contact.form.phone')} type="tel" style={fieldStyle} />
        <input className="cf-input" name="vessel" placeholder={t('contact.form.vessel')} required style={fieldStyle} />
      </div>
      {/* 1.4 — Campo Ubicación obligatorio antes de División */}
      <select className="cf-select" name="location" required style={selectStyle}>
        <option value="">{t('contact.form.location')}</option>
        {countries.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <select className="cf-select" name="division" required style={selectStyle}>
        <option value="">{t('contact.form.div')}</option>
        {['opt1','opt2','opt3','opt4','opt5'].map(k => (
          <option key={k}>{t(`contact.div.${k}`)}</option>
        ))}
      </select>
      <textarea className="cf-textarea" name="message" placeholder={t('contact.form.msg')} required style={fieldStyle} />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn"
        style={{ width: '100%', justifyContent: 'center', padding: '.9rem', background: '#fff', color: 'var(--navy)', fontWeight: 700, border: 'none', cursor: status === 'loading' ? 'not-allowed' : 'pointer', opacity: status === 'loading' ? .7 : 1 }}
      >
        {status === 'loading' ? t('contact.form.sending') : t('contact.form.submit')}
      </button>
    </form>
  )
}
