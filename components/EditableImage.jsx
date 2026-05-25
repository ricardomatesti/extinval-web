'use client'

import { useRef } from 'react'
import { useCMS } from './CMSProvider'

export default function EditableImage({ id, scope = 'page', src, alt, className, style }) {
  const { active, markChange } = useCMS()
  const ref = useRef(null)

  const handleClick = (e) => {
    if (!active) return
    e.preventDefault()
    e.stopPropagation()

    const currentSrc = ref.current?.getAttribute('src') || src || ''
    const currentAlt = ref.current?.getAttribute('alt') || alt || ''
    const nextSrc = window.prompt('URL de la imagen', currentSrc)
    if (!nextSrc) return
    const nextAlt = window.prompt('Texto alternativo (alt)', currentAlt)
    const payload = JSON.stringify({ src: nextSrc, alt: nextAlt || '' })

    if (ref.current) {
      ref.current.src = nextSrc
      ref.current.alt = nextAlt || ''
    }
    markChange(id, payload, scope)
  }

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      data-cms-image={id}
      className={className}
      style={style}
      onClick={handleClick}
      title={active ? 'Haz clic para cambiar esta imagen' : alt}
    />
  )
}
