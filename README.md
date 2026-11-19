# Morse Site Importer

The site for **Morse Site Importer**, at
[siteimporter.morsecms.xyz](https://siteimporter.morsecms.xyz): one site in,
one entry per post. It presents a recipe from the Morse docs,
[Import an existing Markdown site](https://docs.morsecms.xyz/import-a-site.html):
a short bash script that publishes a folder of Markdown as one Morse entry per
file with the Morse CLI and jq, and a map file that makes it safe to run again.

It is a recipe, not a product. Nothing here is a hosted importer, a package or
an installer, and the page says so.

One of five sibling sites that share one dark base: Morse Receipts (paper),
[Morse Agents](https://agents.morsecms.xyz) (lime),
[Morse Press](https://press.morsecms.xyz) (vermilion), Morse Agent Publisher
(magenta) and Morse Site Importer (yellow).

## Routes

| Route | What it is |
|---|---|
| `/` | The site: ten sections, prerendered and then hydrated |
| anything else | `404.html`, served with a 404 status. Static, no script, `noindex` |

## Develop

```sh
npm install
npm run dev            # vite dev server, every page prerendered on request
npm run build          # tsc + production build, prerendered to static HTML in dist/
npm run lint           # eslint
npm run check:recipe   # run the script the page shows against a stand-in CLI (needs bash and jq)
npm run check:docs     # diff the script against the docs recipe (needs the network)
npm run og             # redraw public/og.png, the share image, from og/ (needs Playwright's Chromium)
npm run icons          # redraw the icon files in public/ from favicon.svg and og/icon-full.svg
```

Stack: Vite + React 19 + TypeScript (strict), plain CSS, no runtime dependency
beyond React. Same toolchain as `arcadiasystems/morse-receipts`.

## Structure

| Path | What lives there |
|---|---|
| `src/styles/base.css` | The shared dark base. Copied verbatim from `arcadiasystems/morse-receipts`; identical in every sibling site |
| `src/styles/tokens.css` | This site's `:root` tokens: the Marker Yellow palette |
| `src/styles/site-importer.css` | This site's own objects: the loom, the folders, the marked script, the run log, the pipeline strip, the hazard labels, the recipe card |
| `src/base/` | The React pieces the base implies (nav, status label, footer, final band, FAQ, band, tabs). Copied verbatim from `arcadiasystems/morse-receipts` |
| `src/components/` | One component per section of the page |
| `src/recipe/import.sh` | The script the page shows and copies. One file: the page renders it, the Copy button gives it, and the checks run it |
| `src/lib/` | `links.ts`, every URL the site links to; `importScript.ts`, the script cut into its three marked jobs; `example.ts`, the example the page is drawn with |
| `test/recipe/` | `check.sh` and its stand-in `morse`, and `diff-docs.sh` |
| `vite.config.ts` | The build, and the plugin that prerenders each page |
| `og/` | The share image as a page (`og.html`, `Card.tsx`, `card.css`: identical in the sibling sites; `main.tsx` and `object.css`: this site's content and hero object) and `icon-full.svg`, the full-bleed icon source. Not a build input |
| `scripts/` | `og.mjs` and `icons.mjs` draw `public/og.png` and the icon files with Playwright; `png.mjs` re-compresses what they write. Run by hand, never by the build or CI. Identical in the sibling sites |
| `design/` | The approved design, kept as the source of truth. Not built, not linted, not deployed |

Do not edit `src/styles/base.css`, `src/base/`, `og/Card.tsx`, `og/card.css`
or `scripts/` here. Change them in `arcadiasystems/morse-receipts`, then copy
them again, so the sites never drift.

## The script

`src/recipe/import.sh` is the script of the docs recipe with three long lines
wrapped with a backslash, and nothing else changed. `npm run check:docs` joins
those lines again and diffs the result against the docs page.

`npm run check:recipe` runs it against `test/recipe/bin/morse`, a stand-in
that sends nothing, records each call and prints the JSON the real CLI
(`@arcadiasystems/morse-cli` 0.14.0) prints for `entry add`. It checks what the
page claims: a first run publishes one entry per file, a second run publishes
none and leaves the map as it was, a new file is the only thing a later run
adds, and a run that stops halfway is finished by running it again. CI runs
this check on every pull request.

The script adds new files only. It does not notice an edited file; the page
says so and shows the revision command. If the docs recipe changes, update
`src/recipe/import.sh`, the three notes beside it and the two run logs
together.

## Design handover

The design is `design/site-importer.html`, a single self-contained file, with
its renders at 1440 and 390 beside it. `design/HANDOVER.md` is this site's
part of the design handover: the shared notes, the palette, the section table,
the build notes, the verified commands and the open questions. Class names in
the code are the ones the handover uses, so it stays a usable map: `.loom`,
`.mach`, `.fold`, `.rows`, `.fchip`, `.trk`, `.seg`, `.gate`, `.echip`,
`.mapf`, `.folders`, `.tab`, `.front`, `.glob`, `.scr`, `.rg`, `.notes`,
`.runit`, `.copy`, `.runlog`, `.rtab`, `.mapobj`, `.join`, `.pipebox`,
`.pipe`, `.envt`, `.cikey`, `.haz`, `.rcard`, `.limits`, `.bands`.

## Hosting

Deployed by Vercel from this repository: production from `main`, a preview
for every pull request, custom domain `siteimporter.morsecms.xyz`.
`vercel.json` holds everything the deployment needs:

- Framework preset `vite`, install `npm ci`, build `npm run build`, output `dist`.
- Clean URLs with no trailing slash. Unknown paths get `404.html` with a 404 status.
- Files under `/assets/` are fingerprinted by the build and cached for a year.
  The share image, the icons and the manifest are cached for a day. Everything
  else, HTML included, is revalidated on every request.
- `.vercelignore` keeps `design/` out of the upload.

## Measurement

No analytics or tracking script is loaded; choosing a tool is the owner's
call. The elements to measure carry stable attributes.

`data-cta`, actions on this site:

| Value | Element |
|---|---|
| `primary` | Hero, "Read the recipe". The site's primary event |
| `nav` | Nav, "Read the recipe" |
| `final` | The final band, "Read the recipe" |
| `secondary` | Hero, "See the script" |
| `ci` | On every push, "The workflow file" |

`data-copy` marks the Copy button on the script: the moment a visitor takes
the recipe with them.

`data-link`, links to the sibling sites:

| Value | Where |
|---|---|
| `morse` | Nav, "Morse ↗" |
| `press` | The Morse Press band |
| `uploader` | The Morse Uploader band |
| `agent-publisher` | On every push, the link to Morse Agent Publisher |

## Licence

MIT. See [LICENSE](LICENSE).
