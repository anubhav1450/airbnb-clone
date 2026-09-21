// Text-width drift of the clone vs the reference (shrink-to-fit text only).
//   node tools/textwidth.mjs <ref.json> <local.json>
import fs from 'node:fs'
const [rf, lf] = process.argv.slice(2)
const R = JSON.parse(fs.readFileSync(rf)), L = JSON.parse(fs.readFileSync(lf))
const key = (d) => { const seen = new Map(), out = new Map(); for (const e of d.els) { if (!e.txt || e.w <= 0) continue; const b = 'T|' + e.txt; const n = (seen.get(b) || 0) + 1; seen.set(b, n); out.set(b + '#' + n, e) } return out }
const rk = key(R), lk = key(L)
const ratios = []
for (const [k, r] of rk) {
  const l = lk.get(k)
  if (!l || r.w > 420 || r.w < 20 || r.h > parseFloat(r.s.fontSize) * 1.9) continue
  if (Math.abs(l.w - r.w) < 0.5) continue // container-sized, not text-sized
  ratios.push({ k: k.slice(2, 34), r: l.w / r.w, dw: l.w - r.w, len: r.txt.length })
}
ratios.sort((a, b) => a.r - b.r)
const med = ratios[Math.floor(ratios.length / 2)].r
const mean = ratios.reduce((a, b) => a + b.r, 0) / ratios.length
const absdw = ratios.reduce((a, b) => a + Math.abs(b.dw), 0) / ratios.length
const perChar = ratios.reduce((a, b) => a + b.dw / b.len, 0) / ratios.length
console.log(`n=${ratios.length} median ratio ${med.toFixed(4)} mean ${mean.toFixed(4)} mean|dw| ${absdw.toFixed(2)}px mean dw/char ${perChar.toFixed(3)}px`)
