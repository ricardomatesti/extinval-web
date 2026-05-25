import { readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { createClient } from '@supabase/supabase-js'

const ROOT = process.cwd()
const LOCALES = ['es', 'en']
const SOURCE_FILES = [
  path.join(ROOT, 'components', 'Header.jsx'),
  path.join(ROOT, 'components', 'Footer.jsx'),
]

async function main() {
  await loadEnvFiles()

  const siteFiles = await collectJsxFiles(path.join(ROOT, 'app', '(site)'))
  const files = [...SOURCE_FILES, ...siteFiles]
  const translations = await loadTranslations()
  const seed = {}

  for (const file of files) {
    const source = await readFile(file, 'utf8')
    const pageKey = getPageKey(file, source)
    if (!pageKey) continue

    collectEditableFields(seed, pageKey, source, translations)
    collectEditableImages(seed, pageKey, source, translations)
    collectEditableBackgrounds(seed, pageKey, source)
  }

  const args = new Set(process.argv.slice(2))
  const outPath = path.join(ROOT, 'data', 'cms-seed.json')

  if (args.has('--out')) {
    await writeFile(outPath, JSON.stringify(seed, null, 2), 'utf8')
    console.log(`Seed escrito en ${outPath}`)
  }

  if (args.has('--push')) {
    const url = process.env.SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_KEY
    if (!url || !key) {
      throw new Error('Faltan SUPABASE_URL o SUPABASE_SERVICE_KEY')
    }

    const supabase = createClient(url, key, { auth: { persistSession: false } })
    const rows = Object.entries(seed).flatMap(([page, content]) =>
      Object.entries(content).map(([content_key, content_html]) => ({
        page_key: page,
        content_key,
        content_html: String(content_html),
        updated_at: new Date().toISOString(),
      }))
    )

    const { error } = await supabase.from('cms_content').upsert(rows, { onConflict: 'page_key,content_key' })
    if (error) throw error
    console.log(`Seed subido a Supabase: ${rows.length} registros`)
  }

  if (!args.has('--out') && !args.has('--push')) {
    console.log(`Seed generado en memoria: ${Object.keys(seed).length} páginas`)
    console.log('Usa --out para escribir JSON y/o --push para subir a Supabase')
  }
}

async function collectJsxFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...await collectJsxFiles(full))
    } else if (entry.isFile() && full.endsWith('.jsx')) {
      files.push(full)
    }
  }
  return files
}

function getPageKey(file, source) {
  if (file.endsWith(path.join('components', 'Header.jsx')) || file.endsWith(path.join('components', 'Footer.jsx'))) {
    return 'global'
  }

  const match = source.match(/const PAGE = '([^']+)'/)
  return match?.[1] ?? null
}

function collectEditableFields(seed, defaultPageKey, source, translations) {
  const regex = /<EditableField\b([\s\S]*?)\bid="([^"]+)"([\s\S]*?)>([\s\S]*?)<\/EditableField>/g
  for (const match of source.matchAll(regex)) {
    const attrs = `${match[1]} ${match[3]}`
    const id = match[2]
    const inner = match[4].trim()
    const scope = getAttrValue(attrs, 'scope') || 'page'

    for (const locale of LOCALES) {
      const pageKey = scope === 'global' ? `global-${locale}` : `${defaultPageKey}-${locale}`
      const value = resolveEditableValue(inner, locale, translations)
      if (!value) continue
      seed[pageKey] ??= {}
      seed[pageKey][id] = value
    }
  }
}

function collectEditableImages(seed, defaultPageKey, source, translations) {
  const regex = /<EditableImage\b([\s\S]*?)\/>/g
  for (const match of source.matchAll(regex)) {
    const attrs = match[1]
    const id = getAttrValue(attrs, 'id')
    if (!id) continue
    const scope = getAttrValue(attrs, 'scope') || 'page'

    for (const locale of LOCALES) {
      const pageKey = scope === 'global' ? `global-${locale}` : `${defaultPageKey}-${locale}`
      const src = resolvePropValue(getAttrExpression(attrs, 'src') || getAttrString(attrs, 'src'), locale, translations)
      const alt = resolvePropValue(getAttrExpression(attrs, 'alt') || getAttrString(attrs, 'alt'), locale, translations)
      if (!src) continue
      seed[pageKey] ??= {}
      seed[pageKey][id] = JSON.stringify({ src, alt: alt || '' })
    }
  }
}

