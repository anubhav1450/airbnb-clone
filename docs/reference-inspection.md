# Reference inspection: Airbnb-clone assignment

Source: the live reference (`https://airbnb-clone-umber-two.vercel.app`), read in a real Chrome at a 1269×732 viewport on 2026-09-19. Measurements and behaviour only. No source was copied.

Legend: **[V]** = verified on the live page. **[?]** = not verified, needs a visible-tab check or a screen recording.

Inspection caveat: the Chrome tab kept going `visibility: hidden` between my tool calls, which pauses `requestAnimationFrame`, so frame-level timing was only captured twice (both noted below).

---

## 1. Global

- Desktop only per the PDF. The reference has `max-width: 1128px` and `743px` media queries, but they are out of scope.
- Font: `"Airbnb Cereal VF"`, variable, weights 200–900, served from the site as `/assets/fonts/AirbnbCerealVF.woff2`. Fallback stack: Circular, -apple-system, system-ui, Roboto. [V]
  - **Licensing:** this is Airbnb's proprietary font. Decision and findings: `docs/font-notes.md`.
- Body: 14px, `#222`, white. Page height ≈ 6,265px. [V]
- Root tokens: `--ink #222`, `--muted #6a6a6a`, `--muted2 #717171`, `--line #ddd`, `--line-soft #ebebeb`, `--card-border rgba(0,0,0,.08)`, `--rausch #ff385c`, `--reserve` gradient `#e61e4d → #e31c5f → #d70466`, `--reserve-hover` gradient `#d81b5f → #c31a5b → #bd0463`, greys `#f7f7f7 / #f2f2f2 / #ebebeb`, `--container 1280px`, `--shadow-card 0 6px 16px rgba(0,0,0,.12)`, `--shadow-hover 0 2px 4px rgba(0,0,0,.18)`. [V]
- Global easing: `cubic-bezier(0.2, 0, 0, 1)`. [V]
- Radii in use: 8px (most), 12px (cards, hero, dialogs), 16px (Guest-favourite box), 50% (circles), 40px and 999px (pill). [V]
- Shadows in use: `0 1px 4px .08`, `0 2px 8px .15`, `0 6px 16px .12`, `0 2px 6px .2`, `0 4px 12px .3` (alpha as suffix). [V]

### Type scale [V]
| Use | Size / weight / line-height | Colour |
|---|---|---|
| Body, small | 14 / 400 / 20.02 | #222 |
| Body | 16 / 400 / 22.88 | #222 |
| Muted | 14 / 400 / 20.02 | #717171 |
| Review text | 15 / 400 / 21 | #222 |
| H1 | 26 / 500 | #222 |
| H2 | 22 / 500 (line-height 26 or 31.46) | #222 |
| H3 | 18 / 500 / 25.74 | #222 |
| Photo Tour room title | 32 / 500 / 35.2, letter-spacing -0.64px | #222 |
| Tour subtitle | 16 / 400 / 22.4 | #717171 |
| Card labels | 10 / 700 / 14.3, letter-spacing 0.4px | #222 |
| Big rating | 20 / 700 / 28.6 | #222 |

### Keyboard focus [V]
- `:focus { outline: none }`.
- A `kbd` class is put on `<body>` (presumably when keyboard is used). When set, `:focus-visible` gets `outline: 2px solid #222; outline-offset: 2px; border-radius: 6px`.
- Gallery tiles use `outline-offset: 3px`.
- [?] When the `kbd` class is added and removed (mouse vs keyboard) is not observed.

### Reduced motion [V]
`@media (prefers-reduced-motion: reduce) { * { animation-duration: 1ms !important; transition-duration: 1ms !important; scroll-behavior: auto !important } }`

---

## 2. Listing page (container: max 1280, 80px side padding → content x 80–1189 at 1269 wide)

