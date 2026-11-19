import type { ReactNode } from 'react'
import { ButtonLink } from '../base/ButtonLink'
import { SectionHead } from '../base/SectionHead'
import { DOCS_PUBLISH_FROM_CI, MORSE_AGENT_PUBLISHER } from '../lib/links'

interface Step {
  label: string
  /** What the step is: a plain name, or the command it runs. */
  name: ReactNode
  text: string
  /** The step that publishes is lit. */
  lit?: boolean
}

const STEPS: Step[] = [
  { label: 'TRIGGER', name: <b>Push to main</b>, text: 'Only when a post or the map changed.' },
  { label: 'SET UP', name: <b>Install the CLI</b>, text: 'Checkout, Node, then the Morse CLI from npm.' },
  {
    label: 'CHECK',
    name: <code>morse --yes -q status</code>,
    text: 'The same context as your machine, with no prompts.',
  },
  {
    label: 'PUBLISH',
    name: <code>./import.sh</code>,
    text: 'Files that are not in the map become entries.',
    lit: true,
  },
  { label: 'COMMIT', name: <b>Save the map</b>, text: 'Committed back, so the next run knows what exists.' },
]

const VARIABLES: { name: string; text: ReactNode }[] = [
  { name: 'MORSE_PRIVATE_KEY', text: "The CI wallet's key, as a repository secret. Never written to disk." },
  {
    name: 'MORSE_NETWORK',
    text: (
      <>
        <code>testnet</code>, so no profile is needed.
      </>
    ),
  },
  { name: 'MORSE_PUBLICATION', text: 'The publication id, as a repository variable.' },
  {
    name: 'MORSE_COLLECTION',
    text: (
      <>
        <code>posts</code>, the collection to fill.
      </>
    ),
  },
]

/** The CI job as one strip of five cells with the publish cell lit, then the variables it reads and the key it should hold. */
export function Ci() {
  return (
    <section className="sec" id="ci">
      <div className="wrap">
        <SectionHead
          label="On every push"
          title={
            <>
              Push to main.
              <br />
              <em>The new post publishes.</em>
            </>
          }
          lead="A second recipe runs the same script in GitHub Actions. There is no deploy step and no server to keep up: the repo is the source, Sui and Walrus hold what was published, and the map links the two."
        />
        <div className="pipebox">
          {/* Three segments, the mark's, running along the track above the strip. */}
          <i aria-hidden="true">
            <b />
            <b />
            <b />
          </i>
          <ol className="pipe" aria-label="The CI job, in order">
            {STEPS.map(({ label, name, text, lit = false }) => (
              <li key={label} className={lit ? 'on' : undefined}>
                <small>{label}</small>
                {name}
                <span>{text}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="two cirow">
          <div>
            <span className="envt__hd">FOUR VARIABLES THE CLI READS IN CI</span>
            <ul className="envt">
              {VARIABLES.map(({ name, text }) => (
                <li key={name}>
                  <code>{name}</code>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="cikey">
            <b className="h">Give CI a key of its own. Not yours.</b>
            <p>
              {
                'Make a separate wallet for the pipeline, fund it with a little SUI and WAL, and issue it a PublisherCap from your owner wallet. If CI ever leaks the key, you revoke one cap and move on. It is the same key model as '
              }
              <a className="ap" href={MORSE_AGENT_PUBLISHER} data-link="agent-publisher">
                Morse Agent Publisher
              </a>
              , with a pipeline as the author.
            </p>
            {/* The script adds new files only. The docs page for CI opens by saying changed files become revisions; the page follows the script. */}
            <p>
              As written, the job publishes new posts. An edited post is pushed with the revision command above, or
              with a hash check you add to the script.
            </p>
            <div className="btnrow">
              <ButtonLink variant="bone" label="The workflow file" href={DOCS_PUBLISH_FROM_CI} leaves cta="ci" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
