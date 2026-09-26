# Finesa

Platform edukasi finansial untuk generasi muda Indonesia.
Repo ini membangun **hanya** halaman marketing publiknya — bukan aplikasi.

## Brand

**Finesa**:
Nama brand. Selalu ditulis "Finesa", satu kata, huruf besar di awal kalimat.
_Avoid_: Finesate, Finesa Finance, finsa

## Produk & Cakupan

**Landing Page**:
Satu-satunya deliverable repo ini. Halaman statis satu URL yang menjelaskan
apa itu Finesa dan mengarahkan calon pengguna.
_Avoid_: homepage, frontpage, situs, aplikasi

**Aplikasi Finesa**:
Produk yang sedang dibangun — belum ada, belum tersedia di store manapun.
Semua CTA di landing page harus jujur: badge "Segera Hadir", bukan link mati.
_Avoid_: download, masuk, login (kecuali merujuk ke app yang belum ada)

**Segera Hadir**:
Label untuk semua hal yang belum tersedia. Dipakai sebagai badge, bukan tombol.
_Avoid_: coming soon (Inggris), disabled, belum tersedia

## Konten

**Topik**:
Enam area materi: Budgeting, Saving, Investasi, Kredit & Hutang, Asuransi,
Perencanaan Masa Depan. Berbeda dari "Materi" — Topik = kategori, Materi = isi.
_Avoid_: pokok bahasan

**Materi**:
Konten pembelajaran dalam satu topik. Visual, ringan, mudah dipahami.
_Avoid_: kurikulum, course, pelajaran

**Gamifikasi**:
XP, achievement, streak. Mekanik yang membuat belajar menyenangkan.
_Avoid_: poin, reward, game

**Contoh**:
Label untuk testimonial di halaman. Jangan pernah disajikan sebagai "bukti
nyata" — Finesa belum ada, jadi testimonial adalah ilustrasi, bukan kutipan.
_Avoid_: testimonial, review, ulasan (tanpa label "contoh")

**Rencana**:
Bahasa untuk fitur yang belum ada. "Finesa akan punya Mode Offline" — bukan
"Mode Offline tersedia". Selalu pakai kata prospectif.
_Avoid_: fitur, tersedia, sudah ada (untuk hal yang belum dibangun)

## Token Desain

**Token Semantik**:
~10 nama: --surface, --surface-strong, --brand, --brand-hover, --on-brand,
--text, --text-muted, --border, --surface-elevated, --surface-overlay.
Diganti dari 38 hex hardcoded. Ganti brand = ganti 1 tempat.
_Avoid_: --green-500, --cream-50 (skala literal)

## Aset yang Disimpan Sadar

File berikut **tidak dipakai sekarang** tapi disimpan untuk penggunaan masa depan.
Jangan menghapusnya sebagai "dead code" tanpa konfirmasi manusia:

- `public/assets/char-female.webp` — karakter untuk section yang belum dibangun
- `public/assets/char-male.webp` — karakter untuk section yang belum dibangun
- `public/assets/logo-finesa.webp` — logo varian (bukan logo utama)

## Nama Section (Urutan)

Beranda, Fitur, Perjalanan, Materi, FAQ, Kenapa Finesa (testimoni),
Pengalaman (rencana fitur), CTA.

## Referensi

- Deploy target: Vercel
- Bahasa docs: Indonesia
- Kode & identifier: English
- Finesa belum ada di store/website/sosial — semua tautan harus jujur
