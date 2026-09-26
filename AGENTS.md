## Agent skills

### Issue tracker

Issues and specs live as markdown files under `.scratch/`, one directory per feature. See `docs/agents/issue-tracker.md`.

### Triage labels

Five canonical roles, each label string equal to its name: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `CONTEXT.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.

### Current work

Spec & tickets live in `.scratch/landing-page-hardening/`.
Before any code change, read:
1. `CONTEXT.md` — glossary & brand decisions
2. `.scratch/landing-page-hardening/spec.md` — full specification
3. The ticket you're working on in `.scratch/landing-page-hardening/issues/`

Key rules from CONTEXT.md:
- Brand is "Finesa" (never "Finesate")
- Aplikasi belum ada — semua CTA harus jujur ("Segera Hadir")
- Aset char-female.webp, char-male.webp, logo-finesa.webp disimpan sadar — jangan hapus
- Token semantik, bukan hex hardcoded
