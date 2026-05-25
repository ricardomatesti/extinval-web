'use client'

import { useEffect, useRef } from 'react'
import { useCMS } from './CMSProvider'

export default function EditableBackground({ id, scope = 'page', image, className, style, children }) {
  const { active, markChange } = useCMS()
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.style.backgroundImage = image ? `url('${image}')` : 'none'
    }
  }, [image])

  const handleClick = (e) => {
    if (!active) return
    e.preventDefault()
    e.stopPropagation()

    const current = ref.current?.dataset.cmsBgSrc || image || ''
    const nextSrc = window.prompt('URL del fondo', current)
    if (!nextSrc) return

    if (ref.current) {
      ref.current.dataset.cmsBgSrc = nextSrc
      ref.current.style.backgroundImage = `url('${nextSrc}')`
    }

    markChange(id, JSON.stringify({ src: nextSrc }), scope)
  }

  return (
    <div
      ref={ref}
      data-cms-bg={id}
      data-cms-bg-src={image}
      className={className}
      style={{
        ...style,
        backgroundImage: image ? `url('${image}')` : 'none',
      }}
      onClick={handleClick}
      title={active ? 'Haz clic para cambiar este fondo' : undefined}
    >
      {children}
    </div>
  )
}
