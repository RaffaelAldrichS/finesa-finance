'use client'

import { useState, useCallback, useRef, useEffect, useLayoutEffect } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { testimonials } from '@/lib/content'

const COUNT = testimonials.length
const RESUME_MS = 6000
const AUTOPLAY_MS = 6000
const SNAP_MS = 650

const first = testimonials[0]
const last = testimonials[COUNT - 1]

const slides = [
  ...(last ? [{ ...last, key: `${last.name}-tail` }] : []),
  ...testimonials.map((testimonial) => ({ ...testimonial, key: testimonial.name })),
  ...(first ? [{ ...first, key: `${first.name}-head` }] : []),
]

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [pos, setPos] = useState(1)
  const [animate, setAnimate] = useState(true)
  const [step, setStep] = useState(0)
  const [offset, setOffset] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [manual, setManual] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [dragX, setDragX] = useState(0)

  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const firstCardRef = useRef<HTMLElement>(null)
  const manualTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const indexRef = useRef(0)
  const posRef = useRef(1)
  const busyRef = useRef(false)
  const snapRef = useRef<{ pos: number } | null>(null)
  const safetyTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const dragState = useRef({ pointerId: -1, startX: 0, lastX: 0, lastT: 0, velocity: 0, dx: 0 })
  const pendingDragX = useRef(0)
  const dragFrame = useRef<number | null>(null)

  const paused = hovered || focused || manual || reduced

  useLayoutEffect(() => {
    const measure = () => {
      const viewport = viewportRef.current
      const track = trackRef.current
      const card = firstCardRef.current
      if (!viewport || !track || !card) return
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0
      setStep(card.offsetWidth + gap)
      setOffset((viewport.clientWidth - card.offsetWidth) / 2)
    }
    measure()
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(measure).catch(() => {})
    }
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduced(query.matches)
    apply()
    query.addEventListener('change', apply)
    return () => query.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    return () => {
      if (manualTimer.current) clearTimeout(manualTimer.current)
      if (safetyTimer.current) clearTimeout(safetyTimer.current)
      if (dragFrame.current !== null) cancelAnimationFrame(dragFrame.current)
    }
  }, [])

  const settle = useCallback((nextPos: number) => {
    if (safetyTimer.current) {
      clearTimeout(safetyTimer.current)
      safetyTimer.current = null
    }
    snapRef.current = null
    busyRef.current = false
    posRef.current = nextPos
    setPos(nextPos)
    setAnimate(false)
  }, [])

  const move = useCallback(
    (rawTarget: number, byUser: boolean) => {
      if (busyRef.current) return
      const from = indexRef.current
      const to = ((rawTarget % COUNT) + COUNT) % COUNT
      if (to === from) return

      if (byUser) {
        setManual(true)
        if (manualTimer.current) clearTimeout(manualTimer.current)
        manualTimer.current = setTimeout(() => setManual(false), RESUME_MS)
      }

      const crossingNext = from === COUNT - 1 && to === 0
      const crossingPrev = from === 0 && to === COUNT - 1
      const destination = to + 1

      indexRef.current = to
      setIndex(to)
      setAnimate(true)

      if (crossingNext || crossingPrev) {
        const clone = crossingNext ? COUNT + 1 : 0
        const landed = crossingNext ? 1 : COUNT
        busyRef.current = true
        snapRef.current = { pos: landed }
        posRef.current = clone
        setPos(clone)
        safetyTimer.current = setTimeout(() => settle(landed), SNAP_MS)
        return
      }

      posRef.current = destination
      setPos(destination)
    },
    [settle],
  )

  const goTo = useCallback((next: number) => move(next, true), [move])

  const handleTrackEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return
    if (event.propertyName !== 'transform') return
    if (!snapRef.current) return
    settle(snapRef.current.pos)
  }

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => move(indexRef.current + 1, false), AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [paused, move])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goTo(index - 1)
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      goTo(index + 1)
    }
  }

  const rubberBand = (value: number, limit: number) => {
    const magnitude = Math.abs(value)
    if (magnitude <= limit) return value
    const sign = value < 0 ? -1 : 1
    return sign * (limit + (magnitude - limit) * 0.35)
  }

  const scheduleDrag = () => {
    if (dragFrame.current !== null) return
    dragFrame.current = requestAnimationFrame(() => {
      dragFrame.current = null
      setDragX(pendingDragX.current)
    })
  }

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (busyRef.current || event.pointerType === 'mouse') return
    const now = performance.now()
    dragState.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      lastX: event.clientX,
      lastT: now,
      velocity: 0,
      dx: 0,
    }
    pendingDragX.current = 0
    setDragX(0)
    setAnimate(false)
    setManual(true)
    if (manualTimer.current) clearTimeout(manualTimer.current)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragState.current
    if (drag.pointerId !== event.pointerId || step <= 0) return
    const now = performance.now()
    const elapsed = Math.max(now - drag.lastT, 1)
    drag.velocity = (event.clientX - drag.lastX) / elapsed
    drag.lastX = event.clientX
    drag.lastT = now
    drag.dx = rubberBand(event.clientX - drag.startX, step)
    pendingDragX.current = drag.dx
    scheduleDrag()
  }

  const finishDrag = (event: React.PointerEvent<HTMLDivElement>, commit: boolean) => {
    const drag = dragState.current
    if (drag.pointerId !== event.pointerId) return
    drag.pointerId = -1
    if (dragFrame.current !== null) {
      cancelAnimationFrame(dragFrame.current)
      dragFrame.current = null
    }
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    setAnimate(true)

    const flick = Math.abs(drag.velocity) > 0.35
    const passed = Math.abs(drag.dx) > step * 0.28
    const direction =
      Math.abs(drag.velocity) > Math.abs(drag.dx) / 120
        ? Math.sign(drag.velocity)
        : Math.sign(drag.dx)

    if (commit && (flick || passed) && direction !== 0) {
      move(indexRef.current - direction, true)
    }

    setDragX(0)

    if (manualTimer.current) clearTimeout(manualTimer.current)
    manualTimer.current = setTimeout(() => setManual(false), RESUME_MS)
  }

  const active = testimonials[index]

  return (
    <section id="testimoni" className="bg-surface px-6 py-20 lg:px-10">
      <div className="reveal mx-auto max-w-[1160px] text-center">
        <p className="eyebrow">KENAPA FINESA</p>
        <h2 className="section-title text-balance">Belajar Finansial yang Terasa Ringan</h2>
        <p className="text-text-muted mx-auto mt-4 max-w-[460px] text-sm leading-6">
          Contoh ilustratif pengalaman belajar di Finesa — bukan testimonial pengguna nyata.
        </p>

        <div
          ref={viewportRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Contoh pengalaman pengguna"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={(event) => {
            if (event.currentTarget.contains(event.relatedTarget as Node | null)) return
            setFocused(true)
          }}
          onBlur={(event) => {
            if (event.currentTarget.contains(event.relatedTarget as Node | null)) return
            setFocused(false)
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={(event) => finishDrag(event, true)}
          onPointerCancel={(event) => finishDrag(event, false)}
          className="carousel-edge-mask focus-visible:ring-text/50 mt-12 touch-pan-y overflow-hidden rounded-2xl focus-visible:ring-2 focus-visible:outline-none"
        >
          <div
            ref={trackRef}
            onTransitionEnd={handleTrackEnd}
            className="flex w-full items-stretch gap-4 sm:gap-6"
            style={{
              transform: `translate3d(${offset - pos * step + dragX}px, 0, 0)`,
              transition: animate ? 'transform 600ms var(--ease-out)' : 'none',
            }}
          >
            {slides.map((slide, slideIndex) => (
              <figure
                key={slide.key}
                ref={slideIndex === 1 ? firstCardRef : undefined}
                aria-hidden={slideIndex !== pos}
                inert={slideIndex !== pos}
                className={`border-border bg-surface-elevated w-[86%] shrink-0 rounded-2xl border p-5 shadow-[0_8px_25px_rgba(24,88,68,.06)] transition-opacity duration-500 sm:w-[62%] sm:p-7 lg:w-[48%] ${
                  slideIndex === pos ? 'opacity-100' : 'opacity-70'
                }`}
              >
                <blockquote>
                  <p className="text-text text-[15px] leading-[1.6] sm:text-[17px]">
                    “{slide.quote}”
                  </p>
                </blockquote>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                  <span className="border-brand/25 bg-brand/10 text-text inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold tracking-[0.06em] uppercase">
                    Contoh
                  </span>
                  <span className="text-text-muted flex items-center gap-1.5 text-xs">
                    <span aria-hidden="true" className="text-brand flex gap-0.5">
                      {[0, 1, 2, 3, 4].map((star) => (
                        <Star key={star} className="size-3.5 fill-current" strokeWidth={0} />
                      ))}
                    </span>
                    ilustrasi
                  </span>
                </div>

                <figcaption className="border-border mt-6 flex items-center gap-3 border-t pt-5">
                  <span className="bg-brand/10 text-text flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                    {slide.name[0]}
                  </span>
                  <span className="text-left">
                    <span className="text-text block text-sm font-semibold">{slide.name}</span>
                    <span className="text-text-muted block text-xs">{slide.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <p role="status" className="sr-only" aria-live="polite">
          {`Contoh ${index + 1} dari ${COUNT}${active ? `: ${active.name}` : ''}`}
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Contoh sebelumnya"
            className="border-border bg-surface-elevated text-text hover:border-brand/50 focus-visible:ring-text/70 flex size-11 items-center justify-center rounded-full border transition focus-visible:ring-2 focus-visible:outline-none"
          >
            <ChevronLeft className="size-4" />
          </button>

          <div className="flex items-center gap-1">
            {testimonials.map((testimonial, itemIndex) => (
              <button
                key={testimonial.name}
                type="button"
                onClick={() => goTo(itemIndex)}
                aria-label={`Tampilkan contoh ${itemIndex + 1}`}
                aria-current={itemIndex === index}
                className="group flex h-6 min-w-6 items-center justify-center px-1.5"
              >
                <span
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    itemIndex === index ? 'bg-text w-6' : 'bg-text/25 group-hover:bg-text/50 w-1.5'
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Contoh berikutnya"
            className="border-border bg-surface-elevated text-text hover:border-brand/50 focus-visible:ring-text/70 flex size-11 items-center justify-center rounded-full border transition focus-visible:ring-2 focus-visible:outline-none"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
