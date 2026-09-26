# 0003 — 38 hex hardcoded → ~10 token semantik

Landing page ini menggunakan 38 warna hex unik dalam arbitrary Tailwind values.
Ini diubah menjadi ~10 token semantik di `@theme inline` globals.css:
--surface, --surface-strong, --brand, --brand-hover, --on-brand, --text,
--text-muted, --border, --surface-elevated, --surface-overlay.

Ganti brand = ganti 1 tempat. Tidak perlu find-replace di seluruh file.

Alternatif yang ditolak: token literal skala warna (tidak menyelesaikan masalah
konsistensi), dua layer literal+semantic (terlalu berat untuk landing page).

Konsekuensi: perlu migrasi satu kali dari semua `bg-[#hex]` ke `bg-surface` dll.
Tapi setelah itu, perubahan brand jadi trivial.
