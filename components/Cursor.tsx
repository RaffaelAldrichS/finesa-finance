'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export function Cursor() {
  const containerRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
        if (!dotRef.current || !ringRef.current || !containerRef.current) return

        // Reveal cursor when conditions are met
        gsap.set(containerRef.current, { opacity: 1 })

        // Using quickTo for high performance pointer tracking without creating new tweens
        const xToDot = gsap.quickTo(dotRef.current, 'x', { duration: 0.01, ease: 'power3' })
        const yToDot = gsap.quickTo(dotRef.current, 'y', { duration: 0.01, ease: 'power3' })

        const xToRing = gsap.quickTo(ringRef.current, 'x', { duration: 0.15, ease: 'power3' })
        const yToRing = gsap.quickTo(ringRef.current, 'y', { duration: 0.15, ease: 'power3' })

        const handleMouseMove = (e: MouseEvent) => {
          xToDot(e.clientX)
          yToDot(e.clientY)
          xToRing(e.clientX)
          yToRing(e.clientY)
        }

        const handleMouseOver = (e: MouseEvent) => {
          const target = e.target as HTMLElement

          const isInteractive = target.closest(
            'a, button, [role="button"], input, textarea, select',
          )
          const isCard = target.closest('.feature-card, .topic-card, .faq-item, .testimonial-card')
          const isArtwork = target.closest('img, .hero-bg, .journey-image, .showcase-image')

          if (isInteractive) {
            gsap.to(ringRef.current, {
              scale: 0.5,
              opacity: 0.8,
              duration: 0.2,
              overwrite: 'auto',
            })
          } else if (isCard) {
            gsap.to(ringRef.current, {
              scale: 1.5,
              opacity: 0.3,
              duration: 0.2,
              overwrite: 'auto',
            })
          } else if (isArtwork) {
            gsap.to(ringRef.current, {
              scale: 2.5,
              opacity: 0.15,
              duration: 0.4,
              overwrite: 'auto',
            })
          } else {
            gsap.to(ringRef.current, { scale: 1, opacity: 0.4, duration: 0.2, overwrite: 'auto' })
          }
        }

        const handleMouseLeave = () => {
          gsap.to([dotRef.current, ringRef.current], {
            opacity: 0,
            duration: 0.2,
            overwrite: 'auto',
          })
        }
        const handleMouseEnter = () => {
          gsap.to(dotRef.current, { opacity: 1, duration: 0.2, overwrite: 'auto' })
          gsap.to(ringRef.current, { opacity: 0.4, duration: 0.2, overwrite: 'auto' })
        }

        window.addEventListener('mousemove', handleMouseMove, { passive: true })
        window.addEventListener('mouseover', handleMouseOver, { passive: true })
        document.documentElement.addEventListener('mouseleave', handleMouseLeave)
        document.documentElement.addEventListener('mouseenter', handleMouseEnter)

        return () => {
          window.removeEventListener('mousemove', handleMouseMove)
          window.removeEventListener('mouseover', handleMouseOver)
          document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
          document.documentElement.removeEventListener('mouseenter', handleMouseEnter)

          // Hide container if media query stops matching
          if (containerRef.current) {
            gsap.set(containerRef.current, { opacity: 0 })
          }
        }
      })

      return () => mm.revert()
    },
    { scope: containerRef },
  )

  return (
    <div ref={containerRef} className="pointer-events-none opacity-0">
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[100] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#34C759]"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[99] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-[#A7D7B5] bg-transparent opacity-40"
        style={{ willChange: 'transform, width, height, opacity' }}
      />
    </div>
  )
}
