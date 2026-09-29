import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeAll, describe, expect, it } from 'vitest'
import { CTA } from '@/components/sections/CTA'
import { Features } from '@/components/sections/Features'
import { Hero } from '@/components/sections/Hero'
import { Journey } from '@/components/sections/Journey'
import { Showcase } from '@/components/sections/Showcase'
import { Testimonials } from '@/components/sections/Testimonials'
import { testimonials } from '@/lib/content'

beforeAll(() => {
  // jsdom does not implement matchMedia; the carousel asks it about
  // prefers-reduced-motion on mount.
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  })
})

afterEach(cleanup)

describe('Testimonials', () => {
  it('renders one dot per testimonial and marks exactly one current', () => {
    render(<Testimonials />)
    const dots = screen.getAllByRole('button', { name: /Tampilkan contoh/ })
    expect(dots).toHaveLength(testimonials.length)
    expect(dots.filter((dot) => dot.getAttribute('aria-current') === 'true')).toHaveLength(1)
  })

  it('announces the position exactly once', () => {
    render(<Testimonials />)
    // One announcer, not two: the region itself must stay silent, otherwise a
    // screen reader reads every change twice.
    const viewport = screen.getByRole('region')
    expect(viewport).not.toHaveAttribute('aria-live')

    const status = screen.getByRole('status')
    expect(status).toHaveAttribute('aria-live', 'polite')
    expect(status.textContent).toContain(`Contoh 1 dari ${testimonials.length}`)
  })

  it('hides every slide except the active one from assistive tech', () => {
    const { container } = render(<Testimonials />)
    const figures = container.querySelectorAll('figure')
    // three testimonials plus a head and a tail clone
    expect(figures).toHaveLength(testimonials.length + 2)
    const exposed = Array.from(figures).filter((f) => f.getAttribute('aria-hidden') !== 'true')
    expect(exposed).toHaveLength(1)
    expect(exposed[0]?.textContent).toContain(testimonials[0].name)
  })

  it('keeps the prev and next targets at 44px', () => {
    render(<Testimonials />)
    for (const name of ['Contoh sebelumnya', 'Contoh berikutnya']) {
      expect(screen.getByRole('button', { name })).toHaveClass('size-11')
    }
  })
})

describe('Showcase', () => {
  it('labels every unbuilt feature instead of implying it exists', () => {
    render(<Showcase />)
    expect(screen.getByText(/Mode Offline \(rencana\)/)).toBeInTheDocument()
    expect(screen.getByText(/Notifikasi & Pengingat \(rencana\)/)).toBeInTheDocument()
    expect(screen.getByText(/Tersedia di Semua Perangkat \(akan tersedia\)/)).toBeInTheDocument()
  })

  it('marks the section as a plan in its heading', () => {
    render(<Showcase />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('(Rencana)')
  })
})

describe('sections render without throwing', () => {
  // next/image validates its props at render time, not at build time, so a
  // conflicting combination such as `fill` together with a style height
  // reaches the browser and crashes the section. These assertions render each
  // section that owns an image so that failure lands in the test run instead.
  const sections = [
    ['Hero', <Hero key="hero" />],
    ['Features', <Features key="features" />],
    ['Journey', <Journey key="journey" />],
    ['Showcase', <Showcase key="showcase" />],
    ['Testimonials', <Testimonials key="testimonials" />],
    ['CTA', <CTA key="cta" />],
  ] as const

  for (const [name, element] of sections) {
    it(`renders ${name}`, () => {
      expect(() => render(element)).not.toThrow()
    })
  }
})
