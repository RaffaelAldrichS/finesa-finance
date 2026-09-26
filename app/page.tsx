'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  CirclePlay,
  Gamepad2,
  LineChart,
  Users,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger, SplitText)

const heroImage = '/assets/hero.webp'
const footerImage = '/assets/footer.webp'
const experienceImage = '/assets/handphone.webp'
const journeyImage = '/assets/gunung.webp'

const features = [
  {
    icon: Gamepad2,
    title: 'Materi Interaktif',
    text: 'Belajar dengan konten ringan, visual, dan mudah dipahami.',
  },
  {
    icon: '★',
    title: 'Gamifikasi',
    text: 'Kumpulkan XP, capai achievement, dan bangun streak.',
  },
  {
    icon: LineChart,
    title: 'Simulasi Finansial',
    text: 'Latihan langsung mengelola keuangan dalam situasi nyata.',
  },
  {
    icon: Users,
    title: 'Komunitas',
    text: 'Bertumbuh bersama pengguna lain yang punya tujuan sama.',
  },
]

const topics = [
  ['◈', 'Budgeting', 'Atur pengeluaran, raih tujuan.'],
  ['✦', 'Saving', 'Tabung hari ini, untuk nanti.'],
  ['↗', 'Investasi', 'Tumbuhkan aset, raih kebebasan.'],
  ['◉', 'Kredit & Hutang', 'Kelola dengan bijak, hindari beban.'],
  ['◇', 'Asuransi', 'Lindungi diri, protect masa depan.'],
  ['⌁', 'Perencanaan Masa Depan', 'Siapkan langkah hari ini.'],
]

