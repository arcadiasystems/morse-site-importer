import { Fragment } from 'react'
import { SectionHead } from '../base/SectionHead'
import { IMPORT_SCRIPT, scriptParts } from '../lib/importScript'
import { CopyButton } from './CopyButton'

/* The start block: a dry run that counts, then the four commands that start the import. 40 characters or fewer, so it never wraps. */
const START_LINES = [
  { comment: '# how many files, and how big' },
  { command: 'ls content/posts/*.md | wc -l' },
  { command: 'du -ch content/posts/*.md | tail -1' },
  { comment: '# the publication and collection to fill' },
  { command: 'morse use my-blog posts' },
  { command: 'morse status' },
  { command: 'chmod +x import.sh' },
  { command: 'EPOCHS=30 ./import.sh' },
]

/** The whole of import.sh with its three jobs marked in the margin, and the same numbers explained beside it. */
export function Script() {
  return (
    <section className="sec" id="script">
      <div className="wrap">
        <SectionHead
          label="The script"
          title={
            <>
              The whole importer
              <br />
              <em>fits on one screen.</em>
            </>
          }
          lead="No package to install beyond the CLI and jq. Read it once and you know everything it will do to your publication. It does three jobs, marked in the margin."
        />
        <div className="glass scr" data-copybox="">
          <div className="scr__code">
            <div className="scr__bar">
              <i aria-hidden="true" />
              import.sh<small>FROM THE RECIPE</small>
              <CopyButton text={IMPORT_SCRIPT} />
            </div>
            {/* Each marked job is a block span that ends with its own newline: a break anywhere else adds a blank line. */}
            <pre>
              {scriptParts().map(({ job, text }) =>
                job === undefined ? (
                  <Fragment key={text}>{text}</Fragment>
                ) : (
                  <span key={job} className="rg" data-n={job}>
                    {text}
                  </span>
                ),
              )}
            </pre>
          </div>
          <div className="notes">
            <ul>
              <li>
                <span className="n">01</span>
                <div>
                  <b>Skip what the map already has.</b>
                  <span className="d">
                    A file whose name is in the map was published on an earlier run, so it is left alone.
                  </span>
                </div>
              </li>
              <li>
                <span className="n">02</span>
                <div>
                  <b>One file, one entry.</b>
                  <span className="d">
                    The content goes to Walrus and the record to Sui. Each <code>entry add</code> signs two
                    transactions.
                  </span>
                </div>
              </li>
              <li>
                <span className="n">03</span>
                <div>
                  <b>Write the id back.</b>
                  <span className="d">
                    The entry id returned by the CLI is saved against the filename before the next file starts.
                  </span>
                </div>
              </li>
            </ul>
            <span className="notes__lab">COUNT FIRST, THEN RUN</span>
            <pre className="runit">
              {START_LINES.map(({ comment, command }, index) => (
                <Fragment key={comment ?? command}>
                  {index > 0 && '\n'}
                  {comment === undefined ? (
                    <>
                      <span className="p">$</span>
                      {` ${command}`}
                    </>
                  ) : (
                    <span className="c">{comment}</span>
                  )}
                </Fragment>
              ))}
            </pre>
          </div>
        </div>
        {/* The design's last sentence here was "No transaction was sent for this page." The build ran the script on Testnet, so it says that. */}
        <p className="fine">
          The script is the recipe's, with long lines wrapped to fit; it behaves the same. <code>morse use</code>
          {', '}
          <code>status</code>, <code>entry add</code>
          {' and their flags checked against morse-cli 0.14.0 with '}
          <code>--help</code> on 19 Nov 2026, and the script run twice on Testnet the same day.
        </p>
      </div>
    </section>
  )
}
