// Copyright © 2026 Pelayo Garrido Martinez — devpelayogarrido@gmail.com
'use client'
// contexts/LangContext.jsx
// Provides lang ('es' | 'en') and t(key) throughout the app.
// Persists the user's choice in localStorage.
// CMSLoader reads the locale so CMS content is stored per-language.

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { translations } from '@/lib/translations'

const LangCtx = createContext(null)

export function LangProvider({ children }) {
  // Default to 'es'; hydrate from localStorage after mount to avoid SSR mismatch
  const [lang, setLangState] = useState('es')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('extinval_lang')
    if (saved === 'en' || saved === 'es') setLangState(saved)
    setMounted(true)
  }, [])

  const setLang = useCallback((l) => {
    setLangState(l)
    localStorage.setItem('extinval_lang', l)
  }, [])

  /** Translate a key. Supports {year} interpolation. */
  const t = useCallback((key, vars = {}) => {
    const dict = translations[lang] ?? translations.es
    let str = dict[key] ?? translations.es[key] ?? key
    Object.entries(vars).forEach(([k, v]) => { str = str.replace(`{${k}}`, v) })
    return str
  }, [lang])

  return (
    <LangCtx.Provider value={{ lang, setLang, t, mounted }}>
      {children}
    </LangCtx.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangCtx)
  if (!ctx) throw new Error('useLang must be inside LangProvider')
  return ctx
}

/** Convenience hook — just returns t() */
export function useTranslation() {
  return useLang().t
}
