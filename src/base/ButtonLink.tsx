import type { ReactNode } from 'react'
import { Arrow } from './Arrow'

export interface Action {
  label: ReactNode
  href: string
  /** Shows the arrow: the link opens another page or another site. */
  leaves?: boolean
  /** A stable name for measuring an action, rendered as data-cta. */
  cta?: string
  /** A stable name for measuring a link to a sibling site, rendered as data-link. */
  link?: string
}

interface ButtonLinkProps extends Action {
  variant: 'acc' | 'bone' | 'ghost'
}

/** A pill button that is a link. */
export function ButtonLink({ variant, label, href, leaves = false, cta, link }: ButtonLinkProps) {
  return (
    <a className={`btn btn-${variant}`} href={href} data-cta={cta} data-link={link}>
      {label}
      {leaves && (
        <>
          {' '}
          <Arrow />
        </>
      )}
    </a>
  )
}
