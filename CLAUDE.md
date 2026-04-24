# CYLNDR Display — Project Scope

## Domain: cylndr
This project is the **cylndr** domain — fully isolated / siloed.

## Isolation Contract (IMPORTANT — READ FIRST)
This domain does NOT cross-talk with any other domain. No shared vault state, no
shared repos, no shared Supabase / Vercel / S3 accounts (except the CYLNDR-owned
S3 bucket referenced below).

Do NOT:
- Read from or write to other domains' vault files
- Touch any other domain's repos, Supabase projects, or Vercel projects
- Borrow CYLNDR assets into other domains without explicit ask from Tim
- Write directly to `~/agent-vault/status/{agent}.md` — use
  `~/brandy-agent-team/scripts/status.sh save <agent> cylndr "..."`

Do:
- Tag every daily log entry with `[cylndr]`
- Keep all working files, notes, and ADRs inside this domain's scope
- Treat this as a single-brand display tool — CYLNDR only

## On Session Start, Read
1. `~/agent-vault/domains/cylndr/MISSION.md` — domain mission, isolation contract
2. `~/agent-vault/MISSION_CONTROL.md` — meta architecture (for reference only)
3. `~/cylndr-display/asset_curation_tracker.md` — single source of truth for assets
4. `~/agent-vault/status/{agent}-cylndr.md` — your per-domain status
5. Today's daily log, filtered to `[cylndr]`:
   `grep '\[cylndr\]' ~/agent-vault/daily/$(date +%Y-%m-%d).md`

## What This Is
Standalone asset display / creds deck for the **CYLNDR** brand — "Acid Brutalism //
Multi-Pillar" design system. Curated gallery of 68 images and 71 videos across 5
categories (Urban Streets, Cafés, Creative Studios, Rooftops, Parks) served from
a CYLNDR-owned S3 bucket.

## Stack
- React 19, Vite 7, TypeScript 5.9
- Tailwind v4 with `@tailwindcss/postcss`
- lucide-react for icons
- No backend — pure static SPA; assets load from S3

## Key Files
- `src/App.jsx` — THE app; contains THEMES, extractLocation(), gallery rendering
- `src/main.jsx` — entry
- `src/index.css` — Tailwind directives + CYLNDR custom CSS
- `tailwind.config.js` — brand color tokens (carbon, lead-white, oxidized-green,
  heat, catalyst-neon)
- `asset_curation_tracker.md` — SINGLE SOURCE OF TRUTH for the asset list and
  category routing; update this alongside any changes to `extractLocation()`

## Brand Tokens (CYLNDR, not BrandStudios)
- Carbon `#0e0d1d`, Lead White `#fff6ec`
- Oxidized Green `#025f1d` (motion)
- Heat `#ff3800` (content)
- Catalyst Neon `#eeff00` (production)

## Dev
```bash
cd ~/cylndr-display
npm install        # first time
npm run dev        # http://localhost:5173
npm run build      # tsc + vite build
npm run preview    # serve dist/
```

## S3 Asset CDN
```
https://brandstudiosai-cylndr.s3.us-east-2.amazonaws.com
```
Do not rewrite this URL without verifying the bucket and access policy with Tim.

## Visual QA Breakpoints
1440px, 768px, 375px (per global preferences).

## Deploy
NOT wired on this instance. Before any deploy, confirm with Tim which Vercel project
(or fresh) to target. A sibling Vercel project `cyndr-dysply` exists from earlier
iterations — do NOT push to it without explicit instruction.

## Agent Team
- **Brandy** — lead / architect / reviewer (scoped to cylndr)
- **Karl** — frontend implementation (scoped to cylndr)
- **Jackie** — asset / video review, multimodal QA (scoped to cylndr)

The `brandy cylndr` launcher spawns a dedicated tmux session. Multiple concurrent
Brandy sessions in other domains cannot structurally see or affect this one.
