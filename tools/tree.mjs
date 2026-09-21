// Print a compact indented tree from a dump file.
// node tools/tree.mjs <dump.json> [minY] [maxY] [maxDepth] [rootTextFilter]
import fs from 'node:fs'
const [file, minY = 0, maxY = 1e9, maxDepth = 99, filt] = process.argv.slice(2)
const d = JSON.parse(fs.readFileSync(file, 'utf8'))
const els = d.els
const byId = new Map(els.map((e) => [e.id, e]))
const kids = new Map()
for (const e of els) (kids.get(e.p) || kids.set(e.p, []).get(e.p)).push(e)
const px = (v) => v.replace('px', '')
const sty = (e) => {
  const s = e.s, o = []
  if (e.txt) { o.push(`${px(s.fontSize)}/${s.fontWeight}/${px(s.lineHeight)}`); if (s.letterSpacing !== 'normal') o.push('ls' + px(s.letterSpacing)); o.push(s.color.replace('rgb', '')) }
  if (s.backgroundColor !== 'rgba(0, 0, 0, 0)') o.push('bg' + s.backgroundColor.replace('rgb', ''))
  if (s.borderTopWidth !== '0px') o.push('bt' + px(s.borderTopWidth) + s.borderTopColor.replace('rgb', ''))
  if (s.borderBottomWidth !== '0px') o.push('bb' + px(s.borderBottomWidth) + s.borderBottomColor.replace('rgb', ''))
  if (s.borderRadius !== '0px') o.push('r' + s.borderRadius)
  if (s.boxShadow !== 'none') o.push('sh:' + s.boxShadow.replace(/rgba?\([^)]*\)/, (m) => m.replace(/ /g, '')))
  const pad = [s.paddingTop, s.paddingRight, s.paddingBottom, s.paddingLeft]
  if (pad.some((v) => v !== '0px')) o.push('p' + pad.map(px).join(' '))
  if (s.display === 'flex' || s.display === 'grid' || s.display === 'inline-flex') o.push(s.display + (s.gap !== 'normal' ? ' gap' + s.gap.replace(/px/g, '') : ''))
  if (s.position !== 'static' && s.position !== 'relative') o.push(s.position)
  if (s.opacity !== '1') o.push('op' + s.opacity)
  if (s.textDecorationLine !== 'none') o.push(s.textDecorationLine)
  if (s.textAlign !== 'start' && s.textAlign !== 'left') o.push('ta:' + s.textAlign)
  return o.join(' ')
}
const line = (e, depth) => {
  const a = e.a || {}
  const tag = e.t + (a.id ? '#' + a.id : '') + (a.role ? '[' + a.role + ']' : '') + (a['aria-label'] ? '{' + a['aria-label'].slice(0, 30) + '}' : '') + (a.src ? '<' + a.src.slice(0, 12) + '>' : '') + (a.href ? '→' + a.href : '') + (a.disabled !== undefined ? ' DIS' : '')
  return `${'  '.repeat(depth)}${tag} ${e.x},${e.y} ${e.w}×${e.h}${e.txt ? ' "' + e.txt.slice(0, 60) + '"' : ''}  ${sty(e)}`
}
const out = []
const walk = (e, depth) => {
  if (depth > maxDepth) return
  if (e.y + e.h < +minY || e.y > +maxY) { /* still descend if container spans */ if (!(e.y <= +maxY && e.y + e.h >= +minY)) return }
  if (e.w === 0 && e.h === 0) return
  out.push(line(e, depth))
  for (const c of kids.get(e.id) || []) walk(c, depth + 1)
}
const ROOT = process.env.ROOT
const starts = ROOT ? els.filter((e) => (e.a && (e.a.id === ROOT || e.a['aria-label'] === ROOT))) : (kids.get(-1) || [])
for (const r of starts) walk(r, 0)
console.log(out.filter((l) => !filt || l.includes(filt)).join('\n'))
