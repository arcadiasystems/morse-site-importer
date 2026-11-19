import type { ReactNode } from 'react'

export interface FaqItem {
  question: string
  answer: ReactNode
}

interface FaqProps {
  items: FaqItem[]
}

/** Questions as native <details>, so they open without JavaScript. The first one starts open. */
export function Faq({ items }: FaqProps) {
  return (
    <div className="faq">
      {items.map(({ question, answer }, index) => (
        <details key={question} open={index === 0}>
          <summary>{question}</summary>
          <p>{answer}</p>
        </details>
      ))}
    </div>
  )
}
