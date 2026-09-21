import { LISTING, COHOSTS } from '../data/listing.js'
import Icon from './Icon.jsx'

export default function HostSection() {
  return (
    <section className="wide-section">
      <h2>Meet your host</h2>
      <div className="host">
        <div className="host__left">
          <div className="host__card">
            <div className="host__profile">
              <div className="host__avatar">
                <img src="/assets/avatars/host.jpeg" alt="" width="88" height="88" />
                <span className="host__badge">
                  <Icon name="hostBadge" size={14} />
                </span>
              </div>
              <div className="host__name">{LISTING.host}</div>
              <div className="host__role">Host</div>
            </div>
            <div className="host__stats">
              <div>
                <div className="host__stat-num">1,463</div>
                <div className="host__stat-lbl">Reviews</div>
              </div>
              <div>
                <div className="host__stat-num">4.68★</div>
                <div className="host__stat-lbl">Rating</div>
              </div>
              <div>
                <div className="host__stat-num">2</div>
                <div className="host__stat-lbl">Years hosting</div>
              </div>
            </div>
          </div>
          <div className="host__facts">
            <div>
              <Icon name="born" size={24} />
              Born in the 80s
            </div>
            <div>
              <Icon name="school" size={24} />
              Where I went to school: NICMAR GOA
            </div>
          </div>
        </div>
        <div className="host__right">
          <h3>Co-Hosts</h3>
          <div className="cohosts">
            {COHOSTS.map((c) => (
              <div className="cohost" key={c.name}>
                {c.avatar ? (
                  <img src={`/assets/avatars/${c.avatar}`} alt="" width="34" height="34" />
                ) : (
                  <div className="initial-avatar initial-avatar--sm" style={{ color: c.color, background: c.bg }}>
                    {c.initial}
                  </div>
                )}
                <span>{c.name}</span>
              </div>
            ))}
          </div>
          <h3 className="host__details-h">Host details</h3>
          <div className="host__details">
            Response rate: 100%
            <br />
            Responds within an hour
          </div>
          <button type="button" className="host__msg">
            Message host
          </button>
          <div className="host__pay">
            <Icon name="cohost" size={24} />
            <span>To help protect your payment, always use Airbnb to send money and communicate with hosts.</span>
          </div>
        </div>
      </div>
    </section>
  )
}
