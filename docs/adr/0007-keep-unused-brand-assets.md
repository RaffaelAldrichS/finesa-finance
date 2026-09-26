# 0007 — Simpan aset brand yang belum dipakai

Tiga file aset tidak dipakai saat ini tapi disimpan sadar untuk penggunaan
masa depan: `char-female.webp`, `char-male.webp`, `logo-finesa.webp`.

Agen yang tidak tahu konteks akan menghapusnya sebagai "dead code". Oleh
karena itu aset ini dicatat secara eksplisit di CONTEXT.md dan ADR ini.

Alternatif yang ditolak: hapus semua (hilang untuk masa depan),
pindah ke /archive (terlalu banyak folder).

Konsekuensi: agen harus membaca CONTEXT.md sebelum menghapus file.
Jika aset benar-benar tidak akan dipakai, hapus bersamaan dengan
penghapusan catatan di CONTEXT.md.
