// Copyright © 2026 Pelayo Garrido Martinez — devpelayogarrido@gmail.com
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import EditableField from '@/components/EditableField'
import CMSLoader from '@/components/CMSLoader'
import { useTranslation } from '@/contexts/LangContext'

const PAGE = 'contacto'

const CONTACTS = [
  {
    id: 'hq',
    name: 'EXTINVAL HQ: Valencia',
    address: 'Carrer Serra d\'Espadà, 28, P. Ind. La LLoma\nAldaia, Valencia 46960, ES',
    phones: ['+34 96 367 40 53'],
    email: 'service@extinval.com',
    note: true,
    lat: 39.4607, lng: -0.4645,
  },
  {
    id: 'canarias',
    name: 'EXTINVAL Canarias',
    address: 'Calle de la Hoya del Rosario, 155, A\nLas Palmas de Gran Canaria, 35016, ES',
    phones: ['+34 656 908 793'],
    email: 'info@extinval-canaryislands.com',
    lat: 28.1248, lng: -15.4300,
  },
  {
    id: 'almeria',
    name: 'EXTINVAL Almería',
    address: 'C. Carbón, 2, 04009 Almería, ES',
    phones: ['+34 629 156 781'],
    email: 'extinval-almeria@extinval.com',
    lat: 36.8381, lng: -2.4597,
  },
  {
    id: 'panama',
    name: 'EXTINVAL Panama',
    address: null,
    phones: ['507 600 709 31'],
    email: null,
    lat: 8.9936, lng: -79.5197,
  },
  {
    id: 'canada',
    name: 'EXTINVAL Canada',
    address: null,
    phones: ['507 600 709 31'],
    email: 'info@extinval-canada.com',
    lat: 43.6532, lng: -79.3832,
  },
  {
    id: 'usa-ca',
    name: 'EXTINVAL USA — California',
    address: '1721 Pearl St, Alameda\nCalifornia 94501, US',
    phones: ['+1 281 851 2886', '+1 305 804 2565'],
    email: 'r.pavia@extinvalusa.com',
    lat: 37.7799, lng: -122.2712,
  },
  {
    id: 'usa-la',
    name: 'EXTINVAL USA — Louisiana',
    address: '161 James Dr W, Saint Rose\nLouisiana 70087, US',
    phones: ['+1 281 851 2886', '+1 305 804 2565'],
    email: 'r.pavia@extinvalusa.com',
    lat: 29.9363, lng: -90.3154,
  },
  {
    id: 'usa-nj',
    name: 'EXTINVAL USA — New Jersey',
    address: '212 Davis Ave 1, Harrison\nNew Jersey 07029, US',
    phones: ['+1 281 851 2886', '+1 305 804 2565'],
    email: 'r.pavia@extinvalusa.com',
    lat: 40.7459, lng: -74.1551,
  },
]

