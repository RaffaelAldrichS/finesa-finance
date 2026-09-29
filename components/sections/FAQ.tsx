'use client'

import { useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { Accordion } from '@base-ui/react/accordion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

const faqs = [
  {
    id: 'faq-1',
    q: 'Apa itu Finesa?',
    a: 'Finesa adalah platform edukasi finansial yang membantu generasi muda belajar mengelola keuangan dengan cara yang interaktif dan menyenangkan melalui gamifikasi.',
  },
  {
    id: 'faq-2',
    q: 'Untuk siapa Finesa dirancang?',
    a: 'Finesa dirancang khusus untuk generasi muda, mulai dari pelajar, mahasiswa, hingga fresh graduate yang ingin membangun kebiasaan finansial yang sehat sejak dini.',
  },
  {
    id: 'faq-3',
    q: 'Materi apa saja yang diajarkan di Finesa?',
    a: 'Finesa mencakup 6 topik utama: Budgeting, Saving, Investasi, Kredit & Hutang, Asuransi, dan Perencanaan Masa Depan.',
  },
  {
    id: 'faq-4',
    q: 'Bagaimana cara kerja fitur gamifikasinya?',
    a: 'Setiap kali kamu menyelesaikan materi, kamu akan mendapatkan XP dan berkesempatan meraih achievement. Ada juga fitur streak untuk menjaga konsistensi belajarmu.',
  },
  {
    id: 'faq-5',
    q: 'Berapa lama waktu yang dibutuhkan untuk menyelesaikan materi?',
    a: 'Materi di Finesa didesain ringan dan ringkas. Kamu bisa menyelesaikan satu sesi belajar dalam waktu 5-10 menit saja.',
  },
  {
    id: 'faq-6',
    q: 'Apakah aplikasi Finesa sudah bisa diunduh?',
    a: 'Saat ini aplikasi Finesa masih dalam tahap pengembangan. Pantau terus update kami untuk mengetahui kapan Finesa resmi dirilis!',
  },
  {
    id: 'faq-7',
    q: 'Apakah Finesa memberikan rekomendasi saham atau kripto?',
    a: 'Tidak. Finesa fokus pada edukasi dasar dan prinsip investasi, bukan memberikan rekomendasi spesifik atau sinyal trading.',
  },
  {
    id: 'faq-8',
    q: 'Apakah Finesa gratis digunakan?',
    a: 'Ya, modul dasar Finesa dirancang untuk dapat diakses secara gratis agar edukasi finansial bisa menjangkau lebih banyak generasi muda.',
  },
]

export function FAQ() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '.faq-item',
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
            },
          },
        )

        gsap.fromTo(
          '.faq-header',
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
      id="faq"
      ref={containerRef}
      className="bg-surface relative z-20 scroll-mt-24 px-6 pt-24 pb-24 lg:px-10 lg:pt-32 lg:pb-32"
    >
      <div className="mx-auto max-w-[800px]">
        <div className="faq-header mb-12 text-center">
          <p className="eyebrow text-brand font-bold tracking-widest uppercase">FAQ</p>
          <h2 className="section-title text-text mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-text-muted mt-4 text-[15px] leading-relaxed">
            Temukan jawaban untuk pertanyaan-pertanyaan seputar Finesa.
          </p>
        </div>

        <Accordion.Root
          className="flex w-full flex-col gap-4"
          defaultValue={[faqs[0]?.id || '']}
          onValueChange={() => {
            setTimeout(() => {
              if (typeof window !== 'undefined' && ScrollTrigger) {
                ScrollTrigger.refresh(true)
              }
            }, 350)
          }}
        >
          {faqs.map((faq) => (
            <Accordion.Item
              key={faq.id}
              value={faq.id}
              className="faq-item group border-border/50 data-[panel-open]:border-brand-light overflow-hidden rounded-[20px] border bg-white transition-colors data-[panel-open]:shadow-sm"
            >
              <Accordion.Header className="m-0 flex">
                <Accordion.Trigger className="text-text hover:text-brand focus-visible:ring-brand/50 flex flex-1 cursor-pointer items-center justify-between px-6 py-5 text-left font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none">
                  <span className="text-[15px] md:text-base">{faq.q}</span>
                  <ChevronDown
                    aria-hidden="true"
                    className="text-text-muted/50 group-data-[panel-open]:text-brand h-5 w-5 shrink-0 transition-transform duration-300 group-data-[panel-open]:rotate-180"
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Panel className="grid grid-rows-[1fr] overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-in-out data-[ending-style]:grid-rows-[0fr] data-[ending-style]:opacity-0 data-[starting-style]:grid-rows-[0fr] data-[starting-style]:opacity-0">
                <div className="text-text-muted px-6 pb-6 text-[14px] leading-relaxed">{faq.a}</div>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  )
}
