'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const logoImg = '/assets/logo-finesa.webp'

export function Intro() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [shouldShow, setShouldShow] = useState(false)
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    // Show only once per session
    const hasSeenIntro = sessionStorage.getItem('finesa_intro_seen')
    if (!hasSeenIntro) {
      setTimeout(() => setShouldShow(true), 0)
      sessionStorage.setItem('finesa_intro_seen', 'true')
    }
  }, [])

  useGSAP(
    () => {
      if (!shouldShow || isFinished) return

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          onComplete: () => {
            setIsFinished(true)
          },
        })

        tl.fromTo(
          '.intro-logo',
          { opacity: 0, scale: 0.9, filter: 'blur(10px)' },
          { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out' },
        )
          .fromTo(
            '.intro-line',
            { scaleX: 0 },
            { scaleX: 1, duration: 0.6, ease: 'power2.inOut', transformOrigin: 'left center' },
            '-=0.2',
          )
          .fromTo(
            '.intro-text',
            { opacity: 0, y: 5 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
            '-=0.4',
          )
          .to('.intro-logo, .intro-line, .intro-text', {
            opacity: 0,
            y: -10,
            duration: 0.4,
            ease: 'power2.in',
            delay: 0.2,
          })
          .to(containerRef.current, {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.inOut',
          })
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        setIsFinished(true)
      })

      return () => mm.revert()
    },
    { scope: containerRef, dependencies: [shouldShow, isFinished] },
  )

  if (!shouldShow || isFinished) return null

  return (
    <div
      ref={containerRef}
      className="bg-surface-strong fixed inset-0 z-[100] flex flex-col items-center justify-center"
    >
      <div className="relative flex flex-col items-center">
        <div className="intro-logo mb-6 h-12 w-auto">
          <Image
            src={logoImg}
            alt="Finesa Logo"
            width={120}
            height={40}
            className="h-full w-auto object-contain"
            priority
          />
        </div>

        <div className="h-[2px] w-48 overflow-hidden rounded-full bg-white/10">
          <div className="intro-line bg-brand-light h-full w-full" />
        </div>

        <p className="intro-text text-brand-light/80 mt-4 text-[12px] font-bold tracking-[0.2em] uppercase">
          Enter Your Financial Journey
        </p>
      </div>
    </div>
  )
}
