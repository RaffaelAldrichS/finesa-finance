import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { features, navItems, testimonials, topics } from '@/lib/content'

const sectionsDir = join(process.cwd(), 'components/sections')
// The ids live on the <section> inside each component, not in page.tsx.
// `konten` is not here: it sits on <main> as the skip-link destination and is
// deliberately absent from the nav.
const sectionIds = readdirSync(sectionsDir)
  .filter((file) => file.endsWith('.tsx'))
  .flatMap((file) =>
    [...readFileSync(join(sectionsDir, file), 'utf8').matchAll(/<section[^>]*\bid="([^"]+)"/g)].map(
      (match) => match[1],
    ),
  )

const hashTargets = new Set(
  readdirSync(sectionsDir)
    .filter((file) => file.endsWith('.tsx'))
    .flatMap((file) =>
      [...readFileSync(join(sectionsDir, file), 'utf8').matchAll(/href=\{?["'`]#([\w-]+)/g)].map(
        (match) => match[1],
      ),
    ),
)

describe('anchor integrity', () => {
  it('gives every nav item a section that exists', () => {
    for (const item of navItems) {
      expect(sectionIds).toContain(item.toLowerCase())
    }
  })

  it('leaves no section that nothing links to', () => {
    // Sections are reachable from more than the nav — the header CTA and the
    // showcase button both point at #mulai — so the invariant is about all
    // in-page links, not just navItems.
    const linked = new Set([...navItems.map((item) => item.toLowerCase()), ...hashTargets])
    expect(sectionIds.filter((id) => !linked.has(id))).toEqual([])
  })

  it('has no link pointing at a section that does not exist', () => {
    expect([...hashTargets].filter((target) => !sectionIds.includes(target))).toEqual([])
  })

  it('does not advertise an FAQ that was never built', () => {
    expect(navItems).not.toContain('FAQ')
    expect(sectionIds).not.toContain('faq')
  })
})

describe('content shape', () => {
  it('keeps four features and six topics', () => {
    expect(features).toHaveLength(4)
    expect(topics).toHaveLength(6)
  })

  it('keeps three testimonials', () => {
    expect(testimonials).toHaveLength(3)
  })

  it('gives every entry real copy', () => {
    const entries = [
      ...features.map((f) => [f.title, f.text]),
      ...topics.map((t) => [t.title, t.text]),
      ...testimonials.map((t) => [t.name, t.role, t.quote]),
    ]
    for (const [head, ...rest] of entries) {
      expect(head?.trim().length ?? 0).toBeGreaterThan(0)
      for (const part of rest) expect(part.trim().length).toBeGreaterThan(0)
    }
  })
})
