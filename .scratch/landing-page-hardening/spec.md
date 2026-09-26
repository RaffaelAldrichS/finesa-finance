# Spec: Landing Page Hardening

Finesa — landing page edukasi finansial, satu halaman, deploy Vercel.

## Status

Draft — menunggu review sebelum eksekusi.

## Referensi

- `CONTEXT.md` — glosarium & aset yang disimpan sadar
- `docs/adr/0001` sampai `0007` — keputusan arsitektural

## Context awal

Proyek ini didownload dari v0.app sebagai zip. Aset blob diganti ke webp lokal.
Sekarang perlu dirapikan sebelum dipublikasikan. Repo: 0 commit, 0 lint, 0 test.

## Tech stack

Next.js 16.3.3 App Router · React 19 · TypeScript 5.7.3 · Tailwind CSS 4.3.3 ·
GSAP 3.15.0 · Base UI React 1.5.0 · shadcn/ui 4.11.0 · Lucide React · Outfit font

## Scope

Landing page saja. Tidak ada app, auth, backend, atau database.

## Keputusan yang dibekukan

| #   | Keputusan                                   | ADR      |
| --- | ------------------------------------------- | -------- |
| 1   | Scope = landing page only                   | ADR-0001 |
| 2   | CTA = badge "Segera Hadir", bukan link mati | ADR-0002 |
| 3   | 38 hex → ~10 token semantik                 | ADR-0003 |
| 4   | Light-only, hapus jejak dark                | ADR-0004 |
| 5   | ESLint 9 flat + Prettier, bukan Biome       | ADR-0005 |
| 6   | Vitest + RTL smoke test                     | ADR-0006 |
| 7   | Simpan char-female/male, logo-finesa.webp   | ADR-0007 |

## Bug brand

10 kemunculan "Finesate" harus diganti ke "Finesa":
`app/layout.tsx:9`, `app/page.tsx:66,73,79×2,81×2,83,86`

## Header

Hapus tombol "Masuk" dari header. Nav final:
`logo | Beranda Fitur Materi Testimoni FAQ | badge [Segera Hadir]`

Mobile nav: sheet menu pakai Base UI Dialog (Root/Popup/Backdrop/Close).
Nav `hidden md:flex` → hamburger + sheet.

## Hero

- Teks: pertahankan, sesuaikan brand "Finesate" → "Finesa"
- "Tonton Video" → non-interaktif, label "Segera" atau hapus
- Badge Play Store / App Store → badge "Segera Hadir" (bukan link)

## Fitur

- Pertahankan 4 kartu fitur
- `features` icon: campuran string '★' + Lucide → buat union type yang benar
  atau gunakan Lucide semuanya
- Tokenisasi warna ke token semantik

## Perjalanan

- Parallax GSAP pertahankan
- Tokenisasi warna

## Materi

- Pertahankan 6 topik kartu
- Tokenisasi warna

## FAQ — section baru

- Posisi: setelah Materi, sebelum Kenapa Finesa
- Komponen: Accordion Base UI (`@base-ui/react/accordion`)
  — Root, Item, Header, Trigger, Panel
- Konten: saya draf 8-10 pertanyaan, user review
- Tema: budgeting, saving, investasi, kredit, asuransi, gamifikasi,
  berapa lama belajar, untuk siapa

## Kenapa Finesa (sebelumnya Testimoni)

- Ganti nama section dari "Testimoni" jadi "Kenapa Finesa"
- 3 testimonial dipertahankan tapi **wajib dilabeli "Contoh"**
  di bawah setiap quote — bukan "bukti nyata"
- "Bergabung bersama ribuan pengguna" → ganti bahasa prospectif
- Carousel: **fungsional dengan state**
  - useState index
  - Prev/next buttons fungsional
  - Keyboard navigation (arrow keys)
  - `aria-live="polite"` untuk screen reader
  - Indikator posisi (dots)

## Pengalaman (sebelumnya "Pengalaman Belajar Finesate")

