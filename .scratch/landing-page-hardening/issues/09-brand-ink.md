# 09 — Brand green tidak aman sebagai teks (AA)

Status: resolved

## Blocked by

—

## Description

`--brand` (#1da974) dipakai sebagai warna teks/UI kecil di banyak section,
tapi luminansnya sedang sehingga gagal WCAG AA di atas krem maupun di atas
surface gelap. Ditemukan saat polish section testimoni (2026-09-29).

## Bukti (diukur di browser, 1440px)

| Elemen                                       | Rasio | Butuh |
| -------------------------------------------- | ----- | ----- |
| `.eyebrow` di atas `--surface` krem          | 2.8:1 | 4.5:1 |
| `.eyebrow` di atas `--surface-strong`        | 2.9:1 | 4.5:1 |
| Tombol `bg-brand text-white` (12px)          | 3.1:1 | 4.5:1 |
| Ikon `text-brand` di lingkaran `bg-brand/10` | 2.7:1 | 3:1   |

Sudah ditambal di section testimoni (kontrol, chip, initial memakai `--text`),
tapi Features, Topics, Showcase, CTA, dan `.eyebrow` masih memakai `--brand`.

## Opsi

1. Tambah token `--brand-ink` (mis. #0a6b4d, ~6:1 di krem) khusus teks/UI
   kecil di atas surface terang; `--brand` tetap untuk fill.
2. Section gelap: pakai varian lebih terang (mis. putih 80%) untuk teks kecil —
   `--brand-hover` (#26c886) masih 4.1:1 di `--surface-strong`.
3. Naikkan ukuran teks berwarna brand ke ambang "large text" — tidak cocok
   untuk eyebrow/tombol 12px.

## Acceptance Criteria

- [ ] Token untuk teks brand di atas surface terang disepakati dan didokumentasikan di CONTEXT.md
- [ ] Semua teks kecil berwarna brand lolos ≥4.5:1 (eyebrow, tombol, ikon label)
- [ ] Elemen non-teks berwarna brand lolos ≥3:1
- [ ] `node .opencode/skills/impeccable/scripts/detect.mjs --json app components` bersih

## Notes

- Perubahan warna menyentuh seluruh halaman → butuh keputusan manusia,
  bukan side effect dari ticket polish.

## Resolusi (2026-09-29)

Ditangani oleh slice 6 (`5a4268b`): `--brand` → `#15805d`,
`--brand-hover` → `#43dfa4`, `.eyebrow` dan `:focus-visible` dipindah ke
`@layer base` supaya utility Tailwind bisa menimpanya, `.text-white/40`
di Footer dinaikkan ke `/70`, dan scrim tiga section gelap dikuatkan ke
`from-black/85 via-black/70`.

Satu sisa ketemu saat bookkeeping: item nav aktif di sheet mobile
(`Header.tsx:78`) memakai `text-brand` 14px bold di atas `bg-brand/10`
yaitu 4,19:1 — di bawah syarat 4,5:1 untuk teks normal. Diganti ke
`text-text` (8,7:1); penanda aktifnya tetap warna latar plus bobot
semibold. Sisa temuan lain dicatat di `10-audit-hardening.md`.
