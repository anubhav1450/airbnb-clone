import { HERO, PHOTO_DIR } from '../data/photos.js'
import { LISTING } from '../data/listing.js'
import Icon from './Icon.jsx'

export default function HeroGrid({ onOpen }) {
  return (
    <section className="hero" id="photos-grid" aria-label="Photos of this place">
      <div className="hero__grid" id="heroGrid">
        {HERO.map((file, i) => (
          <button key={file} type="button" className="hero-tile" aria-label={`${LISTING.title} image ${i + 1}`} onClick={() => onOpen(file)}>
            <img src={PHOTO_DIR + file} alt="" fetchPriority={i === 0 ? 'high' : undefined} />
          </button>
        ))}
      </div>
      <button type="button" className="show-all" id="showAllPhotos" onClick={() => onOpen(null)}>
        <Icon name="dots" size={15} />
        Show all photos
      </button>
    </section>
  )
}
