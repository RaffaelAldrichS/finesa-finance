'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { topics } from '@/lib/content'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export function Topics() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '.topic-card',
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
          '.topic-header',
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
      id="materi"
      ref={containerRef}
      className="bg-surface relative z-10 scroll-mt-24 px-6 pt-32 pb-40 lg:px-10 lg:pt-40"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="topic-header flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[540px]">
            <p className="eyebrow text-brand font-bold tracking-widest uppercase">
              MATERI PEMBELAJARAN
            </p>
            <h2 className="section-title text-text mt-6 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Topik yang Kamu Butuhkan, Dalam Satu Tempat
            </h2>
            <p className="text-text-muted mt-6 text-[15px] leading-relaxed">
              Pelajari berbagai materi finansial yang relevan dengan kehidupan sehari-hari dan masa
              depanmu.
            </p>
          </div>
          <div className="hidden lg:block">
            <Link
              href="#mulai"
              className="btn-press bg-brand hover:bg-brand-hover shadow-brand/20 inline-flex items-center rounded-full px-8 py-4 text-sm font-semibold text-white shadow-lg transition-colors"
            >
              Lihat Semua Materi <ArrowRight className="ml-2 size-4" />
            </Link>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {topics.map((topic, i) => (
            <div
              key={topic.title}
              className={`topic-card group border-border/50 rounded-[2.5rem] border p-10 transition-all duration-300 hover:-translate-y-1 hover:border-[#A7D7B5] hover:shadow-xl ${i === 0 || i === 3 ? 'bg-[#A7D7B5]/10' : 'bg-white'}`}
            >
              <div className="flex items-start justify-between">
                <span
                  className={`flex size-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${i === 0 || i === 3 ? 'text-brand bg-[#A7D7B5]/20' : 'bg-surface text-brand shadow-sm'}`}
                >
                  <topic.icon className="h-7 w-7" strokeWidth={1.5} />
                </span>
                <ArrowRight className="text-text-muted/30 group-hover:text-brand size-5 transition-all duration-300 group-hover:translate-x-1" />
              </div>
              <h3 className="text-text mt-10 text-xl font-bold">{topic.title}</h3>
              <p className="text-text-muted mt-4 text-[14px] leading-relaxed">{topic.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 lg:hidden">
          <Link
            href="#mulai"
            className="btn-press bg-brand hover:bg-brand-hover shadow-brand/20 flex w-full items-center justify-center rounded-full px-8 py-4 text-sm font-semibold text-white shadow-lg transition-colors"
          >
            Lihat Semua Materi <ArrowRight className="ml-2 size-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
