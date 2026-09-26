# 0004 — Light-only, hapus semua jejak dark mode

Landing page ini hanya mode terang. CSS globals.css punya blok dark mode
yang tidak pernah dipakai (page hardcodes hex light), dan viewport
colorScheme mendeklarasikan 'light dark' — menciptakan konflik untuk
user dark mode.

Semua jejak dark dihapus: `colorScheme: 'light dark'` → `'light only'`,
blok `@media (prefers-color-scheme: dark)` dihapus, `@custom-variant dark`
dihapus.

Alternatif yang ditolak: implement dark mode beneran (1 sesi penuh tersendiri,
belum ada prioritas).

Konsekuensi: user dark mode tidak lagi dapat body gelap + konten light.
Warna brand hijau-tosca memang paling baik di light.
