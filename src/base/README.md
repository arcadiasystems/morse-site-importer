# src/base

The React pieces the shared dark base implies. This folder and
`src/styles/base.css` are identical in morse-receipts, morse-agents and
morse-press: they are written in morse-receipts and copied verbatim into the
other two. Configure them through props; do not edit a copy.

| File | What it renders |
|---|---|
| `Arrow.tsx` | The `↗` after a label that leaves the page |
| `Band.tsx` | `.glass.band`, the cross-link band to a sibling product |
| `ButtonLink.tsx` | `.btn` pills as links, with `data-cta` |
| `Faq.tsx` | `.faq`, questions as `<details>` |
| `FinalBand.tsx` | `.final` with its glow and the two `.gtile` tiles |
| `Footer.tsx` | `.foot` |
| `Lockup.tsx` | `.brand`: a mark beside "morse" stacked over the product word |
| `Nav.tsx` | `.nav`, ending in "Morse ↗" and the site's one action |
| `SectionHead.tsx` | `.sec__head` |
| `StatusLabel.tsx` | `.status`: lamp, cells and the Morse tape |
| `TraceMark.tsx` | The Morse mark |
| `morse.ts` | Text to Morse |
| `useTabs.ts` | Tab state with arrow-key behaviour and ARIA wiring |
