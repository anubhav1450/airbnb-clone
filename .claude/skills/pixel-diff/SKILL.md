---
name: pixel-diff
description: Measure the running clone and diff it against the reference dumps (geometry + computed style), then fix the first difference in each cascade. Use for every fidelity iteration of the Airbnb clone.
---

# pixel-diff

The reference page is only inspected through rendered facts (geometry, computed styles, text, assets).

**Setup note:** the measurement dumps are not part of the submitted ZIP — `tools/captures/` is created on demand (by
`tools/receiver.mjs`) and is gitignored. To use this skill, first capture the reference once: open the reference page in
a Chrome tab at 1269×732, run `tools/dump.js` there (and `tools/states.js` for the open overlays), and save the results as
`tools/captures/pp-ref-dump.json` and `pp-ref-s-{tour,lb,amen}.json` (the reference page cannot POST to the local
receiver, so save them with a download link). Only use rendered measurements; never copy the reference's source.

## 1. Capture the clone (Chrome tab at 1269×732, `npm run dev` running)
Run in the tab (Chrome JS tool or DevTools console):
```js
(async () => {
  for (const f of ['/tools/dump.js']) (0, eval)(await (await fetch(f)).text())
  await fetch('http://127.0.0.1:5199/save?name=pp-local-dump.json', { method: 'POST', body: JSON.stringify(window.__dump) })
})()
```
`node tools/receiver.mjs` must be running (it writes into `tools/captures/`).
For the open overlays also load `/tools/states.js` and call
`window.__runStates((n, d) => fetch('http://127.0.0.1:5199/save?name=' + n + '.json', {method:'POST', body: JSON.stringify(d)}), 'pp-local-s-')`.

## 2. Diff
```
tools/measure.sh --main --min=1.5        # page
tools/measure.sh --overlays              # closed overlays
node tools/diff.mjs tools/captures/pp-ref-s-tour.json tools/captures/pp-local-s-tour.json --overlays
```
Elements are matched by text / image / aria-label / id + occurrence. A vertical offset carried over from an
earlier difference is suppressed, so each printed line is a cascade *root*.

## 3. Fix
- Root causes seen so far: button `line-height: normal`, missing 1px transparent borders, flex/grid `align-items`,
  block margins (compare against `tools/tree.mjs` output for the same region), font-metric width drift (compensate
  with explicit widths only where the reference layout depends on them).
- `node tools/tree.mjs <dump> <minY> <maxY> <depth>` (env `ROOT=<id|aria-label>`) prints an indented, styled tree
  for reading one region of either dump.

## 4. Re-measure until what is left is sub-pixel or text-width noise.
