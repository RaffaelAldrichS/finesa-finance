'use client'

import { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const journeyImage = '/assets/gunung.webp'

export function Journey() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Controlled reveal and subtle parallax
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'bottom top',
            scrub: 1,
          },
        })

        tl.to(
          '.journey-image',
          {
            yPercent: 8,
            ease: 'none',
          },
          0,
        )

        gsap.fromTo(
          '.journey-text',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 60%',
            },
          },
        )
      })

      return () => mm.revert()
    },
    { scope: containerRef },
  )

  return (
    <section
      id="perjalanan"
      ref={containerRef}
      className="bg-surface-strong relative z-20 scroll-mt-24 overflow-hidden rounded-[40px] text-white md:rounded-[80px] lg:rounded-[100px]"
    >
      <div className="relative mx-auto w-full max-w-[1717px]">
        {/* Artwork - source of truth for the journey progression */}
        {/* No empty dark-green strip above the artwork -> no padding top, text overlays */}
        <div className="relative aspect-[1717/916] w-full overflow-hidden">
          <Image
            src={journeyImage}
            alt="Pemandangan pegunungan dengan jalur perjalanan finansial Finesa"
            fill
            sizes="100vw"
            className="journey-image object-cover object-left will-change-transform md:object-contain md:object-center"
            priority
          />

          <div className="from-surface-strong/90 via-surface-strong/30 md:from-surface-strong/80 md:via-surface-strong/20 pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent md:w-2/3 md:bg-gradient-to-r" />
        </div>

        {/* Text overlaid on the artwork */}
        <div className="journey-text absolute inset-0 z-20 flex flex-col justify-end p-8 md:max-w-[500px] md:justify-center md:px-16 lg:max-w-[600px] lg:px-24">
          <p className="eyebrow font-bold tracking-widest text-[#A7D7B5] uppercase drop-shadow-md">
            Perjalanan Finansialmu
          </p>
          <h2 className="mt-4 text-3xl leading-[1.1] font-bold tracking-tight drop-shadow-md md:text-4xl lg:text-5xl">
            Dari Dasar Hingga Jadi
            <br />
            Lebih Mandiri
          </h2>
          <p className="mt-4 text-[14px] leading-relaxed font-medium text-white/90 drop-shadow-md md:mt-6 md:text-[15px]">
            Ikuti perjalanan belajar yang terstruktur, mulai dari memahami dasar-dasar hingga
            membangun kebiasaan finansial yang kuat.
          </p>
        </div>
      </div>
    </section>
  )
}
