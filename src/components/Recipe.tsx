import type { ReactNode } from 'react'

const FACTS = [
  { label: 'Time', value: 'About 15 minutes, then about 20 for CI' },
  { label: 'Tools', value: 'The Morse CLI, bash and jq' },
  { label: 'You bring', value: 'A folder of .md files, and a publication with a collection to fill' },
  { label: 'Wallet', value: 'SUI for gas and WAL for storage' },
  { label: 'Network', value: 'Written for Testnet. Public content also runs on Walrus Mainnet.' },
]

const LIMITS: { title: string; text: ReactNode }[] = [
  { title: 'You run it.', text: 'The recipe is two docs pages and a script. The Morse CLI is before 1.0.' },
  {
    title: 'Walrus Mainnet is real money.',
    text: 'Public content works there, but there is no faucet and every write spends SUI and WAL. Do the first import on Testnet.',
  },
  {
    title: 'Storage is a paid lease.',
    text: (
      <>
        <code>EPOCHS</code> sets how long each post is paid for. When a lease ends the content can go offline, while
        its record on Sui remains.
      </>
    ),
  },
  {
    title: 'Posts go in public.',
    text: 'The script publishes plain entries. Encryption works out of the box on Testnet only; on Walrus Mainnet it needs your own Seal key-server credentials.',
  },
]

/** The recipe card, an index card with the recipe's own facts on ruled lines, beside the four limits that are the reader's to know. */
export function Recipe() {
  return (
    <section className="sec" id="recipe">
      <div className="wrap two" style={{ alignItems: 'center' }}>
        <div className="rcardbox">
          <span className="glow" />
          <div className="rcard">
            <div className="rcard__hd">
              <b>Import a Markdown site</b>
              <span className="pill lift">Docs recipe</span>
            </div>
            <dl>
              {FACTS.map(({ label, value }) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div>
          <div className="sec__head" style={{ marginBottom: 0 }}>
            <span className="lab">What this is</span>
            <h2 className="thin">
              A recipe.
              <br />
              <em>Not a migration service.</em>
            </h2>
            <p className="lead">
              Nobody runs this for you, and nothing is taken from your repo: the import adds a record of every post on
              Morse and leaves your site as it was. Four things are yours to know.
            </p>
          </div>
          <ul className="limits">
            {LIMITS.map(({ title, text }, index) => (
              <li key={title}>
                <span className="n">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <b>{title}</b>
                  <span className="d">{text}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