### Header (static, not sticky) [V]
- Height 89 (88 + 1px bottom border `#ebebeb`), z 50, white. Logo at x=80, ~103×32.
- Search pill centred: Anywhere (149×48, weight 500) | Anytime (88×48, weight 500) | Add guests (106×48, 400, `#717171`), radius 40px. Buttons have 0 16px padding.
- Red search button: 32×32, `#ff385c`, circle. Also a 48×48 house icon `searchbar-house.png` at x=452.
- Right side: "Become a host" (link `#`), globe button 40×40 (`#f2f2f2`, circle, transition `background 0.18s`), menu button 40×40 (same).
- There is a "Skip to content" link (`href="#main"`), parked off-screen at `left: -999px`, `left: 0` on focus.

### Sticky section bar [V]
- Fixed at top: height 67, white, 1px `#ebebeb` bottom border, z 45.
- Contains: nav "Listing sections" (`Photos / Amenities / Reviews / Location` as `#photos #amenities #reviews #location` links, weight 500), then "₹28,499 for 5 nights", "★ 4.95 · 19 reviews" and a Reserve button.
- Hidden state `transform: translateY(-67px); opacity: 0`. Shown state `translateY(0); opacity 1`. Transition `transform 0.25s, opacity 0.25s`.
- Threshold: hidden at scrollY 600, shown at 640. The hero grid bottom is at 663, so it is probably tied to that. [V range, exact value ?]
- Links have no active/underline state during scroll. [V]

### Title row [V]
- Section padding `32px 0 18px`, flex, gap 16. H1 at y=121.
- Share and Save are buttons: 8px radius, padding `8px 10px`, 14/500, underline text, gap 2px, transition `background 0.15s, transform 0.05s`. Hover `#f7f7f7`, active `scale(0.96)`.

### Hero grid [V]
- `#heroGrid`: grid, columns 554.4 / 269.3 / 269.3, two rows of 240.6, gap 8px, radius 12px on the container, `overflow: hidden`. Total 1109×489 at y=173. (Reference screenshot at 1440: 560/272/272.)
- Hero tiles are buttons (radius 0), `object-fit: cover`. Aria labels `<title> image 1..5`.
- Hover: `::after` overlay goes from transparent to `rgba(0,0,0,.1)` (transition `background 0.2s`), and the image has `filter 0.2s`. Active: `scale(0.997)`.
- "Show all photos" button: 143×32 at (1022, 606), bottom-right, white, 1px `#222` border, 8px radius, 12/500, `padding 7px 15px`, `0 2px 8px rgba(0,0,0,.15)`, icon + text with gap 8. Transition `transform 0.1s, background 0.15s`. Hover `#f7f7f7`, active `scale(0.96)`.
- **Hero images (in order):** `2367476f`, `090d8b0b`, `9be71047`, `67c61c6f`, `c904e1ab` (first 8 chars of file names).

### Content grid [V]
- Below the hero at y=710: a grid, columns 641 | 96 gap | 372 (`#contentLeft` and `aside`).
- Left blocks (each separated by a 1px `#ebebeb` top border, except the first ones):
  1. Title block, padding `0 0 24`: H2 "Entire serviced apartment in Candolim, India" (22/500) and "3 guests · 1 bedroom · 1 bed · 1 bathroom".
  2. Guest-favourite box, flex, gap 22, padding `16 28`, 1px `#ddd` border, radius 16. Contains laurel-left/right images (72×110) around "Guest favourite", the text "One of the most loved homes on Airbnb, according to guests", "4.95" (20/700) and "19 Reviews".
  3. Host row, padding `26 0`: avatar 46×46 (`host.jpeg`), "Hosted by Mirashya Homes", "2 years hosting".
  4. Highlights, flex, gap 24, padding `32 0`: "Outdoor entertainment", "Designed for staying cool", "Self check-in", each with a 14/500 title and a muted line.
  5. Description block, padding `26 0 32`: "Some info has been automatically translated. Show original", then the description (emoji included) clamped to 4 lines, then "Show more".
  6. "Where you'll sleep": Bedroom ("1 double bed"), Living room ("1 sofa") cards. Padding `32 0`.
  7. `#amenities`: "What this place offers", 10 amenity rows (Kitchen, Wifi, Dedicated workspace, Free parking on premises, Pool, Hot tub, Pets allowed, Exterior security cameras on property, Carbon monoxide alarm, Smoke alarm) and the button "Show all 50 amenities".
  8. Calendar block: "5 nights in Candolim / 18 Oct 2026 - 23 Oct 2026", two months (October 2026, November 2026), month-nav buttons ("Previous month", "Next month" 40×40-ish) and "Clear dates".
