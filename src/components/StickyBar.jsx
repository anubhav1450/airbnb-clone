import { useEffect, useState } from 'react'
import { LISTING } from '../data/listing.js'
import Icon from './Icon.jsx'

const LINKS = [
  ['Photos', 'photos'],
  ['Amenities', 'amenities'],
  ['Reviews', 'reviews'],
  ['Location', 'location'],
]

// Smooth-scroll to an in-page section, leaving 80px above it (matches the reference).
export function scrollToSection(id) {
  const el = document.getElementById(id)
  if (!el) return
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
}

export default function StickyBar({ onReserve, threshold = 622 }) {
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const onScroll = () => setShown(window.scrollY >= threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return (
    <div className={`sticky-bar${shown ? ' is-shown' : ''}`} aria-hidden={!shown} inert={!shown}>
      <div className="container sticky-bar__inner">
        <nav aria-label="Listing sections" className="sticky-bar__nav">
          {LINKS.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault()
                scrollToSection(id)
              }}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="sticky-bar__right">
          <div className="sticky-bar__price">
            <div>
              <span className="sticky-bar__amount">₹{LISTING.price}</span> <span className="sticky-bar__nights">for {LISTING.nights} nights</span>
            </div>
            <div className="sticky-bar__rating">
              <Icon name="star" size={11} /> {LISTING.rating} · <span>{LISTING.reviewCount} reviews</span>
            </div>
          </div>
          <button type="button" className="reserve-btn reserve-btn--sm" onClick={onReserve}>
            Reserve
          </button>
        </div>
      </div>
    </div>
  )
}
