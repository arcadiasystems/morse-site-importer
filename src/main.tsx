import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import './styles/tokens.css'
import './styles/base.css'
import './styles/site-importer.css'
import App from './App.tsx'

/* The page is prerendered into #root, at build time and by the dev server
   (see vite.config.ts), so the client only hydrates that markup. */
hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <App />
  </StrictMode>,
)
