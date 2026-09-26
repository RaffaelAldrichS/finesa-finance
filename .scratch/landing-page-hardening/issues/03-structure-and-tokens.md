# 03 — Struktur Section & Token Semantik

Status: ready-for-agent

## Blocked by

02

## Description

Pisahkan `page.tsx` (89 baris, beberapa >1000 char) menjadi komponen section
terpisah. Buat 10 token semantik di globals.css. Isolasi GSAP ke client wrapper.

## Acceptance Criteria

### Struktur komponen
- [ ] `components/sections/Header.tsx` — nav, logo, badge Segera Hadir
- [ ] `components/sections/Hero.tsx` — hero dengan image + teks + CTA
- [ ] `components/sections/Features.tsx` — 4 kartu fitur
- [ ] `components/sections/Journey.tsx` — parallax section
- [ ] `components/sections/Topics.tsx` — 6 kartu materi
- [ ] `components/sections/Showcase.tsx` — pengalaman belajar (dengan rencana)
- [ ] `components/sections/Testimonials.tsx` — kenapa finesa
- [ ] `components/sections/CTA.tsx` — footer section
- [ ] `components/sections/Footer.tsx` — footer
- [ ] `components/Reveal.tsx` — client wrapper untuk GSAP (ScrollTrigger + SplitText)
- [ ] `app/page.tsx` menjadi Server Component yang komposisi section-section
- [ ] Data (features, topics, testimonials) dipindah ke `lib/content.ts`

### Token semantik
- [ ] 10 token ditambah ke `globals.css` `@theme inline`:
  `--surface`, `--surface-strong`, `--brand`, `--brand-hover`, `--on-brand`,
  `--text`, `--text-muted`, `--border`, `--surface-elevated`, `--surface-overlay`
- [ ] Mapping:
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
- [ ] Semua `bg-[#hex]` di section diganti ke `bg-surface` / `bg-surface-strong` / dst
- [ ] Semua `text-[#hex]` diganti ke `text-text` / `text-text-muted` / `text-brand` / dst
- [ ] Semua `border-[#hex]` diganti ke `border-border`

### Server/Client boundary
- [ ] `app/page.tsx` tidak pakai `'use client'`
- [ ] GSAP import hanya di `components/Reveal.tsx` (client component)
- [ ] `components/Reveal.tsx` wrap children dengan `gsap.context()` + `ScrollTrigger.refresh()`

### Verification
- [ ] `pnpm lint` passing
- [ ] `pnpm typecheck` passing
- [ ] `pnpm build` passing
- [ ] Visual: tidak ada perubahan yang terlihat (1:1 pixel)
- [ ] `grep -r "\[#[0-9a-fA-F]\{6\}\]" app/` menghasilkan 0 hasil

## Notes

- `page.tsx` harus benar-benar menjadi Server Component. Tapi ada masalah:
  GSAP tidak bisa jalan di server. Jadi Reveal wrapper adalah client component.
- Token semantik di Tailwind 4 pakai `@theme inline` dengan syntax:
  `--color-surface: var(--surface)` supaya bisa dipakai sebagai `bg-surface`.
- `surface-elevated` dan `surface-overlay` adalah rgba values — tidak bisa
  langsung jadi Tailwind class. Mungkin perlu custom CSS atau arbitrary value
  untuk yang ini. Prioritaskan hex-based tokens dulu.
