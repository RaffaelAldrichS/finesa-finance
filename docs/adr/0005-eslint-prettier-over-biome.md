# 0005 — ESLint 9 flat + Prettier, bukan Biome

Tooling lint & format: ESLint 9 flat config + eslint-config-next + Prettier.
Dua tool, tapi masing-masing paling bagus di bidangnya. eslint-config-next
punya rules react-hooks dan @next/image yang kritis untuk proyek ini.

Biome ditolak karena tidak punya rules react-hooks maupun next/image —
rules yang paling menangkap bug di proyek ini justru hilang.

Konsekuensi: setup lebih banyak dari Biome, tapi lint jadi lebih kuat.
Commit-time via husky + lint-staged.
