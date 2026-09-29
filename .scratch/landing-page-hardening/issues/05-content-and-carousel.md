# 05 — Konten Prospectif & Carousel Fungsional

Status: ready-for-agent

## Blocked by

03

## Description

Ubah klaim fitur yang tidak ada ke bahasa prospectif/roadmap.
Buat testimonial carousel berfungsi. Labeli testimonial sebagai "Contoh".

## Acceptance Criteria

### Konten prospectif (Showcase section)

- [ ] "Mode Offline" → "Mode Offline (rencana)"
- [ ] "Notifikasi & Pengingat" → "Notifikasi & Pengingat (akan hadir)"
- [ ] "Tersedia di Semua Perangkat" → "Tersedia di Semua Perangkat (akan datang)"
- [ ] "Lihat Preview Aplikasi" → hapus atau ganti teks menjadi tidak menjanjikan
- [ ] "Bergabung bersama ribuan pengguna" → ganti menjadi prospectif

### Testimonial (Kenapa Finesa section)

- [x] Section renamed dari "Testimoni" ke "Kenapa Finesa" di eyebrow + heading
- [x] 3 testimonial dipertahankan
- [x] Setiap testimonial punya label "Contoh" yang jelas (bukan disembunyikan)
- [x] "★" rating dipertahankan tapi dengan catatan kecil "ilustrasi"

### Carousel fungsional

- [x] State: `useState<number>(0)` untuk index aktif
- [x] Prev/Next buttons memutar index (wrap around)
- [x] Keyboard: arrow keys navigasi (left/right)
- [x] `aria-live="polite"` pada container carousel
- [x] Indikator posisi: dots atau angka (1/3)
- [x] CSS: `overflow: hidden` pada container, translate untuk sliding
- [x] Transisi: CSS transition (bukan GSAP) untuk simplicity
- [ ] Mobile: touch swipe? (opsional, bisa ditambahkan nanti)

### Verification

- [x] `pnpm lint` passing
- [x] `pnpm typecheck` passing
- [x] `pnpm build` passing
- [x] Klik prev/next → testimonial berubah
- [x] Keyboard arrow → testimonial berubah
- [x] Label "Contoh" terlihat jelas
- [ ] Fitur "Mode Offline" dll pakai bahasa prospectif

## Catatan implementasi (impeccable polish, 2026-09-29)

- Heading section diganti dari "Cerita Nyata, Dampak Nyata" ke
  **"Belajar Finansial yang Terasa Ringan"** — keputusan user, menggantikan
  rename literal ke "Kenapa Finesa" (eyebrow sudah "KENAPA FINESA").
  Alasan: judul lama menjanjikan "nyata" sementara semua kutipan berlabel Contoh.
- Carousel jadi _stage_: 1 kartu aktif di tengah, tetangga kiri/kanan muncul
  sebagai peek yang ter-_mask_. Render 5 kartu (clone terakhir + 3 + clone
  pertama) supaya sisi kiri/kanan tidak pernah kosong. Autoplay 6 detik,
  berhenti saat hover/focus/manual/reduced-motion.
- Kontrol pakai tinta `--text` (bukan `--brand`) karena `--brand` #1da974
  cuma 2,8–3,0:1 di atas krem. Bintang tetap `--brand` (grafis dekoratif,
  `aria-hidden`).
- `--text-muted` #508078 → **#4c7a72** (4,3:1 → 4,7:1 di atas krem) —
  perubahan token global, menaikkan kontras teks sekunder di semua section.
- `.eyebrow` 10px → **12px** sesuai lantai teks spec (§ "Ukuran teks minimum").
- Temuan terbuka: `--brand` sebagai warna teks kecil gagal AA di seluruh
  halaman (eyebrow 2.8:1, tombol `bg-brand text-white` 3.1:1) → lihat
  `09-brand-ink.md`.

## Notes

- Carousel ini client component — harus diisolasi dari Server Component page.
- Opsi: `components/TestimonialCarousel.tsx` sebagai client component,
  dipanggil dari `components/sections/Testimonials.tsx`.
- CSS transition untuk carousel: `transform: translateX(-${index * 100}%)`
  dengan `transition: transform 200ms var(--ease-out)`.
- Untuk "Contoh": bisa pakai `<span class="text-[10px] text-text-muted">(Contoh)</span>`
  atau badge yang lebih prominent.
