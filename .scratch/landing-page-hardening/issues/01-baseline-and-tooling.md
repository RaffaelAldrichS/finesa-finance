# 01 — Baseline & Tooling

Status: resolved

## Blocked by

— (unblocked)

## Description

Setup safety net sebelum menyentuh kode.
Buat baseline commit, tambah lint/format/test, fix .gitignore.

## Acceptance Criteria

- [x] `.gitignore` diperbarui: tambah `tsconfig.tsbuildinfo`, `.codegraph/`, `.env`
- [x] `pnpm add -D eslint @eslint/js eslint-config-next prettier typescript-eslint vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @vitest/coverage-v8 prettier-plugin-tailwindcss`
- [x] ESLint 9 flat config (`eslint.config.mjs`) dengan eslint-config-next
- [x] Prettier config (`prettier.config.mjs`) + `.prettierignore`
- [x] Vitest config (`vitest.config.mts`) dengan jsdom environment
- [x] Scripts ditambah: `lint`, `lint:fix`, `format`, `format:check`, `typecheck`, `test`, `test:watch`, `verify`
- [x] `typescript.ignoreBuildErrors: true` dihapus dari `next.config.mjs`
- [x] `pnpm lint` passing
- [x] `pnpm typecheck` passing
- [x] `pnpm test` passing
- [x] `pnpm build` passing — TypeScript sekarang benar-benar divalidasi
- [x] Husky + lint-staged dikonfigurasi untuk pre-commit
- [x] Baseline commit: semua file original ter-commit

## Notes

Deviasi dari rencana awal, dengan alasan:

- **ESLint 9.39.5, bukan 10.x.** `pnpm add -D eslint` menarik 10.11.0 yang
  crash dengan `TypeError: scopeManager.addGlobals is not a function` —
  parser TypeScript belum kompatibel dengan ScopeManager API ESLint 10.
  Ini sesuai ADR-0005 (ESLint 9).
- **`vitest.config.mts`, bukan `.ts`.** File `.ts` di-load sebagai CommonJS dan
  memicu warning Vite `configLoader: 'native'`. Ekstensi `.mts` menutupnya.
- **`eslint-config-next` dipakai langsung tanpa `FlatCompat`.** v16.3.6 sudah
  menyediakan flat config native, jadi tidak perlu `@eslint/eslintrc`.
- **`prettier-plugin-tailwindcss` ditambahkan.** Mengurutkan Tailwind class —
  relevan karena 55 hex hardcoded di `app/page.tsx`.
- **`pnpm verify`** dibuat sebagai shortcut: lint → typecheck → test → build.

## Results

`app/page.tsx` setelah di-format: 470 baris, baris terpanjang 150 karakter.
Sebelumnya 89 baris dengan baris sepanjang 2307 karakter.

`next build` sekarang menampilkan "Running TypeScript ..." — sebelumnya
"Skipping validation of types".

## Commits

- `df51298` docs: initialize domain context, ADRs, and local issue tracker
- `0ac3908` build: initial next.js project configuration
- `bd11d6c` feat: initial landing page from v0.app
- `0bc4234` chore: track next-env.d.ts
- `d7505b7` build: add eslint, prettier, vitest, and husky tooling
- `2074c5b` build: stop ignoring TypeScript errors in build
- `fb4f1dc` style: apply prettier formatting

## Comments

Selesai. Semua command hijau: `pnpm lint`, `pnpm typecheck`, `pnpm test`,
`pnpm build`.

Ticket berikutnya: 02 (blocked by — sudah unblocked sekarang).
