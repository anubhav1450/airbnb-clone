import { ICONS } from '../data/icons.js'

// Renders a captured SVG (decorative) inside a sized span.
export default function Icon({ name, svg, size, className = '', style }) {
  const html = svg || ICONS[name]
  const s = size ? { width: size, height: size, ...style } : style
  return <span className={`ico ${className}`} style={s} aria-hidden="true" dangerouslySetInnerHTML={{ __html: html }} />
}
