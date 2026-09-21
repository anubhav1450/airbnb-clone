import { useLayoutEffect, useRef, useState } from 'react'
import { LISTING, HIGHLIGHTS, DESCRIPTION, SLEEPING, TOP_AMENITIES, UNAVAILABLE_AMENITIES } from '../data/listing.js'
import { AMENITY_ICONS } from '../data/amenityData.js'
import Icon from './Icon.jsx'
import Calendar from './Calendar.jsx'

// Clamped text: the button toggles "Show more" / "Show less" (as in the reference).
export function useClamp() {
  const [open, setOpen] = useState(false)
  return [open, () => setOpen((o) => !o)]
}

function Stars() {
  return (
    <div className="stars-row" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <Icon key={i} name="star" size={10} />
      ))}
    </div>
  )
}

export default function Overview({ onShowAmenities }) {
  const [descOpen, toggleDesc] = useClamp()
  return (
    <div className="content-left" id="contentLeft">
      <div className="lead">
        <h2>{LISTING.subtitle}</h2>
        <div className="lead__facts">{LISTING.facts}</div>
      </div>

      <div className="fav-box">
        <div className="fav-box__badge">
          <Icon name="laurel" style={{ width: 22.5, height: 36 }} />
          <span>
            Guest
            <br />
            favourite
          </span>
          <Icon name="laurel" style={{ width: 22.5, height: 36, transform: 'scaleX(-1)' }} />
        </div>
        <div className="fav-box__text">One of the most loved homes on Airbnb, according to guests</div>
        <div className="fav-box__stats">
          <div className="fav-box__stat">
            <div className="fav-box__num">{LISTING.rating}</div>
            <Stars />
          </div>
          <div className="fav-box__sep" />
          <div className="fav-box__stat">
            <div className="fav-box__num">{LISTING.reviewCount}</div>
            <div className="fav-box__lbl">Reviews</div>
          </div>
        </div>
      </div>

      <div className="host-row">
        <img src="/assets/avatars/host.jpeg" alt="" width="46" height="46" />
        <div>
          <div className="host-row__name">Hosted by {LISTING.host}</div>
          <div className="host-row__since">{LISTING.hostSince}</div>
        </div>
      </div>

      <div className="highlights">
        {HIGHLIGHTS.map((h) => (
          <div className="highlight" key={h.title}>
            <Icon name={h.icon} size={24} />
            <div>
              <div className="highlight__title">{h.title}</div>
              <div className="highlight__text">{h.text}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="block block--desc">
        <div className="translate-note">
          <span>
            Some info has been automatically translated.{' '}
            <a href="#" onClick={(e) => e.preventDefault()}>
              Show original
            </a>
          </span>
        </div>
        <p className={`desc${descOpen ? ' is-open' : ''}`} id="descText">
          {DESCRIPTION}
        </p>
        <button type="button" className="more-link" id="descMore" onClick={toggleDesc}>
          {descOpen ? 'Show less' : 'Show more'}
          <Icon name="chevronRight" size={14} />
        </button>
      </div>

      <div className="block">
        <h2>Where you'll sleep</h2>
        <div className="sleep-grid">
          {SLEEPING.map((s) => (
            <div key={s.title}>
              <img src={`/assets/photos/${s.img}`} alt="" />
              <div className="sleep-grid__title">{s.title}</div>
              <div className="sleep-grid__text">{s.text}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="block" id="amenities">
        <h2>What this place offers</h2>
        <ul className="amenity-grid">
          {TOP_AMENITIES.map((label) => (
            <li key={label} className="amenity-grid__item">
              <Icon svg={AMENITY_ICONS[label]} size={24} />
              <span className={UNAVAILABLE_AMENITIES.includes(label) ? 'is-unavailable' : ''}>{label}</span>
            </li>
          ))}
        </ul>
        <button type="button" className="outline-btn" id="showAmen" onClick={onShowAmenities}>
          Show all 50 amenities
        </button>
      </div>

      <Calendar />
    </div>
  )
}
