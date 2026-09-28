# 02 — Brand Fix & Dead Code

Status: resolved

## Blocked by

01

## Description

Fix brand "Finesate" → "Finesa" di semua file. Hapus dead code dan aset mati.

## Acceptance Criteria

### Brand fix

- [x] 10 kemunculan "Finesate" diganti ke "Finesa" di:
  - `app/layout.tsx:9`
  - `app/page.tsx:66,73,79×2,81×2,83,86`
- [x] Cek: tidak ada "Finesate" tersisa di seluruh repo (grep)

### Dead code removal

- [x] `import { motion } from 'motion/react'` dihapus dari `app/page.tsx:5`
- [x] `<div className="hidden">` (mockup HP, ~30 baris) dihapus dari `app/page.tsx:79`
- [x] `components/ui/button.tsx` dihapus (tidak dipakai)
- [x] Tombol "Masuk" dihapus dari header (`app/page.tsx:56`)
- [x] Tombol "Masuk" dihapus dari header, badge "Segera Hadir" menggantikan kedudukannya

### Dead asset removal

- [x] Hapus: `public/placeholder-logo.png`, `public/placeholder-logo.svg`,
      `public/placeholder-user.jpg`, `public/placeholder.jpg`, `public/placeholder.svg`
- [x] JANGAN hapus: `char-female.webp`, `char-male.webp`, `logo-finesa.webp` (lihat ADR-0007)

### Dependency cleanup

- [x] `shadcn` dipindah dari `dependencies` ke `devDependencies`
- [x] `motion` dihapus dari `dependencies`

### Verification

- [x] `pnpm lint` passing
- [x] `pnpm typecheck` passing
- [x] `pnpm build` passing
- [x] Tidak ada import yang broken

## Notes

- Untuk tombol Masuk: cukup hapus dari JSX. Jangan buang seluruh header.
- `components/ui/button.tsx` hanya dipakai jika nanti ada FAQ accordion trigger —
  akan dibuat ulang di ticket 04.
- `motion` dihapus dari deps. Carousel di ticket 05 pakai `useState` saja.

## Results

Semua acceptance criteria sudah terpenuhi sejak awal — codebase sudah bersih
sebelum ticket ini dikerjakan. Verifikasi:

- `pnpm lint` ✓
- `pnpm typecheck` ✓
- `pnpm build` ✓
- `grep -r "Finesate" app/` → 0 hasil
- `motion` tidak ada di dependencies
- `shadcn` sudah di devDependencies
- Placeholder assets tidak ada di public/
- `components/ui/button.tsx` tidak ada

Ticket selesai tanpa perubahan kode.
