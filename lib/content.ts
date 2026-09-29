import {
  Gamepad2,
  LineChart,
  Users,
  Trophy,
  Wallet,
  PiggyBank,
  TrendingUp,
  CreditCard,
  ShieldCheck,
  Target,
} from 'lucide-react'

export const features = [
  {
    icon: Gamepad2,
    concept: 'LEARN',
    title: 'Materi Interaktif',
    text: 'Belajar dengan konten ringan, visual, dan mudah dipahami.',
  },
  {
    icon: LineChart,
    concept: 'PRACTICE',
    title: 'Simulasi Finansial',
    text: 'Latihan langsung mengelola keuangan dalam situasi nyata.',
  },
  {
    icon: Trophy,
    concept: 'PLAY',
    title: 'Gamifikasi',
    text: 'Kumpulkan XP, capai achievement, dan bangun streak.',
  },
  {
    icon: Users,
    concept: 'BUILD',
    title: 'Komunitas',
    text: 'Bertumbuh bersama pengguna lain yang punya tujuan sama.',
  },
] as const

export const topics = [
  { icon: Wallet, title: 'Budgeting', text: 'Atur pengeluaran, raih tujuan.' },
  { icon: PiggyBank, title: 'Saving', text: 'Tabung hari ini, untuk nanti.' },
  { icon: TrendingUp, title: 'Investasi', text: 'Tumbuhkan aset, raih kebebasan.' },
  { icon: CreditCard, title: 'Kredit & Hutang', text: 'Kelola dengan bijak, hindari beban.' },
  { icon: ShieldCheck, title: 'Asuransi', text: 'Lindungi diri, protect masa depan.' },
  { icon: Target, title: 'Perencanaan Masa Depan', text: 'Siapkan langkah hari ini.' },
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
  'Progress & Achievement (Rencana)',
  'Notifikasi & Pengingat (Akan hadir)',
  'Mode Offline (Rencana)',
  'Tersedia di Semua Perangkat (Akan tersedia)',
] as const

export const navItems = [
  'Beranda',
  'Fitur',
  'Perjalanan',
  'Materi',
  'FAQ',
  'Kenapa Finesa',
] as const
