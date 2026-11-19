import { readFile, rm, writeFile } from 'node:fs/promises'
import { relative, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { build, defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

const PLACEHOLDER = '<!--prerender-->'
const SERVER_ENTRY = 'src/entry-server.tsx'

/** Each HTML file of the site and the page of src/entry-server.tsx rendered into it. */
const PAGES: Record<string, string> = {
  'index.html': 'site',
  '404.html': 'notFound',
}

interface ServerEntry {
  pages: Record<string, (() => string) | undefined>
}

function render({ pages }: ServerEntry, page: string): string {
  const renderPage = pages[page]
  if (!renderPage) throw new Error(`prerender: ${SERVER_ENTRY} exports no page named "${page}"`)
  return renderPage()
}

function inject(html: string, file: string, markup: string): string {
  if (html.split(PLACEHOLDER).length !== 2) {
    throw new Error(`prerender: expected exactly one ${PLACEHOLDER} in ${file}`)
  }
  return html.replace(PLACEHOLDER, () => markup)
}

/**
 * Prerenders every page into its built HTML file, so the content is there
 * without JavaScript: crawlers, link previews and first paint get the full
 * page. src/main.tsx then hydrates the site; the 404 page loads no script at
 * all. After the client build writes its files, this runs an SSR build of
 * src/entry-server.tsx with the same config, renders each page once, and
 * deletes that SSR build.
 */
function prerenderBuild(): Plugin {
  let root = ''
  let log = (message: string) => console.info(message)

  return {
    name: 'morse:prerender-build',
    apply: (_config, env) => env.command === 'build' && !env.isSsrBuild,
    configResolved(config) {
      root = config.root
      log = message => config.logger.info(message)
    },
    async writeBundle({ dir }) {
      if (!dir) throw new Error('prerender: the client build has no output directory')
      const serverDir = resolve(root, 'dist-ssr')

      await build({
        root,
        logLevel: 'warn',
        build: { ssr: SERVER_ENTRY, outDir: serverDir, emptyOutDir: true, copyPublicDir: false },
      })

      try {
        const entryUrl = pathToFileURL(resolve(serverDir, 'entry-server.js')).href
        const entry = (await import(entryUrl)) as ServerEntry
        for (const [file, page] of Object.entries(PAGES)) {
          const htmlPath = resolve(dir, file)
          const markup = render(entry, page)
          await writeFile(htmlPath, inject(await readFile(htmlPath, 'utf8'), htmlPath, markup))
          log(`prerendered ${relative(root, htmlPath)} (${Math.round(markup.length / 1024)} kB of markup)`)
        }
      } finally {
        await rm(serverDir, { recursive: true, force: true })
      }
    },
  }
}

/** The same prerender on the dev server, so the 404 page, which has no script, renders there too. */
function prerenderDev(): Plugin {
  return {
    name: 'morse:prerender-dev',
    apply: 'serve',
    transformIndexHtml: {
      order: 'pre',
      async handler(html, { path, server }) {
        const page = PAGES[path.replace(/^\//, '')]
        if (!server || page === undefined) return html
        const entry = (await server.ssrLoadModule(`/${SERVER_ENTRY}`)) as ServerEntry
        return inject(html, path, render(entry, page))
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), prerenderBuild(), prerenderDev()],
  build: {
    rolldownOptions: {
      input: Object.keys(PAGES),
    },
  },
})
