# 07 — Motion & Accessibility

Status: ready-for-agent

## Blocked by

03

## Description

Tambah reduced-motion guard untuk GSAP. Perbaiki ScrollTrigger.refresh().
Tingkatkan lantai ukuran teks ke 12px.

## Acceptance Criteria

### GSAP reduced-motion

- [ ] `gsap.matchMedia()` dipakai di `Reveal.tsx` untuk guard reduced-motion
- [ ] Jika `prefers-reduced-motion: reduce`:
  - SplitText tidak di-animate (langsung muncul)
  - ScrollTrigger reveal langsung muncul (opacity: 1, y: 0)
  - Parallax disabled (yPercent: 0)
- [ ] `ScrollTrigger.refresh()` dipanggil setelah:
  - Font Outfit loaded (`document.fonts.ready`)
  - Hero image loaded (onLoad callback)
  - Section images loaded (onLoad callback)

### Ukuran teks minimum

- [ ] Semua `text-[9px]` → minimal `text-[12px]`
- [ ] Semua `text-[10px]` → minimal `text-[12px]`
- [ ] Semua `text-[11px]` → minimal `text-[12px]`
- [ ] Body text: 14px atau lebih besar
- [ ] Periksa: tidak ada teks yang lebih kecil dari 12px di seluruh halaman

### A11y tambahan

- [ ] Semua `<a href>` punya `aria-label` jika konteks tidak jelas
- [ ] Tombol carousel punya `aria-label` ("Testimoni sebelumnya", "Testimoni berikutnya")
- [ ] FAQ accordion: `aria-expanded` pada trigger (otomatis dari Base UI)
- [ ] `role="banner"` pada header (otomatis dari `<header>`)
- [ ] Skip link ke konten utama? (opsional, nice-to-have)

### Verification

- [ ] `pnpm lint` passing
- [ ] `pnpm typecheck` passing
- [ ] `pnpm build` passing
- [ ] Di browser: enable "Reduced Motion" di OS → tidak ada animasi
- [ ] Semua teks terbaca di mobile (tidak ada yang terlalu kecil)
- [ ] Lighthouse accessibility score ≥ 90

## Notes

- `gsap.matchMedia()` pattern:
  ```ts
  const mm = gsap.matchMedia()
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    // animate
  })
  // default: no animation
  ```
- `ScrollTrigger.refresh()` harus dipanggil SETELAH semua image/font load,
  bukan sebelum. Timing: di `useEffect` dengan dependency [] tapi refresh()
  dipanggil dalam callback `document.fonts.ready.then(...)`.
- Untuk `text-[9px]` → `text-[12px]`: perlu memastikan layout tidak overflow.
  Cek header nav, footer, badges.
