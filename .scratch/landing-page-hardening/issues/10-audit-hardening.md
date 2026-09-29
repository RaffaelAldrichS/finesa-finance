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

- [x] **Teks di bawah lantai 12px** (spec "Ukuran teks minimum") sudah
      naik ke `text-xs`: nav dan badge header dari 11px, badge "Segera"
      di hero dari 10px. `.eyebrow` sebelumnya juga sudah 12px. Tidak ada
      lagi `text-[Npx]` di `components/` maupun `app/`.
- [ ] **`images.unoptimized: true` di `next.config.mjs`** — gambar tidak
      dikompresi Next. Milik tiket 06; sengaja tidak disentuh.
- [ ] **Section FAQ belum pernah dibangun** — nav sudah dibersihkan di
      slice 2 sehingga tidak ada anchor mati, tapi spec §76-83 masih
      meminta sectionnya. Milik tiket 04.
- [ ] **"Lihat Preview Aplikasi" di `Showcase.tsx:43`** masih menjanjikan
      preview yang tidak ada. Milik tiket 05 (AC baris 21) — butuh
      keputusan copywriting.
- [x] **Gestur sentuh carousel sudah diuji lewat emulasi touch.** Bukan
      `page.mouse` (yang menghasilkan `pointerType: 'mouse'` dan sengaja
      diabaikan), tapi `Input.dispatchTouchEvent` lewat CDP pada konteks
      ber-`hasTouch`: gesek ke kiri memindah dari contoh 1 ke 2 dan
      sr-only status ikut berubah, gesek ke kanan memindah kembali.
      **Sisa:** belum disentuh jari sungguhan di HP fisik.
- [ ] **Sticky header, scrollspy, back-to-top** — di luar scope sesi ini.
      Tentukan dulu apakah memang diinginkan sebelum dikerjakan.

### Verifikasi

- [x] `pnpm lint` passing (setiap slice)
- [x] `pnpm typecheck` passing (setiap slice)
- [x] `pnpm test` passing (setiap slice)
- [x] `pnpm build` passing (akhir slice 3, 6, 9, 10)
- [x] Banding screenshot desktop + mobile dengan baseline `e4b0cb4` —
      tiap section difoto satu per satu (lihat catatan jebakan di bawah)
- [x] Audit kontras otomatis di browser — **0 node di bawah AA** di
      1440x900 dan di Pixel 7, setelah dua putaran perbaikan (lihat
      `851dfd4`)

## Notes

- Baseline lama di `.scratch/shots/*.png` sudah terhapus dari working tree
  karena ada di commit; ambil lewat `git show e4b0cb4:.scratch/shots/desk.png`.
- Jangan `git add -A` — `PRODUCT.md` di root milik pihak lain dan bukan
  bagian dari kerjaan ini.

## Hasil audit kontras (2026-09-29)

Metodenya: jalankan build produksi, untuk tiap section scroll ke posisi
section, suntik `color: transparent` ke seluruh halaman, foto viewport,
lalu sampel piksel yang benar-benar tercat di belakang tiap node teks.
Warna depan diambil dari `getComputedStyle` lalu dikompositkan (handle
`color-mix`/`oklab` yang dipakai Tailwind v4 untuk `/70` dan `/85`).
Lima titik per node, yang terburuk dipakai — konservatif untuk teks di
atas gambar.

| Putaran           | Desktop            | Mobile             |
| ----------------- | ------------------ | ------------------ |
| Sebelum `851dfd4` | 3 node di bawah AA | 7 node di bawah AA |
| Sesudah           | 0                  | 0                  |

Yang ditemukan dan diperbaiki:

- **Scrim tidak menutup teks di mobile** (paling serius). `from-black/85
via-black/70 to-transparent` mendatar, jadi cocok untuk grid desktop
  tetapi di layout bertumpuk ekornya tembus. Badge "Segera" 1,66:1,
  heading Showcase 2,84:1, heading Journey 2,94:1.
- **Overlay CTA** hanya 70 persen di atas gambar yang sudah 55 persen —
  eyebrow 3,79:1 di desktop.
- **Pill status CTA** hijau di atas hijau tidak akan pernah mencapai
  4,5:1; tint-nya diganti hitam.
- **Glif bintang kartu fitur** (`feature.icon` bisa berupa string, jadi
  teks 16px, bukan ikon) 4,15:1.

### Jebakan alat

- **Screenshot `fullPage: true` tidak bisa dipercaya untuk halaman ini.**
  Chromium merender di luar viewport dan GSAP/ScrollTrigger tidak
  ikut menghitung ulang, jadi Topics dan Testimonials tampak kosong
  padahal di browser nyata semua 7 section punya 0 node teks tersembunyi.
  Selalu foto per section lewat viewport biasa.
- **`next start` menyajikan build lama** sampai prosesnya dibunuh
  (`taskkill //F //PID` dari `netstat -ano`). Audit sempat "mengukur"
  kode yang sudah diperbaiki.
- **`aria-current={cond}` tanpa value** merender `aria-current="false"`
  pada elemen yang tidak aktif, jadi tidak boleh difilter dengan
  `!== null`.
