/* Draws the icon files in public/ from the two SVG sources:

     public/favicon.svg   the mark on its rounded tile
       → favicon.ico (16, 32 and 48 px), icon-192.png, icon-512.png
     og/icon-full.svg     the same mark on a full-bleed tile, for hosts that
                          cut their own corners
       → apple-touch-icon.png (180 px), icon-maskable-512.png

   Run with `npm run icons` after a change to either source, and commit the
   files. Nothing in the build or in CI runs this.
   Needs Playwright's Chromium once: `npx playwright install chromium`. */
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import { compressPng } from './png.mjs'

const PUBLIC = new URL('../public/', import.meta.url)
const ICO_SIZES = [16, 32, 48]

/** An .ico file that holds each image as a PNG, which every current browser reads. */
function ico(images) {
  const HEADER = 6
  const ENTRY = 16
  const head = Buffer.alloc(HEADER + ENTRY * images.length)
  head.writeUInt16LE(1, 2) // type: icon
  head.writeUInt16LE(images.length, 4)
  let offset = head.length
  images.forEach(({ size, png }, index) => {
    const entry = HEADER + ENTRY * index
    head.writeUInt8(size, entry) // width
    head.writeUInt8(size, entry + 1) // height
    head.writeUInt16LE(1, entry + 4) // colour planes
    head.writeUInt16LE(32, entry + 6) // bits per pixel
    head.writeUInt32LE(png.length, entry + 8)
    head.writeUInt32LE(offset, entry + 12)
    offset += png.length
  })
  return Buffer.concat([head, ...images.map(({ png }) => png)])
}

async function write(name, data) {
  await writeFile(new URL(name, PUBLIC), data)
  console.info(`wrote public/${name} (${data.length} bytes)`)
}

const tile = await readFile(new URL('favicon.svg', PUBLIC), 'utf8')
const fullBleed = await readFile(fileURLToPath(new URL('../og/icon-full.svg', import.meta.url)), 'utf8')
const browser = await chromium.launch()

try {
  const page = await browser.newPage({ deviceScaleFactor: 1 })

  /** One SVG source drawn at a square pixel size, on a transparent ground. */
  async function draw(svg, size) {
    await page.setViewportSize({ width: size, height: size })
    await page.setContent(
      `<style>html,body{margin:0;background:transparent}svg{display:block;width:${size}px;height:${size}px}</style>${svg}`,
    )
    return compressPng(await page.screenshot({ type: 'png', omitBackground: true }))
  }

  const icoImages = []
  for (const size of ICO_SIZES) icoImages.push({ size, png: await draw(tile, size) })
  await write('favicon.ico', ico(icoImages))
  await write('icon-192.png', await draw(tile, 192))
  await write('icon-512.png', await draw(tile, 512))
  await write('apple-touch-icon.png', await draw(fullBleed, 180))
  await write('icon-maskable-512.png', await draw(fullBleed, 512))
} finally {
  await browser.close()
}
