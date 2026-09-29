import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { features } from '@/lib/content'

export function Features() {
  return (
    <section id="fitur" className="bg-surface px-6 py-16 lg:px-10">
      <div className="reveal mx-auto grid max-w-[1160px] gap-10 lg:grid-cols-[1.05fr_2fr] lg:items-center">
        <div>
          <p className="eyebrow">FITUR UNGGULAN</p>
          <h2 className="section-title">Kenapa Pilih Finesa?</h2>
          <p className="text-text-muted mt-4 max-w-[300px] text-sm leading-6">
            Kami mengubah pengalaman belajar finansial yang interaktif, praktis, dan disesuaikan
            dengan kebutuhan generasi muda.
          </p>
          <Link
            href="#materi"
            className="btn-press bg-brand mt-7 inline-block rounded-full px-5 py-3 text-xs font-semibold text-white"
          >
            Jelajahi Semua Fitur <ArrowRight className="ml-1 inline size-3" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="border-border bg-surface-elevated rounded-2xl border p-5 shadow-[0_8px_25px_rgba(24,88,68,.06)]"
            >
              <div className="bg-brand/10 text-brand mb-5 flex size-10 items-center justify-center rounded-full">
                {typeof feature.icon === 'string' ? (
                  feature.icon
                ) : (
                  <feature.icon className="size-5" />
                )}
              </div>
              <h3 className="text-text text-sm font-semibold">{feature.title}</h3>
              <p className="text-text-muted mt-2 text-[12px] leading-5">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
