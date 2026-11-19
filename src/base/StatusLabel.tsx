import { Fragment } from 'react'
import { morseLetters } from './morse'

interface StatusLabelProps {
  /** The lamp cell, the network cell, and a third cell that hides at 860px and below. */
  cells: [string, string, string]
  /** The word keyed out on the tape, e.g. RECEIPTS. */
  word: string
}

/** One pass of the word: dots, dashes, a gap after each letter and a wider one after the word. */
function TapeWord({ word }: { word: string }) {
  const letters = morseLetters(word)
  return letters.map((symbols, letterIndex) => (
    <Fragment key={letterIndex}>
      {symbols.map((symbol, symbolIndex) => (
        <i key={symbolIndex} className={symbol === 'dash' ? 'd' : undefined} />
      ))}
      <i className={letterIndex === letters.length - 1 ? 'w' : 's'} />
    </Fragment>
  ))
}

/** The hero status label: a lamp, three cells, and the product word scrolling past in Morse. */
export function StatusLabel({ cells, word }: StatusLabelProps) {
  const [lamp, net, extra] = cells
  return (
    <div className="status">
      <span>
        <i className="lamp" aria-hidden="true" />
        {lamp}
      </span>
      <span className="net">{net}</span>
      <span>{extra}</span>
      <span className="tp" aria-hidden="true">
        {/* The word runs twice so the tape can loop by sliding half its width. */}
        <span className="run">
          <TapeWord word={word} />
          <TapeWord word={word} />
        </span>
      </span>
    </div>
  )
}
