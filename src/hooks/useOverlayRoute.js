import { useCallback, useEffect, useState } from 'react'
import { PHOTO_COUNT } from '../data/gallery.js'

const MODAL = 'PHOTO_TOUR_SCROLLABLE'

// The Photo Tour and Lightbox are addressable: ?modal=PHOTO_TOUR_SCROLLABLE[&modalItem=1000+index].
function parse() {
  const p = new URLSearchParams(window.location.search)
  const tour = p.get('modal') === MODAL
  const item = p.get('modalItem')
  const idx = item === null ? null : Number(item) - 1000
  return { tour, lb: tour && Number.isInteger(idx) && idx >= 0 && idx < PHOTO_COUNT ? idx : null }
}

export default function useOverlayRoute() {
  const [route, setRoute] = useState(parse)

  useEffect(() => {
    const onPop = () => setRoute(parse())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const openTour = useCallback(() => {
    window.history.pushState({ level: 'tour' }, '', `?modal=${MODAL}`)
    setRoute({ tour: true, lb: null })
  }, [])

  const openLightbox = useCallback((idx) => {
    window.history.pushState({ level: 'lb', idx }, '', `?modal=${MODAL}&modalItem=${1000 + idx}`)
    setRoute({ tour: true, lb: idx })
  }, [])

  const setLightbox = useCallback((idx) => {
    window.history.replaceState({ level: 'lb', idx }, '', `?modal=${MODAL}&modalItem=${1000 + idx}`)
    setRoute({ tour: true, lb: idx })
  }, [])

  // Close one level: use history when we pushed it, otherwise rewrite the URL.
  const close = useCallback((level) => {
    if (window.history.state && window.history.state.level === level) window.history.back()
    else {
      const url = level === 'lb' ? `?modal=${MODAL}` : window.location.pathname
      window.history.replaceState(level === 'lb' ? { level: 'tour' } : null, '', url)
      setRoute(parse())
    }
  }, [])

  return { route, openTour, openLightbox, setLightbox, closeLightbox: () => close('lb'), closeTour: () => close('tour') }
}
