'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { Check } from 'lucide-react'
import { journeyFeatures } from '@/lib/content'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const experienceImage = '/assets/handphone.webp'

export function Showcase() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          },
        })

        tl.fromTo(
          '.showcase-content',
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
          },
        )

        // Subtle parallax
        gsap.to('.showcase-image', {
          yPercent: 4,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })

      return () => mm.revert()
    },
    { scope: containerRef },
  )

  return (
    <section
      ref={containerRef}
      className="bg-surface-strong relative z-10 overflow-hidden rounded-b-[40px] text-white md:rounded-b-[80px] lg:rounded-b-[100px]"
    >
      <div className="relative mx-auto flex w-full max-w-[1672px] flex-col-reverse md:block">
        {/* Text Content in the negative space (flowed below on mobile, absolute on desktop) */}
        <div className="showcase-content relative z-20 px-6 py-16 md:absolute md:inset-y-0 md:left-0 md:flex md:w-[50%] md:flex-col md:justify-center md:p-12 lg:pl-24">
          <p className="eyebrow font-bold tracking-widest text-[#A7D7B5] uppercase drop-shadow-md">
            Masa Depan Finesa
          </p>
          <h2 className="section-title mt-6 max-w-[480px] text-3xl leading-tight font-bold tracking-tight drop-shadow-md md:text-4xl lg:text-5xl">
            Pengalaman Belajar Dalam Genggaman
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed font-medium text-white/90 drop-shadow-md md:text-base lg:max-w-[440px]">
            Aplikasi Finesa sedang dalam tahap pengembangan. Antarmuka yang intuitif, desain yang
            menyenangkan, dan fitur lengkap untuk mendukung perjalanan finansialmu.
          </p>
          <ul className="mt-8 flex flex-col gap-4 text-sm text-white/90 drop-shadow-md md:text-[15px]">
            {journeyFeatures.map((item) => (
              <li key={item} className="flex items-center gap-4">
                <div className="flex size-6 shrink-0 items-center justify-center rounded-full border border-[#A7D7B5]/30 bg-[#A7D7B5]/20 backdrop-blur-sm md:size-7">
                  <Check className="size-3 text-[#A7D7B5] md:size-3.5" strokeWidth={3} />
                </div>
                <span className="font-medium tracking-wide">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Artwork container perfectly matching the original artwork (1672x941) */}
        <div className="relative aspect-[1672/941] w-full overflow-hidden">
          <Image
            src={experienceImage}
            alt="Tampilan aplikasi Finesa di perangkat seluler"
            fill
            sizes="100vw"
            className="showcase-image object-contain will-change-transform"
          />

          {/* Reduced dark overlay, just enough for text readability on desktop */}
          <div className="from-surface-strong/60 via-surface-strong/10 pointer-events-none absolute inset-0 hidden bg-gradient-to-r to-transparent md:block md:w-[45%]" />
        </div>
      </div>
    </section>
  )
}