- Semua klaim fitur → bahasa prospectif/roadmap
  - "Mode Offline" → "Mode Offline (rencana)"
  - "Notifikasi & Pengingat" → "akan hadir"
  - "Tersedia di Semua Perangkat" → "akan tersedia"
- "Lihat Preview Aplikasi" → hapus atau ganti teks
- Mockup HP `<div className="hidden">` → **hapus permanen**

## CTA (footer section)

- Badge "Segera Hadir", bukan link ke store
- QR code placeholder → pertahankan sebagai ilustrasi
- Teks: pertahankan

## Footer

- Link: pertahankan
- IG/YT: hapus atau ganti non-link (belum ada akun)
- Copyright: "Finesate" → "Finesa" + tahun berjalan

## GSAP

- `gsap.matchMedia()` untuk `prefers-reduced-motion`
- `ScrollTrigger.refresh()` setelah font Outfit + images load
- Pertahankan parallax di section Perjalanan
- `SplitText` di hero pertahankan

## Token semantik — mapping

```
--surface:          bg utama (#f6f8ed)
--surface-strong:   bg section gelap (#07534a, #064b44)
--brand:            hijau utama (#1da974, #32dc91)
--brand-hover:      hijau lebih gelap (#26c886)
--on-brand:         teks di atas brand (#064a3e)
--text:             teks utama gelap (#064a3e)
--text-muted:       teks sekunder (#508078, #6b8e84)
--border:           border halus (#dfe8d9, #dce7dd)
--surface-elevated: kartu putih transparan (white/60, white/70)
--surface-overlay:  gradient overlay (black/70, black/30)
```

## Ukuran teks minimum

Lantai 12px. Body 14px+. Semua `text-[9px]`, `text-[10px]`, `text-[11px]`
dinaikkan. 9px → minimal 12px.

## next.config.mjs

- Hapus `typescript.ignoreBuildErrors: true`
- Hapus `images.unoptimized: true`
- Tambah security headers (X-Content-Type-Options, X-Frame-Options, dll)

## Metadata & SEO

- Hapus `generator: 'v0.app'`
- Tambah `metadataBase`
- Tambah OpenGraph + Twitter card
- Tambah `sitemap.ts` + `robots.ts`

## Package

- Rename `"name": "my-project"` → `"name": "finesa"`
- `shadcn` dari `dependencies` → `devDependencies`
- Hapus `motion` dari `dependencies` (tidak dipakai)

## tsconfig.json

- `target`: "ES6" → "ES2022"
- Tambah `noUncheckedIndexedAccess: true`

## .gitignore

Tambah:

- `tsconfig.tsbuildinfo`
- `.codegraph/`
- `.env`

## Aset yang dihapus

- `public/placeholder-logo.png`
- `public/placeholder-logo.svg`
- `public/placeholder-user.jpg`
- `public/placeholder.jpg`
- `public/placeholder.svg`

## Aset yang disimpan (sadar)

Lihat CONTEXT.md bagian "Aset yang Disimpan Sadar".

## Urutan ticket

| #   | Judul                        | Blocked by     |
| --- | ---------------------------- | -------------- |
| 01  | Baseline & tooling           | —              |
| 02  | Brand fix & dead code        | 01             |
| 03  | Struktur section & token     | 02             |
| 04  | FAQ section                  | 03             |
| 05  | Konten prospectif & carousel | 03             |
| 06  | Config, metadata, SEO        | 02             |
| 07  | Motion & a11y                | 03             |
| 08  | Smoke test & final polish    | 04, 05, 06, 07 |

## Definition of done

- [ ] Semua "Finesate" → "Finesa"
- [ ] 0 dead link di nav
- [ ] Tombol carousel berfungsi
- [ ] FAQ section ada dan berfungsi
- [ ] Badge "Segera Hadir" menggantikan semua CTA mati
- [ ] Token semantik menggantikan 38 hex
- [ ] Dark mode dihapus total
- [ ] GSAP punya reduced-motion guard
- [ ] Ukuran teks minimum 12px
- [ ] Smoke test passing
- [ ] `pnpm build` tanpa error
- [ ] Commit per fase
