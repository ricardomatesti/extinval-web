'use client'

import { useEffect, useMemo, useState } from 'react'

const PAGES = [
  { id: 'home', title: 'Home', path: '/', desc: 'Titulares, bloques principales e imágenes destacadas.' },
  { id: 'about', title: 'Nosotros', path: '/nosotros', desc: 'Textos corporativos, propuesta de valor y trayectoria.' },
  { id: 'authority', title: 'Autoridad', path: '/autoridad', desc: 'Certificaciones, aprobaciones y logos visibles.' },
  { id: 'contact', title: 'Contacto', path: '/contacto', desc: 'Titulares y datos visibles de la página de contacto.' },
  { id: 'resources', title: 'Recursos', path: '/resources', desc: 'Cabecera y contenidos editables del hub de recursos.' },
  { id: 'merchant', title: 'Servicio Mercante', path: '/servicios/buques-mercantes', desc: 'Página comercial de buques mercantes.' },
  { id: 'oilgas', title: 'Servicio Oil & Gas', path: '/servicios/oil-gas', desc: 'Página comercial de Oil & Gas.' },
  { id: 'nautica', title: 'Servicio Náutica', path: '/servicios/nautica-recreo', desc: 'Página comercial de náutica de recreo.' },
  { id: 'industry', title: 'Servicio Industrial', path: '/servicios/industrial-comercial', desc: 'Página comercial de industrial y comercial.' },
]