- **Aside** (372 wide):
  - Sticky wrapper at `top: 100px` (508 tall).
  - Promo card: flex, gap 12, padding 16, 1px `#ddd` border, radius 12, height 70. Discount icon `discount.svg` 32×32, "Get 10% off your next stay." / "Terms apply" (underline), and a "Claim" button (65×34, `#f7f7f7`, 14/500, radius 8, padding `8 14`).
  - Booking card: padding `22 24 24`, 1px `rgba(0,0,0,.08)` border, radius 12, shadow `0 6px 16px rgba(0,0,0,.12)`. Contains "₹28,499 for 5 nights", CHECK-IN / CHECKOUT / GUESTS fields (10/700 labels, values "10/18/2026", "10/23/2026", "2 guests"), "Free cancellation before 17 October", the Reserve button (gradient, radius 999, text 14/500 white), and "You won't be charged yet".
  - "Report this listing" line, flex, gap 8, muted.
  - The sticky card stops sticking when its container ends (it was already scrolled away by scrollY 2500). [V]

### Wide sections (`#wideSections`, all `padding 48px 0`, full 1109 width) [V]
1. `#reviews` (y=2762, h=1349): big "4.95" with laurel images, "Guest favourite / This home is a guest favourite based on ratings, reviews and reliability", "How reviews work"; "Overall rating" bars 5→1; six category scores (Cleanliness 5.0, Accuracy 5.0, Check-in 5.0, Communication 5.0, Location 4.8, Value 4.8); ten topic chips with counts (Comfort 6, Accuracy 5, Hot tub 5, Condition 4, Hospitality 8, Cleanliness 4, Amenities 2, Decor 2, Indoor spaces 2, Location 2). Then reviews in two columns: Amit, Aheesh, Samiksha, Vedant, Vaibhav S, Mohd. Reviewer initials-avatar circles in pastel backgrounds. Review text is 15/21, clamped to 4 lines with a "Show more" button. Last button "Show all 19 reviews".
2. `#location` (y=4111, h=851): "Where you'll be / Candolim, Goa, India / Exact location will be provided after booking." A 1109×480 map block (no map library: it is a CSS gradient backdrop with a 56×56 SVG house pin translated -28,-28), Zoom in / Zoom out buttons (40×40, x=1137, y=4269 and 4317), then "Neighbourhood highlights" text with "Show more".
3. Host (y=4962, h=562): "Meet your host", card with host stats (1,463 Reviews, 4.68★ Rating, 2 Years hosting), "Born in the 80s", "Where I went to school: NICMAR GOA", Co-Hosts (Sharath, Aman Dev Pahwa, Maria Karen Priyanka, Simran, Pallavi, Sanyukta, Shruti, Amisha), "Host details" (Response rate: 100%, Responds within an hour), "Message host" (`#f2f2f2`), and a payment safety notice.
4. Things to know (y=5524, h=333): Cancellation policy, House rules (Check-in after 2:00 pm, Checkout before 11:00 am, 3 guests maximum), Safety & property, each with "Learn more".
5. More stays nearby (y=5857, h=429): "1 / 2" pager with two arrow buttons (prev disabled at 1), eight cards: Beautiful Studio with a view to die for (₹23,600, 4.91), NAQAB - 1bhk with private pool (₹42,218, 4.95), Greentique Luxury Flat with plunge pool, Calangute (₹44,506, 4.94), The Tropical Studio | 5 mins to Beach (₹22,824, 4.96), Luxury Casa Bella 1BHK with plunge pool, Calangute (₹39,942, 4.95), Kanso by Earthen Window | Jacuzzi | Terrace | Pool (₹45,648, 5.0), Luxury Apt | Private Pool | 6 Mins from Beach (₹48,786, 4.93), Serendipity Cottage - Calm Stay in Calangute-Baga. (₹22,824, 4.92).

