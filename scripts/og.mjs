/* Renders og/og.html to public/og.png, the 1200×630 share image.
   Run with `npm run og` after a change to the hero, the tokens or the card,
   and commit the image. Nothing in the build or in CI runs this.
   Needs Playwright's Chromium once: `npx playwright install chromium`. */
import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import { createServer } from 'vite'
import { compressPng } from './png.mjs'

const WIDTH = 1200
const HEIGHT = 630
const OUTPUT = fileURLToPath(new URL('../public/og.png', import.meta.url))

const server = await createServer({ logLevel: 'warn', server: { port: 0, strictPort: false } })
await server.listen()
const browser = await chromium.launch()

try {
  const address = server.httpServer?.address()
  if (address === null || address === undefined || typeof address === 'string') {
    throw new Error('og: the Vite server has no port')
  }
  /* Reduced motion holds the hero object still, in the state the site's own
     stylesheet gives it, so two runs give the same image. */
  const page = await browser.newPage({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
  })
  await page.goto(`http://localhost:${address.port}/og/og.html`, { waitUntil: 'networkidle' })
  await page.locator('.og').waitFor()
  await page.evaluate(() => document.fonts.ready)
  /* The viewport, not the full page: Chromium does not paint the 3D objects
     over a backdrop blur in a full-page capture. */
  const image = compressPng(await page.screenshot({ type: 'png' }))
  await writeFile(OUTPUT, image)
  console.info(`wrote ${OUTPUT} (${Math.round(image.length / 1024)} kB)`)
} finally {
  await browser.close()
  await server.close()
}
