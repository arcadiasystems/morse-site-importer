import type { ComponentType, ReactNode } from 'react'
import { Lockup } from '../src/base/Lockup'
import type { MarkProps } from '../src/base/TraceMark'

interface CardProps {
  /** The product word of the lockup, in lower case. */
  product: string
  Mark: ComponentType<MarkProps>
  /** The hero headline, with the same line breaks and emphasis as the page. */
  headline: ReactNode
  tagline: string
  domain: string
  /** The site's hero object, placed by og/object.css. */
  children: ReactNode
}

/**
 * The share image, on the grid of the Morse landing card: lockup top left,
 * domain top right, headline, one line under it, and the hero object on the
 * right. This file and card.css are the same in morse-receipts, morse-agents
 * and morse-press; each site sets its own content in main.tsx and places its
 * object in object.css.
 */
export function Card({ product, Mark, headline, tagline, domain, children }: CardProps) {
  return (
    <main className="og">
      <span className="glow a" />
      <span className="glow b" />
      <div className="og__object">{children}</div>
      <div className="og__shade" />
      <div className="og__top">
        <Lockup product={product} Mark={Mark} markSize={58} fontSize={31} />
        <p className="og__domain">{domain}</p>
      </div>
      <h1 className="thin og__headline">{headline}</h1>
      <p className="og__tagline">{tagline}</p>
    </main>
  )
}
