import Image from 'next/image'
import Link from 'next/link'

const heroImage = '/assets/hero.webp'

export function Hero() {
  return (
    <section id="beranda" className="bg-surface-strong relative min-h-[690px] text-white">
      <Image
        src={heroImage}
        alt="Dua pelajar menjelajah dunia finansial Finesa"
        fill
        sizes="100vw"
        preload
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-transparent" />
      <div className="relative mx-auto flex min-h-[690px] max-w-[1240px] items-center px-6 pt-16 lg:px-10">
        <div className="max-w-[465px]">
          <h1 className="hero-title text-5xl leading-[1.03] font-semibold tracking-[-0.055em] sm:text-6xl">
            Belajar Finansial
            <br />
            Jadi Lebih Seru,
            <br />
            <span className="text-brand-hover">Lebih Bermakna</span>
          </h1>
          <p className="mt-6 max-w-[360px] text-sm leading-6 text-white/75">
            Finesa adalah platform edukasi finansial berbasis gamifikasi yang membantu kamu
            memahami, mengelola, dan membangun masa depan keuangan dengan cara yang interaktif dan
            menyenangkan.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="#fitur"
              className="btn-press bg-brand-hover text-on-brand rounded-full px-6 py-3 text-xs font-semibold"
            >
              Mulai Perjalanan
            </Link>
            <span className="flex items-center gap-2 rounded-full border border-white/50 px-5 py-3 text-xs font-semibold text-white/70">
              Tonton Video{' '}
              <span className="bg-brand/20 text-brand-hover rounded-full px-2 py-0.5 text-[10px]">
                Segera
              </span>
            </span>
          </div>
          <div className="mt-8 flex items-center gap-2 text-xs font-medium">
            <span className="bg-brand/20 text-brand-hover rounded-full px-3 py-2">
              Segera Hadir di Play Store &amp; App Store
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
