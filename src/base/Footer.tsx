import type { ComponentType } from 'react'
import { Lockup } from './Lockup'
import type { NavLink } from './Nav'
import type { MarkProps } from './TraceMark'

interface FooterProps {
  /** The product word, capitalised: Receipts, Agents, Press. */
  product: string
  Mark: ComponentType<MarkProps>
  links: NavLink[]
  /** The closing line under the links. */
  line: string
}

/** The footer: the lockup, the family links and one closing line. */
export function Footer({ product, Mark, links, line }: FooterProps) {
  return (
    <footer className="foot">
      <div className="wrap">
        <Lockup product={product.toLowerCase()} Mark={Mark} markSize={26} href="#top" />
        <nav className="foot__links" aria-label="Footer">
          {links.map(({ label, href, cta, link }) => (
            <a key={label} href={href} data-cta={cta} data-link={link}>
              {label}
            </a>
          ))}
        </nav>
        <p>{line}</p>
      </div>
    </footer>
  )
}
