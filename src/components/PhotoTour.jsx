import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { ROOMS, PHOTO_DIR } from '../data/photos.js'
import { roomRows, PHOTOS } from '../data/gallery.js'
import { LISTING } from '../data/listing.js'
import useDialogFocus from '../hooks/useDialogFocus.js'
import Icon from './Icon.jsx'

const OFFSET = 24 // a room's top sits 24px below the scroll area's top when jumped to

const PhotoTour = forwardRef(function PhotoTour({ open, onClose, onOpenPhoto, dialogRef }, ref) {
  const scroller = useRef(null)
  useDialogFocus(open, dialogRef, { initial: '#tourBack' })

  const scrollToRoom = (i, smooth) => {
    const sc = scroller.current
    const sec = sc.querySelector(`#tour-room-${i}`)
    if (!sec) return
    const top = sec.getBoundingClientRect().top - sc.getBoundingClientRect().top + sc.scrollTop - OFFSET
    if (smooth) sc.scrollTo({ top, behavior: 'smooth' })
    else sc.scrollTop = top
  }
  useImperativeHandle(ref, () => ({ scrollToRoom, reset: () => (scroller.current.scrollTop = 0) }))

  // Rooms are listed once: tiles lazy-load inside the scroller.
  return (
    <div className={`tour${open ? ' is-open' : ''}`} role="dialog" aria-modal="true" aria-label="Photo tour" aria-hidden={!open} ref={dialogRef} tabIndex={-1}>
      <header className="tour__bar" id="tourBar">
        <button type="button" className="round-btn tour__back" id="tourBack" aria-label="Back" onClick={onClose}>
          <Icon name="tourBack" size={18} />
        </button>
        <h2 className="tour__title">Photo tour</h2>
        <div className="tour__actions">
          {/* As in the reference, these two buttons have no behaviour. */}
          <button type="button" className="round-btn" aria-label="Share">
            <Icon name="tourShare" size={18} />
          </button>
          <button type="button" className="round-btn" aria-label="Save">
            <Icon name="tourHeart" size={18} />
          </button>
        </div>
      </header>
      <div className="tour__scroll" id="tourScroll" ref={scroller}>
        <div className="tour__inner">
          <nav className="tour__nav" id="tourNav" aria-label="Photo categories">
            {ROOMS.map((r, i) => (
              <button type="button" className="tile" key={r.title} aria-label={r.title} onClick={() => scrollToRoom(i, true)}>
                <img src={PHOTO_DIR + r.thumb} alt="" loading="lazy" />
                <span>{r.title}</span>
              </button>
            ))}
          </nav>
          <div className="tour__rooms" id="tourRooms">
            {ROOMS.map((r, ri) => (
              <section className="tour__room" id={`tour-room-${ri}`} key={r.title} aria-label={r.title}>
                <div className="tour__room-head">
                  <div className="tour__room-title">{r.title}</div>
                  {r.subtitle && <div className="tour__room-sub">{r.subtitle}</div>}
                </div>
                <div className="tour__photos">
                  {roomRows(ri).map((row, k) => (
                    <div key={k} className={row.type === 'L' ? 'tour__row' : 'tour__row tour__row--pair'}>
                      {row.items.map((gi) => (
                        <button type="button" className={`tour-photo${row.type === 'L' ? ' tour-photo--wide' : ''}`} key={gi} aria-label={`${LISTING.title} image ${gi + 1}`} onClick={() => onOpenPhoto(gi)}>
                          <img src={PHOTOS[gi].src} alt="" loading="lazy" />
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
})

export default PhotoTour
