import { Gamepad2, LineChart, Users } from 'lucide-react'

export const features = [
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
] as const

export const topics = [
  { icon: '◈', title: 'Budgeting', text: 'Atur pengeluaran, raih tujuan.' },
  { icon: '✦', title: 'Saving', text: 'Tabung hari ini, untuk nanti.' },
  { icon: '↗', title: 'Investasi', text: 'Tumbuhkan aset, raih kebebasan.' },
  { icon: '◉', title: 'Kredit & Hutang', text: 'Kelola dengan bijak, hindari beban.' },
  { icon: '◇', title: 'Asuransi', text: 'Lindungi diri, protect masa depan.' },
  { icon: '⌁', title: 'Perencanaan Masa Depan', text: 'Siapkan langkah hari ini.' },
] as const

export const testimonials = [
  {
    name: 'Dinda Ayu',
    role: 'Mahasiswa',
    quote:
      'Dulu aku selalu bingung ngatur uang jajan. Setelah pakai Finesa, aku jadi lebih paham dan bisa menabung tiap bulan!',
  },
  {
    name: 'Ricky Pratama',
    role: 'Fresh Graduate',
    quote:
      'Gamifikasinya bikin belajar keuangan jadi seru banget! Sekarang aku lebih disiplin dalam mengelola pengeluaran.',
  },
  {
    name: 'Salsabila N. A.',
    role: 'Pelajar',
    quote: 'Videonya keren, materinya mudah dipahami, dan ada banyak tantangan seru.',
  },
] as const

export const journeyFeatures = [
  'Progress & Achievement',
  'Notifikasi & Pengingat',
  'Mode Offline',
  'Tersedia di Semua Perangkat',
] as const

export const navItems = ['Beranda', 'Fitur', 'Materi', 'Testimoni'] as const
