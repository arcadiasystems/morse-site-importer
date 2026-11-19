import { Fragment, type ReactNode } from 'react'
import { SectionHead } from '../base/SectionHead'
import { useTabs } from '../base/useTabs'
import { EXAMPLE_POSTS } from '../lib/example'

/* The two logs are the output of the script on the example's three files. */

const RUN = (
  <>
    <span className="p">$</span> EPOCHS=30 ./import.sh{'\n'}
  </>
)
const DONE = `done, ${EXAMPLE_POSTS.length} entries in morse-map.json`

interface RunTab {
  label: string
  log: ReactNode
  note: ReactNode
}

const TABS: RunTab[] = [
  {
    label: 'First run',
    log: (
      <>
        {RUN}
        {EXAMPLE_POSTS.map(({ name }) => (
          <Fragment key={name}>
            <span className="add">{`add   ${name}`}</span>
            {'\n'}
          </Fragment>
        ))}
        {DONE}
      </>
    ),
    note: (
      <>
        <b>Three files, three entries.</b> The map is created and filled as it goes.
      </>
    ),
  },
  {
    label: 'Run again',
    log: (
      <>
        {RUN}
        {EXAMPLE_POSTS.map(({ name }) => (
          <Fragment key={name}>
            <span className="skip">{`skip  ${name} (already published)`}</span>
            {'\n'}
          </Fragment>
        ))}
        {DONE}
      </>
    ),
    note: (
      <>
        <b>Nothing is signed and nothing is spent.</b> A new file in the folder would be the only line that says add.
      </>
    ),
  },
  {
    label: 'After an edit',
    log: (
      <>
        <span className="c"># an edited post is a new revision, not a new entry</span>
        {'\n'}
        <span className="p">$</span>
        {` id=$(jq -r '.["second-post"].entryId' \\\n    morse-map.json)\n`}
        <span className="p">$</span>
        {' morse revision publish-direct "$id" \\\n    --file content/posts/second-post.md \\\n    --epochs 30'}
      </>
    ),
    note: (
      <>
        <b>The script does not notice edits.</b> You push one with this command, and the earlier revision stays on the
        record.
      </>
    ),
  },
]

/** Three runs of the script as a tabbed log, beside the map that makes the second run safe. */
export function Rerun() {
  const { selected, tabProps, panelProps } = useTabs(TABS.length)

  return (
    <section className="sec flush" id="rerun">
      <div className="wrap">
        <SectionHead
          label="Run it again"
          title={
            <>
              Run it twice.
              <br />
              <em>Nothing doubles.</em>
            </>
          }
          lead="Entry names are not unique on chain, so a careless second run would publish every post again. The map is what prevents that. If a run stops halfway, run it again and it picks up where it left off."
        />
        <div className="two">
          <div className="glass runlog" data-tabs="">
            <div className="runlog__bar">
              <div className="runlog__tabs" role="tablist" aria-label="Three runs of the script">
                {TABS.map(({ label }, index) => (
                  <button
                    key={label}
                    className={index === selected ? 'rtab is-on' : 'rtab'}
                    type="button"
                    {...tabProps(index)}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <span className="pill sample">Example</span>
            </div>
            {TABS.map(({ label, log, note }, index) => (
              <div key={label} tabIndex={0} {...panelProps(index)}>
                <pre>{log}</pre>
                <p className="runlog__ft">{note}</p>
              </div>
            ))}
          </div>
          <div className="mapobj">
            <div className="mapobj__hd">
              <span>morse-map.json</span>
              <span className="pill lift">Commit this</span>
            </div>
            <ul className="join" aria-label="Example: each filename and the entry id it was given">
              {EXAMPLE_POSTS.map(({ name, entryId }) => (
                <li key={name}>
                  <span>{name}</span>
                  <i aria-hidden="true" />
                  <span>
                    <small>ENTRY ID</small>
                    <b>{entryId}</b>
                  </span>
                </li>
              ))}
            </ul>
            <p>
              <b>It is the only thing that ties a filename to an entry id.</b> Keep it next to your content. Your site
              generator or reader app needs it to fetch post bodies from Walrus.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
