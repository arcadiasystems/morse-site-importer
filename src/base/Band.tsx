import type { ReactNode } from 'react'
import { Arrow } from './Arrow'

interface BandProps {
  href: string
  /** A stable name for measurement, rendered as data-link. */
  link: string
  /** The sibling product's lockup, in its own colour. */
  lockup: ReactNode
  title: string
  text: ReactNode
  /** The label of the button drawn at the end of the band. The whole band is the link. */
  action: string
  /** Anything under the text, such as a row of chips. */
  children?: ReactNode
}

/** One glass band that sends a visitor to a sibling product. */
export function Band({ href, link, lockup, title, text, action, children }: BandProps) {
  return (
    <a className="glass band" href={href} data-link={link}>
      {lockup}
      <div>
        <b>{title}</b>
        <p>{text}</p>
        {children}
      </div>
      <span className="btn btn-ghost">
        {action} <Arrow />
      </span>
    </a>
  )
}
