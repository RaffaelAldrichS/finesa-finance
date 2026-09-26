# 06 — Config, Metadata & SEO

Status: ready-for-agent

## Blocked by

02

## Description

Bersihkan next.config.mjs, metadata, package.json, tsconfig.
Tambah OG image, sitemap, robots, security headers.

## Acceptance Criteria

### next.config.mjs

- [ ] `typescript.ignoreBuildErrors: true` sudah dihapus (ticket 01)
- [ ] `images.unoptimized: true` dihapus → next/image optimization aktif
- [ ] Security headers ditambah:
  ```
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  ```

### Metadata (app/layout.tsx)

- [ ] `generator: 'v0.app'` dihapus
- [ ] `metadataBase` ditambah (URL Vercel production, misal `https://finesa.vercel.app`)
- [ ] OpenGraph ditambah: title, description, images
- [ ] Twitter card ditambah
- [ ] `icons.icon` dipertahankan (icon-light, icon-dark, icon.svg dari v0)

### Sitemap & Robots

- [ ] `app/sitemap.ts` dibuat (static sitemap untuk landing page)
- [ ] `app/robots.ts` dibuat (izinkan semua crawler)

### Package

- [ ] `"name": "my-project"` → `"name": "finesa"`
- [ ] `shadcn` sudah di `devDependencies` (ticket 02)
- [ ] `motion` sudah dihapus (ticket 02)

### tsconfig.json

- [ ] `"target": "ES6"` → `"target": "ES2022"`
- [ ] `noUncheckedIndexedAccess: true` ditambah

### Verification

- [ ] `pnpm lint` passing
- [ ] `pnpm typecheck` passing (termasuk noUncheckedIndexedAccess)
- [ ] `pnpm build` passing
- [ ] `curl -I https://finesa.vercel.app` menunjukkan security headers
- [ ] `/sitemap.xml` mengembalikan XML valid
- [ ] `/robots.txt` mengembalikan rules yang benar

## Notes

- `metadataBase` harus pakai URL produksi Vercel. Jika belum tahu, pakai
  placeholder `https://finesa.vercel.app` dan update nanti.
- OG image: bisa pakai `public/og-default.png` atau generate dari aset yang ada.
  Untuk sekarang, pakai hero image sebagai OG.
- `noUncheckedIndexedAccess` akan membuat beberapa kode tidak compile —
  perlu `!` assertion atau null check. Ticket ini termasuk fix compile errors.
- tsconfig: jangan ubah `incremental: true` ke `false` — biarkan default.
  Tapi `typecheck` script harus pakai `--noEmit` tanpa `--incremental`.
