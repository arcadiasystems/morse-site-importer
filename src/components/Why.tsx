import type { CSSProperties } from 'react'

/* The folders behind the open one, back to front. */
const SOURCES = ['Hugo', 'Astro', 'Jekyll', 'Obsidian']

/** A folder's place in the drawer: --i steps its tab to the right and its body inward. */
function place(index: number): CSSProperties {
  return { '--i': index } as CSSProperties
}

/** A drawer of file folders, one per place the Markdown can come from, with the front one open. */
export function Why() {
  return (
    <section className="why" id="why">
      <div className="wrap">
        <span className="lab">Why it is this small</span>
        <h2 className="thin">
          It does not care <em>what built the site.</em>
        </h2>
        <ol className="folders" aria-label="Where the Markdown can come from">
          {SOURCES.map((source, index) => (
            <li key={source} style={place(index)}>
              <span className="tab">{source}</span>
            </li>
          ))}
          <li className="front" style={place(SOURCES.length)}>
            <span className="tab">A plain repo</span>
            <span className="glob">content/posts/*.md</span>
            <p>
              <b>A folder of Markdown files is all the recipe needs.</b> Each file is published as it is, and its name,
              without the extension, becomes the entry name.
            </p>
          </li>
        </ol>
        <p className="thin after">
          {'Morse stores bytes as they are. '}
          <em>Front matter goes in untouched, and your renderer keeps working.</em>
        </p>
      </div>
    </section>
  )
}
