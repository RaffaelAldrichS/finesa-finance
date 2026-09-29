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

- [ ] Section renamed dari "Testimoni" ke "Kenapa Finesa" di eyebrow + heading
- [ ] 3 testimonial dipertahankan
- [ ] Setiap testimonial punya label "Contoh" yang jelas (bukan disembunyikan)
- [ ] "★" rating dipertahankan tapi dengan catatan kecil "ilustrasi"

### Carousel fungsional

- [ ] State: `useState<number>(0)` untuk index aktif
- [ ] Prev/Next buttons memutar index (wrap around)
- [ ] Keyboard: arrow keys navigasi (left/right)
- [ ] `aria-live="polite"` pada container carousel
- [ ] Indikator posisi: dots atau angka (1/3)
- [ ] CSS: `overflow: hidden` pada container, translate untuk sliding
- [ ] Transisi: CSS transition (bukan GSAP) untuk simplicity
- [ ] Mobile: touch swipe? (opsional, bisa ditambahkan nanti)

### Verification

- [ ] `pnpm lint` passing
- [ ] `pnpm typecheck` passing
- [ ] `pnpm build` passing
- [ ] Klik prev/next → testimonial berubah
- [ ] Keyboard arrow → testimonial berubah
- [ ] Label "Contoh" terlihat jelas
- [ ] Fitur "Mode Offline" dll pakai bahasa prospectif

## Notes

- Carousel ini client component — harus diisolasi dari Server Component page.
- Opsi: `components/TestimonialCarousel.tsx` sebagai client component,
  dipanggil dari `components/sections/Testimonials.tsx`.
- CSS transition untuk carousel: `transform: translateX(-${index * 100}%)`
  dengan `transition: transform 200ms var(--ease-out)`.
- Untuk "Contoh": bisa pakai `<span class="text-[10px] text-text-muted">(Contoh)</span>`
  atau badge yang lebih prominent.
