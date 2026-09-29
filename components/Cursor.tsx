'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only enable on fine pointers (desktop) and when user accepts motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (isTouch || isReducedMotion) return

    setTimeout(() => setIsVisible(true), 0)

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

      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select')
      const isCard = target.closest('.feature-card, .topic-card, .faq-item, .testimonial-card')
      const isArtwork = target.closest('img, .hero-bg, .journey-image')

      if (isInteractive) {
        gsap.to(ringRef.current, { scale: 0.5, opacity: 0.8, duration: 0.2, overwrite: 'auto' })
      } else if (isCard) {
        gsap.to(ringRef.current, { scale: 1.5, opacity: 0.3, duration: 0.2, overwrite: 'auto' })
      } else if (isArtwork) {
        gsap.to(ringRef.current, { scale: 2.5, opacity: 0.15, duration: 0.4, overwrite: 'auto' })
      } else {
        gsap.to(ringRef.current, { scale: 1, opacity: 0.4, duration: 0.2, overwrite: 'auto' })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)

    // Hide cursor when leaving window
    const handleMouseLeave = () => {
      gsap.to([dotRef.current, ringRef.current], { opacity: 0, duration: 0.2 })
    }
    const handleMouseEnter = () => {
      gsap.to(dotRef.current, { opacity: 1, duration: 0.2 })
      gsap.to(ringRef.current, { opacity: 0.4, duration: 0.2 }) // Default opacity
    }

    document.documentElement.addEventListener('mouseleave', handleMouseLeave)
    document.documentElement.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* 
        Native pointer remains visible because we aren't using cursor: none on body.
        This provides an ambient enhancement ("financial compass" motif) without hiding the real cursor.
      */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[100] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#34C759]"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[99] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-[#A7D7B5] bg-transparent opacity-40"
        style={{ willChange: 'transform, width, height, opacity' }}
      />
    </>
  )
}
