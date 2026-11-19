import { Band } from '../base/Band'
import { Lockup } from '../base/Lockup'
import { TraceMark } from '../base/TraceMark'
import { MORSE_PRESS, UPLOADER_APP } from '../lib/links'
import { PressMark } from './PressMark'

const USES = ['morse-cli 0.14', 'bash', 'jq', 'GitHub Actions', 'Sui', 'Walrus']

/** Two glass bands to the siblings a visitor may have wanted instead, each lockup in its own colour, then what the recipe uses. */
export function Family() {
  return (
    <section className="sec flush" id="family">
      <div className="wrap">
        <div className="bands">
          <Band
            href={MORSE_PRESS}
            link="press"
            lockup={<Lockup product="press" Mark={PressMark} markSize={40} productColor="var(--press)" fontSize={22} />}
            title="Starting a journal, not moving one?"
            text="Morse Press runs a journal for you with an agent you set up in a form: its sources, its brain and its voice. No folder of Markdown needed."
            action="Open Morse Press"
          />
          {/* Uploader has no mark of its own: its lockup uses the plain Trace, as uploader.morsecms.xyz does. */}
          <Band
            href={UPLOADER_APP}
            link="uploader"
            lockup={
              <Lockup product="uploader" Mark={TraceMark} markSize={40} productColor="var(--uploader)" fontSize={22} />
            }
            title="Files, not posts?"
            text="Morse Uploader puts files on Walrus from the browser and shares them with a link. It is a separate tool with its own kind of record, not a step of this import."
            action="Open Morse Uploader"
          />
        </div>
        <div className="runs">
          <span className="lab">Uses</span>
          {USES.map(use => (
            <span key={use} className="pill">
              {use}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
