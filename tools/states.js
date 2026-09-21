// Drives the reference and the clone through the same UI states and dumps each one.
// window.__runStates(post) — post(name, dump) stores a dump (download on the reference, POST locally).
window.__runStates = async (post, prefix) => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
  const esc = () => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', keyCode: 27, bubbles: true }))
  const snap = async (name) => { await sleep(900); await post(prefix + name, window.__makeDump()) }
  document.querySelector('#showAllPhotos').click()
  await snap('tour')
  ;[...document.querySelectorAll('#tourRooms button')].find((b) => /image 5$/.test(b.getAttribute('aria-label'))).click()
  await snap('lb')
  esc(); await sleep(500); esc(); await sleep(700)
  document.querySelector('#showAmen').click()
  await snap('amen')
  esc(); await sleep(500)
  window.__statesDone = true
}
