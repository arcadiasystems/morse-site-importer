import type { ComponentType, CSSProperties } from 'react'
import type { MarkProps } from './TraceMark'

interface LockupProps {
  /** The product word under "morse", in lower case: receipts, agents, press. */
  product: string
  Mark: ComponentType<MarkProps>
  markSize: number
  /** With an href the lockup is a link; without one it is a span, for use inside a larger link. */
  href?: string
  /** The accessible name of the link, where the visible text alone would read oddly. */
  label?: string
  /** A sibling product's own colour for its word, as a literal hex. */
  productColor?: string
  fontSize?: number
}

/** The stacked lockup: a mark beside "morse" over the product word. */
export function Lockup({ product, Mark, markSize, href, label, productColor, fontSize }: LockupProps) {
  const style: CSSProperties | undefined = fontSize === undefined ? undefined : { fontSize }
  const content = (
    <>
      <Mark size={markSize} />
      <span className="wm">
        <span>morse</span>
        <em style={productColor === undefined ? undefined : { color: productColor }}>{product}</em>
      </span>
    </>
  )

  if (href === undefined) {
    return (
      <span className="brand" style={style}>
        {content}
      </span>
    )
  }
  return (
    <a className="brand" href={href} aria-label={label} style={style}>
      {content}
    </a>
  )
}
