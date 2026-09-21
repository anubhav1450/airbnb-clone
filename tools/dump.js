// Measurement dump. Paste into the console (or run via the Chrome JS tool) on the
// reference AND on the local build; then `node tools/diff.mjs` compares them.
// Records per-element geometry + computed style. Class names are ignored so the
// two implementations can be compared by text / aria-label / image name.
window.__makeDump = () => {
  const STY = [
    'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'color', 'backgroundColor',
    'borderTopWidth', 'borderTopColor', 'borderBottomWidth', 'borderBottomColor',
    'borderRadius', 'boxShadow', 'opacity', 'textDecorationLine', 'display', 'position',
    'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'gap', 'textAlign',
    'transform', 'zIndex', 'objectFit', 'transition', 'cursor', 'overflow',
  ]
  const ATTR = ['id', 'role', 'aria-label', 'aria-hidden', 'aria-modal', 'aria-expanded', 'aria-live', 'href', 'tabindex', 'type', 'disabled', 'alt', 'lang']
  const out = []
  let n = 0
  const walk = (el, parent) => {
    if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'PATH', 'CIRCLE', 'RECT', 'G', 'DEFS', 'LINE', 'POLYGON', 'CLIPPATH', 'USE', 'LINEARGRADIENT', 'STOP'].includes(el.tagName.toUpperCase())) return
    const id = n++
    const b = el.getBoundingClientRect()
    const cs = getComputedStyle(el)
    const own = [...el.childNodes].filter((c) => c.nodeType === 3).map((c) => c.textContent).join(' ').replace(/\s+/g, ' ').trim().slice(0, 600)
    const rec = { id, p: parent, t: el.tagName.toLowerCase(), x: Math.round((b.x + scrollX) * 2) / 2, y: Math.round((b.y + scrollY) * 2) / 2, w: Math.round(b.width * 2) / 2, h: Math.round(b.height * 2) / 2 }
    if (own) rec.txt = own
    const a = {}
    for (const k of ATTR) { const v = el.getAttribute(k); if (v !== null) a[k] = v }
    if (el.tagName === 'IMG') a.src = (el.currentSrc || el.src).split('/').pop()
    if (Object.keys(a).length) rec.a = a
    const s = {}
    for (const k of STY) s[k] = cs[k]
    rec.s = s
    out.push(rec)
    for (const c of el.children) walk(c, id)
  }
  walk(document.body, -1)
  window.__dump = { url: location.href, vw: innerWidth, vh: innerHeight, scrollY, docH: document.documentElement.scrollHeight, els: out }
  return window.__dump
}
window.__makeDump()
