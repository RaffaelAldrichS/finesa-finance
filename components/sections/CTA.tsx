'use client'

import { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const footerImage = '/assets/footer.webp'

export function CTA() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '.cta-reveal',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
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
      id="mulai"
      ref={containerRef}
      className="bg-surface-strong relative z-10 flex min-h-[90svh] scroll-mt-24 flex-col justify-center overflow-hidden rounded-t-[40px] px-6 py-24 text-white md:rounded-t-[80px] lg:rounded-t-[100px] lg:px-10"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={footerImage}
          alt="Lembah hijau latar belakang ajakan Finesa segera hadir"
          fill
          sizes="100vw"
          className="object-cover object-bottom"
        />
        {/* Only a very subtle darkening at the top to blend the rounded transition if needed, otherwise no heavy gradient */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1000px] flex-col items-center text-center">
        <p className="cta-reveal eyebrow font-bold tracking-widest text-[#A7D7B5] uppercase drop-shadow-md">
          SIAP MELANGKAH?
        </p>
        <h2 className="cta-reveal mt-6 text-4xl font-bold tracking-tight drop-shadow-md sm:text-5xl lg:text-7xl">
          Akhir Sebuah Titik,
          <br />
          Awal Sebuah Perjalanan
        </h2>
        <p className="cta-reveal mt-6 max-w-[500px] text-[15px] leading-relaxed font-medium text-white/90 drop-shadow-md lg:text-base">
          Aplikasi Finesa sedang dipersiapkan untuk menemanimu. Jadilah yang pertama tahu saat kami
          memulai perjalanan ini.
        </p>

        <div className="cta-reveal mt-16 text-center">
          <div className="text-brand flex size-64 flex-col items-center justify-center rounded-[2.5rem] bg-white p-8 text-center text-sm font-bold shadow-[0_20px_50px_rgba(0,0,0,0.3)] ring-4 ring-white/10 transition-transform duration-500 hover:scale-[1.02]">
            <span className="border-brand/30 bg-surface/50 mb-1 flex h-full w-full items-center justify-center rounded-3xl border-2 border-dashed text-5xl">
              QR
            </span>
          </div>
          <p className="mt-8 inline-block rounded-full bg-black/40 px-6 py-3 text-xs font-semibold tracking-wider text-white shadow-md backdrop-blur-md">
            SEGERA DI APP STORE & PLAY STORE
          </p>
        </div>
      </div>
    </section>
  )
}
