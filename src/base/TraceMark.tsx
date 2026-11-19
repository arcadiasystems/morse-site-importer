/** A product mark, drawn at a given size. Each site passes its own to the nav, the footer and the final band. */
export interface MarkProps {
  size: number
}

interface TraceMarkProps extends MarkProps {
  /* Inline SVG cannot read CSS variables, so the colour is a literal hex. */
  stroke?: string
}

/** The Morse mark: the Trace. Decorative, so it always sits beside a text label. */
export function TraceMark({ size, stroke = '#F4F2EC' }: TraceMarkProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 100 100">
      <path
        d="M8 72 V30 H36 V72 H64 V30 H92 V72"
        fill="none"
        stroke={stroke}
        strokeWidth={16}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
