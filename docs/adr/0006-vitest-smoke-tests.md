# 0006 — Vitest + Testing Library, smoke test saja

Testing: Vitest + @testing-library/react + jsdom. Hanya smoke test:
semua anchor di nav resolve ke section yang ada, tidak ada dead handler,
brand string "Finesa" konsisten, tidak ada link ke halaman kosong.

Playwright ditolak (overkill untuk landing page satu halaman).
Tanpa test ditolak (regresi subtle lolos tanpa yang tahu).

Konsekuensi: test tidak menguji visual atau interaksi — hanya struktur
yang bisa rusak diam-diam. Visual tetap diandalkan pada review manusia.
