# 0001 — Scope: hanya landing page, tanpa app

Finesa belum punya aplikasi. Repo ini membangun satu halaman marketing statis —
bukan auth, bukan dashboard, bukan backend. Semua keputusan arsitektural harus
dalam konteks ini: satu halaman, satu URL, statis.

Alternatif yang ditolak: monorepo dengan app (terlalu luas untuk stage ini),
multi-halaman (belum ada konten untuk halaman tambahan).

Konsekuensi: tidak ada API routes, tidak ada auth, tidak ada database.
Jika app dibangun nanti, itu repo terpisah atau ditambahkan kemudian.
