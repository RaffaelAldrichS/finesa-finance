# 08 — Smoke Test & Final Polish

Status: ready-for-agent

## Blocked by

04, 05, 06, 07

## Description

Buat smoke test. Final verification. Pastikan semua ticket sebelumnya
benar-benar berfungsi.

## Acceptance Criteria

### Smoke tests (Vitest + Testing Library)
- [ ] `__tests__/navigation.test.tsx`:
  - Semua `<a href="#section">` di header punya `id="section"` yang sesuai
  - Tidak ada broken anchor
- [ ] `__tests__/brand.test.tsx`:
  - Tidak ada "Finesate" di rendered output
  - "Finesa" muncul minimal 3 kali (logo, hero, footer)
- [ ] `__tests__/cta.test.tsx`:
  - Tidak ada `<a href>` yang mengarah ke halaman kosong
  - Badge "Segera Hadir" muncul
  - Tidak ada tombol dengan handler kosong (onClick={})
- [ ] `__tests__/tokens.test.tsx`:
  - Tidak ada `#[0-9a-fA-F]{6}` di rendered className
  - Semua warna pakai token semantik
- [ ] `__tests__/faq.test.tsx`:
  - Section `id="faq"` ada
  - Accordion items bisa buka/tutup
- [ ] `__tests__/carousel.test.tsx`:
  - Prev/Next buttons ada
  - Klik next → index berubah
  - Klik prev → index berubah (wrap)

### Final verification
- [ ] `pnpm lint` passing
- [ ] `pnpm typecheck` passing
- [ ] `pnpm test` passing (semua test di atas)
- [ ] `pnpm build` passing (production build)
- [ ] Visual check: tidak ada regresi visual yang terlihat
- [ ] Mobile check: nav berfungsi, FAQ berfungsi, carousel berfungsi
- [ ] A11y check: reduced motion berfungsi, teks terbaca

### Commit
- [ ] Commit terakhir: "feat: landing page hardening complete"

## Notes

- Test files di `__tests__/` di root (convention Vitest)
- Untuk testing render: `render(<Page />)` atau render per-section
- Untuk testing carousel: perlu `fireEvent.click()` pada prev/next
- Untuk testing accordion: perlu `fireEvent.click()` pada trigger
- Smoke test harus cukup untuk mencegah regresi utama, bukan comprehensive
