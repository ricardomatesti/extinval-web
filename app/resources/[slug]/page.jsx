// Copyright © 2026 Pelayo Garrido Martinez — devpelayogarrido@gmail.com
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useLang, useTranslation } from '@/contexts/LangContext'
import { getArticle, getAdjacentArticles } from '@/lib/articles'

export default function ArticlePage() {
  const { slug } = useParams()
  const t = useTranslation()
  const { lang } = useLang()

  const article = getArticle(slug)
  const { prev, next } = getAdjacentArticles(slug)

  const [status, setStatus] = useState('idle')

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

  function getShareUrl() {
    if (typeof window === 'undefined') return ''
    return window.location.href
  }

  function shareLinkedIn() {
    const url = encodeURIComponent(getShareUrl())
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'noopener')
  }

  function shareEmail() {
    const title = lang === 'en' ? article.titleEn : article.titleEs
    const url = getShareUrl()
    window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`
  }

  if (!article) {
    return (
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--display)', color: 'var(--navy)', marginBottom: '1rem' }}>
            {lang === 'en' ? 'Article not found' : 'Artículo no encontrado'}
          </h1>
          <Link href="/resources" className="btn btn-primary">
            {lang === 'en' ? '← Back to all articles' : '← Volver a todos los artículos'}
          </Link>
        </div>
      </section>
    )
  }

  const title = lang === 'en' ? article.titleEn : article.titleEs
  const content = lang === 'en' ? article.contentEn : article.contentEs
  const category = lang === 'en' ? article.category.en : article.category.es
  const formattedDate = new Date(article.date).toLocaleDateString(
    lang === 'en' ? 'en-GB' : 'es-ES',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )

  return (
    <>
      {/* ARTICLE HERO */}
      <div
        style={{
          backgroundImage: `url('${article.image}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          minHeight: 360,
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(11,30,58,0.68)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2, padding: '3.5rem 2rem' }}>
          <div className="breadcrumb" style={{ marginBottom: '1.25rem' }}>
            <Link href="/">{t('page.home')}</Link> ›{' '}
            <Link href="/resources" style={{ color: 'rgba(255,255,255,.6)' }}>
              {lang === 'en' ? 'Resources' : 'Recursos'}
            </Link> ›{' '}
            <span style={{ color: 'var(--gold)' }}>{category}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.65rem', marginBottom: '1rem' }}>
            <span style={{
              background: 'var(--red)', color: '#fff',
              fontFamily: 'var(--cond)', fontSize: '.6rem', fontWeight: 700,
              letterSpacing: '.14em', textTransform: 'uppercase', padding: '.22rem .7rem',
            }}>
              {category}
            </span>
            <span style={{ color: 'rgba(255,255,255,.45)', fontFamily: 'var(--cond)', fontSize: '.72rem', letterSpacing: '.06em' }}>
              {formattedDate}
            </span>
          </div>
          <h1 style={{
            fontFamily: 'var(--display)', color: '#fff',
            fontSize: 'clamp(1.6rem,3.5vw,2.8rem)', lineHeight: 1.1,
            letterSpacing: '.03em', maxWidth: 780,
          }}>
            {title}
          </h1>
        </div>
      </div>

      {/* ARTICLE BODY */}
      <section className="section section-sm">
        <div className="container">
          <div className="article-layout">
            {/* Main content */}
            <div className="article-body">
              {/* Share buttons */}
              <div className="article-share-top">
                <span style={{ fontFamily: 'var(--cond)', fontSize: '.65rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                  {lang === 'en' ? 'Share' : 'Compartir'}
                </span>
                <button onClick={shareLinkedIn} className="share-btn share-btn-li" aria-label="LinkedIn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </button>
                <button onClick={shareEmail} className="share-btn share-btn-mail" aria-label="Email">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  {lang === 'en' ? 'Email' : 'Correo'}
                </button>
              </div>

              {/* Article HTML content */}
              <div
                className="article-prose"
                dangerouslySetInnerHTML={{ __html: content }}
              />

              {/* Bottom share */}
              <div className="article-share-bottom">
                <span style={{ fontFamily: 'var(--cond)', fontSize: '.65rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                  {lang === 'en' ? 'Share this article' : 'Compartir este artículo'}
                </span>
                <button onClick={shareLinkedIn} className="share-btn share-btn-li" aria-label="LinkedIn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </button>
                <button onClick={shareEmail} className="share-btn share-btn-mail" aria-label="Email">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  {lang === 'en' ? 'Email' : 'Correo'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PREV / NEXT NAV */}
      <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="article-nav">
            {prev ? (
              <Link href={`/resources/${prev.slug}`} className="article-nav-link article-nav-prev">
                <span className="article-nav-arrow">←</span>
                <span className="article-nav-text">
                  <span className="article-nav-label">{lang === 'en' ? 'Previous' : 'Anterior'}</span>
                  <span className="article-nav-title">
                    {lang === 'en' ? prev.titleEn : prev.titleEs}
                  </span>
                </span>
              </Link>
            ) : <div />}
            {next ? (
              <Link href={`/resources/${next.slug}`} className="article-nav-link article-nav-next">
                <span className="article-nav-text" style={{ textAlign: 'right' }}>
                  <span className="article-nav-label">{lang === 'en' ? 'Next' : 'Siguiente'}</span>
                  <span className="article-nav-title">
                    {lang === 'en' ? next.titleEn : next.titleEs}
                  </span>
                </span>
                <span className="article-nav-arrow">→</span>
              </Link>
            ) : <div />}
          </div>
        </div>
      </div>

      {/* CONTACT FORM */}
      <section className="section section-sm">
        <div className="container">
          <div className="article-contact">
            <div className="article-contact-inner">
              <h2 style={{
                fontFamily: 'var(--display)', color: 'var(--navy)',
                fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', letterSpacing: '.04em', marginBottom: '.75rem',
              }}>
                {lang === 'en' ? 'Do you have a question?' : '¿Tiene alguna pregunta?'}
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '2rem', maxWidth: 560 }}>
                {lang === 'en'
                  ? 'Our technical team will be happy to answer your questions about this topic or any other related to maritime and industrial safety.'
                  : 'Nuestro equipo técnico estará encantado de resolver sus dudas sobre este tema o cualquier otro relacionado con la seguridad marítima e industrial.'}
              </p>

              {status === 'done' ? (
                <div style={{ padding: '1.5rem 2rem', background: '#ECFDF5', border: '1px solid #10B981', color: '#065F46', lineHeight: 1.7 }}>
                  <strong style={{ display: 'block', marginBottom: '.35rem' }}>
                    {lang === 'en' ? '✓ Message received' : '✓ Mensaje recibido'}
                  </strong>
                  {lang === 'en'
                    ? 'Our technical team will contact you within 24 hours.'
                    : 'Nuestro equipo técnico le contactará en menos de 24 horas.'}
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ maxWidth: 680 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.7rem', marginBottom: '.7rem' }}>
                    <input
                      style={{ padding: '.78rem 1rem', border: '1.5px solid var(--border)', fontSize: '.87rem', outline: 'none', fontFamily: 'inherit' }}
                      name="name"
                      placeholder={lang === 'en' ? 'Name and company *' : 'Nombre y empresa *'}
                      required
                    />
                    <input
                      style={{ padding: '.78rem 1rem', border: '1.5px solid var(--border)', fontSize: '.87rem', outline: 'none', fontFamily: 'inherit' }}
                      name="email"
                      type="email"
                      placeholder="Email *"
                      required
                    />
                  </div>
                  <textarea
                    style={{ width: '100%', padding: '.78rem 1rem', border: '1.5px solid var(--border)', fontSize: '.87rem', outline: 'none', fontFamily: 'inherit', minHeight: 120, resize: 'vertical', marginBottom: '.7rem' }}
                    name="message"
                    placeholder={lang === 'en' ? 'How can we help you?' : '¿En qué podemos ayudarle?'}
                    required
                  />
                  <input type="hidden" name="division" value={`Artículo: ${title}`} />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn btn-primary"
                    style={{ padding: '.9rem 2.5rem' }}
                  >
                    {status === 'loading'
                      ? (lang === 'en' ? 'Sending...' : 'Enviando...')
                      : (lang === 'en' ? 'SEND MESSAGE' : 'ENVIAR MENSAJE')}
                  </button>
                </form>
              )}
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '3rem 0 2rem' }} />

          <Link
            href="/resources"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '.5rem',
              fontFamily: 'var(--cond)', fontWeight: 700, fontSize: '.75rem',
              letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--red)',
              transition: 'gap .2s',
            }}
          >
            ← {lang === 'en' ? 'BACK TO ALL ARTICLES' : 'VOLVER A TODOS LOS ARTÍCULOS'}
          </Link>
        </div>
      </section>
    </>
  )
}
