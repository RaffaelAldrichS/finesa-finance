import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { topics } from '@/lib/content'

export function Topics() {
  return (
    <section id="materi" className="bg-surface px-6 py-20 lg:px-10">
      <div className="reveal mx-auto grid max-w-[1160px] gap-12 lg:grid-cols-[1fr_1.45fr] lg:items-center">
        <div>
          <p className="eyebrow">MATERI PEMBELAJARAN</p>
          <h2 className="section-title max-w-[390px]">
            Topik yang Kamu Butuhkan, Dalam Satu Tempat
          </h2>
          <p className="text-text-muted mt-4 max-w-[320px] text-sm leading-6">
            Pelajari berbagai materi finansial yang relevan dengan kehidupan sehari-hari dan masa
            depanmu.
          </p>
          <Link
            href="#mulai"
            className="btn-press bg-brand mt-7 inline-block rounded-full px-5 py-3 text-xs font-semibold text-white"
          >
            Lihat Semua Materi <ArrowRight className="ml-1 inline size-3" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {topics.map((topic) => (
            <div
              key={topic.title}
              className="group border-border bg-surface-elevated hover:border-brand rounded-2xl border p-5 transition hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <span className="text-brand text-lg font-bold">{topic.icon}</span>
                <ArrowRight className="text-text-muted size-4 transition group-hover:translate-x-1" />
              </div>
              <h3 className="text-text mt-5 text-sm font-semibold">{topic.title}</h3>
              <p className="text-text-muted mt-2 text-[12px] leading-5">{topic.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