export default function Page() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const split = new SplitText('.hero-title', { type: 'lines,words' })
      gsap.from(split.words, {
        y: 34,
        opacity: 0,
        duration: 0.8,
        stagger: 0.045,
        ease: 'power3.out',
        delay: 0.15,
      })
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((element) => {
        gsap.from(element, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 84%' },
        })
      })
      gsap.to('.journey-art', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: { trigger: '.journey', scrub: true },
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={pageRef}
      className="min-h-screen overflow-hidden bg-[#f6f8ed] text-[#064a3e]"
    >
      <header className="absolute inset-x-0 top-0 z-20 mx-auto flex max-w-[1240px] items-center justify-between px-6 py-5 text-white lg:px-10">
        <a
          href="#beranda"
          className="flex items-center gap-2 text-[22px] font-semibold tracking-tight"
        >
          <Image
            src="/assets/logo-finesa-green.webp"
            alt=""
            width={30}
            height={30}
            loading="eager"
            className="size-[30px] rounded-[8px]"
          />{' '}
          finesa
        </a>
        <nav className="hidden items-center gap-8 text-[11px] font-medium md:flex">
          {['Beranda', 'Fitur', 'Materi', 'Testimoni', 'FAQ'].map((item, i) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={
                i === 0
                  ? 'border-b border-[#48e1a0] pb-2 text-[#6df0ad]'
                  : 'opacity-85 transition hover:text-[#6df0ad]'
              }
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4 text-[11px] font-semibold">
          <a href="#masuk" className="hidden sm:block">
            Masuk
          </a>
          <a
            href="#mulai"
            className="rounded-full bg-[#31df91] px-5 py-3 text-[#064a3e] shadow-lg shadow-[#22cc85]/20 transition hover:-translate-y-0.5"
          >
            Mulai Sekarang <ArrowRight className="ml-1 inline size-3" />
          </a>
        </div>
      </header>

      <main>
        <section
          id="beranda"
          className="relative min-h-[690px] bg-[#07534a] text-white"
        >
          <Image
            src={heroImage}
            alt="Dua pelajar menjelajah dunia finansial Finesa"
            fill
            sizes="100vw"
            preload
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
          <div className="relative mx-auto flex min-h-[690px] max-w-[1240px] items-center px-6 pt-16 lg:px-10">
            <div className="max-w-[465px]">
              <h1 className="hero-title text-5xl leading-[1.03] font-semibold tracking-[-0.055em] sm:text-6xl">
                Belajar Finansial
                <br />
                Jadi Lebih Seru,
                <br />
                <span className="text-[#30e497]">Lebih Bermakna</span>
              </h1>
              <p className="mt-6 max-w-[360px] text-sm leading-6 text-white/75">
                Finesate adalah platform edukasi finansial berbasis gamifikasi
                yang membantu kamu memahami, mengelola, dan membangun masa depan
                keuangan dengan cara yang interaktif dan menyenangkan.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#fitur"
                  className="rounded-full bg-[#32dc91] px-6 py-3 text-xs font-semibold text-[#064a3e]"
                >
                  Mulai Perjalanan <ArrowRight className="ml-1 inline size-3" />
                </a>
                <button className="flex items-center gap-2 rounded-full border border-white/50 px-5 py-3 text-xs font-semibold">
                  <CirclePlay className="size-4" /> Tonton Video
                </button>
              </div>
              <div className="mt-8 flex gap-2 text-[10px] font-medium">
                <span className="rounded-md bg-black px-3 py-2 text-white">
                  ▶ Google Play
                </span>
                <span className="rounded-md bg-black px-3 py-2 text-white">
                  ● App Store
                </span>
              </div>
            </div>
          </div>
        </section>

        <section id="fitur" className="bg-[#f6f8ed] px-6 py-16 lg:px-10">
          <div className="reveal mx-auto grid max-w-[1160px] gap-10 lg:grid-cols-[1.05fr_2fr] lg:items-center">
            <div>
              <p className="eyebrow">FITUR UNGGULAN</p>
              <h2 className="section-title">Kenapa Pilih Finesate?</h2>
              <p className="mt-4 max-w-[300px] text-sm leading-6 text-[#508078]">
                Kami mengubah pengalaman belajar finansial yang interaktif,
                praktis, dan disesuaikan dengan kebutuhan generasi muda.
              </p>
              <a
                href="#materi"
                className="mt-7 inline-block rounded-full bg-[#1da974] px-5 py-3 text-xs font-semibold text-white"
              >
                Jelajahi Semua Fitur{' '}
                <ArrowRight className="ml-1 inline size-3" />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-[#dfe8d9] bg-white/60 p-5 shadow-[0_8px_25px_rgba(24,88,68,.06)]"
                >
                  <div className="mb-5 flex size-10 items-center justify-center rounded-full bg-[#e5f3e8] text-[#087c58]">
                    {typeof feature.icon === 'string' ? (
                      feature.icon
                    ) : (
                      <feature.icon className="size-5" />
                    )}
                  </div>
                  <h3 className="text-sm font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-[11px] leading-5 text-[#6b8e84]">
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="journey relative min-h-[480px] overflow-hidden bg-[#064b44] text-white">
          <Image
            src={journeyImage}
            alt="Pemandangan pegunungan dengan jalur perjalanan finansial Finesa"
            fill
            sizes="100vw"
            className="journey-art object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
          <div className="reveal relative mx-auto flex min-h-[480px] max-w-[1240px] items-start px-6 py-20 lg:px-10">
            <div className="max-w-[390px]">
              <p className="eyebrow text-[#67e8a8]">PERJALANAN FINANSIALMU</p>
              <h2 className="mt-4 text-3xl leading-tight font-semibold tracking-tight">
                Dari Dasar Hingga Jadi
                <br />
                Lebih Mandiri
              </h2>
              <p className="mt-5 text-sm leading-6 text-white/70">
                Ikuti perjalanan belajar yang terstruktur, mulai dari memahami
                dasar-dasar hingga membangun kebiasaan finansial yang kuat.
              </p>
              <a
                href="#materi"
                className="mt-7 inline-block rounded-full bg-[#2fda90] px-5 py-3 text-xs font-semibold text-[#064a3e]"
              >
                Lihat Detail Perjalanan{' '}
                <ArrowRight className="ml-1 inline size-3" />
              </a>
            </div>
          </div>
        </section>

        <section id="materi" className="bg-[#f6f8ed] px-6 py-20 lg:px-10">
          <div className="reveal mx-auto grid max-w-[1160px] gap-12 lg:grid-cols-[1fr_1.45fr] lg:items-center">
            <div>
              <p className="eyebrow">MATERI PEMBELAJARAN</p>
              <h2 className="section-title max-w-[390px]">
                Topik yang Kamu Butuhkan, Dalam Satu Tempat
              </h2>
              <p className="mt-4 max-w-[320px] text-sm leading-6 text-[#508078]">
                Pelajari berbagai materi finansial yang relevan dengan kehidupan
                sehari-hari dan masa depanmu.
              </p>
              <a
                href="#mulai"
                className="mt-7 inline-block rounded-full bg-[#1da974] px-5 py-3 text-xs font-semibold text-white"
              >
                Lihat Semua Materi <ArrowRight className="ml-1 inline size-3" />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {topics.map(([icon, title, text]) => (
                <div
                  key={title}
                  className="group rounded-2xl border border-[#dce7dd] bg-white/70 p-5 transition hover:-translate-y-1 hover:border-[#4ed59a]"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-lg font-bold text-[#11865f]">
                      {icon}
                    </span>
                    <ArrowRight className="size-4 text-[#7fa89a] transition group-hover:translate-x-1" />
                  </div>
                  <h3 className="mt-5 text-sm font-semibold">{title}</h3>
                  <p className="mt-2 text-[11px] leading-5 text-[#719288]">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#064b44] px-6 py-20 text-white lg:px-10">
          <Image
            src={experienceImage}
            alt="Tampilan aplikasi Finesate di beberapa perangkat"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
          <div className="reveal relative mx-auto grid max-w-[1160px] gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="eyebrow text-[#67e8a8]">LIHAT LANGSUNG</p>
              <h2 className="section-title max-w-[400px]">
                Pengalaman Belajar Finesate
              </h2>
              <p className="mt-4 max-w-[360px] text-sm leading-6 text-white/70">
                Antarmuka yang intuitif, desain yang menyenangkan, dan fitur
                lengkap untuk mendukung perjalanan finansialmu.
              </p>
              <ul className="mt-6 flex flex-col gap-3 text-sm text-white/85">
                {[
                  'Progress & Achievement',
                  'Notifikasi & Pengingat',
                  'Mode Offline',
                  'Tersedia di Semua Perangkat',
                ].map((item) => (
                  <li key={item}>
                    <Check className="mr-2 inline size-4 rounded-full bg-[#31ba7e] p-0.5 text-white" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#mulai"
                className="mt-7 inline-block rounded-full bg-[#1da974] px-5 py-3 text-xs font-semibold text-white"
              >
                Lihat Preview Aplikasi{' '}
                <ArrowRight className="ml-1 inline size-3" />
              </a>
            </div>
            <div className="hidden">
              <div className="absolute inset-x-14 top-0 h-[330px] rounded-[38px] border-[7px] border-[#093e38] bg-[#0c5f50] p-3 shadow-2xl">
                <div className="h-full rounded-[27px] bg-[#e8f5df] p-5 text-[#075347]">
                  <div className="flex justify-between text-[10px]">
                    <span>Halo, Teman!</span>
                    <span>Level 12</span>
                  </div>
                  <div className="mt-8 text-3xl font-bold">Rp 2.450.000</div>
                  <div className="mt-8 rounded-2xl bg-white p-4 text-xs shadow-sm">
                    Progress minggu ini{' '}
                    <div className="mt-3 h-2 rounded-full bg-[#ccebd9]">
                      <div className="h-full w-3/4 rounded-full bg-[#26c886]" />
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[9px]">
                    <span className="rounded-xl bg-white p-3">Materi</span>
                    <span className="rounded-xl bg-white p-3">Misi</span>
                    <span className="rounded-xl bg-white p-3">Pencapaian</span>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-5 left-0 rounded-2xl bg-white px-4 py-3 text-xs font-semibold text-[#09634f] shadow-xl">
                +50 XP
                <br />
                <span className="text-[10px] font-normal">
                  Catat Pengeluaran
                </span>
              </div>
            </div>
          </div>
        </section>

        <section id="testimoni" className="bg-[#f6f8ed] px-6 py-20 lg:px-10">
          <div className="reveal mx-auto max-w-[1160px] text-center">
            <p className="eyebrow">APA KATA MEREKA</p>
            <h2 className="section-title">Cerita Nyata, Dampak Nyata</h2>
            <p className="mx-auto mt-3 max-w-[460px] text-sm text-[#719288]">
              Bergabung bersama ribuan pengguna yang sudah merasakan manfaat
              Finesate.
            </p>
            <div className="mt-10 grid gap-4 text-left md:grid-cols-3">
              {[
                [
                  'Dinda Ayu',
                  'Mahasiswa',
                  '“Dulu aku selalu bingung ngatur uang jajan. Setelah pakai Finesate, aku jadi lebih paham dan bisa menabung tiap bulan!”',
                ],
                [
                  'Ricky Pratama',
                  'Fresh Graduate',
                  '“Gamifikasinya bikin belajar keuangan jadi seru banget! Sekarang aku lebih disiplin dalam mengelola pengeluaran.”',
                ],
                [
                  'Salsabila N. A.',
                  'Pelajar',
                  '“Videonya keren, materinya mudah dipahami, dan ada banyak tantangan seru.”',
                ],
              ].map(([name, role, quote]) => (
                <blockquote
                  key={name}
                  className="rounded-2xl border border-[#dce7dd] bg-white/70 p-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-full bg-[#c9e5d3] text-xs font-bold">
                      {name[0]}
                    </div>
                    <div>
                      <p className="text-xs font-semibold">{name}</p>
                      <p className="text-[10px] text-[#80a095]">{role}</p>
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-6 text-[#668a7f]">
                    {quote}
                  </p>
                  <p className="mt-4 text-sm tracking-widest text-[#edb735]">
                    ★★★★★
                  </p>
                </blockquote>
              ))}
            </div>
            <div className="mt-7 flex justify-center gap-3 text-[#1da974]">
              <button aria-label="Testimoni sebelumnya">
                <ChevronLeft />
              </button>
              <span className="text-xs tracking-[0.45em]">••••</span>
              <button aria-label="Testimoni berikutnya">
                <ChevronRight />
              </button>
            </div>
          </div>
        </section>

        <section
          id="mulai"
          className="relative overflow-hidden bg-[#07534a] px-6 py-20 text-white lg:px-10"
        >
          <Image
            src={footerImage}
            alt="Lembah hijau untuk ajakan mengunduh aplikasi"
            fill
            sizes="100vw"
            className="object-cover object-bottom opacity-55"
          />
          <div className="absolute inset-0 bg-[#034b44]/70" />
          <div className="relative mx-auto flex max-w-[1040px] flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
            <div>
              <p className="eyebrow text-[#67e8a8]">SIAP MELANGKAH?</p>
              <h2 className="mt-3 text-3xl font-semibold">
                Download Finesate Sekarang!
              </h2>
              <p className="mt-3 max-w-[350px] text-sm text-white/70">
                Jelajahi dunia finansial dengan lebih seru dan bermakna.
              </p>
              <div className="mt-5 flex gap-2 text-[10px] font-medium">
                <span className="rounded-md bg-black px-3 py-2">
                  ▶ Google Play
                </span>
                <span className="rounded-md bg-black px-3 py-2">
                  ● App Store
                </span>
              </div>
            </div>
            <div className="flex size-32 items-center justify-center rounded-xl bg-white p-3 text-center text-xs font-bold text-[#0a614f] shadow-2xl">
              SCAN
              <br />
              QR CODE
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#043d39] px-6 py-7 text-white/75 lg:px-10">
        <div className="mx-auto flex max-w-[1160px] flex-col items-center justify-between gap-5 sm:flex-row">
          <a
            href="#beranda"
            className="flex items-center gap-2 text-lg font-semibold text-white"
          >
            <Image
              src="/assets/logo-finesa-green.webp"
              alt=""
              width={24}
              height={24}
              className="size-[24px] rounded-[6px]"
            />{' '}
            finesa
          </a>
          <nav className="flex gap-5 text-[10px]">
            <a href="#beranda">Beranda</a>
            <a href="#fitur">Fitur</a>
            <a href="#materi">Materi</a>
            <a href="#testimoni">Testimoni</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className="flex gap-3 text-[10px] font-bold">
            <span aria-label="Instagram">IG</span>
            <span aria-label="Youtube">YT</span>
          </div>
        </div>
        <div className="mx-auto mt-6 flex max-w-[1160px] justify-between border-t border-white/10 pt-5 text-[9px] text-white/40">
          <span>© 2025 Finesate. Semua hak dilindungi.</span>
          <span className="hidden sm:block">
            Belajar • Berkembang • Bebas Finansial
          </span>
        </div>
      </footer>
    </div>
  )
}
