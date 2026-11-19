import type { MarkProps } from '../base/TraceMark'

const SEGMENT_X = [8, 38, 68]

/** The Morse Site Importer mark: the Trace raised over three segments, one site in and many entries out. Inline SVG cannot read CSS variables, so the yellow is a literal hex. */
export function SiteImporterMark({ size }: MarkProps) {
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
      {SEGMENT_X.map(x => (
        <rect key={x} x={x} y={80} width={24} height={14} rx={7} fill="#FFE62E" />
      ))}
    </svg>
  )
}
