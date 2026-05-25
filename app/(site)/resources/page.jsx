// Copyright © 2026 Pelayo Garrido Martinez — devpelayogarrido@gmail.com
'use client'
import Link from 'next/link'
import EditableField from '@/components/EditableField'
import EditableBackground from '@/components/EditableBackground'
import CMSLoader from '@/components/CMSLoader'
import { useLang, useTranslation } from '@/contexts/LangContext'
import { ARTICLES } from '@/lib/articles'

const PAGE = 'red-global'

export default function ResourcesPage() {
  const t = useTranslation()
  const { lang } = useLang()

  return (
    <>
      <CMSLoader pageKey={PAGE} />

      {/* PAGE HERO */}
      <EditableBackground
        id="rg-hero-bg"
        className="page-hero"
        image="/images/Cabecera Recursos Blog.jpg"
        style={{ backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(11,30,58,0.4)' }} />
        <div className="container">
          <div className="ph-inner">
            <div className="breadcrumb">
              <Link href="/">{ t('page.home') }</Link> ›{' '}
              <span style={{ color: 'var(--gold)' }}>{t('rg.breadcrumb')}</span>
            </div>
            <h1 className="page-title">
              <EditableField id="rg-title">{t('rg.title')}</EditableField>
            </h1>
            <p className="page-sub">
              <EditableField id="rg-sub">{t('rg.sub')}</EditableField>
            </p>
          </div>
        </div>
      </EditableBackground>

      {/* ═══ BLOG / RECURSOS ═══ */}
      <section className="section section-gray">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 3.5rem' }}>
            <div className="overline" style={{ justifyContent: 'center' }}>
              {t('rg.blog.overline')}
            </div>
            <h2 style={{
              fontFamily: 'var(--display)', fontSize: 'clamp(1.8rem,3.5vw,2.8rem)',
              color: 'var(--navy)', marginTop: '.75rem', letterSpacing: '.04em',
            }}>
              {t('rg.blog.h2')}
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.75, marginTop: '.75rem' }}>
              {t('rg.blog.lead')}
            </p>
          </div>

          <div className="blog-grid">
            {ARTICLES.map(article => {
              const title = lang === 'en' ? article.titleEn : article.titleEs
              const excerpt = lang === 'en' ? article.excerptEn : article.excerptEs
              const category = lang === 'en' ? article.category.en : article.category.es
              const formattedDate = new Date(article.date).toLocaleDateString(
                lang === 'en' ? 'en-GB' : 'es-ES',
                { year: 'numeric', month: 'long', day: 'numeric' }
              )
              return (
                <article key={article.slug} className="blog-card">
                  <Link href={`/resources/${article.slug}`} className="blog-card-img-wrap">
                    <div
                      className="blog-card-img"
                      style={{ backgroundImage: `url('${article.image}')` }}
                    />
                    <span className="blog-card-cat">{category}</span>
                  </Link>
                  <div className="blog-card-body">
                    <div className="blog-card-date">{formattedDate}</div>
                    <h3 className="blog-card-title">
                      <Link href={`/resources/${article.slug}`}>{title}</Link>
                    </h3>
                    <p className="blog-card-excerpt">{excerpt}</p>
                    <Link href={`/resources/${article.slug}`} className="blog-card-cta">
                      {lang === 'en' ? 'Read article' : 'Leer artículo'} →
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
