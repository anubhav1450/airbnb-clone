import { useEffect, useRef } from 'react'

const FOCUSABLE = 'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])'

// Moves focus into a dialog when it opens, traps Tab inside it while open, and
// returns focus to the previously focused element on close.
export default function useDialogFocus(open, ref, { initial } = {}) {
  const returnTo = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!open || !el) return
    returnTo.current = document.activeElement
    const first = (initial && el.querySelector(initial)) || el
    first.focus({ preventScroll: true })
    const onKey = (e) => {
      if (e.key !== 'Tab') return
      const items = [...el.querySelectorAll(FOCUSABLE)].filter((n) => n.offsetParent !== null || getComputedStyle(n).position === 'fixed')
      if (!items.length) { e.preventDefault(); return }
      const a = items[0], b = items[items.length - 1]
      if (e.shiftKey && (document.activeElement === a || document.activeElement === el)) { e.preventDefault(); b.focus() }
      else if (!e.shiftKey && document.activeElement === b) { e.preventDefault(); a.focus() }
    }
    el.addEventListener('keydown', onKey)
    return () => {
      el.removeEventListener('keydown', onKey)
      // Restore after the page behind has left `inert` (parent effects run after this cleanup).
      const t = returnTo.current
      setTimeout(() => {
        if (t && document.contains(t) && t !== document.body) t.focus({ preventScroll: true })
      }, 0)
    }
  }, [open, ref, initial])
}
