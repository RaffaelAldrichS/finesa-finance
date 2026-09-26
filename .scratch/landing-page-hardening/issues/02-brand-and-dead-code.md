# 02 — Brand Fix & Dead Code

Status: ready-for-agent

## Blocked by

01

## Description

Fix brand "Finesate" → "Finesa" di semua file. Hapus dead code dan aset mati.

## Acceptance Criteria

### Brand fix
- [ ] 10 kemunculan "Finesate" diganti ke "Finesa" di:
  - `app/layout.tsx:9`
  - `app/page.tsx:66,73,79×2,81×2,83,86`
- [ ] Cek: tidak ada "Finesate" tersisa di seluruh repo (grep)

### Dead code removal
- [ ] `import { motion } from 'motion/react'` dihapus dari `app/page.tsx:5`
- [ ] `<div className="hidden">` (mockup HP, ~30 baris) dihapus dari `app/page.tsx:79`
- [ ] `components/ui/button.tsx` dihapus (tidak dipakai)
- [ ] Tombol "Masuk" dihapus dari header (`app/page.tsx:56`)
- [ ] Tombol "Masuk" dihapus dari header, badge "Segera Hadir" menggantikan kedudukannya

### Dead asset removal
- [ ] Hapus: `public/placeholder-logo.png`, `public/placeholder-logo.svg`,
  `public/placeholder-user.jpg`, `public/placeholder.jpg`, `public/placeholder.svg`
- [ ] JANGAN hapus: `char-female.webp`, `char-male.webp`, `logo-finesa.webp` (lihat ADR-0007)

### Dependency cleanup
- [ ] `shadcn` dipindah dari `dependencies` ke `devDependencies`
- [ ] `motion` dihapus dari `dependencies`

### Verification
- [ ] `pnpm lint` passing
- [ ] `pnpm typecheck` passing
- [ ] `pnpm build` passing
- [ ] Tidak ada import yang broken

## Notes

- Untuk tombol Masuk: cukup hapus dari JSX. Jangan buang seluruh header.
- `components/ui/button.tsx` hanya dipakai jika nanti ada FAQ accordion trigger —
  akan dibuat ulang di ticket 04.
- `motion` dihapus dari deps. Carousel di ticket 05 pakai `useState` saja.
