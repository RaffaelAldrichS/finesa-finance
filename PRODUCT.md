# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Pelajar dan mahasiswa Indonesia (17–24 tahun) yang uang jajan atau
pemasukannya belum teratur, dan belum pernah memakai aplikasi keuangan.
Mereka datang dari promosi atau pencarian topik finansial ke satu halaman
marketing; konteksnya singkat dan skeptis terhadap klaim.

## Product Purpose

Memperkenalkan Finesa — platform edukasi finansial berbasis gamifikasi —
sebelum aplikasinya ada, dan membangun kredibilitasnya di mata calon
pengguna. Sukses halaman ini sekarang = pengunjung paham apa itu Finesa,
percaya ia akan hadir, dan tidak pernah disesatkan tentang ketersediaan.
Konversi ke store bukan target pra-rilis.

## Positioning

Mekanisme pembeda: **gamifikasi** — XP, achievement, dan streak — sehingga
belajar finansial terasa seperti permainan, bukan tugas. Produk tetangga
umumnya mencatat transaksi atau menyajikan materi statis; Finesa mengajak
lewat permainan dan progres berjenjang.

## Operating Context

- Repo ini membangun **satu halaman marketing satu URL**, deploy ke Vercel.
  Aplikasi Finesa sendiri dibangun di luar repo dan belum tersedia.
- Bahasa dokumen dan copy: Indonesia. Kode dan identifier: English.
- Alur kerja lewat issue markdown di `.scratch/landing-page-hardening/`
  (spec + ticket bernomor) dan keputusan arsitektural di `docs/adr/`.
- Perubahan visual diverifikasi lewat dev server `pnpm dev` dan pemeriksaan
  mekanis (detector) sebelum selesai.

## Capabilities and Constraints

- Deliverable = landing page saja; tanpa app, auth, backend, atau database.
- Semua CTA harus jujur: badge **"Segera Hadir"**, bukan link mati ke store.
- Light-only — dark mode dihapus; palet dari ~10 token semantik
  (bukan hex hardcoded), ganti brand = ganti satu tempat.
- Testimonial wajib dilabeli **"Contoh"** dan disampaikan sebagai ilustrasi.
- Fitur yang belum dibangun selalu disebut dengan bahasa prospectif
  ("akan hadir", "rencana"), bukan "tersedia".
- Lantai ukuran teks 12px, body 14px+.
- Belum diputuskan (tercatat, bukan diarang): mekanisme untuk mengumpulkan
  calon pengguna (waitlist/email), keberadaan kanal sosial, dan target
  aksesibilitas formal (mis. WCAG level) belum didefinisikan.

## Brand Commitments

- Nama: **Finesa** — satu kata, huruf besar di awal kalimat. Hindari
  "Finesate", "Finesa Finance", "finsa".
- Suara: jujur, ringan, dan prospectif; tidak menjanjikan hal yang belum ada.
- Label **"Segera Hadir"** dipakai sebagai badge, bukan tombol.
- Aset yang disimpan sadar dan tidak boleh dihapus tanpa konfirmasi manusia:
  `public/assets/char-female.webp`, `public/assets/char-male.webp`,
  `public/assets/logo-finesa.webp`.

## Evidence on Hand

**Tidak ada bukti nyata tentang pengguna atau produk.** Repo ini tanpa
pengguna, tanpa listing store, tanpa kanal sosial, tanpa press.

- Tiga "testimonial" di `lib/content.ts` adalah **ilustrasi**, wajib
  berlabel "Contoh" — bukan kutipan orang sungguhan.
- QR code dan badge store di section CTA adalah ilustrasi, bukan tautan.
- Kumpulan fitur di `lib/content.ts` (materi interaktif, gamifikasi,
  simulasi, komunitas) adalah deskripsi produk yang sedang dibangun, bukan
  penggunaan yang sudah terbukti.

Jangan menambahkan testimoni, angka pengguna, benchmark, harga, atau
klaim store tanpa bukti dari manusia.

## Product Principles

1. Jujur tentang apa yang belum ada — setiap klaim harus bisa ditunjuk
   buktinya, atau dilabeli sebagai ilustrasi.
2. Bahasa prospectif untuk hal yang belum dibangun; tanpa "sudah tersedia".
3. Ringan dan bermain — pembelajaran finansial untuk generasi muda terasa
   seperti permainan, bukan pelajaran formal.
4. Pertahankan keputusan yang sudah dibekukan (token semantik, light-only,
   aset tersimpan sadar) alih-alih menggantinya diam-diam.