export default function ContactoPage() {
  const t = useTranslation()
  const [status, setStatus] = useState('idle')
  const [countries, setCountries] = useState([])
  const [selectedId, setSelectedId] = useState('hq')

  const selected = CONTACTS.find(c => c.id === selectedId)
  const mapSrc = `https://maps.google.com/maps?q=${selected.lat},${selected.lng}&z=5&output=embed`

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name')
      .then(r => r.json())
      .then(data => setCountries(data.map(c => c.name.common).sort((a, b) => a.localeCompare(b))))
      .catch(() => setCountries([
        'Spain', 'Panama', 'United States', 'Canada', 'United Kingdom',
        'Germany', 'France', 'Italy', 'Netherlands', 'Norway',
        'Greece', 'Cyprus', 'Malta', 'Bahamas', 'Liberia',
        'Marshall Islands', 'Singapore', 'Japan', 'China', 'South Korea',
      ]))
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    const fd = new FormData(e.target)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(fd)),
      })
    } catch {}
    setStatus('done')
  }

  return (
    <>
      <CMSLoader pageKey={PAGE} />

      <div className="page-hero" style={{ backgroundImage: "url('/images/contacto-background.png')", backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(11,30,58,0.6)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="ph-inner">
            <div className="breadcrumb">
              <Link href="/">{t('page.home')}</Link> ›{' '}
              <span style={{ color: 'var(--gold)' }}>{t('ct.breadcrumb')}</span>
            </div>
            <h1 className="page-title"><EditableField id="ct-title">{t('ct.title')}</EditableField></h1>
            <p className="page-sub"><EditableField id="ct-sub">{t('ct.sub')}</EditableField></p>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* FORMULARIO */}
            <div>
              <div className="overline light" style={{ color: 'var(--gold)' }}>{t('ct.form.overline')}</div>
              <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', color: 'var(--navy)', margin: '.75rem 0 2rem', letterSpacing: '.04em' }}>
                <EditableField id="ct-form-title">{t('ct.form.title')}</EditableField>
              </h2>

              {status === 'done' ? (
                <div style={{ padding: '2rem', background: '#ECFDF5', border: '1px solid #10B981', color: '#065F46', lineHeight: 1.7 }}>
                  <strong style={{ display: 'block', marginBottom: '.35rem' }}>{t('ct.form.ok')}</strong>
                  {t('ct.form.ok.body')}
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.7rem', marginBottom: '.7rem' }}>
                    <input style={{ padding: '.78rem 1rem', border: '1.5px solid var(--border)', fontSize: '.87rem', outline: 'none', fontFamily: 'inherit' }} name="name" placeholder={t('ct.form.name')} required />
                    <input style={{ padding: '.78rem 1rem', border: '1.5px solid var(--border)', fontSize: '.87rem', outline: 'none', fontFamily: 'inherit' }} name="email" type="email" placeholder={t('ct.form.email')} required />
                  </div>
                  <select style={{ width: '100%', padding: '.78rem 1rem', border: '1.5px solid var(--border)', fontSize: '.87rem', outline: 'none', marginBottom: '.7rem', fontFamily: 'inherit', background: '#fff' }} name="location" required>
                    <option value="">{t('contact.form.location')}</option>
                    {countries.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <select style={{ width: '100%', padding: '.78rem 1rem', border: '1.5px solid var(--border)', fontSize: '.87rem', outline: 'none', marginBottom: '.7rem', fontFamily: 'inherit', background: '#fff' }} name="division" required>
                    <option value="">{t('ct.form.div')}</option>
                    <option>{t('ct.form.div.opt1')}</option>
                    <option>{t('ct.form.div.opt2')}</option>
                    <option>{t('ct.form.div.opt3')}</option>
                    <option>{t('ct.form.div.opt4')}</option>
                    <option>{t('ct.form.div.opt5')}</option>
                  </select>
                  <textarea style={{ width: '100%', padding: '.78rem 1rem', border: '1.5px solid var(--border)', fontSize: '.87rem', outline: 'none', marginBottom: '.7rem', fontFamily: 'inherit', minHeight: 100, resize: 'vertical' }} name="message" placeholder={t('ct.form.msg')} required />
                  <button type="submit" disabled={status === 'loading'} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '.9rem' }}>
                    {status === 'loading' ? t('ct.form.sending') : t('ct.form.submit')}
                  </button>
                </form>
              )}
            </div>

            {/* INFORMACIÓN DE CONTACTO */}
            <div>
              <div style={{ background: 'var(--off)', border: '1px solid var(--border)', padding: '2rem', marginBottom: '1.5rem' }}>
                <div style={{ fontFamily: 'var(--cond)', fontSize: '.65rem', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '1.25rem' }}>
                  {t('ct.info.title')}
                </div>

                {/* HQ principal */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--gold)' }}>📍</span>
                  <div>
                    <div style={{ fontFamily: 'var(--cond)', fontSize: '.62rem', fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '.15rem' }}>{t('ct.hq')}</div>
                    <EditableField id="ct-addr" style={{ fontSize: '.87rem', color: 'var(--text)' }}>
                      Carrer Serra d&apos;Espadà, 28, P. Ind. La LLoma<br />Aldaia, Valencia 46960, ES
                    </EditableField>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--gold)' }}>📞</span>
                  <div>
                    <div style={{ fontFamily: 'var(--cond)', fontSize: '.62rem', fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '.15rem' }}>{t('ct.emerg')}</div>
                    <EditableField id="ct-phone" style={{ fontSize: '.87rem', color: 'var(--text)' }}>+34 96 367 40 53</EditableField>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--gold)' }}>✉</span>
                  <div>
                    <div style={{ fontFamily: 'var(--cond)', fontSize: '.62rem', fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '.15rem' }}>{t('ct.email')}</div>
                    <EditableField id="ct-email" style={{ fontSize: '.87rem', color: 'var(--text)' }}>service@extinval.com</EditableField>
                  </div>
                </div>
              </div>

              
            </div>
          </div>
        </div>
      </section>

      {/* ═══ OFICINAS + MAPA ═══ */}
      <section className="section section-gray">
        <div className="container">
          <div className="offices-map-grid">
            {/* Izquierda — tarjetas */}
            <div>
              <div className="overline red" style={{ marginBottom: '1.5rem' }}>{t('ct.offices.title')}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem', overflowY: 'auto', maxHeight: 560 }}>
                {CONTACTS.map(c => (
                  <div
                    key={c.id}
                    onClick={() => setSelectedId(c.id)}
                    style={{
                      background: '#fff', border: `1.5px solid ${selectedId === c.id ? 'var(--red)' : 'var(--border)'}`,
                      padding: '1.25rem', position: 'relative', cursor: 'pointer',
                      transition: 'border-color .2s',
                    }}
                  >
                    {c.note && (
                      <span style={{ position: 'absolute', top: '.65rem', right: '.65rem', background: 'var(--navy)', color: '#fff', fontFamily: 'var(--cond)', fontSize: '.52rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', padding: '.18rem .45rem' }}>
                        {t('ct.offices.note')}
                      </span>
                    )}
                    <div style={{ fontFamily: 'var(--cond)', fontWeight: 800, fontSize: '.75rem', letterSpacing: '.1em', color: selectedId === c.id ? 'var(--red)' : 'var(--navy)', textTransform: 'uppercase', marginBottom: '.65rem', transition: 'color .2s' }}>{c.name}</div>
                    {c.address && (
                      <div style={{ fontSize: '.82rem', color: 'var(--muted)', marginBottom: '.45rem', whiteSpace: 'pre-line', lineHeight: 1.6 }}>{c.address}</div>
                    )}
                    {c.phones.map(ph => (
                      <div key={ph} style={{ display: 'flex', gap: '.45rem', alignItems: 'center', marginBottom: '.25rem' }}>
                        <span style={{ color: 'var(--gold)', fontSize: '.8rem' }}>📞</span>
                        <span style={{ fontSize: '.82rem', color: 'var(--text)', fontWeight: 600 }}>{ph}</span>
                      </div>
                    ))}
                    {c.email && (
                      <div style={{ display: 'flex', gap: '.45rem', alignItems: 'center', marginTop: '.25rem' }}>
                        <span style={{ color: 'var(--gold)', fontSize: '.8rem' }}>✉</span>
                        <a href={`mailto:${c.email}`} onClick={e => e.stopPropagation()} style={{ fontSize: '.8rem', color: 'var(--red)', textDecoration: 'none' }}>{c.email}</a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Derecha — mapa */}
            <div style={{ position: 'sticky', top: '2rem' }}>
              <iframe
                key={mapSrc}
                src={mapSrc}
                width="100%"
                height="560"
                style={{ border: 'none', display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
