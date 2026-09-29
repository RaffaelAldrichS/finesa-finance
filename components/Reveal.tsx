'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

export function Reveal({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const split = new SplitText('.hero-title', { type: 'lines,words' })
        gsap.from(split.words, {
          y: 34,
          opacity: 0,
          duration: 0.8,
          stagger: 0.045,
          ease: 'power3.out',
          delay: 0.15,
        })
        gsap.utils.toArray<HTMLElement>('.reveal').forEach((element) => {
          gsap.from(element, {
            y: 40,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: element, start: 'top 84%' },
          })
        })
        gsap.to('.journey-art', {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: '.journey',
            scrub: true,
            onToggle: (self) => {
              gsap.set('.journey-art', { willChange: self.isActive ? 'transform' : 'auto' })
            },
          },
        })
      })

      document.fonts.ready.then(() => {
        ScrollTrigger.refresh()
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return <div ref={containerRef}>{children}</div>
}
