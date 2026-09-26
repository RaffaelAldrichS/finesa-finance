# 04 — FAQ Section

Status: ready-for-agent

## Blocked by

03

## Description

Tambah section FAQ baru dengan Accordion Base UI.
Posisi: setelah Materi, sebelum Kenapa Finesa.
Konten: saya draf, user review.

## Acceptance Criteria

- [ ] `components/sections/FAQ.tsx` dibuat
- [ ] Menggunakan Base UI Accordion:
  ```tsx
  import { Accordion } from '@base-ui/react/accordion'
  // Root, Item, Header, Trigger, Panel
  ```
- [ ] 8-10 pertanyaan + jawaban yang relevan dengan Finesa
- [ ] Pertanyaan mencakup:
  - Apa itu Finesa?
  - Siapa yang cocok pakai Finesa?
  - Berapa biaya?
  - Bagaimana cara memulai?
  - Apakah ada mode offline?
  - Bagaimana gamifikasinya bekerja?
  - Bagaimana dengan privasi data?
  - Materi apa saja yang tersedia?
- [ ] FAQ ditambahkan ke nav header: `['Beranda', 'Fitur', 'Materi', 'FAQ', 'Testimoni']`
  (sebelum Testimoni, bukan sesudah)
- [ ] `id="faq"` ditambahkan ke section
- [ ] Smooth scroll ke FAQ dari nav link berfungsi
- [ ] Token semantik dipakai untuk warna
- [ ] Ukuran teks minimum 12px

### Verification
- [ ] `pnpm lint` passing
- [ ] `pnpm typecheck` passing
- [ ] `pnpm build` passing
- [ ] Accordion buka/tutup berfungsi
- [ ] Keyboard navigable (tab ke trigger, enter/space buka)
- [ ] Section muncul di posisi yang benar (setelah Materi, sebelum Kenapa Finesa)

## Notes

- `app/page.tsx:54` nav array harus diupdate: tambah 'FAQ' sebelum 'Testimoni'
- Accordion Base UI: `Accordion.Root` > `Accordion.Item` > `Accordion.Header` >
  `Accordion.Trigger` + `Accordion.Panel`
- Default state: semua collapsed (bukan multi-expand kecuali ada alasan)
- Jawaban harus konsisten dengan CONTEXT.md — gunakan istilah yang benar
  (misal "Topik" bukan "pokok bahasan", "Materi" bukan "course")
