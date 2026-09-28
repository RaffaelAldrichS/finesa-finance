'use client'

import { useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { testimonials } from '@/lib/content'

export function Testimonials() {
  const [index, setIndex] = useState(0)

  const goPrev = useCallback(() => {
    setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1))
  }, [])

  const goNext = useCallback(() => {
    setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1))
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    },
    [goPrev, goNext],
  )

  const current = testimonials[index]

  if (!current) return null

  return (
    <section
      id="testimoni"
      className="bg-surface px-6 py-20 lg:px-10"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="reveal mx-auto max-w-[1160px] text-center">
        <p className="eyebrow">KENAPA FINESA</p>
        <h2 className="section-title">Cerita Nyata, Dampak Nyata</h2>
        <p className="text-text-muted mx-auto mt-3 max-w-[460px] text-sm">
          Contoh ilustratif pengalaman belajar di Finesa — bukan testimonial pengguna nyata.
        </p>
        <div
          className="mt-10 grid gap-4 text-left md:grid-cols-3"
          role="region"
          aria-live="polite"
          aria-label="Contoh pengalaman pengguna"
        >
          <blockquote
            key={current.name}
            className="border-border bg-surface-elevated rounded-2xl border p-6"
          >
            <div className="flex items-center gap-3">
              <div className="bg-brand/10 text-brand flex size-9 items-center justify-center rounded-full text-xs font-bold">
                {current.name[0]}
              </div>
              <div>
                <p className="text-text text-xs font-semibold">{current.name}</p>
                <p className="text-text-muted text-[12px]">{current.role}</p>
              </div>
            </div>
            <p className="text-text-muted mt-5 text-sm leading-6">{current.quote}</p>
            <p className="mt-4 text-sm tracking-widest text-yellow-500">★★★★★</p>
            <p className="text-brand mt-2 text-[12px] font-medium">Contoh</p>
          </blockquote>
        </div>
        <div className="text-brand mt-7 flex justify-center gap-3">
          <button
            onClick={goPrev}
            aria-label="Contoh sebelumnya"
            className="transition hover:opacity-75"
          >
            <ChevronLeft className="size-5" />
          </button>
          <span
            className="flex items-center gap-1 text-xs tracking-[0.45em]"
            aria-label={`Contoh ${index + 1} dari ${testimonials.length}`}
          >
            {testimonials.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full transition ${
                  i === index ? 'bg-brand' : 'bg-border'
                }`}
              />
            ))}
          </span>
          <button
            onClick={goNext}
            aria-label="Contoh berikutnya"
            className="transition hover:opacity-75"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
