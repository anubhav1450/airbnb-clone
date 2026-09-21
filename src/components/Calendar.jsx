import { CALENDAR } from '../data/listing.js'
import Icon from './Icon.jsx'

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

function state(mi, d) {
  const { rangeStart: a, rangeEnd: b, unavailable } = CALENDAR
  if (mi === a.month && d === a.day) return 'start'
  if (mi === b.month && d === b.day) return 'end'
  if (mi === a.month && d > a.day && d < b.day) return 'between'
  if ((unavailable[mi] || []).includes(d)) return 'unavailable'
  return ''
}

// Display-only (as in the reference): day cells are not interactive.
export default function Calendar() {
  return (
    <div className="block">
      <div className="cal__head">
        <div className="cal__title">5 nights in Candolim</div>
        <div className="cal__range">18 Oct 2026 - 23 Oct 2026</div>
      </div>
      <div className="cal">
        <div className="cal__nav">
          <button type="button" className="circle-btn circle-btn--sm" aria-label="Previous month">
            <Icon name="monthPrev" size={12} />
          </button>
          <button type="button" className="circle-btn circle-btn--sm" aria-label="Next month">
            <Icon name="monthNext" size={12} />
          </button>
        </div>
        {CALENDAR.months.map((m, mi) => (
          <div key={m.name} className="cal__month">
            <div className="cal__month-name">{m.name}</div>
            <div className="cal__weekdays">
              {WEEKDAYS.map((w, i) => (
                <span key={i}>{w}</span>
              ))}
            </div>
            <div className="cal__days">
              {Array.from({ length: m.offset }, (_, i) => (
                <div key={'e' + i} className="cal__day" />
              ))}
              {Array.from({ length: m.days }, (_, i) => (
                <div key={i} className={`cal__day ${state(mi, i + 1) ? 'is-' + state(mi, i + 1) : ''}`}>
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="cal__foot">
        <span className="cal__kbd">
          <Icon name="i24" />
        </span>
        <button type="button" className="underline-btn">
          Clear dates
        </button>
      </div>
    </div>
  )
}
