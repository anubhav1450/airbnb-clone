import { useEffect, useRef, useState } from 'react'
import { PHOTOS, PHOTO_COUNT } from '../data/gallery.js'
import useDialogFocus from '../hooks/useDialogFocus.js'
import Icon from './Icon.jsx'

export default function Lightbox({ index, onClose, onGo, onShowAll }) {
  const open = index !== null
  const ref = useRef(null)
  // Keep the last photo mounted while fading out.
  const [shown, setShown] = useState(0)
  useEffect(() => {
    if (open) setShown(index)
  }, [open, index])
  useDialogFocus(open, ref, { initial: '#lbClose' })
  const photo = PHOTOS[shown]
  const first = shown === 0
  const last = shown === PHOTO_COUNT - 1

  return (
    <div className={`lightbox${open ? ' is-open' : ''}`} role="dialog" aria-modal="true" aria-label="Photo viewer" aria-hidden={!open} ref={ref} tabIndex={-1}>
      <header className="lightbox__bar">
        <button type="button" className="round-btn" id="lbGrid" aria-label="Show all photos" onClick={onShowAll}>
          <Icon name="lbGrid" size={18} />
        </button>
        <div className="lightbox__title" id="lbTitle">
          {photo.room}
        </div>
        <div className="lightbox__right">
          <span className="lightbox__counter" id="lbCounter" aria-live="polite">
            {shown + 1} of {PHOTO_COUNT}
          </span>
          <button type="button" className="round-btn" id="lbClose" aria-label="Close" onClick={onClose}>
            <Icon name="close" size={18} />
          </button>
        </div>
      </header>
      <button type="button" className="lightbox__arrow lightbox__arrow--prev" id="lbPrev" aria-label="Previous" disabled={!open || first} onClick={() => onGo(shown - 1)}>
        <Icon name="lbPrev" size={18} />
      </button>
      <div className="lightbox__stage" id="lbStage">
        <img src={photo.src} alt={photo.room} />
      </div>
      <button type="button" className="lightbox__arrow lightbox__arrow--next" id="lbNext" aria-label="Next" disabled={!open || last} onClick={() => onGo(shown + 1)}>
        <Icon name="lbNext" size={18} />
      </button>
    </div>
  )
}
