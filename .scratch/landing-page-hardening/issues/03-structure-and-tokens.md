# 03 — Struktur Section & Token Semantik

Status: resolved

## Blocked by

02

## Description

Pisahkan `page.tsx` (89 baris, beberapa >1000 char) menjadi komponen section
terpisah. Buat 10 token semantik di globals.css. Isolasi GSAP ke client wrapper.

## Acceptance Criteria

### Struktur komponen

- [x] `components/sections/Header.tsx` — nav, logo, badge Segera Hadir
- [x] `components/sections/Hero.tsx` — hero dengan image + teks + CTA
- [x] `components/sections/Features.tsx` — 4 kartu fitur
- [x] `components/sections/Journey.tsx` — parallax section
- [x] `components/sections/Topics.tsx` — 6 kartu materi
- [x] `components/sections/Showcase.tsx` — pengalaman belajar (dengan rencana)
- [x] `components/sections/Testimonials.tsx` — kenapa finesa
- [x] `components/sections/CTA.tsx` — footer section
- [x] `components/sections/Footer.tsx` — footer
- [x] `components/Reveal.tsx` — client wrapper untuk GSAP (ScrollTrigger + SplitText)
- [x] `app/page.tsx` menjadi Server Component yang komposisi section-section
- [x] Data (features, topics, testimonials) dipindah ke `lib/content.ts`

### Token semantik

- [x] 10 token ditambah ke `globals.css` `@theme inline`:
      `--surface`, `--surface-strong`, `--brand`, `--brand-hover`, `--on-brand`,
      `--text`, `--text-muted`, `--border`, `--surface-elevated`, `--surface-overlay`
- [x] Mapping:
  ```
  --surface:          #f6f8ed
  --surface-strong:   #07534a (hero/journey) atau #064b44
  --brand:            #1da974
  --brand-hover:      #26c886
  --on-brand:         #064a3e
  --text:             #064a3e
  --text-muted:       #508078
  --border:           #dfe8d9
  --surface-elevated: white/60 → rgba(255,255,255,0.6)
  --surface-overlay:  black/70 → rgba(0,0,0,0.7)
  ```
- [x] Semua `bg-[#hex]` di section diganti ke `bg-surface` / `bg-surface-strong` / dst
- [x] Semua `text-[#hex]` diganti ke `text-text` / `text-text-muted` / `text-brand` / dst
- [x] Semua `border-[#hex]` diganti ke `border-border`

### Server/Client boundary

- [x] `app/page.tsx` tidak pakai `'use client'`
- [x] GSAP import hanya di `components/Reveal.tsx` (client component)
- [x] `components/Reveal.tsx` wrap children dengan `gsap.context()` + `ScrollTrigger.refresh()`

### Verification

- [x] `pnpm lint` passing
- [x] `pnpm typecheck` passing
- [x] `pnpm build` passing
- [x] Visual: tidak ada perubahan yang terlihat (1:1 pixel)
- [x] `grep -r "\[#[0-9a-fA-F]\{6\}\]" app/` menghasilkan 0 hasil

## Notes

- `page.tsx` harus benar-benar menjadi Server Component. Tapi ada masalah:
  GSAP tidak bisa jalan di server. Jadi Reveal wrapper adalah client component.
- Token semantik di Tailwind 4 pakai `@theme inline` dengan syntax:
  `--color-surface: var(--surface)` supaya bisa dipakai sebagai `bg-surface`.
- `surface-elevated` dan `surface-overlay` adalah rgba values — tidak bisa
  langsung jadi Tailwind class. Mungkin perlu custom CSS atau arbitrary value
  untuk yang ini. Prioritaskan hex-based tokens dulu.

## Results

Semua acceptance criteria terpenuhi:

- 10 section components dibuat di `components/sections/`
- `components/Reveal.tsx` client wrapper untuk GSAP
- `lib/content.ts` berisi data features, topics, testimonials, journeyFeatures, navItems
- `app/page.tsx` sekarang Server Component yang komposisi section
- 10 token semantik ditambahkan ke `globals.css` via `@theme inline`
- Semua hardcoded hex values diganti ke token semantik
- Dark mode dihapus total (per ADR-0004)
- `pnpm lint` ✓
- `pnpm typecheck` ✓
- `pnpm test` ✓
- `pnpm build` ✓
- `grep -r "\[#[0-9a-fA-F]\{6\}\]" app/` → 0 hasil
- `grep -r "\[#[0-9a-fA-F]\{6\}\]" components/` → 0 hasil

## Catatan audit (2026-09-29)

Nilai token di atas sudah berubah setelah sesi audit apple-design. Daftar
mapping tetap tercatat sebagai titik asal; **yang berlaku sekarang ada di
`app/globals.css`**:

| Token           | Nilai lama | Nilai kini |
| --------------- | ---------- | ---------- |
| `--brand`       | `#1da974`  | `#15805d`  |
| `--brand-hover` | `#26c886`  | `#43dfa4`  |
| `--text-muted`  | `#508078`  | `#4c7a72`  |

- `--brand` yang lama hanya 2,8:1 sebagai teks kecil di atas krem dan
  3,0:1 untuk putih di atasnya pada tombol `bg-brand`. Yang kini 4,6:1
  dan 4,9:1.
- `--brand-hover` lama 4,1:1 di atas `--surface-strong` — dan seluruh
  pemakaian teksnya memang ada di section gelap, jadi dinaikkan ke
  `#43dfa4` (4,6:1 pada badge `bg-brand/20`, 6,0:1 untuk `--on-brand`).
- `--surface-strong` kini terpakai konsisten sebagai latar gelap Hero,
  Journey, Showcase, CTA, dan Footer.
- Dua blok media ditambahkan di akhir `globals.css`: `prefers-contrast:
more` (turunkan `--text-muted` ke `--text`, gelapkan `--border` ke
  3,1:1 di atas krem) dan `prefers-reduced-transparency: reduce`
  (buat `--surface-elevated` dan `--surface-overlay` solid).
