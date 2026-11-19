import type { MarkProps } from '../base/TraceMark'

/** The Morse Press mark, for its lockup in the family band: the Trace raised over the press bed. Inline SVG cannot read CSS variables, so the vermilion is a literal hex. */
export function PressMark({ size }: MarkProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 100 100">
      <path
        d="M8 60 V18 H36 V60 H64 V18 H92 V60"
        fill="none"
        stroke="#F4F2EC"
        strokeWidth={16}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x={8} y={80} width={84} height={14} rx={7} fill="#FF5A36" />
    </svg>
  )
}
