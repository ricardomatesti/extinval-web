'use client'

import { useEffect } from 'react'
import { useLang } from '@/contexts/LangContext'

export default function CMSGlobalLoader() {
  const { lang } = useLang()

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('extinval:locale', { detail: lang }))
    fetch(`/api/cms?page=${encodeURIComponent(`global-${lang}`)}`)
      .then((r) => r.json())
      .then((data) => {
        Object.entries(data || {}).forEach(([key, html]) => {
          const bgEl = document.querySelector(`[data-cms-bg="${key}"]`)
          if (bgEl && html) {
            try {
              const value = JSON.parse(html)
              if (value?.src) {
                bgEl.setAttribute('data-cms-bg-src', value.src)
                bgEl.style.backgroundImage = `url('${value.src}')`
              }
              return
            } catch {}
          }
          const imageEl = document.querySelector(`[data-cms-image="${key}"]`)
          if (imageEl && html) {
            try {
              const value = JSON.parse(html)
              if (value?.src) imageEl.setAttribute('src', value.src)
              if (typeof value?.alt === 'string') imageEl.setAttribute('alt', value.alt)
              return
            } catch {}
          }
          const el = document.querySelector(`[data-cms-field="${key}"]`)
          if (el && html) el.innerHTML = html
        })
      })
      .catch(() => {})
  }, [lang])

  return null
}