export default function PanelPersonalPage() {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const [storageMode, setStorageMode] = useState('local')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [sessionEmail, setSessionEmail] = useState('')
  const [error, setError] = useState('')
  const [selectedPageId, setSelectedPageId] = useState(PAGES[0].id)
  const [submitting, setSubmitting] = useState(false)

  const selectedPage = useMemo(
    () => PAGES.find((page) => page.id === selectedPageId) ?? PAGES[0],
    [selectedPageId]
  )

  useEffect(() => {
    fetch('/api/cms/status')
      .then((r) => r.json())
      .then((data) => setStorageMode(data.storage || 'local'))
      .catch(() => {})

    fetch('/api/auth')
      .then((r) => r.json())
      .then((data) => {
        setAuthenticated(!!data.authenticated)
        setSessionEmail(data.email || '')
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const r = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await r.json()
      if (!r.ok) {
        setError(data.error || 'No se ha podido iniciar sesión')
        return
      }
      setAuthenticated(true)
      setSessionEmail(email)
      setPassword('')
    } catch {
      setError('Error de conexión')
    } finally {
      setSubmitting(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' })
    setAuthenticated(false)
    setSessionEmail('')
    setPassword('')
  }

  return (
    <>
      <style>{`
        .panel-root {
          min-height: 100vh;
          background: linear-gradient(180deg, #f4f7fb 0%, #edf2f8 100%);
          color: #0b1e3a;
          font-family: var(--sans, 'DM Sans', system-ui, sans-serif);
        }
        .panel-shell {
          max-width: 1440px;
          margin: 0 auto;
          padding: 2rem;
        }
        .panel-card {
          background: #fff;
          border: 1px solid #d8deea;
          box-shadow: 0 16px 48px rgba(11,30,58,.08);
        }
        .panel-login {
          width: min(100%, 460px);
          margin: 8vh auto 0;
          padding: 2rem;
        }
        .panel-input {
          width: 100%;
          padding: .95rem 1rem;
          border: 1px solid #d8deea;
          font: inherit;
          outline: none;
        }
        .panel-input:focus {
          border-color: #0b1e3a;
        }
        .panel-btn {
          border: none;
          cursor: pointer;
          font: inherit;
          font-weight: 700;
          letter-spacing: .08em;
          text-transform: uppercase;
        }
        .panel-btn-primary {
          background: #0b1e3a;
          color: #fff;
          padding: 1rem 1.25rem;
        }
        .panel-btn-light {
          background: #fff;
          color: #0b1e3a;
          border: 1px solid #d8deea;
          padding: .8rem 1rem;
        }
        .panel-grid {
          display: grid;
          grid-template-columns: 320px minmax(0, 1fr);
          gap: 1.5rem;
          align-items: start;
        }
        .panel-sidebar {
          padding: 1rem;
          position: sticky;
          top: 1.5rem;
        }
        .panel-page-btn {
          width: 100%;
          text-align: left;
          background: transparent;
          border: 1px solid #d8deea;
          padding: .95rem 1rem;
          cursor: pointer;
          margin-bottom: .65rem;
          transition: border-color .2s, background .2s;
        }
        .panel-page-btn.active {
          background: #0b1e3a;
          border-color: #0b1e3a;
          color: #fff;
        }
        .panel-preview {
          padding: 1rem;
        }
        .panel-preview-frame {
          width: 100%;
          min-height: 78vh;
          border: 1px solid #d8deea;
          background: #fff;
        }
        @media (max-width: 1100px) {
          .panel-grid {
            grid-template-columns: 1fr;
          }
          .panel-sidebar {
            position: static;
          }
          .panel-preview-frame {
            min-height: 68vh;
          }
        }
      `}</style>

      <div className="panel-root">
        <div className="panel-shell">
          {loading ? (
            <div className="panel-card panel-login">Comprobando acceso...</div>
          ) : !authenticated ? (
            <div className="panel-card panel-login">
              <div style={{ fontSize: '.8rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#c41230', fontWeight: 700, marginBottom: '.85rem' }}>
                Acceso personal
              </div>
              <h1 style={{ fontSize: '2rem', lineHeight: 1.05, marginBottom: '.85rem' }}>Panel privado de edición</h1>
              <p style={{ color: '#5a6e8a', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Acceda con email y contraseña. Desde aquí podrá abrir las páginas editables y actualizar textos, títulos e imágenes habilitadas sin tocar código.
              </p>
              <form onSubmit={handleLogin}>
                <input className="panel-input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ marginBottom: '.75rem' }} required />
                <input className="panel-input" type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} style={{ marginBottom: '.75rem' }} required />
                {error ? <div style={{ color: '#c41230', marginBottom: '.9rem', fontSize: '.9rem' }}>{error}</div> : null}
                <button className="panel-btn panel-btn-primary" style={{ width: '100%' }} type="submit" disabled={submitting}>
                  {submitting ? 'Accediendo...' : 'Entrar al panel'}
                </button>
              </form>
            </div>
          ) : (
            <>
              <div className="panel-card" style={{ padding: '1.25rem 1.5rem', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontSize: '.8rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#3b82f6', fontWeight: 700, marginBottom: '.35rem' }}>
                    Panel privado de edición
                  </div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 700 }}>Marketing / Contenido</div>
                  <div style={{ color: '#5a6e8a', marginTop: '.25rem' }}>Sesión iniciada como {sessionEmail || 'usuario autorizado'}.</div>
                  <div style={{ marginTop: '.65rem', display: 'inline-flex', alignItems: 'center', gap: '.45rem', padding: '.35rem .7rem', background: storageMode === 'supabase' ? '#ecfdf5' : '#fff7ed', border: `1px solid ${storageMode === 'supabase' ? '#10b981' : '#f59e0b'}`, color: storageMode === 'supabase' ? '#065f46' : '#9a3412', fontSize: '.78rem', fontWeight: 700 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: storageMode === 'supabase' ? '#10b981' : '#f59e0b' }} />
                    {storageMode === 'supabase' ? 'Guardando en Supabase' : 'Modo local (JSON)'}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
                  <a className="panel-btn panel-btn-light" href={selectedPage.path} target="_blank" rel="noreferrer">Abrir en pestaña</a>
                  <button className="panel-btn panel-btn-primary" type="button" onClick={handleLogout}>Cerrar sesión</button>
                </div>
              </div>

              <div className="panel-grid">
                <aside className="panel-card panel-sidebar">
                  <div style={{ fontSize: '.78rem', letterSpacing: '.14em', textTransform: 'uppercase', color: '#5a6e8a', fontWeight: 700, marginBottom: '.9rem' }}>
                    Páginas editables
                  </div>
                  {PAGES.map((page) => (
                    <button
                      key={page.id}
                      type="button"
                      className={`panel-page-btn${selectedPage.id === page.id ? ' active' : ''}`}
                      onClick={() => setSelectedPageId(page.id)}
                    >
                      <div style={{ fontWeight: 700, marginBottom: '.2rem' }}>{page.title}</div>
                      <div style={{ fontSize: '.84rem', lineHeight: 1.5, color: selectedPage.id === page.id ? 'rgba(255,255,255,.75)' : '#5a6e8a' }}>
                        {page.desc}
                      </div>
                    </button>
                  ))}
                  <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #d8deea', fontSize: '.86rem', color: '#5a6e8a', lineHeight: 1.6 }}>
                    En la vista previa, haga clic sobre textos o imágenes resaltadas. Los cambios se guardan desde la barra azul fija que aparece dentro de la propia página.
                  </div>
                </aside>

                <section className="panel-card panel-preview">
                  <div style={{ padding: '.25rem .25rem 1rem', display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 700 }}>{selectedPage.title}</div>
                      <div style={{ color: '#5a6e8a', marginTop: '.2rem' }}>{selectedPage.path}</div>
                    </div>
                  </div>
                  <iframe
                    key={selectedPage.path}
                    title={`Vista previa editable de ${selectedPage.title}`}
                    src={selectedPage.path}
                    className="panel-preview-frame"
                  />
                </section>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
