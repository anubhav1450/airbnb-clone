# Airbnb listing clone — Romantic Jacuzzi 1BHK, Candolim

Desktop-only recreation of one Airbnb listing page with its two overlay views:
**Listing page**, **Photo Tour** (full-screen gallery) and **Lightbox** (single-photo viewer).
Built for the Playpower Labs take-home task. Stack: **Vite + React + JavaScript**, no backend, no TypeScript.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # serve dist/ on :4173
```

## What is implemented
- Listing page: header + search pill, title row (Share / Save with toasts), 5-photo hero grid, overview, host row,
  highlights, description with "Show more", sleeping arrangements, amenities (+ dialog of all 50), calendar,
  sticky booking column, reviews (ratings, category scores, chips, review grid), map block, host, things to know,
  "More stays nearby" carousel, and the scroll-triggered section bar (Photos / Amenities / Reviews / Location).
- Photo Tour: opens from "Show all photos" or any hero image (scrolled to that photo's room), category thumbnails
  smooth-scroll to rooms, sticky room headings, hover/press effects. Lightbox: prev/next arrows, ←/→, counter, room title.
- Addressable overlays: `?modal=PHOTO_TOUR_SCROLLABLE[&modalItem=1000+index]`, browser Back/Esc close one level at a time.
- Motion: values measured from the reference (0.3 s tour slide+fade, 0.25 s lightbox fade, 1.04 photo hover zoom,
  0.2 s toast, `cubic-bezier(.2,0,0,1)`), `prefers-reduced-motion` honoured.
- Accessibility: skip link, landmarks, dialog roles + `aria-modal`, `inert` page behind modals, focus trap and
  focus restore, keyboard-only focus rings, polite live region for toasts, labelled icon buttons.

## Project structure
```
src/components/   one component per section/overlay (Header, HeroGrid, Overview, Reviews, PhotoTour, Lightbox, …)
src/data/         static content; photos/amenities/icons are generated from the inspected reference (tools/gen-*.mjs)
src/hooks/        useOverlayRoute (URL + history), useDialogFocus (trap/restore), useToast
src/styles/       tokens.css → base.css → listing.css → overlays.css
public/assets/    photos/ ui/ avatars/ chips/ similar/  — replace files here to swap assets
tools/            dev-only: dump.js (measure), diff.mjs (compare), tree.mjs, receiver.mjs, states.js, gen-*.mjs
docs/             reference-inspection.md, font-notes.md, architecture.{svg,png,pdf}, prompts.md
.claude/          agents/ (3 review sub-agents), skills/pixel-diff, launch.json;  CLAUDE.md = project rules
```

## Decisions worth knowing
- **Font.** Self-hosted Albert Sans (SIL Open Font License 1.1), with the license included under `public/assets/fonts/OFL.txt`. Proprietary Airbnb Cereal is not included in the current tree. See `docs/font-notes.md`.
- **Assets.** The 43 gallery photos, UI images and avatars are the reference's publicly served files, saved into
  `public/assets/` (see `docs/reference-inspection.md`). Icons are SVGs captured from the rendered reference DOM
  (`src/data/icons.js`, `amenityData.js`). If Playpower says the assets must not be reused, replace the files in
  `public/assets/` — every reference goes through `src/data/*` or `public/assets/*`.
- **No source copying.** Only rendered facts were used: geometry, computed styles, text, assets. Markup, class names,
  CSS and JS are original (the reference ships obfuscated hashed classes and one minified bundle; none of it is here).
- **Focus management.** The reference could not be tested with real Tab presses, so dialogs follow the standard
  WAI-ARIA pattern (focus in on open, trap, restore on close). Visual behaviour is unaffected.
- **Not interactive on purpose** (as in the reference): search pill, language/menu buttons, calendar days and month
  arrows, Claim, Message host, "How reviews work", map zoom, neighbourhood "Show more", "Show all 19 reviews", and the
  Photo Tour's own Share/Save buttons.

## Verification method
`tools/dump.js` records geometry + computed style for every element on both the reference and the clone at the same
1269×732 viewport; `tools/diff.mjs` matches elements by text / image / aria-label and reports differences with
cascade suppression. The original assessment version matched the reference page height of 6265px; those measurements predate the switch to Albert Sans and are not a claim about the current typography. Overlays were compared open (Photo Tour,
Lightbox, Amenities). Real keyboard input (Tab, ←/→, Esc) was tested in the browser pane.

## Architecture diagram
`docs/architecture.png` / `.pdf` / `.svg` — production-scale marketplace with the scaling strategy for frontend,
backend, storage, search and deployment. Separate from the clone, which is a static single-page front end.
