import type { ComponentType } from 'react'
import { ButtonLink, type Action } from './ButtonLink'
import { Lockup } from './Lockup'
import type { MarkProps } from './TraceMark'

export interface NavLink {
  label: string
  href: string
  /** A stable name for measuring an action, rendered as data-cta. */
  cta?: string
  /** A stable name for measuring a link to a sibling site, rendered as data-link. */
  link?: string
}

interface NavProps {
  /** The product word, capitalised: Receipts, Agents, Press. */
  product: string
  Mark: ComponentType<MarkProps>
  links: NavLink[]
  /** Where "Morse ↗" goes: the landing. */
  morseHref: string
  /** The site's one action, on the right. */
  action: Action
}

/** The fixed nav: the stacked lockup, the section links, "Morse ↗" and the site's action. */
export function Nav({ product, Mark, links, morseHref, action }: NavProps) {
  return (
    <header className="nav">
      <div className="wrap">
        <Lockup product={product.toLowerCase()} Mark={Mark} markSize={30} href="#top" label={`Morse ${product} home`} />
        <nav className="nav__links" aria-label="Primary">
          {links.map(({ label, href, cta, link }) => (
            <a key={label} href={href} data-cta={cta} data-link={link}>
              {label}
            </a>
          ))}
        </nav>
        <div className="nav__r">
          <ButtonLink variant="ghost" label="Morse" href={morseHref} leaves link="morse" />
          <ButtonLink variant="bone" {...action} />
        </div>
      </div>
    </header>
  )
}
