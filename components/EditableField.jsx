// Copyright © 2026 Pelayo Garrido Martinez — devpelayogarrido@gmail.com
'use client'
// components/EditableField.jsx
// Renders children as contenteditable when CMS is active.
// Uses data-cms-field for CSS targeting (see CMSProvider styles).

import { useEffect, useRef } from 'react'
import { useCMS } from './CMSProvider'

/**
 * @param {string}  id        - Unique key for this field (page-scoped)
 * @param {string}  [tag]     - HTML tag to render (default: 'span')
 * @param {string}  [className]
 * @param {object}  [style]
 * @param {string}  [dbValue] - Value loaded from DB (overrides children if present)
 * @param {boolean} [block]   - If true, renders as block element
 * @param {React.ReactNode} children - Default/fallback content
 */
export default function EditableField({
  id,
  scope = 'page',
  tag: Tag = 'span',
  className,
  style,
  dbValue,
  block,
  children,
}) {
  const { active, markChange } = useCMS()
  const ref = useRef(null)
  const initialised = useRef(false)

  // Apply DB value once on first render
  useEffect(() => {
    if (!initialised.current && ref.current && dbValue !== undefined) {
      ref.current.innerHTML = dbValue
      initialised.current = true
    }
  }, [dbValue])

  // Toggle contenteditable when CMS mode changes
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (active) {
      el.contentEditable = 'true'
      el.spellcheck = true
    } else {
      el.removeAttribute('contenteditable')
    }
  }, [active])

  const handleInput = (e) => {
    markChange(id, e.currentTarget.innerHTML, scope)
  }

  // Prevent link navigation in edit mode
  const handleClick = (e) => {
    if (active) e.preventDefault()
  }

  return (
    <Tag
      ref={ref}
      data-cms-field={id}
      className={className}
      style={{
        display: block ? 'block' : undefined,
        ...style,
      }}
      onInput={handleInput}
      onClick={handleClick}
      suppressContentEditableWarning={true}
    >
      {/* If dbValue provided, content is set via innerHTML in useEffect.
          Otherwise render children as JSX. */}
      {dbValue === undefined ? children : undefined}
    </Tag>
  )
}
