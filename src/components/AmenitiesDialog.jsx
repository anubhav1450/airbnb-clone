import { useRef } from 'react'
import { AMENITY_GROUPS, AMENITY_ICONS } from '../data/amenityData.js'
import useDialogFocus from '../hooks/useDialogFocus.js'
import Icon from './Icon.jsx'

export default function AmenitiesDialog({ open, onClose }) {
  const ref = useRef(null)
  useDialogFocus(open, ref, { initial: '#amenClose' })
  return (
    <>
      <div className={`scrim${open ? ' is-open' : ''}`} aria-hidden="true" onClick={onClose} />
      <div className={`amen-modal${open ? ' is-open' : ''}`} id="amenModal" aria-hidden={!open} onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="amen" role="dialog" aria-modal="true" aria-label="What this place offers" ref={ref} tabIndex={-1}>
          <div className="amen__bar">
            <button type="button" className="round-btn" id="amenClose" aria-label="Close" onClick={onClose}>
              <Icon name="amenClose" size={18} />
            </button>
          </div>
          <div className="amen__body" id="amenBody">
            <h2>What this place offers</h2>
            {AMENITY_GROUPS.map((g) => (
              <div className="amen__group" key={g.title}>
                <h3>{g.title}</h3>
                {g.items.map((it, i) => (
                  <div className="amen__row" key={g.title + i}>
                    <Icon svg={AMENITY_ICONS[it.label]} size={24} />
                    <span className={it.unavailable ? 'is-unavailable' : ''}>{it.label}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