### Interactions observed on the listing page [V unless noted]
| Control | Result |
|---|---|
| Hero tile (any of 5) | Opens Photo Tour. Tour scrolls so the section containing that photo has its top ≈24px below the tour's top edge. Does not open the Lightbox. |
| "Show all photos" | Opens Photo Tour (starts at the top). |
| Share | Toast "Share options". |
| Save | Toggles saved state (heart icon path changes) with toast "Saved to wishlist" / "Removed from wishlist". [the "Saved" text is inferred from the reverse message; ?] |
| Reserve (booking card or sticky bar) | Toast "You won't be charged yet". |
| "Show all 50 amenities" | Opens the amenities dialog (below). |
| Sticky bar links | Smooth scroll to the section (native smooth, ≈900ms, ease-out). Target lands 80px below the viewport top. No URL hash change. [V] |
| "Show more" (description/reviews) | Removes the 4-line clamp; button removed once expanded. Review 2 grew 84→252px. [description V; "hidden after expand" ?] |
| Anywhere / Anytime / Add guests / Search / globe / menu / Claim / How reviews work / Show all 19 reviews / Message host / Learn more / Become a host | No visible response. "Become a host" and "Learn more" are `href="#"` links. |
| Calendar day cells | Display-only `div`s (not buttons, `tabindex=-1`, `cursor: auto`). Clicking a date did nothing. |
| Zoom in/out, More stays nearby arrows, month nav | Clicked, but no state change seen in my snapshots. [?] Needs a visible-tab retest. |

Calendar cell style [V]: 42×42 circle. Selected start and end (18 and 23): `#222` background, white text. In-between days (19–22): `#f2f2f2`, no radius. Other days: transparent, `#222`, 14/400.

### Toast [V]
`role="status"`, `aria-live="polite"`. Fixed, bottom 32px, centred, `#222` background, white 14/500, padding `14px 22px`, radius 8, z 200. Hidden: opacity 0 and `translateY(20px)`. Transition `opacity 0.2s, transform 0.2s`. Auto-dismisses; [? exact duration, it was still up at ~350ms and gone within ~2.6s].

### Amenities dialog [V]
`role="dialog"`, `aria-modal="true"`, `aria-label="What this place offers"`, opened with `aria-hidden` removed. 780px wide, max-height 636, radius 12, white. Header 64px with a Close button (`#amenClose`) and an H2 (22/500). Scrollable body with 12 H3 categories (18/500): Bathroom, Bedroom and laundry, Entertainment, Family, Heating and cooling, Home safety, Internet and office, Kitchen and dining, Location features, Outdoor, Parking and facilities, Services (about 50 items in total; full list below). Enters with `transform: translateY(20px) → 0`, `transition 0.25s cubic-bezier(.2,0,0,1)`. Scrim: fixed, `rgba(0,0,0,.5)`, z 150, `opacity 0.2s`. Esc closes it. [V]

Amenity items: Bathroom (Hairdryer, Cleaning products, Shampoo, Hot water, Shower gel); Bedroom and laundry (Washing machine, Hangers, Bed linen, Room-darkening blinds, Iron, Clothes storage, Cot); Entertainment (TV); Family (Cot); Heating and cooling (Air conditioning, Ceiling fan); Home safety (Exterior security cameras on property, Carbon monoxide alarm, Smoke alarm); Internet and office (Wifi, Dedicated workspace); Kitchen and dining (Kitchen, Fridge, Freezer, Microwave, Cooking basics, Crockery and cutlery, Kettle, Coffee, Wine glasses, Toaster, Blender, Cooker); Location features (Private entrance); Outdoor (Patio or balcony, Outdoor dining area); Parking and facilities (Free parking on premises, Pool, Hot tub, Gym); Services (Pets allowed, Cleaning available during stay, Long-term stays allowed, Self check-in).

---

