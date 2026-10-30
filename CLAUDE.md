# Airbnb listing clone — project rules for Claude Code

Take-home assignment: a pixel-perfect, desktop-only clone of one Airbnb listing page with two overlay
views (Photo Tour, Lightbox). Source of truth: the live reference (see `docs/reference-inspection.md`).

## Hard rules
- **Never copy the reference's source** (its bundled JS, CSS, class names, markup). Read only rendered facts:
  geometry, computed styles, text, assets, behaviour. Class names here are ours (BEM-ish, plain CSS).
- Reproduce, don't redesign: no extra features, no "improvements". If the reference does something odd, match it.
- Stack: Vite + React + JavaScript (no TypeScript), no backend, no runtime CDN dependencies.
- Desktop only (≥1269px wide is what was measured). No responsive/mobile work.
- Fonts: self-hosted Albert Sans, licensed under SIL OFL 1.1. Preserve the bundled license. Do not reintroduce proprietary Airbnb Cereal.

## Layout of the repo
- `src/components/*` one component per page section/overlay; `src/data/*` static content (no fetching);
  `src/hooks/*` route/focus/toast logic; `src/styles/*` tokens → base → listing → overlays.
- `public/assets/*` images (photos, ui, avatars, chips, similar). Swap files here to replace assets.
- `tools/*` dev-only measurement tooling (never imported by the app). `tools/captures/` is gitignored data.
- `docs/*` inspection notes, architecture diagram, prompt log.

## Working loop (fidelity)
1. Change code. 2. Capture the clone's metrics with `tools/dump.js` in a 1269×732 Chrome tab.
3. `tools/measure.sh --main` (page) / `--overlays` (tour, lightbox, amenities) against the reference dump.
4. Fix the *first* line of each cascade, re-measure. See `.claude/skills/pixel-diff/SKILL.md`.
Use the sub-agents in `.claude/agents/` for review passes before declaring a phase done.

## Conventions
- Measured numbers live in CSS with the value from the reference (keep the comment if it compensates the font).
- Overlays are always mounted and toggled (`aria-hidden`, `inert`, `visibility`) so transitions run.
- Keep components small; no prop drilling beyond one level except the overlay callbacks in `App.jsx`.
