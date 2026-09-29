import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const journeyImage = '/assets/gunung.webp'

export function Journey() {
  return (
    <section className="journey bg-surface-strong relative min-h-[480px] overflow-hidden text-white">
      <Image
        src={journeyImage}
        alt="Pemandangan pegunungan dengan jalur perjalanan finansial Finesa"
        fill
        sizes="100vw"
        className="journey-art object-cover object-center"
        style={{ height: '120%', bottom: 'auto' }}
      />
      <div className="from-surface-overlay absolute inset-0 bg-gradient-to-r via-black/30 to-transparent" />
      <div className="reveal relative mx-auto flex min-h-[480px] max-w-[1240px] items-start px-6 py-20 lg:px-10">
        <div className="max-w-[390px]">
          <p className="eyebrow text-brand-hover">PERJALANAN FINANSIALMU</p>
          <h2 className="mt-4 text-3xl leading-tight font-semibold tracking-tight">
            Dari Dasar Hingga Jadi
            <br />
            Lebih Mandiri
          </h2>
          <p className="mt-5 text-sm leading-6 text-white/70">
            Ikuti perjalanan belajar yang terstruktur, mulai dari memahami dasar-dasar hingga
            membangun kebiasaan finansial yang kuat.
          </p>
          <Link
            href="#materi"
            className="bg-brand-hover text-on-brand mt-7 inline-block rounded-full px-5 py-3 text-xs font-semibold"
          >
            Lihat Detail Perjalanan <ArrowRight className="ml-1 inline size-3" />
          </Link>
        </div>
      </div>
    </section>
  )
}
