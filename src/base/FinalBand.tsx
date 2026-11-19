import type { ComponentType, ReactNode } from 'react'
import { ButtonLink, type Action } from './ButtonLink'
import type { MarkProps } from './TraceMark'

interface FinalBandProps {
  Mark: ComponentType<MarkProps>
  label?: string
  headline: ReactNode
  primary: Action
  secondary: Action
}

/** The closing band: a centred headline over a glow, flanked by two glass tiles carrying the mark. */
export function FinalBand({ Mark, label = 'Start', headline, primary, secondary }: FinalBandProps) {
  return (
    <section className="final">
      <span className="glow" />
      <span className="gtile l" aria-hidden="true">
        <Mark size={64} />
      </span>
      <span className="gtile r" aria-hidden="true">
        <Mark size={52} />
      </span>
      <div className="wrap">
        <span className="lab">{label}</span>
        <h2 className="thin" style={{ marginTop: 18 }}>
          {headline}
        </h2>
        <div className="hero__cta">
          <ButtonLink variant="acc" {...primary} />
          <ButtonLink variant="ghost" {...secondary} />
        </div>
      </div>
    </section>
  )
}
