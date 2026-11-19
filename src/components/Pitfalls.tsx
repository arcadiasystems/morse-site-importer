import { SectionHead } from '../base/SectionHead'

const PITFALLS = [
  {
    title: 'Running without the map',
    happens: 'Entry names are not unique on chain, so every post is published a second time.',
    fix: 'Always keep the map, and commit it.',
  },
  {
    title: 'Images and other assets',
    happens: 'A Markdown file only carries text. Its images are not imported with it.',
    fix: 'Publish each asset as its own entry, or keep assets on a plain host for now.',
  },
  {
    title: 'Big files',
    happens: 'Walrus storage cost scales with size and with the number of epochs.',
    fix: 'Keep posts as Markdown, and strip embedded base64.',
  },
  {
    title: 'A Testnet reset',
    happens: 'Entries and blobs are gone, and the map points at nothing.',
    fix: 'Delete the map and run the script again.',
  },
]

/** The recipe's four pitfalls as labels with a hazard stripe: what happens, and what to do. */
export function Pitfalls() {
  return (
    <section className="sec flush" id="pitfalls">
      <div className="wrap">
        <SectionHead
          label="Pitfalls"
          title={
            <>
              Four ways it goes wrong, <em>and what to do.</em>
            </>
          }
          lead="All four come from the recipe. None of them is hidden by the script, so it is better to meet them here."
        />
        <ul className="haz">
          {PITFALLS.map(({ title, happens, fix }) => (
            <li key={title}>
              <b>{title}</b>
              <dl>
                <dt>What happens</dt>
                <dd>{happens}</dd>
                <dt>What to do</dt>
                <dd className="do">{fix}</dd>
              </dl>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
