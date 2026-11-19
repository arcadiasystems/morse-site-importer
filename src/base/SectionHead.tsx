import type { ReactNode } from 'react'

interface SectionHeadProps {
  label: string
  title: ReactNode
  lead?: ReactNode
  centered?: boolean
}

/** A section's opening: the mono label, the thin headline and an optional lead. */
export function SectionHead({ label, title, lead, centered = false }: SectionHeadProps) {
  return (
    <div className={centered ? 'sec__head c' : 'sec__head'}>
      <span className="lab">{label}</span>
      <h2 className="thin">{title}</h2>
      {lead !== undefined && <p className="lead">{lead}</p>}
    </div>
  )
}
