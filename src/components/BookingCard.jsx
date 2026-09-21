import { LISTING } from '../data/listing.js'
import Icon from './Icon.jsx'

export default function BookingCard({ onReserve }) {
  return (
    <aside className="aside">
      <div className="booking-sticky" id="bookingSticky">
        <div className="promo">
          <img src="/assets/ui/discount.svg" alt="" width="32" height="32" />
          <div className="promo__text">
            Get 10% off your next stay.
            <br />
            <a href="#" onClick={(e) => e.preventDefault()}>
              Terms apply
            </a>
          </div>
          <button type="button" className="promo__claim">
            Claim
          </button>
        </div>

        <div className="booking-card">
          <div className="booking-card__price">
            <span className="booking-card__amount">₹{LISTING.price}</span>
            <span className="booking-card__nights">for {LISTING.nights} nights</span>
          </div>
          <div className="booking-card__fields">
            <div className="booking-card__dates">
              <div className="booking-card__cell">
                <div className="booking-card__label">CHECK-IN</div>
                <div>{LISTING.checkIn}</div>
              </div>
              <div className="booking-card__cell booking-card__cell--right">
                <div className="booking-card__label">CHECKOUT</div>
                <div>{LISTING.checkOut}</div>
              </div>
            </div>
            <div className="booking-card__guests">
              <div>
                <div className="booking-card__label">GUESTS</div>
                <div>{LISTING.guests}</div>
              </div>
              <Icon name="guestsChevron" size={16} />
            </div>
          </div>
          <div className="booking-card__cancel">
            Free cancellation before <b>{LISTING.freeCancelBefore}</b>
          </div>
          <button type="button" className="reserve-btn" id="reserveBtn" onClick={onReserve}>
            Reserve
          </button>
          <div className="booking-card__note">You won't be charged yet</div>
        </div>

        <div className="report">
          <Icon name="flag" size={16} />
          <a href="#" onClick={(e) => e.preventDefault()}>
            Report this listing
          </a>
        </div>
      </div>
    </aside>
  )
}
