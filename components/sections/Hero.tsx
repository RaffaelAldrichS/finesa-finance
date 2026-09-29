'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const heroImage = '/assets/hero.webp'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ delay: 0.2 })

        tl.fromTo(
          '.hero-bg',
          { opacity: 0, scale: 1.05 },
          { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' },
        ).fromTo(
          '.hero-stagger',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.15 },
          '-=0.8',
        )

        // Ambient mouse response
        const bgX = gsap.quickTo('.hero-bg', 'x', { duration: 0.5, ease: 'power3.out' })
        const bgY = gsap.quickTo('.hero-bg', 'y', { duration: 0.5, ease: 'power3.out' })

        const handleMouseMove = (e: MouseEvent) => {
          // Desktop only
          if (window.innerWidth >= 1024) {
            const x = (e.clientX / window.innerWidth - 0.5) * 10
            const y = (e.clientY / window.innerHeight - 0.5) * 10

            bgX(x)
            bgY(y)
          }
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
      })

      return () => mm.revert()
    },
    { scope: containerRef },
  )

  return (
    <section
      id="beranda"
      ref={containerRef}
      className="bg-surface-strong relative flex min-h-[100svh] scroll-mt-24 flex-col justify-center overflow-hidden text-white"
    >
      <div className="hero-bg absolute inset-0 z-0 scale-105 opacity-0 will-change-transform">
        <Image
          src={heroImage}
          alt="Dua pelajar menjelajah dunia finansial Finesa"
          fill
          sizes="100vw"
          priority
          className="object-cover object-[75%_top] md:object-[90%_top] lg:object-[80%_center] xl:object-right"
        />
        <div className="from-surface-strong/90 via-surface-strong/40 md:from-surface-strong/95 md:via-surface-strong/50 absolute inset-0 bg-gradient-to-t to-transparent md:bg-gradient-to-r md:to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1240px] flex-col justify-end px-6 pb-24 md:justify-center md:pb-0 lg:px-10">
        <div className="max-w-[540px] pt-24 md:pt-0">
          <h1 className="hero-stagger text-[40px] leading-[1.05] font-bold tracking-tight drop-shadow-sm md:text-5xl lg:text-6xl xl:text-[72px]">
            Belajar Finansial
            <br />
            Jadi Lebih Seru,
            <br />
            <span className="text-[#A7D7B5] drop-shadow-sm">Lebih Bermakna</span>
          </h1>
          <p className="hero-stagger mt-6 max-w-[460px] text-[15px] leading-relaxed font-medium text-white/90 md:text-base">
            Finesa adalah platform edukasi finansial berbasis gamifikasi yang membantu kamu
            memahami, mengelola, dan membangun masa depan keuangan dengan cara yang interaktif dan
            menyenangkan.
          </p>
          <div className="hero-stagger mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="#fitur"
              className="btn-press bg-brand hover:bg-brand-hover text-on-brand shadow-brand/20 rounded-full px-8 py-4 text-sm font-semibold shadow-lg transition-colors"
            >
              Mulai Perjalanan
            </Link>
            <span className="flex items-center gap-3 rounded-full border border-white/30 bg-white/5 px-6 py-4 text-sm font-semibold text-white/90 backdrop-blur-sm">
              Tonton Video{' '}
              <span className="rounded-full bg-white/20 px-2.5 py-1 text-xs tracking-wider text-white uppercase">
                Segera
              </span>
            </span>
          </div>
          <div className="hero-stagger mt-10 flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs font-medium text-white backdrop-blur-md">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#A7D7B5] opacity-75"></span>
                <span className="relative inline-flex size-2 rounded-full bg-[#A7D7B5]"></span>
              </span>
              Segera Hadir di Play Store &amp; App Store
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
