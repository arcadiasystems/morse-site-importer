import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../src/styles/tokens.css'
import '../src/styles/base.css'
import '../src/styles/site-importer.css'
import './card.css'
import './object.css'
import { Loom } from '../src/components/Hero'
import { SiteImporterMark } from '../src/components/SiteImporterMark'
import { Card } from './Card'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Card
      product="site importer"
      Mark={SiteImporterMark}
      headline={
        <>
          One site in.
          <br />
          <em>One entry per post.</em>
        </>
      }
      tagline="A recipe for the Morse CLI, bash and jq."
      domain="siteimporter.morsecms.xyz"
    >
      <Loom />
    </Card>
  </StrictMode>,
)
