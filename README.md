# Finesa — Landing Page

Platform edukasi finansial untuk generasi muda Indonesia. Repo ini membangun
**hanya** halaman marketing publiknya: satu URL statis yang menjelaskan apa itu
Finesa dan mengarahkan calon pengguna. Aplikasinya belum ada — lihat
[ADR-0001](docs/adr/0001-landing-page-only-scope.md).

## Stack

|             |                                                           |
| ----------- | --------------------------------------------------------- |
| Framework   | Next.js 16 (App Router, Turbopack)                        |
| UI          | React 19, Tailwind CSS v4                                 |
| Motion      | GSAP 3.15 — SplitText + ScrollTrigger                     |
| Komponen    | Base UI (dialog sheet), lucide-react                      |
| Lint/format | ESLint 9 + Prettier, dijalankan lewat husky + lint-staged |
| Test        | Vitest + Testing Library                                  |

Versi exact ada di `package.json`; `pnpm-lock.yaml` yang mengunci byte-nya.

## Menjalankan

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

Tidak ada environment variable yang wajib diisi. `next.config.mjs` tidak
memakai env sama sekali.

## Verifikasi

```bash
pnpm lint         # eslint
pnpm typecheck    # tsc --noEmit
pnpm test         # vitest run
pnpm build        # next build
pnpm verify       # keempatnya berurutan
```

`pnpm verify` adalah satu-satunya perintah yang perlu dijalankan sebelum
push. Hook `pre-commit` menjalankan Prettier dan ESLint --fix hanya pada file
yang di-stage, jadi format tidak pernah menyentuh file milik orang lain.

## Struktur

```
app/            layout, page, global CSS (token semantik + aturan motion)
components/
  Reveal.tsx    wrapper client untuk GSAP (satu-satunya tempat GSAP di-import)
  sections/     Header, Hero, Features, Journey, Topics, Showcase,
                Testimonials, CTA, Footer
lib/content.ts  seluruh teks dan data carousel
docs/adr/       keputusan arsitektur yang tidak dibatalkan diam-diam
.scratch/       spec + tiket kerja, bukan bagian dari build
```

Dua aturan yang mudah dilanggar:

- **GSAP hanya boleh di-import di `components/Reveal.tsx`.** Section tetap
  Server Component; kalau butuh animasi, bungkus dengan `<Reveal>`.
- **Warna ditulis sebagai token, bukan hex.** Token ada di
  `app/globals.css` dan dipetakan ke utility lewat `@theme inline`, jadi
  `bg-surface` bekerja dan `bg-[#f6f8ed]` tidak boleh muncul.

## Konten

Semua teks ada di `lib/content.ts` — tidak ada string Bahasa Indonesia yang
tertanam di komponen. Menambah atau mengubah topik, fitur, atau testimonial
adalah mengedit satu file itu.

Testimonial adalah kutipan contoh, bukan testimony asli, dan diberi label
"Contoh" secara terbuka. Fitur yang belum ada ditulis dalam bahasa prospectif
("rencana", "akan tersedia"). Ini keputusan yang tercatat di
[ADR-0002](docs/adr/0002-honest-pre-launch-cta.md).

## Kontribusi

Baca `AGENTS.md` dan `CONTEXT.md` lebih dulu. `CONTEXT.md` berisi kosakata
domain yang tidak boleh diubah (mis. "Finesa", bukan "Finesate";
"Segera Hadir", bukan "coming soon").

Kerja aktif dilacak sebagai tiket markdown di `.scratch/`, satu direktori per
fitur. Spec dan tiket ikut ter-commit — keduanya adalah sumber kebenaran,
bukan catatan pribadi.

## Deploy

`next build` menghasilkan output statis untuk `/` dan `/_not-found`. Tidak
ada server runtime, database, atau API di repo ini.
