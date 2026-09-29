# 05 — Konten Prospectif & Carousel Fungsional

Status: ready-for-agent

## Blocked by

03

## Description

Ubah klaim fitur yang tidak ada ke bahasa prospectif/roadmap.
Buat testimonial carousel berfungsi. Labeli testimonial sebagai "Contoh".

## Acceptance Criteria

### Konten prospectif (Showcase section)

- [x] "Mode Offline" → "Mode Offline (rencana)"
- [x] "Notifikasi & Pengingat" → "Notifikasi & Pengingat (akan hadir)"
- [x] "Tersedia di Semua Perangkat" → "Tersedia di Semua Perangkat (akan datang)"
- [ ] "Lihat Preview Aplikasi" → hapus atau ganti teks menjadi tidak menjanjikan
- [x] "Bergabung bersama ribuan pengguna" → ganti menjadi prospectif

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
- [x] Mobile: touch swipe? (opsional, bisa ditambahkan nanti)

### Verification

- [x] `pnpm lint` passing
- [x] `pnpm typecheck` passing
- [x] `pnpm build` passing
- [x] Klik prev/next → testimonial berubah
- [x] Keyboard arrow → testimonial berubah
- [x] Label "Contoh" terlihat jelas
- [x] Fitur "Mode Offline" dll pakai bahasa prospectif

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

## Catatan fix wrap (2026-09-29)

Clone head/tail dirender, tapi kode tidak pernah menujunya: posisi track
selalu `index + 1` sehingga jatuh di rentang `1..COUNT`. Akibatnya autoplay
`(i + 1) % COUNT` di ujung dan prev di `index 0` lompat **2 slide mundur**
(jarak `2 * step`), bukan 1 maju — arah terlihat berlawanan.

Diperbaiki dengan memisahkan `pos` (posisi render, `0..COUNT+1`) dari
`index` (logis, `0..COUNT-1`):

- Lintas batas berikutnya (`COUNT-1 → 0`) → animasi ke clone tail di posisi
  `COUNT + 1`, lalu snap tanpa transition ke posisi `1`.
- Lintas batas sebelumnya (`0 → COUNT-1`) → animasi ke clone head di
  posisi `0`, lalu snap ke posisi `COUNT`.
- Semua langkah lain → langsung ke `index + 1`.

Snap dipicu `transitionend` pada track (dicek `propertyName === 'transform'`
dan `event.target === currentTarget`, karena figure juga membawa transisi
opacity yang ikut membuble), dengan fallback `setTimeout` 650 ms kalau
`transitionend` tak pernah datang (mis. `step` masih 0 saat resize). Ref
`busyRef` menahan input selama animasi wrap.

Keputusan awal **clamp + tombol disabled di ujung** dibatalkan: asumsinya
diambil dari versi file sebelumnya (107 baris, dots berupa `<span>`). Dengan
clone yang berfungsi, autoplay tetap infinite dan jarak selalu 1 slide —
AC "wrap around" di atas jadi benar-benar terpenuhi.

## Notes

- Carousel ini client component — harus diisolasi dari Server Component page.
- Opsi: `components/TestimonialCarousel.tsx` sebagai client component,
  dipanggil dari `components/sections/Testimonials.tsx`.
- CSS transition untuk carousel: `transform: translateX(-${index * 100}%)`
  dengan `transition: transform 200ms var(--ease-out)`.
- Untuk "Contoh": bisa pakai `<span class="text-[10px] text-text-muted">(Contoh)</span>`
  atau badge yang lebih prominent.

## Catatan penutup (sesi audit apple-design, 2026-09-29)

- Tiga kutip AC prospectif di atas sudah terpenuhi dengan kata bantu yang
  sedikit berbeda dari rumusan awal: "Mode Offline" dan "Notifikasi &
  Pengingat" sama-sama diberi **"(rencana)"**, "Tersedia di Semua
  Perangkat" diberi **"(akan tersedia)"**. Rumusan AC dianggap terpenuhi
  karena maksudnya — tidak ada yang ditampilkan sebagai fitur yang sudah
  ada. Heading section juga sudah menjadi "Pengalaman Belajar Finesa
  (Rencana)".
- AC "Lihat Preview Aplikasi" (baris 21) **satu-satunya yang masih terbuka**.
  Tombolnya ada di `components/sections/Showcase.tsx:43` dan mengarah ke
  `#mulai`, tetapi labelnya masih menjanjikan sebuah preview yang tidak
  pernah ada. Perlu keputusan copywriting (mis. "Lihat Cara Daftar" atau
  "Lihat Rencana Rilis") — sengaja tidak diubah diam-diam karena menyangkut
  suara merek.
- AC `aria-live` di baris 36 kini penuh **di status sr-only**, bukan di
  viewport carousel: slice 7 memindahkannya karena dua announcer (region
  dan status) menyebut perubahan yang sama dua kali kepada pembaca layar.
- Touch swipe (baris 40) diimplementasikan di commit `8730547` — pointer
  drag dengan rubber-band satu kartu, threshold 28% / 0,35 px per ms,
  `touch-action: pan-y`, dan snap-back saat scroll vertikal membatalkan
  gesture. **Belum diverifikasi di perangkat sungguhan** — lihat
  `10-audit-hardening.md`.
