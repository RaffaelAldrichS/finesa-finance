'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Reveal({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()

    // Call refresh after fonts load
    document.fonts.ready.then(refresh).catch(() => {})

    // Call refresh on window load (when all assets including images are loaded)
    window.addEventListener('load', refresh)
    const removeLoadListener = () => window.removeEventListener('load', refresh)

    return () => {
      removeLoadListener()
    }
  }, [])

  return <div ref={containerRef}>{children}</div>
}
