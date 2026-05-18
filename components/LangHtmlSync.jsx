// Copyright © 2026 Pelayo Garrido Martinez — devpelayogarrido@gmail.com
'use client'
// components/LangHtmlSync.jsx
// Keeps the <html lang="..."> attribute in sync with the chosen language.
// Renders nothing — purely a side-effect component.
import { useEffect } from 'react'
import { useLang } from '@/contexts/LangContext'

export default function LangHtmlSync() {
  const { lang } = useLang()
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])
  return null
}
