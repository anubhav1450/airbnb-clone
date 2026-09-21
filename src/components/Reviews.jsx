import { useState } from 'react'
import { LISTING, RATING_BARS, CATEGORY_SCORES, REVIEW_CHIPS, REVIEWS } from '../data/listing.js'
import Icon from './Icon.jsx'

function Review({ r }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="review">
      <div className="review__head">
        {r.avatar ? (
          <img src={`/assets/avatars/${r.avatar}`} alt="" width="42" height="42" />
        ) : (
          <div className="initial-avatar" style={{ color: r.color, background: r.bg }}>
            {r.initial}
          </div>
        )}
        <div>
          <div className="review__name">{r.name}</div>
          <div className="review__since">{r.since}</div>
        </div>
      </div>
      <div className="review__meta">
        <span className="review__stars" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <Icon key={i} name="star" size={10} />
          ))}
        </span>
        <span>·</span>
        <span>{r.when}</span>
      </div>
      <div className={`review__text${r.clamp && !open ? ' is-clamped' : ''}`}>{r.text}</div>
      {r.clamp && (
        <button type="button" className="review__more" onClick={() => setOpen(!open)}>
          {open ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  )
}

export default function Reviews() {
  return (
    <section className="wide-section" id="reviews">
      <div className="reviews__top">
        <div className="reviews__score">
          <img src="/assets/ui/laurel-left.png" alt="" width="72.5" height="110" />
          <div className="reviews__big">{LISTING.rating}</div>
          <img src="/assets/ui/laurel-right.png" alt="" width="72.5" height="110" />
        </div>
        <div className="reviews__fav">Guest favourite</div>
        <div className="reviews__fav-text">This home is a guest favourite based on ratings, reviews and reliability</div>
        <button type="button" className="underline-btn reviews__how">
          How reviews work
        </button>
      </div>

      <div className="metrics">
        <div className="metrics__overall">
          <div className="metrics__label">Overall rating</div>
          <div className="metrics__bars">
            {RATING_BARS.map((b) => (
              <div className="bar-row" key={b.star}>
                <span>{b.star}</span>
                <div className="bar-row__track">
                  <div className="bar-row__fill" style={{ width: b.pct + '%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        {CATEGORY_SCORES.map((c) => (
          <div className="metrics__cell" key={c.label}>
            <div className="metrics__label">{c.label}</div>
            <div className="metrics__value">{c.value}</div>
            <Icon name={c.icon} size={32} />
          </div>
        ))}
      </div>

      <div className="chips">
        {REVIEW_CHIPS.map((c) => (
          <button type="button" className="chip" key={c.label}>
            <img src={`/assets/chips/${c.img}.png`} alt="" width="20" height="20" />
            {c.label}
            <span>{c.count}</span>
          </button>
        ))}
      </div>

      <div className="review-grid">
        {REVIEWS.map((r) => (
          <Review key={r.name} r={r} />
        ))}
      </div>
      <button type="button" className="outline-btn">
        Show all {LISTING.reviewCount} reviews
      </button>
    </section>
  )
}
