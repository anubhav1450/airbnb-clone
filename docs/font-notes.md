# Typography

## What the reference does (read from the live page, computed styles and resource timing)
- One font file, loaded by a CSS `@font-face`: `/assets/fonts/AirbnbCerealVF.woff2` (67,812 bytes, `woff2-variations`),
  family **"Airbnb Cereal VF"**, declared `font-weight: 200 900`, `font-display: swap`, no preload, no `unicode-range`.
  (The file's real `wght` axis is 300–900; 756 glyphs; `₹` and `·` present.)
- Stack: `"Airbnb Cereal VF", Circular, -apple-system, "system-ui", Roboto, "Helvetica Neue", sans-serif`;
  `text-rendering: optimizeLegibility`, `-webkit-font-smoothing: antialiased`; no font-variation/feature settings.
- Weights used: **400** body/descriptions/muted text; **500** all headings, buttons, links and labels; **700** the rating /
  review-count numbers and the CHECK-IN / CHECKOUT / GUESTS labels. Letter-spacing only on the 32px tour room titles
  (-0.64px), the 100px rating number (-3px) and the 10px field labels (+0.4px).

## What this clone ships
The **same file**, at `public/assets/fonts/AirbnbCerealVF.woff2`, declared in `src/styles/fonts.css` exactly as the
reference declares it and used through `--font` in `src/styles/tokens.css`. Albert Sans is no longer used or installed.

Licensing: the font is proprietary. Its embedded notice says "All rights reserved … Not for distribution or release"
(licence URL: daltonmaag.com/eula). It is included here for learning / assessment purposes only, on the author's decision;
see `public/assets/fonts/NOTICE.txt`. Keep the repository and the zip private.

## Result of switching (measured against the reference at 1269×732)
- Text widths now match the reference (title 602.2px vs 602px; only 10 text nodes differ at all, by ~1px).
- Compensations that existed only for the previous fallback font were removed: fixed search-pill segment widths, review-chip
  widths, and the tightened rating-number tracking (back to the reference's -3px). A few half-pixel spacing tweaks were
  re-tuned; the page height is exactly 6265px, the reference's.
- Explicit `line-height` values on some buttons (e.g. 20.5px on 16px buttons) were measured from the reference and kept.
