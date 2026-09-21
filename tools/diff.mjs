// Compare a dump of the reference against a dump of the local build.
//   node tools/diff.mjs <ref.json> <local.json> [--all] [--min=<px>] [--region=<minY>-<maxY>]
// Elements are matched by (own text | image file | aria-label | id) + occurrence order, so the two
// DOMs need not share structure. A vertical offset that merely carries over from an earlier
// difference is suppressed, so the first line of each cascade is the one to fix.
import fs from 'node:fs'

const [refFile, locFile, ...flags] = process.argv.slice(2)
const all = flags.includes('--all')
const tol = Number((flags.find((f) => f.startsWith('--min=')) || '--min=1').slice(6))
const region = (flags.find((f) => f.startsWith('--region=')) || '').slice(9).split('-').map(Number)
const load = (f) => JSON.parse(fs.readFileSync(f, 'utf8'))
const R = load(refFile), L = load(locFile)
// Tag every element as page / overlay (tour, lightbox, amenities) so they can be compared separately.
const OVERLAY_IDS = ['_KpcKWX', 'lightbox', 'amenModal', 'tourBar']
const tagOverlay = (d) => {
  const byId = new Map(d.els.map((e) => [e.id, e]))
  for (const e of d.els) {
    const p = byId.get(e.p)
    const self = e.a && (e.a['aria-modal'] === 'true' || OVERLAY_IDS.includes(e.a.id) || e.a.role === 'dialog' || (e.s.position === 'fixed' && e.h > 300 && e.w > 1000))
    e.ov = !!self || !!(p && p.ov)
  }
}
tagOverlay(R); tagOverlay(L)
const only = flags.includes('--overlays') ? 'ov' : flags.includes('--main') ? 'page' : ''
const keep = (e) => !only || (only === 'ov' ? e.ov : !e.ov)
R.els = R.els.filter(keep); L.els = L.els.filter(keep)

const keyed = (d) => {
  const seen = new Map()
  const out = new Map()
  for (const e of d.els) {
    const a = e.a || {}
    const bases = []
    if (a.id) bases.push('#' + a.id)
    if (e.t === 'img' && a.src) bases.push('I|' + a.src)
    else if (a['aria-label'] && (e.t === 'button' || e.t === 'a' || a.role)) bases.push('A|' + e.t + '|' + a['aria-label'])
    if (e.txt) bases.push('T|' + e.txt)
    for (const b of bases) {
      const n = (seen.get(b) || 0) + 1
      seen.set(b, n)
      out.set(b + '#' + n, e)
    }
  }
  return out
}
const RK = keyed(R), LK = keyed(L)

const STYLE_KEYS = ['fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'color', 'backgroundColor', 'borderRadius', 'borderTopWidth', 'borderTopColor', 'borderBottomWidth', 'opacity', 'boxShadow', 'textDecorationLine', 'paddingTop', 'paddingLeft', 'gap', 'objectFit']
const norm = (k, v) => {
  if (v === undefined) return ''
  if (k === 'lineHeight' || k === 'letterSpacing') return v === 'normal' ? 'normal' : String(Math.round(parseFloat(v) * 10) / 10)
  if (k === 'fontSize' || /padding|Width|gap/i.test(k)) return String(Math.round(parseFloat(v) * 10) / 10 || v)
  return v
}

const rows = []
let missingLocal = 0
for (const [k, r] of RK) {
  const l = LK.get(k)
  if (!l) { missingLocal++; rows.push({ y: r.y, msg: `MISSING in local: ${k.slice(0, 70)}  @${r.x},${r.y} ${r.w}×${r.h}` }); continue }
  const diffs = []
  const dx = l.x - r.x, dy = l.y - r.y, dw = l.w - r.w, dh = l.h - r.h
  const st = []
  const TEXT_ONLY = ['fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'color', 'textDecorationLine']
  const SKIP = ['paddingTop', 'paddingLeft', 'gap']
  for (const s of STYLE_KEYS) {
    if (SKIP.includes(s) && !all) continue
    if (TEXT_ONLY.includes(s) && !r.txt) continue
    const a = norm(s, r.s[s]), b = norm(s, l.s[s])
    if (a !== b) st.push(`${s}: ${a} → ${b}`)
  }
  rows.push({ y: r.y, k, r, l, dx, dy, dw, dh, st })
}
const extra = []
for (const [k, l] of LK) if (!RK.has(k) && k.startsWith('T|') && l.w > 0) extra.push(`EXTRA in local: ${k.slice(0, 70)} @${l.x},${l.y}`)

rows.sort((a, b) => a.y - b.y)
let lastDy = 0, printed = 0
const lines = []
for (const row of rows) {
  if (row.msg) { lines.push(row.msg); continue }
  if (region.length === 2 && (row.y < region[0] || row.y > region[1])) continue
  const { k, r, dx, dy, dw, dh, st } = row
  const sizeBad = Math.abs(dw) > tol || Math.abs(dh) > tol
  const posBad = Math.abs(dx) > tol || Math.abs(dy - lastDy) > tol
  if (all || sizeBad || posBad || st.length) {
    printed++
    const parts = []
    if (Math.abs(dx) > tol) parts.push(`dx${dx > 0 ? '+' : ''}${dx}`)
    if (Math.abs(dy) > tol) parts.push(`dy${dy > 0 ? '+' : ''}${dy}`)
    if (Math.abs(dw) > tol) parts.push(`dw${dw > 0 ? '+' : ''}${dw}`)
    if (Math.abs(dh) > tol) parts.push(`dh${dh > 0 ? '+' : ''}${dh}`)
    lines.push(`${k.slice(0, 60).padEnd(60)} ref@${r.x},${r.y} ${r.w}×${r.h}  ${parts.join(' ')}${st.length ? '  | ' + st.join('; ') : ''}`)
    if (Math.abs(dy - lastDy) > tol && !sizeBad) lastDy = dy
    else if (Math.abs(dy) <= tol) lastDy = 0
  }
}
console.log(`matched ${rows.length - missingLocal}/${RK.size} ref keys; missing ${missingLocal}; extra text ${extra.length}; printed ${printed}`)
console.log(`viewport ref ${R.vw}×${R.vh} docH ${R.docH}  local ${L.vw}×${L.vh} docH ${L.docH}`)
console.log(lines.join('\n'))
if (flags.includes('--extra')) console.log(extra.join('\n'))
