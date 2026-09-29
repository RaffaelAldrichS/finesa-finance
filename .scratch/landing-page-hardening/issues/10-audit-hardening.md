# 10 — Sisa Temuan Audit Apple-Design

Status: ready-for-agent

## Blocked by

01, 05, 06, 07

## Description

Tempat penampungan untuk semua temuan audit apple-design (2026-09-29)
yang **tidak** masuk dalam 10 slice eksekusi, plus koreksi atas klaim
audit yang ternyata keliru. Sengaja dipisah dari `09-brand-ink.md` karena
nomor 09 sudah dipakai sebelum sesi berjalan.

Hasil eksekusi sesi ini — 10 slice, masing-masing satu commit:

| Slice | Commit    | Judul                                                                |
| ----- | --------- | -------------------------------------------------------------------- |
| 1     | `e86b0bb` | cascade list `.btn-press` asimetris + buang class mati               |
| 2     | `0084009` | CTA jujur "Segera Hadir", sheet nav mobile, FAQ hilang dari nav      |
| 3     | `990180c` | carousel lintas lewat clone head/tail                                |
| 4     | `8796534` | journey parallax dapat ruang gerak + `will-change` disunahkan        |
| 5     | `12505ec` | hover lift di belakang `@media (hover:hover)`                        |
| 6     | `5a4268b` | `--brand`/`--brand-hover` digelapkan, focus dua ton, scrim dikuatkan |
| 7     | `2a16b21` | satu pengumum carousel, `inert` slide pasif, skip link               |
| 8     | `581238a` | SplitText hanya `words`, buang delay 150ms, re-measure saat `load`   |
| 9     | `8730547` | pointer drag carousel (rubber-band, threshold, `touch-pan-y`)        |
| 10    | `88ee6a0` | `prefers-contrast: more` + `prefers-reduced-transparency: reduce`    |

Baseline dibandingkan: `e4b0cb4`.

## Acceptance Criteria

### Koreksi temuan audit

- [x] **`next/image` `preload` bukan prop invalid.** Audit meminta
      `Hero.tsx:29` dibersihkan dari `preload`, tetapi di Next 16 yang
      deprecated justru `priority` (`get-img-props.d.ts:23-28`:
      `@deprecated Use 'preload' prop instead`). Kode dibiarkan; `priority`
      tidak ditambahkan. **Jangan "diperbaiki" lagi di sesi lain.**
- [x] **Kontras `--brand`** ditutup di `09-brand-ink.md` oleh slice 6.
- [x] **`.eyebrow` menimpa utility** — `color: var(--brand)`-nya didefinisikan
      di luar layer sehingga `text-brand-hover` kalah. Dipindah ke
      `@layer base` di slice 6.

### Masih terbuka — perlu keputusan atau pengerjaan terpisah

- [ ] **Teks di bawah lantai 12px** (spec "Ukuran teks minimum"):
      `Header.tsx:27` dan `Header.tsx:44` (`text-[11px]`),
      `Hero.tsx:41` (`text-[10px]`). Milik tiket 07. `.eyebrow` sudah 12px.
- [ ] **`images.unoptimized: true` di `next.config.mjs`** — gambar tidak
      dikompresi Next. Milik tiket 06; sengaja tidak disentuh.
- [ ] **Section FAQ belum pernah dibangun** — nav sudah dibersihkan di
      slice 2 sehingga tidak ada anchor mati, tapi spec §76-83 masih
      meminta sectionnya. Milik tiket 04.
- [ ] **"Lihat Preview Aplikasi" di `Showcase.tsx:43`** masih menjanjikan
      preview yang tidak ada. Milik tiket 05 (AC baris 21) — butuh
      keputusan copywriting.
- [ ] **Drag carousel belum diuji di perangkat sentuh.** Logika sudah
      lengkap (pointer capture, rubber-band, threshold 28% / 0,35 px per ms,
      cancel saat scroll), tapi gestur sentuh tidak bisa dianggap lulus
      dari unit test dan lint saja. Butuh uji manual di HP atau emulasi
      Playwright dengan `hasTouch`.
- [ ] **Sticky header, scrollspy, back-to-top** — di luar scope sesi ini.
      Tentukan dulu apakah memang diinginkan sebelum dikerjakan.

### Verifikasi

- [x] `pnpm lint` passing (setiap slice)
- [x] `pnpm typecheck` passing (setiap slice)
- [x] `pnpm test` passing (setiap slice)
- [x] `pnpm build` passing (akhir slice 3, 6, 9, 10)
- [ ] Banding screenshot desktop + mobile dengan baseline `e4b0cb4`
- [ ] Audit kontras otomatis di browser (hitung fg/bg tiap node teks)

## Notes

- Baseline lama di `.scratch/shots/*.png` sudah terhapus dari working tree
  karena ada di commit; ambil lewat `git show e4b0cb4:.scratch/shots/desk.png`.
- Jangan `git add -A` — `PRODUCT.md` di root milik pihak lain dan bukan
  bagian dari kerjaan ini.
