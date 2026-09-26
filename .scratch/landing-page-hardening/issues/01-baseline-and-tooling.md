# 01 — Baseline & Tooling

Status: ready-for-agent

## Blocked by

— (unblocked)

## Description

Setup safety net sebelum menyentuh kode.
Buat baseline commit, tambah lint/format/test, fix .gitignore.

## Acceptance Criteria

- [ ] `.gitignore` diperbarui: tambah `tsconfig.tsbuildinfo`, `.codegraph/`, `.env`
- [ ] `pnpm add -D eslint @eslint/js eslint-config-next prettier typescript-eslint @vitest/coverage-v8 vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom`
- [ ] ESLint 9 flat config (`eslint.config.mjs`) dengan eslint-config-next
- [ ] Prettier config (`.prettierrc` atau `prettier.config.mjs`)
- [ ] Vitest config (`vitest.config.ts`) dengan jsdom environment
- [ ] Scripts ditambah ke `package.json`: `"lint"`, `"format"`, `"typecheck"`, `"test"`
- [ ] `typescript.ignoreBuildErrors: true` dihapus dari `next.config.mjs`
- [ ] `pnpm lint` passing
- [ ] `pnpm typecheck` passing (tanpa `--incremental` untuk menghindari menulis tsbuildinfo)
- [ ] `pnpm test` passing (test placeholder minimal)
- [ ] Husky + lint-staged dikonfigurasi untuk pre-commit: lint-staged menjalankan prettier + eslint
- [ ] Baseline commit: semua file yang ada sekarang di-commit (termasuk CONTEXT.md, ADR, spec, .scratch)

## Notes

- `pnpm typecheck` harus pakai `tsc --noEmit` tanpa `--incremental` supaya tidak menulis tsbuildinfo
- Prettier config: printWidth 100, singleQuote true, trailingComma all
- Vitest config: environment 'jsdom', globals true
- Jangan commit `tsconfig.tsbuildinfo` ke git (sudah ada di .gitignore baru)
