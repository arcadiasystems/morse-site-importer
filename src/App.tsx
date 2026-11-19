import { FinalBand } from './base/FinalBand'
import { Footer } from './base/Footer'
import { Nav } from './base/Nav'
import { Ci } from './components/Ci'
import { Family } from './components/Family'
import { Hero } from './components/Hero'
import { Pitfalls } from './components/Pitfalls'
import { Questions } from './components/Questions'
import { Recipe } from './components/Recipe'
import { Rerun } from './components/Rerun'
import { Script } from './components/Script'
import { SiteImporterMark } from './components/SiteImporterMark'
import { Why } from './components/Why'
import {
  DOCS,
  DOCS_IMPORT_A_SITE,
  GITHUB,
  MORSE,
  MORSE_AGENT_PUBLISHER,
  MORSE_PRESS,
  MORSE_RECEIPTS,
  UPLOADER_APP,
} from './lib/links'

const NAV_LINKS = [
  { label: 'The script', href: '#script' },
  { label: 'Run it again', href: '#rerun' },
  { label: 'On every push', href: '#ci' },
  { label: 'Pitfalls', href: '#pitfalls' },
  { label: 'Questions', href: '#faq' },
]

const FOOTER_LINKS = [
  { label: 'Morse kit', href: MORSE },
  { label: 'Press', href: MORSE_PRESS },
  { label: 'Uploader', href: UPLOADER_APP },
  { label: 'Receipts', href: MORSE_RECEIPTS },
  { label: 'Agent Publisher', href: MORSE_AGENT_PUBLISHER },
  { label: 'Docs', href: DOCS },
  { label: 'GitHub', href: GITHUB },
]

export default function App() {
  return (
    <>
      <Nav
        product="Site Importer"
        Mark={SiteImporterMark}
        links={NAV_LINKS}
        morseHref={MORSE}
        action={{ label: 'Read the recipe', href: DOCS_IMPORT_A_SITE, leaves: true, cta: 'nav' }}
      />
      <main>
        <Hero />
        <Why />
        <Script />
        <Rerun />
        <Ci />
        <Pitfalls />
        <Recipe />
        <Family />
        <Questions />
        <FinalBand
          Mark={SiteImporterMark}
          headline={
            <>
              Bring the folder.
              <br />
              <em>Keep the repo.</em>
            </>
          }
          primary={{ label: 'Read the recipe', href: DOCS_IMPORT_A_SITE, leaves: true, cta: 'final' }}
          secondary={{ label: 'See the script', href: '#script' }}
        />
      </main>
      <Footer
        product="Site Importer"
        Mark={SiteImporterMark}
        links={FOOTER_LINKS}
        line="Morse Site Importer: a recipe for bringing a Markdown site in. Part of Morse, built by Arcadia Systems with a grant from the Walrus Foundation. © 2026 · Open source, MIT licence"
      />
    </>
  )
}
