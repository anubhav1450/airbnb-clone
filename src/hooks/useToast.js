import { useCallback, useEffect, useRef, useState } from 'react'

export default function useToast(ms = 1900) {
  const [toast, setToast] = useState({ text: '', shown: false })
  const timer = useRef(0)
  const show = useCallback(
    (text) => {
      clearTimeout(timer.current)
      setToast({ text, shown: true })
      timer.current = setTimeout(() => setToast((t) => ({ ...t, shown: false })), ms)
    },
    [ms],
  )
  useEffect(() => () => clearTimeout(timer.current), [])
  return [toast, show]
}
