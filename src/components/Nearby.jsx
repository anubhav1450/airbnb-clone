import { useEffect, useRef, useState } from 'react'
import { SIMILAR } from '../data/listing.js'
import Icon from './Icon.jsx'

export default function Nearby() {
  const track = useRef(null)
  const [page, setPage] = useState(0)

  useEffect(() => {
    const el = track.current
    const onScroll = () => setPage(el.scrollLeft > (el.scrollWidth - el.clientWidth) / 2 ? 1 : 0)
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const go = (p) => {
    const el = track.current
    el.scrollTo({ left: p ? el.scrollWidth - el.clientWidth : 0, behavior: 'smooth' })
    setPage(p)
  }

  return (
    <section className="wide-section">
      <div className="nearby__head">
        <h2>More stays nearby</h2>
        <div className="nearby__pager">
          <span>{page + 1} / 2</span>
          <button type="button" id="simPrev" className="circle-btn circle-btn--outline" aria-label="Previous stays" disabled={page === 0} onClick={() => go(0)}>
            <Icon name="carPrev" size={12} />
          </button>
          <button type="button" id="simNext" className="circle-btn circle-btn--outline" aria-label="Next stays" disabled={page === 1} onClick={() => go(1)}>
            <Icon name="carNext" size={12} />
          </button>
        </div>
      </div>
      <div className="nearby__track" id="simTrack" ref={track}>
        {SIMILAR.map((s, i) => (
          <div className="stay" key={i}>
            <img src={`/assets/similar/${s.img}`} alt="" />
            <div className="stay__title">{s.title}</div>
            <div className="stay__meta">
              ₹{s.price}
              <Icon name="starSm" size={10} />
              {s.rating}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
