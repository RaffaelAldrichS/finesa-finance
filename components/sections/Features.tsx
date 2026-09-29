'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { features } from '@/lib/content'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export function Features() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '.feature-card',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
            },
          },
        )

        gsap.fromTo(
          '.feature-header',
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
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
      id="fitur"
      ref={containerRef}
      className="bg-surface relative z-10 scroll-mt-24 px-6 pt-24 pb-20 lg:px-10"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="feature-header mx-auto max-w-2xl text-center">
          <p className="eyebrow text-brand font-bold tracking-widest uppercase">FITUR UNGGULAN</p>
          <h2 className="section-title text-text mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Siklus Belajar Finesa
          </h2>
          <p className="text-text-muted mt-5 text-[15px] leading-relaxed">
            Kami mengubah pengalaman belajar finansial menjadi lebih interaktif, praktis, dan
            disesuaikan dengan kebutuhan generasi muda.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="feature-card group border-border/50 bg-surface relative flex flex-col rounded-[2rem] border p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#A7D7B5] hover:bg-white hover:shadow-md"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="text-brand flex size-12 items-center justify-center rounded-2xl bg-[#A7D7B5]/20 transition-transform duration-300 group-hover:scale-110">
                  <feature.icon className="size-6" strokeWidth={2} />
                </div>
                <span className="text-xs font-bold tracking-widest text-[#A7D7B5] uppercase">
                  {feature.concept}
                </span>
              </div>
              <h3 className="text-text text-lg font-bold">{feature.title}</h3>
              <p className="text-text-muted mt-3 flex-1 text-[13px] leading-relaxed">
                {feature.text}
              </p>

              {/* Visual connector for desktop */}
              {i < features.length - 1 && (
                <div className="absolute top-1/2 right-0 hidden translate-x-1/2 -translate-y-1/2 lg:block">
                  <ArrowRight className="text-border/50 size-5" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            href="#materi"
            className="feature-header btn-press bg-brand hover:bg-brand-hover shadow-brand/20 inline-flex items-center rounded-full px-8 py-4 text-sm font-semibold text-white shadow-lg transition-colors"
          >
            Jelajahi Materi <ArrowRight className="ml-2 size-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
