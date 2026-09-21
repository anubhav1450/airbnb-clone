import { THINGS_TO_KNOW } from '../data/listing.js'
import Icon from './Icon.jsx'

export default function ThingsToKnow() {
  return (
    <section className="wide-section">
      <h2>Things to know</h2>
      <div className="ttk">
        {THINGS_TO_KNOW.map((t) => (
          <div key={t.title}>
            <Icon name={t.icon} size={24} />
            <div className="ttk__title">{t.title}</div>
            {t.lines.map((l) => (
              <p key={l} className={t.spaced ? 'ttk__p ttk__p--wide' : 'ttk__p'}>
                {l}
              </p>
            ))}
            <div className="ttk__more">
              <a href="#" onClick={(e) => e.preventDefault()}>
                Learn more
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