function collectEditableBackgrounds(seed, defaultPageKey, source) {
  const regex = /<EditableBackground\b([\s\S]*?)>/g
  for (const match of source.matchAll(regex)) {
    const attrs = match[1]
    const id = getAttrValue(attrs, 'id')
    if (!id) continue
    const scope = getAttrValue(attrs, 'scope') || 'page'
    const image = getAttrValue(attrs, 'image')
    if (!image) continue

    for (const locale of LOCALES) {
      const pageKey = scope === 'global' ? `global-${locale}` : `${defaultPageKey}-${locale}`
      seed[pageKey] ??= {}
      seed[pageKey][id] = JSON.stringify({ src: image })
    }
  }
}

function resolveEditableValue(raw, locale, translations) {
  let value = raw.trim()
  const tMatch = value.match(/^\{t\('([^']+)'\)\}$/)
  if (tMatch) return translations[locale]?.[tMatch[1]] ?? ''

  value = value.replace(/\{\s*t\('([^']+)'\)\s*\}/g, (_, key) => translations[locale]?.[key] ?? '')
  value = value.replace(/\{\s*lang === 'en' \? '([^']*)' : '([^']*)'\s*\}/g, (_, en, es) => locale === 'en' ? en : es)
  value = value.replace(/\{\s*"([^"]*)"\s*\}/g, '$1')
  value = value.replace(/\{\s*'([^']*)'\s*\}/g, '$1')
  value = value.replace(/\{\s*`([^`]*)`\s*\}/g, '$1')
  value = value.replace(/\{\s*' '\s*\}|\{\s*" "\s*\}/g, ' ')
  value = value.replace(/^\s*<span>\s*|\s*<\/span>\s*$/g, '')
  value = value.replace(/\n\s+/g, ' ').trim()
  if (value.includes('<EditableField') || value.includes('className=') || value.includes('style={{')) return ''
  return value
}

function resolvePropValue(raw, locale, translations) {
  if (!raw) return ''
  const trimmed = raw.trim()
  const tMatch = trimmed.match(/^t\('([^']+)'\)$/)
  if (tMatch) return translations[locale]?.[tMatch[1]] ?? ''
  const condMatch = trimmed.match(/^lang === 'en' \? '([^']*)' : '([^']*)'$/)
  if (condMatch) return locale === 'en' ? condMatch[1] : condMatch[2]
  const quoted = trimmed.match(/^['"]([\s\S]*)['"]$/)
  if (quoted) return quoted[1]
  return trimmed
}

function getAttrValue(attrs, name) {
  const match = attrs.match(new RegExp(`${name}="([^"]+)"`))
  return match?.[1] ?? null
}

function getAttrString(attrs, name) {
  const match = attrs.match(new RegExp(`${name}="([^"]+)"`))
  return match?.[1] ?? null
}

function getAttrExpression(attrs, name) {
  const match = attrs.match(new RegExp(`${name}=\\{([\\s\\S]*?)\\}`))
  return match?.[1] ?? null
}

async function loadTranslations() {
  const source = await readFile(path.join(ROOT, 'lib', 'translations.js'), 'utf8')
  const match = source.match(/export const translations = ([\s\S]*)$/)
  if (!match) throw new Error('No se pudo leer lib/translations.js')
  return new Function(`return (${match[1]})`)()
}

async function loadEnvFiles() {
  for (const name of ['.env.local', '.env']) {
    const file = path.join(ROOT, name)
    try {
      const raw = await readFile(file, 'utf8')
      for (const line of raw.split('\n')) {
        const trimmed = line.trim()
        if (!trimmed || trimmed.startsWith('#')) continue
        const eq = trimmed.indexOf('=')
        if (eq === -1) continue
        const key = trimmed.slice(0, eq).trim()
        const value = trimmed.slice(eq + 1).trim()
        if (!(key in process.env)) process.env[key] = stripQuotes(value)
      }
    } catch {}
  }
}

function stripQuotes(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1)
  }
  return value
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
