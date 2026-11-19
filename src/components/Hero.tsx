import { ButtonLink } from '../base/ButtonLink'
import { StatusLabel } from '../base/StatusLabel'
import { EXAMPLE_POSTS } from '../lib/example'
import { DOCS_COOKBOOKS, DOCS_IMPORT_A_SITE } from '../lib/links'

/**
 * The hero object: a folder of three files, three tracks through the
 * import.sh frame, three entry tiles, and the map that fills below. The
 * segment that crosses each track is the segment of the mark. Also drawn on
 * the share image (og/main.tsx).
 */
export function Loom() {
  return (
    <div
      className="loom"
      role="group"
      aria-label="Example: three Markdown files, each published as one Morse entry, and the map that remembers which is which"
    >
      <div className="loom__in">
        <div className="mach">
          <div className="fold" aria-hidden="true">
            <span className="fold__tab">content/posts/</span>
          </div>
          <div className="gate" aria-hidden="true">
            <small>import.sh</small>
          </div>
          <ol className="rows">
            {EXAMPLE_POSTS.map(({ name, entryId }) => (
              <li key={name}>
                <span className="fchip">
                  {name}
                  <small>.md</small>
                </span>
                <span className="trk" aria-hidden="true">
                  <i className="seg" />
                </span>
                <span className="echip">
                  <small>ENTRY</small>
                  <b>{entryId}</b>
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div className="mapf">
          <div className="mapf__hd">
            <span>MORSE-MAP.JSON</span>
            <span>NAME · ENTRY ID</span>
          </div>
          <ul>
            {EXAMPLE_POSTS.map(({ name, entryId }) => (
              <li key={name}>
                <span>{`"${name}"`}</span>
                <b>{entryId}</b>
              </li>
            ))}
          </ul>
        </div>
        <span className="pill sample">Example</span>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section className="hero" id="top">
      <span className="glow a" />
      <span className="glow b" />
      <div className="wrap hero__grid">
        <div className="hero__l">
          {/* The lamp cell does not say LIVE: a recipe is not a running thing. */}
          <StatusLabel cells={['DOCS RECIPE', 'BASH + JQ', 'ABOUT 15 MINUTES']} word="IMPORTER" />
          <h1 className="thin">
            One site in.
            <br />
            <em>One entry per post.</em>
          </h1>
          <p className="sub">
            A recipe for the Morse CLI, bash and jq. Point it at a folder of Markdown from Hugo, Astro, Jekyll or
            Obsidian. Every file becomes one Morse entry, a map file makes it safe to run again, and a CI job publishes
            on every push.
          </p>
          <div className="hero__cta">
            <ButtonLink variant="acc" label="Read the recipe" href={DOCS_IMPORT_A_SITE} leaves cta="primary" />
            <ButtonLink variant="ghost" label="See the script" href="#script" cta="secondary" />
          </div>
          <p className="hero__fine">
            Two recipes in the <a href={DOCS_COOKBOOKS}>Morse cookbooks</a>, not a hosted importer. Your repo stays the
            source.
          </p>
        </div>
        <Loom />
      </div>
    </section>
  )
}
