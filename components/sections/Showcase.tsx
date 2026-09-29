import Image from 'next/image'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import { journeyFeatures } from '@/lib/content'

const experienceImage = '/assets/handphone.webp'

export function Showcase() {
  return (
    <section className="bg-surface-strong relative overflow-hidden px-6 py-20 text-white lg:px-10">
      <Image
        src={experienceImage}
        alt="Tampilan aplikasi Finesa di beberapa perangkat"
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/80 to-black/60 md:bg-gradient-to-r md:from-black/85 md:via-black/75 md:to-black/20" />
      <div className="reveal relative mx-auto grid max-w-[1160px] gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow text-brand-hover">LIHAT LANGSUNG</p>
          <h2 className="section-title max-w-[400px]">Pengalaman Belajar Finesa (Rencana)</h2>
          <p className="mt-4 max-w-[360px] text-sm leading-6 text-white/70">
            Antarmuka yang intuitif, desain yang menyenangkan, dan fitur lengkap untuk mendukung
            perjalanan finansialmu.
          </p>
          <ul className="mt-6 flex flex-col gap-3 text-sm text-white/85">
            {journeyFeatures.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="bg-brand-hover size-4 rounded-full p-0.5 text-white" />
                <span>
                  {item}{' '}
                  {item === 'Mode Offline' || item === 'Notifikasi & Pengingat'
                    ? '(rencana)'
                    : item === 'Tersedia di Semua Perangkat'
                      ? '(akan tersedia)'
                      : ''}
                </span>
              </li>
            ))}
          </ul>
          <Link
            href="#mulai"
            className="btn-press bg-brand mt-7 inline-block rounded-full px-5 py-3 text-xs font-semibold text-white"
          >
            Lihat Preview Aplikasi <ArrowRight className="ml-1 inline size-3" />
          </Link>
        </div>
        <div />
      </div>
    </section>
  )
}
