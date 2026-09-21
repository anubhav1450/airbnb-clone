import { LISTING } from '../data/listing.js'
import Icon from './Icon.jsx'

export default function TitleRow({ saved, onShare, onSave }) {
  return (
    <div className="title-row">
      <h1>{LISTING.title}</h1>
      <div className="title-row__actions">
        <button type="button" className="text-btn" id="shareBtn" onClick={onShare}>
          <Icon name="share" size={16} />
          <span>Share</span>
        </button>
        <button type="button" className={`text-btn${saved ? ' is-saved' : ''}`} id="saveBtn" onClick={onSave}>
          <Icon name={saved ? 'heartFilled' : 'heart'} size={16} />
          <span>{saved ? 'Saved' : 'Save'}</span>
        </button>
      </div>
    </div>
  )
}
