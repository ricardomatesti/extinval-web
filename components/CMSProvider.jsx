'use client'

import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react'

const CMSCtx = createContext(null)

export const useCMS = () => {
  const ctx = useContext(CMSCtx)
  if (!ctx) throw new Error('useCMS must be used inside CMSProvider')
  return ctx
}

export default function CMSProvider({ children }) {
  const [active, setActive] = useState(false)
  const [changes, setChanges] = useState({})
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null)
  const pageRef = useRef('home-es')
  const localeRef = useRef('es')

  useEffect(() => {
    const fn = (e) => {
      pageRef.current = e.detail
      setChanges({})
    }
    const localeFn = (e) => {
      localeRef.current = e.detail || 'es'
    }
    window.addEventListener('extinval:page', fn)
    window.addEventListener('extinval:locale', localeFn)
    return () => {
      window.removeEventListener('extinval:page', fn)
      window.removeEventListener('extinval:locale', localeFn)
    }
  }, [])

  useEffect(() => {
    fetch('/api/auth')
      .then((r) => r.json())
      .then((d) => {
        if (d.authenticated) setActive(true)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    document.body.classList.toggle('cms-active', active)
    return () => document.body.classList.remove('cms-active')
  }, [active])

  const setPage = useCallback((p) => {
    pageRef.current = p
  }, [])

  const markChange = useCallback((key, html, scope = 'page') => {
    const currentPage = pageRef.current || 'home-es'
    const locale = localeRef.current || currentPage.slice(currentPage.lastIndexOf('-') + 1) || 'es'
    const targetPage = scope === 'global' ? `global-${locale}` : currentPage

    setChanges((prev) => ({
      ...prev,
      [targetPage]: {
        ...(prev[targetPage] || {}),
        [key]: html,
      },
    }))
  }, [])

  const isDirty = Object.values(changes).some((pageChanges) => Object.keys(pageChanges || {}).length > 0)

  const logout = async () => {
    if (isDirty && !window.confirm('¿Salir sin guardar cambios?')) return
    await fetch('/api/auth', { method: 'DELETE' })
    setActive(false)
    setChanges({})
  }

  const discard = () => {
    if (!window.confirm('¿Descartar todos los cambios?')) return
    setChanges({})
    window.location.reload()
  }

  const save = async () => {
    if (!isDirty) {
      showToast('No hay cambios que guardar', 'info')
      return
    }
    setSaving(true)
    try {
      let savedTotal = 0
      const payloads = Object.entries(changes).filter(([, pageChanges]) => Object.keys(pageChanges || {}).length > 0)

      for (const [page, pageChanges] of payloads) {
        const r = await fetch('/api/cms', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ page, changes: pageChanges }),
        })
        const d = await r.json()
        if (!r.ok) {
          if (r.status === 401) {
            setActive(false)
            showToast('Sesión expirada.', 'err')
            return
          }
          throw new Error(d.error)
        }
        savedTotal += Number(d.saved || 0)
      }

      setChanges({})
      showToast(`✓ ${savedTotal} campo${savedTotal !== 1 ? 's' : ''} guardado${savedTotal !== 1 ? 's' : ''}`, 'ok')
    } catch (err) {
      showToast('Error al guardar: ' + err.message, 'err')
    } finally {
      setSaving(false)
    }
  }

  function showToast(msg, type = 'ok') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }

  useEffect(() => {
    const handler = (e) => {
      if (isDirty) {
        e.preventDefault()
        e.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [isDirty])

  return (
    <CMSCtx.Provider value={{ active, markChange, setPage, isDirty }}>
      {children}

      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 300,
          background: '#0B1E3A',
          borderTop: '2px solid #3B82F6',
          padding: '.75rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          transform: active ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform .3s cubic-bezier(.25,.46,.45,.94)',
          boxShadow: '0 -4px 24px rgba(0,0,0,.3)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#3B82F6',
              animation: 'cmsblink 1.5s infinite',
              display: 'block',
            }}
          />
          <span style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.6)', fontWeight: 500 }}>
            Modo edición — Haga clic en cualquier texto o imagen resaltados para editarlos
            {isDirty ? <strong style={{ color: '#FBBF24', marginLeft: '.75rem' }}>● Cambios sin guardar</strong> : null}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '.5rem' }}>
          <button onClick={discard} style={bs('#fff2', 'rgba(255,255,255,.55)')}>Descartar</button>
          <button onClick={save} disabled={saving} style={bs('#3B82F6', '#fff')}>
            {saving ? 'Guardando...' : '💾 Guardar'}
          </button>
          <button onClick={logout} style={bs('transparent', 'rgba(255,255,255,.35)')}>Salir</button>
        </div>
      </div>

      {toast ? (
        <div
          style={{
            position: 'fixed',
            top: '1.5rem',
            right: '1.75rem',
            zIndex: 700,
            padding: '.75rem 1.4rem',
            fontSize: '.82rem',
            fontWeight: 600,
            boxShadow: '0 8px 28px rgba(0,0,0,.15)',
            background: toast.type === 'ok' ? '#ECFDF5' : toast.type === 'err' ? '#FEF2F2' : '#EFF6FF',
            border: `1px solid ${toast.type === 'ok' ? '#10B981' : toast.type === 'err' ? '#C41230' : '#3B82F6'}`,
            color: toast.type === 'ok' ? '#065F46' : toast.type === 'err' ? '#C41230' : '#1E40AF',
            display: 'flex',
            alignItems: 'center',
            gap: '.4rem',
          }}
        >
          {toast.msg}
        </div>
      ) : null}

      <style>{`
        @keyframes cmsblink { 0%,100%{opacity:1} 50%{opacity:.2} }
        [data-cms-field] { transition: outline-color .2s; }
        [data-cms-image] { transition: outline-color .2s, filter .2s; }
        [data-cms-bg] { transition: outline-color .2s, filter .2s; }
        body.cms-active [data-cms-field] { outline: 2px dashed transparent; outline-offset: 2px; cursor: text; }
        body.cms-active [data-cms-field]:hover { outline-color: rgba(59,130,246,.5); }
        body.cms-active [data-cms-field]:focus { outline: 2px solid #3B82F6; outline-offset: 2px; }
        body.cms-active [data-cms-image] { outline: 2px dashed transparent; outline-offset: 4px; cursor: pointer; }
        body.cms-active [data-cms-image]:hover { outline-color: rgba(59,130,246,.5); filter: brightness(1.03); }
        body.cms-active [data-cms-bg] { outline: 2px dashed transparent; outline-offset: -6px; cursor: pointer; }
        body.cms-active [data-cms-bg]:hover { outline-color: rgba(59,130,246,.5); filter: brightness(1.01); }
      `}</style>
    </CMSCtx.Provider>
  )
}

function bs(bg, color) {
  return {
    padding: '.48rem 1.1rem',
    fontSize: '.72rem',
    fontWeight: 700,
    letterSpacing: '.08em',
    textTransform: 'uppercase',
    border: 'none',
    cursor: 'pointer',
    background: bg,
    color,
  }
}
