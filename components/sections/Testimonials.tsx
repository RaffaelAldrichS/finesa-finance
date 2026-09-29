'use client'

import { useRef } from 'react'
import { Star } from 'lucide-react'
import { testimonials } from '@/lib/content'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '.testimonial-card',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
            },
          },
        )

        gsap.fromTo(
          '.testimonial-header',
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
      id="kenapa-finesa"
      ref={containerRef}
      className="bg-surface scroll-mt-24 px-6 pt-12 pb-32 lg:px-10"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="testimonial-header mx-auto max-w-2xl text-center">
          <p className="eyebrow text-brand font-bold tracking-widest uppercase">KENAPA FINESA</p>
          <h2 className="section-title text-text mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Belajar Finansial yang Terasa Lebih Mudah
          </h2>
          <p className="text-text-muted mt-5 text-[15px] leading-relaxed">
            Membangun kebiasaan finansial yang sehat tidak harus membosankan. Finesa dirancang agar
            siapa saja dapat mulai belajar dengan cara yang relevan, interaktif, dan berdampak.
          </p>
        </div>

        <div className="carousel-edge-mask mt-16 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8 md:grid md:snap-none md:grid-cols-3 md:overflow-visible md:pb-0">
          {testimonials.map((testimonial, i) => (
            <figure
              key={testimonial.name}
              className={`testimonial-card border-border/50 hover:border-brand-light flex w-[85vw] shrink-0 snap-center flex-col rounded-[2.5rem] border bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md md:w-auto ${i === 1 ? 'md:translate-y-6' : ''}`}
            >
              <div className="bg-brand-light/20 mb-4 inline-flex items-center self-start rounded-full px-3 py-1">
                <span className="text-surface-strong text-xs font-bold tracking-widest uppercase">
                  Contoh Pengguna
                </span>
              </div>
              <div className="text-brand mb-6 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    aria-hidden="true"
                    key={i}
                    className="size-4 fill-current"
                    strokeWidth={0}
                  />
                ))}
                <span className="sr-only">Penilaian 5 bintang</span>
              </div>

              <blockquote className="flex-1">
                <p className="text-text text-[15px] leading-relaxed font-medium">
                  "{testimonial.quote}"
                </p>
              </blockquote>

              <figcaption className="mt-8 flex items-center gap-4">
                <div className="bg-brand-light/20 text-surface-strong flex size-12 shrink-0 items-center justify-center rounded-2xl text-lg font-bold">
                  {testimonial.name[0]}
                </div>
                <div>
                  <span className="text-text block text-[14px] font-bold">{testimonial.name}</span>
                  <span className="text-text-muted block text-xs">{testimonial.role}</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
