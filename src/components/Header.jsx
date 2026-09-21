import Icon from './Icon.jsx'

export default function Header() {
  return (
    <header className="site-header" id="siteHeader">
      <div className="container site-header__inner">
        <a className="logo" href="#" aria-label="Airbnb homepage" onClick={(e) => e.preventDefault()}>
          <Icon name="logo" />
        </a>
        <div className="searchbar" role="search">
          <button className="searchbar__seg searchbar__seg--strong" type="button">
            <img src="/assets/ui/searchbar-house.png" alt="" width="48" height="48" />
            Anywhere
          </button>
          <span className="searchbar__divider" />
          <button className="searchbar__seg searchbar__seg--strong" type="button">
            Anytime
          </button>
          <span className="searchbar__divider" />
          <button className="searchbar__seg searchbar__seg--muted" type="button">
            Add guests
          </button>
          <button className="searchbar__go" type="button" aria-label="Search">
            <svg viewBox="0 0 32 32" width="16" height="16" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" aria-hidden="true">
              <circle cx="13" cy="13" r="9" />
              <path d="m27 27-5-5" />
            </svg>
          </button>
        </div>
        <nav className="site-nav">
          <a href="#" className="site-nav__host">
            Become a host
          </a>
          <button className="circle-btn" type="button" aria-label="Choose a language and currency">
            <Icon name="globe" size={16} />
          </button>
          <button className="circle-btn" type="button" aria-label="Main navigation menu">
            <Icon name="menu" size={16} />
          </button>
        </nav>
      </div>
    </header>
  )
}
