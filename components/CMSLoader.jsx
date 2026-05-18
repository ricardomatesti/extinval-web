// Copyright © 2026 Pelayo Garrido Martinez — devpelayogarrido@gmail.com
'use client'
// components/CMSLoader.jsx
// Fetches CMS content for the current page+locale and applies it to EditableFields.
// page_key is stored as "pageKey-locale" (e.g. "home-es", "home-en")
// so each language has its own independent saved content.

import { useEffect } from 'react'
import { useLang } from '@/contexts/LangContext'

export default function CMSLoader({ pageKey }) {
  const { lang, setPage } = useLang()

  // setPage may not exist on useLang — it lives on useCMS. Pass locale-scoped key to CMSProvider.
  // We use a global event so CMSProvider can react without coupling.
  useEffect(() => {
    const localeKey = `${pageKey}-${lang}`
    // Notify CMSProvider of current page+locale key
    window.dispatchEvent(new CustomEvent('extinval:page', { detail: localeKey }))

    fetch(`/api/cms?page=${encodeURIComponent(localeKey)}`)
      .then(r => r.json())
      .then(data => {
        Object.entries(data).forEach(([key, html]) => {
          const el = document.querySelector(`[data-cms-field="${key}"]`)
          if (el && html) el.innerHTML = html
        })
      })
      .catch(() => {})
  }, [pageKey, lang])

  return null
}
