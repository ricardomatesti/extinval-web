// Copyright © 2026 Pelayo Garrido Martinez — devpelayogarrido@gmail.com
'use client'
import Link from 'next/link'
import EditableField from '@/components/EditableField'
import CMSLoader from '@/components/CMSLoader'
import { useLang } from '@/contexts/LangContext'

const PAGE = 'area-clientes'

export default function AreaClientesPage() {
  const { lang, t } = useLang()

  return (
    <>
      <CMSLoader pageKey={PAGE} />
      <div className="page-hero"><div className="container"><div className="ph-inner">
        <div className="breadcrumb">
          <Link href="/">{t('page.home')}</Link> ›{' '}
          <span style={{ color: 'var(--gold)' }}>{t('ac.breadcrumb')}</span>
        </div>
        <h1 className="page-title"><EditableField id="ac-title">Área de Clientes</EditableField></h1>
        <p className="page-sub"><EditableField id="ac-sub">Acceso exclusivo a documentación técnica, certificados y portal de seguimiento de servicios.</EditableField></p>
      </div></div></div>

      <section className="section"><div className="container" style={{ maxWidth: 520, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🔒</div>
        <h2 style={{ fontFamily: 'var(--display)', fontSize: '2rem', color: 'var(--navy)', marginBottom: '1rem', letterSpacing: '.04em' }}>
          <EditableField id="ac-h2">ACCESO RESTRINGIDO</EditableField>
        </h2>
        <EditableField id="ac-body" tag="p" block style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: '2rem' }}>
          Esta área está reservada para clientes activos de Extinval Group. Si es cliente y necesita acceder a sus certificados y documentación técnica, contacte con su delegación asignada para recibir sus credenciales de acceso.
        </EditableField>
        <Link href={lang === 'en' ? '/contact' : '/contacto'} className="btn btn-primary" style={{ display: 'inline-flex' }}>{t('ac.cta')}</Link>
      </div></section>
    </>
  )
}
