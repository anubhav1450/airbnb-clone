import { useCallback, useEffect, useRef, useState } from 'react'
import Header from './components/Header.jsx'
import StickyBar from './components/StickyBar.jsx'
import TitleRow from './components/TitleRow.jsx'
import HeroGrid from './components/HeroGrid.jsx'
import Overview from './components/Overview.jsx'
import BookingCard from './components/BookingCard.jsx'
import Reviews from './components/Reviews.jsx'
import LocationSection from './components/LocationSection.jsx'
import HostSection from './components/HostSection.jsx'
import ThingsToKnow from './components/ThingsToKnow.jsx'
import Nearby from './components/Nearby.jsx'
import PhotoTour from './components/PhotoTour.jsx'
import Lightbox from './components/Lightbox.jsx'
import AmenitiesDialog from './components/AmenitiesDialog.jsx'
import useOverlayRoute from './hooks/useOverlayRoute.js'
import useToast from './hooks/useToast.js'
import { PHOTO_COUNT, ROOM_START, roomOfFile } from './data/gallery.js'

export default function App() {
  const { route, openTour, openLightbox, setLightbox, closeLightbox, closeTour } = useOverlayRoute()
  const [amenOpen, setAmenOpen] = useState(false)
  const [saved, setSaved] = useState(false)
  const [toast, showToast] = useToast()
  const tourRef = useRef(null)
  const tourEl = useRef(null)
  const pageRef = useRef(null)
  const wasOpen = useRef(false)

  const lbOpen = route.lb !== null
  const overlayOpen = route.tour || amenOpen

  // Keyboard-focus rings only after a key press (body.kbd), like the reference.
  useEffect(() => {
    const on = (e) => { if (e.key === 'Tab' || e.key.startsWith('Arrow')) document.body.classList.add('kbd') }
    const off = () => document.body.classList.remove('kbd')
    window.addEventListener('keydown', on)
    window.addEventListener('mousedown', off)
    return () => { window.removeEventListener('keydown', on); window.removeEventListener('mousedown', off) }
  }, [])

  // Scroll lock + make the page behind a modal inert.
  useEffect(() => {
    document.body.classList.toggle('scroll-lock', overlayOpen)
    if (pageRef.current) pageRef.current.inert = overlayOpen
  }, [overlayOpen])
  useEffect(() => { if (tourEl.current) tourEl.current.inert = lbOpen }, [lbOpen])

  const goPhoto = useCallback((i) => { if (i >= 0 && i < PHOTO_COUNT) setLightbox(i) }, [setLightbox])

  // Keys: ←/→ in the lightbox, Esc closes the top-most overlay.
  useEffect(() => {
    const onKey = (e) => {
      if (lbOpen) {
        if (e.key === 'ArrowLeft') { e.preventDefault(); goPhoto(route.lb - 1) }
        else if (e.key === 'ArrowRight') { e.preventDefault(); goPhoto(route.lb + 1) }
        else if (e.key === 'Escape') closeLightbox()
      } else if (e.key === 'Escape') {
        if (amenOpen) setAmenOpen(false)
        else if (route.tour) closeTour()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [lbOpen, route, amenOpen, goPhoto, closeLightbox, closeTour])

  // When the tour opens (button, hero tile or a deep link) put it at the right spot.
  const openFrom = useRef(null)
  useEffect(() => {
    if (route.tour && !wasOpen.current) {
      const room = openFrom.current === null ? 0 : openFrom.current
      requestAnimationFrame(() => (room ? tourRef.current?.scrollToRoom(room, false) : tourRef.current?.reset()))
    }
    wasOpen.current = route.tour
    if (!route.tour) openFrom.current = null
  }, [route.tour])

  const openHero = (file) => {
    openFrom.current = file ? roomOfFile(file) : 0
    openTour()
  }
  const share = () => showToast('Share options')
  const save = () => { showToast(saved ? 'Removed from wishlist' : 'Saved to wishlist'); setSaved(!saved) }
  const reserve = () => showToast("You won't be charged yet")

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div ref={pageRef}>
        <Header />
        <StickyBar onReserve={reserve} />
        <main id="main">
          <div className="container">
            <section id="photos" className="title-section">
              <TitleRow saved={saved} onShare={share} onSave={save} />
            </section>
            <HeroGrid onOpen={openHero} />
            <div className="content-grid">
              <Overview onShowAmenities={() => setAmenOpen(true)} />
              <BookingCard onReserve={reserve} />
            </div>
            <div id="wideSections">
              <Reviews />
              <LocationSection />
              <HostSection />
              <ThingsToKnow />
              <Nearby />
            </div>
          </div>
        </main>
      </div>

      <AmenitiesDialog open={amenOpen} onClose={() => setAmenOpen(false)} />
      <PhotoTour ref={tourRef} dialogRef={tourEl} open={route.tour} onClose={closeTour} onOpenPhoto={openLightbox} />
      <Lightbox index={route.lb} onClose={closeLightbox} onGo={goPhoto} onShowAll={closeLightbox} />
      <div className={`toast${toast.shown ? ' is-shown' : ''}`} role="status" aria-live="polite">{toast.text}</div>
    </>
  )
}
