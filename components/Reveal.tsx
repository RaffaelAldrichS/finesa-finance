'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

export function Reveal({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let removeLoadListener: (() => void) | undefined

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const split = new SplitText('.hero-title', { type: 'words' })
        gsap.from(split.words, {
          y: 34,
          opacity: 0,
          duration: 0.8,
          stagger: 0.045,
          ease: 'power3.out',
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

      const refresh = () => ScrollTrigger.refresh()
      document.fonts.ready.then(refresh).catch(() => {})
      window.addEventListener('load', refresh)
      removeLoadListener = () => window.removeEventListener('load', refresh)
    }, containerRef)

    return () => {
      removeLoadListener?.()
      ctx.revert()
    }
  }, [])

  return <div ref={containerRef}>{children}</div>
}
