// Copyright © 2026 Pelayo Garrido Martinez — devpelayogarrido@gmail.com
'use client'
import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react'

const CMSCtx = createContext(null)
export const useCMS = () => {
  const ctx = useContext(CMSCtx)
  if (!ctx) throw new Error('useCMS must be used inside CMSProvider')
  return ctx
}

export default function CMSProvider({ children }) {
  const [active,    setActive]    = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [password,  setPassword]  = useState('')
  const [authError, setAuthError] = useState('')
  const [authLoading, setAuthLoading] = useState(false)
  const [changes,   setChanges]   = useState({})
  const [saving,    setSaving]    = useState(false)
  const [toast,     setToast]     = useState(null)
  const pageRef = useRef('home-es')

  // Listen for page+locale key from CMSLoader
  useEffect(() => {
    const fn = (e) => { pageRef.current = e.detail; setChanges({}) }
    window.addEventListener('extinval:page', fn)
    return () => window.removeEventListener('extinval:page', fn)
  }, [])

  const setPage   = useCallback((p) => { pageRef.current = p }, [])
  const markChange = useCallback((key, html) => {
    setChanges(prev => ({ ...prev, [key]: html }))
  }, [])
  const isDirty = Object.keys(changes).length > 0

  useEffect(() => {
    fetch('/api/auth').then(r => r.json()).then(d => { if (d.authenticated) setActive(true) }).catch(() => {})
  }, [])

  const openModal = () => { setShowModal(true); setAuthError(''); setPassword('') }

  const login = async () => {
    setAuthLoading(true); setAuthError('')
    try {
      const r = await fetch('/api/auth', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const d = await r.json()
      if (!r.ok) { setAuthError(d.error || 'Error'); return }
      setShowModal(false); setActive(true); showToast('✓ Editor activado', 'ok')
    } catch { setAuthError('Error de conexión') }
    finally { setAuthLoading(false) }
  }

  const logout = async () => {
    if (isDirty && !window.confirm('¿Salir sin guardar cambios?')) return
    await fetch('/api/auth', { method: 'DELETE' })
    setActive(false); setChanges({})
  }

  const discard = () => {
    if (!window.confirm('¿Descartar todos los cambios?')) return
    setChanges({}); window.location.reload()
  }

  const save = async () => {
    if (!isDirty) { showToast('No hay cambios que guardar', 'info'); return }
    setSaving(true)
    try {
      const r = await fetch('/api/cms', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: pageRef.current, changes }),
      })
      const d = await r.json()
      if (!r.ok) {
        if (r.status === 401) { setActive(false); showToast('Sesión expirada.', 'err'); return }
        throw new Error(d.error)
      }
      setChanges({})
      showToast(`✓ ${d.saved} campo${d.saved !== 1 ? 's' : ''} guardado${d.saved !== 1 ? 's' : ''}`, 'ok')
    } catch (err) { showToast('Error al guardar: ' + err.message, 'err') }
    finally { setSaving(false) }
  }

  function showToast(msg, type = 'ok') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }

  useEffect(() => {
    const handler = (e) => { if (isDirty) { e.preventDefault(); e.returnValue = '' } }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [isDirty])

  return (
    <CMSCtx.Provider value={{ active, markChange, setPage, isDirty }}>
      {children}

      {/* FAB */}
      <button onClick={() => active ? logout() : openModal()} title={active ? 'Salir del editor' : 'Editar contenido'}
        style={{ position:'fixed', bottom:'2rem', right:'2rem', zIndex:400, width:50, height:50,
          borderRadius:'50%', background: active ? '#3B82F6' : '#0B1E3A',
          border:`2px solid ${active ? '#3B82F6' : '#C9A84C'}`,
          color: active ? '#fff' : '#C9A84C', fontSize:'1rem', cursor:'pointer',
          display:'grid', placeItems:'center', boxShadow:'0 4px 18px rgba(0,0,0,.35)', transition:'all .3s' }}>
        {active ? '✕' : '✏'}
      </button>

      {/* Bottom bar */}
      <div style={{ position:'fixed', bottom:0, left:0, right:0, zIndex:300, background:'#0B1E3A',
        borderTop:'2px solid #3B82F6', padding:'.75rem 2rem', display:'flex', alignItems:'center',
        justifyContent:'space-between', gap:'1rem',
        transform: active ? 'translateY(0)' : 'translateY(100%)',
        transition:'transform .3s cubic-bezier(.25,.46,.45,.94)', boxShadow:'0 -4px 24px rgba(0,0,0,.3)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'.75rem' }}>
          <span style={{ width:7, height:7, borderRadius:'50%', background:'#3B82F6',
            animation:'cmsblink 1.5s infinite', display:'block' }} />
          <span style={{ fontSize:'.75rem', color:'rgba(255,255,255,.6)', fontWeight:500 }}>
            Modo Edición — Haz clic en cualquier texto resaltado para editarlo
            {isDirty && <strong style={{ color:'#FBBF24', marginLeft:'.75rem' }}>● Cambios sin guardar</strong>}
          </span>
        </div>
        <div style={{ display:'flex', gap:'.5rem' }}>
          <button onClick={discard} style={bs('#fff2','rgba(255,255,255,.55)')}>Descartar</button>
          <button onClick={save} disabled={saving} style={bs('#3B82F6','#fff')}>
            {saving ? 'Guardando...' : '💾 Guardar'}
          </button>
          <button onClick={logout} style={bs('transparent','rgba(255,255,255,.35)')}>Salir</button>
        </div>
      </div>

      {/* Auth modal */}
      {showModal && (
        <div onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
          style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.65)', zIndex:600,
            display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div style={{ background:'#fff', width:360, padding:'2.5rem',
            boxShadow:'0 20px 60px rgba(0,0,0,.3)', position:'relative', borderTop:'3px solid #C41230' }}>
            <button onClick={() => setShowModal(false)}
              style={{ position:'absolute', top:'1rem', right:'1rem', background:'none', border:'none', fontSize:'1rem', color:'#888', cursor:'pointer' }}>✕</button>
            <div style={{ fontWeight:700, fontSize:'1.25rem', color:'#0B1E3A', marginBottom:'.25rem' }}>Editor de Contenido</div>
            <div style={{ fontSize:'.82rem', color:'#6B7FA0', marginBottom:'1.5rem' }}>Contraseña de administración para activar la edición inline.</div>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && login()} placeholder="Contraseña"
              style={{ width:'100%', padding:'.8rem 1rem', border:'1.5px solid #E2E5EC', fontSize:'.9rem',
                outline:'none', marginBottom: authError ? '.5rem' : '.9rem', fontFamily:'inherit' }} />
            {authError && <div style={{ color:'#C41230', fontSize:'.75rem', marginBottom:'.75rem' }}>{authError}</div>}
            <button onClick={login} disabled={authLoading}
              style={{ width:'100%', padding:'.88rem', background:'#0B1E3A', color:'#fff', border:'none',
                fontWeight:700, fontSize:'.82rem', letterSpacing:'.06em', textTransform:'uppercase',
                cursor:'pointer', opacity: authLoading ? .7 : 1 }}>
              {authLoading ? 'Verificando...' : 'Acceder al Editor'}
            </button>
            <p style={{ marginTop:'1rem', fontSize:'.68rem', color:'#B0BDD0', textAlign:'center' }}>
              Contraseña configurada en las variables de entorno del servidor
            </p>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{ position:'fixed', top:'1.5rem', right:'1.75rem', zIndex:700,
          padding:'.75rem 1.4rem', fontSize:'.82rem', fontWeight:600,
          boxShadow:'0 8px 28px rgba(0,0,0,.15)',
          background: toast.type==='ok' ? '#ECFDF5' : toast.type==='err' ? '#FEF2F2' : '#EFF6FF',
          border:`1px solid ${toast.type==='ok'?'#10B981':toast.type==='err'?'#C41230':'#3B82F6'}`,
          color: toast.type==='ok' ? '#065F46' : toast.type==='err' ? '#C41230' : '#1E40AF',
          display:'flex', alignItems:'center', gap:'.4rem' }}>
          {toast.msg}
        </div>
      )}

      <style>{`
        @keyframes cmsblink { 0%,100%{opacity:1} 50%{opacity:.2} }
        [data-cms-field] { transition: outline-color .2s; }
        body.cms-active [data-cms-field] { outline: 2px dashed transparent; outline-offset: 2px; cursor: text; }
        body.cms-active [data-cms-field]:hover { outline-color: rgba(59,130,246,.5); }
        body.cms-active [data-cms-field]:focus { outline: 2px solid #3B82F6; outline-offset: 2px; }
      `}</style>
    </CMSCtx.Provider>
  )
}

function bs(bg, color) {
  return { padding:'.48rem 1.1rem', fontSize:'.72rem', fontWeight:700,
    letterSpacing:'.08em', textTransform:'uppercase', border:'none', cursor:'pointer', background:bg, color }
}
