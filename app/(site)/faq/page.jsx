// Copyright © 2026 Pelayo Garrido Martinez — devpelayogarrido@gmail.com
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useTranslation } from '@/contexts/LangContext'

export default function FAQPage() {
  const t = useTranslation()
  const [activeTab, setActiveTab] = useState('all')
  const [openItems, setOpenItems] = useState({})

  function toggleItem(id) {
    setOpenItems(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const tabs = [
    { key: 'all',       labelKey: 'faq.tab.all'      },
    { key: 'buques',    labelKey: 'faq.tab.buques'   },
    { key: 'oilgas',    labelKey: 'faq.tab.oilgas'   },
    { key: 'nautica',   labelKey: 'faq.tab.nautica'  },
    { key: 'industria', labelKey: 'faq.tab.industria'},
  ]

  const generalFAQs = [
    { id: 'gen-1', q: t('faq.gen.q1'), a: t('faq.gen.a1') },
    { id: 'gen-2', q: t('faq.gen.q2'), a: t('faq.gen.a2') },
    { id: 'gen-3', q: t('faq.gen.q3'), a: t('faq.gen.a3') },
  ]

  const sectorFAQs = {
    buques: [
      { id: 'buq-1', q: t('faq.buques.q1'), a: t('faq.buques.a1') },
      { id: 'buq-2', q: t('faq.buques.q2'), a: t('faq.buques.a2') },
      { id: 'buq-3', q: t('faq.buques.q3'), a: t('faq.buques.a3') },
      { id: 'buq-4', q: t('faq.buques.q4'), a: t('faq.buques.a4') },
    ],
    oilgas: [
      { id: 'oil-1', q: t('faq.oilgas.q1'), a: t('faq.oilgas.a1') },
      { id: 'oil-2', q: t('faq.oilgas.q2'), a: t('faq.oilgas.a2') },
      { id: 'oil-3', q: t('faq.oilgas.q3'), a: t('faq.oilgas.a3') },
      { id: 'oil-4', q: t('faq.oilgas.q4'), a: t('faq.oilgas.a4') },
    ],
    nautica: [
      { id: 'nau-1', q: t('faq.nautica.q1'), a: t('faq.nautica.a1') },
      { id: 'nau-2', q: t('faq.nautica.q2'), a: t('faq.nautica.a2') },
      { id: 'nau-3', q: t('faq.nautica.q3'), a: t('faq.nautica.a3') },
      { id: 'nau-4', q: t('faq.nautica.q4'), a: t('faq.nautica.a4') },
    ],
    industria: [
      { id: 'ind-1', q: t('faq.industrial.q1'), a: t('faq.industrial.a1') },
      { id: 'ind-2', q: t('faq.industrial.q2'), a: t('faq.industrial.a2') },
      { id: 'ind-3', q: t('faq.industrial.q3'), a: t('faq.industrial.a3') },
      { id: 'ind-4', q: t('faq.industrial.q4'), a: t('faq.industrial.a4') },
    ],
  }

  // Which sector items to show based on active tab
  const visibleSectors = activeTab === 'all'
    ? Object.keys(sectorFAQs)
    : [activeTab]

  const sectorLabels = {
    buques:    t('faq.tab.buques'),
    oilgas:    t('faq.tab.oilgas'),
    nautica:   t('faq.tab.nautica'),
    industria: t('faq.tab.industria'),
  }

  return (
    <>
      <style>{`
        .faq-tabs {
          display: flex;
          gap: .5rem;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
        }
        .faq-tab-btn {
          padding: .55rem 1.25rem;
          font-family: var(--cond);
          font-size: .72rem;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          border: 1.5px solid var(--border);
          background: #fff;
          color: var(--muted);
          cursor: pointer;
          transition: all .2s;
        }
        .faq-tab-btn:hover {
          border-color: var(--navy);
          color: var(--navy);
        }
        .faq-tab-btn.active {
          background: var(--navy);
          border-color: var(--navy);
          color: #fff;
        }
        .faq-section-label {
          font-family: var(--cond);
          font-size: .65rem;
          font-weight: 700;
          letter-spacing: .2em;
          text-transform: uppercase;
          color: var(--red);
          margin: 2rem 0 1rem;
          padding-bottom: .5rem;
          border-bottom: 2px solid var(--red);
        }
        .faq-item {
          border: 1px solid var(--border);
          margin-bottom: .5rem;
          background: #fff;
        }
        .faq-question {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.1rem 1.4rem;
          cursor: pointer;
          gap: 1rem;
          font-size: .92rem;
          font-weight: 600;
          color: var(--navy);
          line-height: 1.5;
          user-select: none;
        }
        .faq-question:hover {
          background: var(--off);
        }
        .faq-arrow {
          flex-shrink: 0;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--navy);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: .7rem;
          transition: transform .25s;
        }
        .faq-arrow.open {
          transform: rotate(180deg);
          background: var(--red);
        }
        .faq-answer {
          overflow: hidden;
          max-height: 0;
          transition: max-height .35s ease, padding .25s;
          padding: 0 1.4rem;
        }
        .faq-answer.open {
          max-height: 800px;
          padding: 0 1.4rem 1.25rem;
        }
        .faq-answer p {
          font-size: .9rem;
          color: var(--muted);
          line-height: 1.8;
          white-space: pre-line;
          margin: 0;
        }
        @media (max-width: 640px) {
          .faq-tabs { gap: .35rem; }
          .faq-tab-btn { font-size: .65rem; padding: .45rem 1rem; }
        }
      `}</style>

      {/* PAGE HERO */}
      <div className="page-hero" style={{ backgroundImage: "url('/images/Cabecera Recursos Blog.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(11,30,58,0.65)' }} />
        <div className="container">
          <div className="ph-inner">
            <div className="breadcrumb">
              <Link href="/">{t('page.home')}</Link> ›{' '}
              <span style={{ color: 'var(--gold)' }}>{t('faq.breadcrumb')}</span>
            </div>
            <h1 className="page-title">{t('faq.title')}</h1>
            <p className="page-sub">{t('faq.sub')}</p>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>

          {/* FILTER TABS */}
          <div className="faq-tabs">
            {tabs.map(tab => (
              <button
                key={tab.key}
                className={`faq-tab-btn${activeTab === tab.key ? ' active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {t(tab.labelKey)}
              </button>
            ))}
          </div>

          {/* GENERAL FAQs — always shown at top */}
          <div className="faq-section-label">{t('faq.tab.all')}</div>
          {generalFAQs.map(item => (
            <FAQItem key={item.id} item={item} open={!!openItems[item.id]} onToggle={() => toggleItem(item.id)} />
          ))}

          {/* SECTOR FAQs */}
          {visibleSectors.map(sector => (
            <div key={sector}>
              <div className="faq-section-label">{sectorLabels[sector]}</div>
              {sectorFAQs[sector].map(item => (
                <FAQItem key={item.id} item={item} open={!!openItems[item.id]} onToggle={() => toggleItem(item.id)} />
              ))}
            </div>
          ))}

        </div>
      </section>
    </>
  )
}

function FAQItem({ item, open, onToggle }) {
  return (
    <div className="faq-item">
      <div className="faq-question" onClick={onToggle}>
        <span>{item.q}</span>
        <span className={`faq-arrow${open ? ' open' : ''}`}>▾</span>
      </div>
      <div className={`faq-answer${open ? ' open' : ''}`}>
        <p>{item.a}</p>
      </div>
    </div>
  )
}
