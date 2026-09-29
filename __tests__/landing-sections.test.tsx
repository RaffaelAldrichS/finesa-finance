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
  it('renders testimonials with proper labels', () => {
    render(<Testimonials />)
    const labels = screen.getAllByText('Contoh Pengguna')
    expect(labels).toHaveLength(testimonials.length)
  })
})

describe('Showcase', () => {
  it('labels every unbuilt feature instead of implying it exists', () => {
    render(<Showcase />)
    expect(screen.getByText(/Mode Offline \(Rencana\)/i)).toBeInTheDocument()
    expect(screen.getByText(/Notifikasi & Pengingat \(Akan hadir\)/i)).toBeInTheDocument()
    expect(screen.getByText(/Tersedia di Semua Perangkat \(Akan tersedia\)/i)).toBeInTheDocument()
  })

  it('marks the section as a plan in its eyebrow', () => {
    render(<Showcase />)
    expect(screen.getByText(/Masa Depan Finesa/i)).toBeInTheDocument()
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