## 3. Photo Tour

- `role="dialog"`, `aria-modal="true"`, `aria-label="Photo tour"`. Fixed, full-screen, white, z 120.
- **Open/close animation:** closed `opacity: 0; transform: translateY(28px)`; open `opacity: 1; transform: none`. Transition `opacity 0.3s cubic-bezier(.2,0,0,1), transform 0.3s cubic-bezier(.2,0,0,1)`. [V]
- **URL/history:** opening pushes `?modal=PHOTO_TOUR_SCROLLABLE` and a history entry (`state {level: …}`). Closing clears the query string. `document.body` gets `overflow: hidden` while open. [V]
- **Focus:** after opening, `document.activeElement` stayed `BODY` (focus is not moved into the dialog), and it stayed `BODY` after closing (no focus restoration). No `inert`/`aria-hidden` on the page behind. [V, but based on a scripted `.click()`; a real keyboard open may differ ?]

### Bar [V]
Height 88, padding `0 32px`, flex, white, z 5, no border or shadow. Back button (40×40 circle at x=24, `aria-label="Back"`), centred H2 "Photo tour" (16/500), Share (40×40) and Save (40×40) on the right. Hover `#f2f2f2`, active `scale(0.9)`, transition `background 0.16s, transform 0.08s`.

### Body [V]
- A scroll container `#tourScroll` (`overflow-y: auto`, height = viewport − 88).
- Content column is a fixed 976px wide, centred (x 147 at 1269 wide; 232 at 1440).
- **Category nav** (`nav#tourNav`): grid of 8 columns × 111.5px, gap 12px. Each tile: a 111.5×105.2 image (radius 8, `object-fit: cover`) plus a text label 8px below (13–14px, muted). Nine tiles: Living room 1, Living room 2, Full kitchen, Bedroom, Full bathroom, Gym, Exterior, Pool, Additional photos (the last wraps to row 2). Tiles are `<button aria-label="<category>">`.
- Hover on tiles: image scales 1.04 and darkens (`filter: brightness(0.94)`); active `scale(0.99)`. Transform transition `0.25s cubic-bezier(.2,0,0,1)`, filter `0.2s`.
- **Rooms** (`#tourRooms`): nine `section#tour-room-0..8`, each a 2-column grid (458px | 458px, column-gap 60, row-gap 20, padding `16px 0 4px`).
  - Left column: the room title (32/500, tracking -0.64) and an amenity subtitle (16/#717171 with " · " separators). Its wrapper is sticky at `top: 20px` (sticky is applied to text blocks inside each section).
  - Right column: photo grid, 458px wide, gap 12. Pattern per section: one large tile 458×305, then two small tiles 223×149 side by side, repeating. Tiles are `button.aria-label="<listing title> image N"` (N = 1..43 global), radius 8, `overflow: hidden`, background `#eee`. Hover: `::after` overlay `rgba(0,0,0,.08)`, image `scale(1.04)` (transition `transform 0.4s cubic-bezier(.2,0,0,1)`), active image `scale(1)`.
- **Category scroll:** clicking a nav tile smooth-scrolls the tour so the section top sits 24px below the container top. Frame data: 3484→4181 in about 600ms, ease-out, native `scrollTo` smooth (approximate). No URL change, focus stays on body. [V]

### Sections and photo ranges [V]
| # | Title | Subtitle | Photos (1-based) | Count | Tile pattern |
|---|---|---|---|---|---|
| 0 | Living room 1 | Sofa · Air conditioning · Ceiling fan · TV | 1–3 | 3 | L, s, s |
| 1 | Living room 2 | Ceiling fan · Hot tub | 4–10 | 7 | L, s, s, L, s, s, L |
| 2 | Full kitchen | Freezer · Fridge · Blender · Cooker · Cooking basics · Kettle · Microwave · Toaster · Wine glasses · Coffee · Crockery and cutlery | 11–12 | 2 | s, s |
| 3 | Bedroom | Double bed · Air conditioning · Bed linen · Ceiling fan · Clothes storage · Cot · Hangers · Iron · Room-darkening blinds · Cleaning available during stay · Cleaning products · Long-term stays allowed · Private entrance · Wifi | 13–18 | 6 | L, s, s, L, s, s |
| 4 | Full bathroom | Hairdryer · Hot water · Shampoo · Shower gel | 19 | 1 | L |
| 5 | Gym | Air conditioning · Gym · Exercise equipment · Ceiling fan | 20–24 | 5 | L, s, s, s, s |
| 6 | Exterior | (none) | 25–30 | 6 | L, s, s, L, s, s |
| 7 | Pool | Pool | 31–33 | 3 | L, s, s |
| 8 | Additional photos | (none) | 34–43 | 10 | L, s, s, L, s, s, L, s, s, L |

(L = 458×305, s = 223×149.) Total = 43.

**Photo files in tour order (first 8 hex chars of `/assets/images/<uuid>.jpeg`):**
1–3 `a9831aeb a45feaa2 f1da1c3d`; 4–10 `090d8b0b 9be71047 f6de1663 2367476f 34529829 153aa732 3c6e6809`; 11–12 `56c44812 ddc853d7`; 13–18 `67c61c6f 1c827136 0622ab42 a74e3c0b 48a8ffbc 3cf31697`; 19 `97c78f8a`; 20–24 `9aa8e65f 246bd88d 4fede77d 79f59adb f19d8c0a`; 25–30 `23ea6621 5adfdf3e 608748cd 5b856fde c904e1ab 42befad7`; 31–33 `fc02f48f 929545d3 8eb65a8b`; 34–43 `70325367 cc7a56bd 30ad93b2 9642a60d b6599f26 dc01fd46 fe37b80e 3c90338e 862d936c 79addceb`.
Nav thumbnails are the first photo of each section. Full UUIDs are only visible in the live DOM (`img.currentSrc`).

---

## 4. Lightbox

- `role="dialog"`, `aria-modal="true"`, `aria-label="Photo viewer"`, white, z 140, fixed full-screen, on top of the Photo Tour (which stays visible beneath, at opacity 1).
- **Transition:** hidden state `opacity: 0; visibility: hidden`. Open: `opacity 1`. `transition: opacity 0.25s, visibility 0s linear 0.25s`. [V]
- **URL/history:** opening from a tour tile sets `?modal=PHOTO_TOUR_SCROLLABLE&modalItem=1000+index` (0-based, so image 5 → 1004). `history.state` is `{level, idx}`. Navigating between photos updates `modalItem` without adding history entries (length stayed 3). Closing removes `modalItem`. [V]
- **Header** (`_LWXeEY`, 72px, absolute): grid button (40×40 at 16,16, `aria-label="Show all photos"`), centred title = the current photo's room name (16/500), counter "N of 43" (14/400, right at x≈1149), Close button (40×40 at right, `aria-label="Close"`). Icon buttons: radius 50%, transition `background 0.16s, transform 0.08s`, hover `#f2f2f2`, active `scale(0.9)`.
- **Image:** `object-fit: contain`, `max-width: min(1100px, 100%)`, `max-height: 100%`. `alt` = the room name. Photo area starts at y=88, e.g. 741×556 for a 4:3 photo. [V]
- **Arrows:** 40×40 circles, 1px `#222` border, white background, vertically centred (`top: 50%`, translateY -50%), 20px from each edge. Hover `#f7f7f7`; active `translateY(-50%) scale(0.92)`. Disabled: `opacity 0.28`, `cursor: default`, border `#ccc`, no hover change. Labels "Previous" and "Next". At photo 1 the prev arrow is disabled; at photo 43 the next arrow is disabled. Navigation clamps and does not wrap. [V]
- **Keyboard [V]:** ← / → on `document` change photo and update title, counter and URL. Esc closes the Lightbox first (returning to the Photo Tour), a second Esc closes the Photo Tour. The tour keeps its scroll position while the Lightbox is open. [V] On Esc, focus goes to `BODY`. [V]
- [?] What the header grid button does (its label is "Show all photos"; probably closes the Lightbox back to the tour).
- [?] Photo-to-photo transition (crossfade, slide or instant) is not measured.
- [?] Whether Tab is trapped inside the dialogs. My scripted tests can't send real Tab keys.

---

## 5. Accessibility inventory [V]

- `<html lang="en">`. Landmarks: `header#siteHeader`, `nav` (main), `nav aria-label="Listing sections"`, `main#main`, `section#photos`, `section aria-label="Photos of this place"`, `aside`, `section#reviews`, `section#location`, and other unlabelled sections.
- Skip link "Skip to content" → `#main`.
- Headings: one H1 (title); H2 for every major section; H3 inside sections.
- 80 `aria-label`s, 143 `role`s, three `aria-modal` dialogs, one `aria-live="polite"` status region (the toast).
- 50 images have `alt=""` (decorative gallery tiles). The tile buttons carry the labels. The Lightbox image has a real `alt`.
- 4 SVGs outside buttons have no label or `aria-hidden`.
- Calendar days are not focusable.
- Tab order: Skip link → logo → Anywhere → Anytime → Add guests → Search → Become a host → language → menu → Share → Save → hero tiles …

---

## 6. Resolved decisions and remaining open items

**Resolved during the build / final review**
- **Font:** the reference's own font file is used, for learning/assessment purposes only (it is proprietary and marked
  "Not for distribution or release"); see `docs/font-notes.md` and `public/assets/fonts/NOTICE.txt`.
