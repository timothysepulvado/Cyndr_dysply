# cylndr-display — CYLNDR brand asset showcase (cylndr domain)

**Isolation contract — read first.** The `cylndr` domain does not cross-talk with any other
domain: no shared vault state, no shared repos, no shared Supabase/Vercel/S3 accounts (except
the CYLNDR-owned S3 bucket below). Do not read or write another domain's vault files, touch
another domain's repos/Supabase/Vercel projects, or borrow CYLNDR assets elsewhere without
Tim's explicit OK.

Standalone asset display / creds deck for the CYLNDR brand — an "Acid Brutalism // Multi-
Pillar" design system. A curated gallery of 68 images and 71 videos across 5 categories (Urban
Streets, Cafés, Creative Studios, Rooftops, Parks), served from a CYLNDR-owned S3 bucket. Pure
static SPA, no backend.

Layout:
- `src/App.jsx` — the app: THEMES, `extractLocation()`, gallery rendering
- `src/main.jsx` — entry point
- `src/index.css` — Tailwind directives + CYLNDR custom CSS
- `tailwind.config.js` — brand color tokens
- `asset_curation_tracker.md` — single source of truth for the asset list/category routing;
  update it alongside any change to `extractLocation()`

Stack & commands:
- React 19, Vite 7, TypeScript 5.9, Tailwind v4 (`@tailwindcss/postcss`), lucide-react; no backend
- `cd ~/cylndr-display && npm install` (first time) · `npm run dev` (http://localhost:5173)
- `npm run build` (tsc + vite build) · `npm run preview` (serve `dist/`)

Conventions:
- Brand tokens are CYLNDR's own, not BrandStudios': Carbon `#0e0d1d`, Lead White `#fff6ec`,
  Oxidized Green `#025f1d`, Heat `#ff3800`, Catalyst Neon `#eeff00`
- S3 CDN `https://brandstudiosai-cylndr.s3.us-east-2.amazonaws.com` — do not rewrite without
  verifying the bucket/access policy with Tim
- Visual QA at 1440px, 768px, 375px
- Deploy is NOT wired on this instance; confirm the target Vercel project with Tim before any
  deploy — a sibling project `cyndr-dysply` exists from earlier iterations, do NOT push to it
  without explicit instruction

Team rules (both agents):
Domain tag for logs/status is `cylndr` (`$BRANDY_DOMAIN`). Read `~/agent-vault/domains/cylndr/MISSION.md` before non-trivial work. Status via `~/brandy-agent-team/scripts/status.sh save <agent> cylndr "..."`; never edit `~/agent-vault/status/*.md` directly. Karl logs via `~/brandy-agent-team/scripts/vault-log-append.sh cylndr "..."`; Jackie does not write the daily log (validator logs for her). Vault commits only via `~/brandy-agent-team/scripts/vault-commit.sh`. Supabase is project-scoped: use this repo's `.mcp.json`/scripts only; if none, ask before any Supabase command.

## Archived memory & evidence — where to find it (2026-10-29)
- Daily logs older than 7 days: `~/agent-vault-archive/daily/` (LOCAL primary on every machine). T7 mirror: `/Volumes/T7 Shield/brandstudios-vault-archive/daily/` — nightly 03:00 via `daily-cleanup.sh` → `archive-logs.sh`, best-effort only when the T7 is mounted; never treat the T7 as the source of truth or block on it being absent.
- Transcripts older than 30 days: `~/agent-vault-archive/transcripts/<project>/` (T7 mirror `/Volumes/T7 Shield/brandstudios-vault-archive/transcripts/`).
- Evidence: `~/BSAI-OS-evidence/` is the primary. T7 mirror = the APFS image `/Volumes/T7 Shield/brandstudios-vault-archive/BSAI-OS-evidence.sparsebundle` (double-click or `hdiutil attach` mounts it at `/Volumes/BSAI-OS-evidence-mirror/BSAI-OS-evidence/`); `~/brandy-agent-team/scripts/evidence-mirror.sh` runs nightly from `daily-cleanup.sh`, additive — the T7 copy never deletes.
- Also on the T7 under `brandstudios-vault-archive/`: `status-backups/`, `codex-sessions/`, `purges/`.
- Per-domain status history: `~/agent-vault/status/archive/{agent}-{domain}.md` (rotated by `status.sh`; newest 12 states stay in `status/{agent}-{domain}.md`).
