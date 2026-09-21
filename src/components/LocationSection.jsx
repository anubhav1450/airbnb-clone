import { NEIGHBOURHOOD } from '../data/listing.js'
import Icon from './Icon.jsx'

export default function LocationSection() {
  return (
    <section className="wide-section" id="location">
      <h2>Where you’ll be</h2>
      <div className="loc__place">Candolim, Goa, India</div>
      <div className="map">
        <div className="map__art" />
        <button type="button" className="map__search" aria-label="Search">
          <Icon name="i34" size={16} />
        </button>
        <div className="map__zoom">
          <button type="button" aria-label="Zoom in">
            <Icon name="zoomIn" size={16} />
          </button>
          <button type="button" aria-label="Zoom out">
            <Icon name="zoomOut" size={16} />
          </button>
        </div>
        <div className="map__pin">
          <Icon name="pin" size={32} style={{ width: 32, height: 32 }} />
        </div>
      </div>
      <div className="loc__note">Exact location will be provided after booking.</div>
      <h3 className="loc__sub">Neighbourhood highlights</h3>
      <div className="loc__text">{NEIGHBOURHOOD}</div>
      {/* As in the reference, this button has no behaviour. */}
      <button type="button" className="more-link">
        Show more
        <Icon name="chevronRight" size={14} />
      </button>
    </section>
  )
}