- **Behaviours first listed as unobserved and later verified on the reference** (details in the addendum below): Lightbox
  grid button, map zoom (inert), carousel arrows, toast duration (~1.9 s), sticky-bar threshold (≈622 px, same in both
  directions), Show more / Show less toggles, Photo Tour Share/Save (inert).
- **Visual comparison:** page and overlay geometry were compared numerically against saved reference measurements at
  1269×732 (page height 6265 px on both).

**Still open / not verified**
1. **Photos and icons.** They are the reference's own files; the PDF does not say whether reusing them is allowed.
2. Lightbox photo-to-photo transition (crossfade, slide or instant) on the reference.
3. Focus behaviour of the reference's dialogs with real Tab / Shift+Tab (the clone uses the standard modal pattern).
4. History behaviour on the reference: whether the browser Back button closes the overlays.
5. Whether the date values ("18 Oct – 23 Oct 2026", "Free cancellation before 17 October") are static or computed.
6. Guests field behaviour (dropdown or inert), the "Show original" link, and whether Save persists across reloads.
7. No image-to-image (pixel) diff was run; fidelity was checked by geometry, computed styles and spot screenshots.

---

## Addendum — corrections found during the final review (all verified on the live reference)
- **Photo Tour Share / Save buttons do nothing** (no toast, no state change; heart stays outline). Only the page-level
  Share / Save act.
- **"Show more" toggles to "Show less"** for the description (99px → 120px, same chevron, no rotation) and for clamped
  reviews. The **neighbourhood "Show more" is inert**.
- **Toast** disappears after about 1.9–2.0 s. **Sticky bar** appears at scrollY ≈ 622 (hidden at 620, shown at 624,
  identical scrolling up and down).
- **Hover map (26 rules):** search pill gets `0 2px 8px rgba(0,0,0,.12)`; "Become a host" `#f7f7f7`; globe/menu `#ebebeb`;
  Share/Save `#f2f2f2` (+ `scale(.96)` active); Claim `#f2f2f2`; Message host `#ebebeb`; calendar arrows `#f2f2f2`;
  outline buttons `#f7f7f7` (+ `scale(.98)`); chips, map controls and carousel arrows have **no** hover style.
- Carousel: Next scrolls to the end (scrollLeft ≈ 678, "2 / 2", Next disabled), Prev returns to 0. Map zoom and month
  arrows are inert. Lightbox grid button returns to the Photo Tour; amenities dialog closes on backdrop click and Esc.
- **Font:** the clone ships the reference's exact font (see `docs/font-notes.md`); an earlier substitute font and its width compensations were removed.
