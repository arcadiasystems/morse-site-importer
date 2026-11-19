import { StrictMode } from 'react'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import App from './App.tsx'
import { NotFound } from './NotFound.tsx'

/**
 * Every page of the site, rendered to HTML. Called by the prerender plugins
 * in vite.config.ts, which map each HTML file to one of these names. The site
 * is hydrated by src/main.tsx, so it renders with hydration markers; the 404
 * page loads no script, so it renders as plain markup.
 */
export const pages = {
  site: () =>
    renderToString(
      <StrictMode>
        <App />
      </StrictMode>,
    ),
  notFound: () => renderToStaticMarkup(<NotFound />),
}
