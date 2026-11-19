# Morse recipe sites: Agent Publisher, Site Importer. Design handover

> This copy is the Morse Site Importer part of `HANDOVER-v5.md`: the shared notes and the Site Importer section, word for word. The section "Morse Agent Publisher" was left out; it lives in `arcadiasystems/morse-agent-publisher`. The design it describes is `design/site-importer.html`, with renders `design/site-importer-desktop.png` and `design/site-importer-mobile.png`. The other files the text names (`work/`, `src/`, `cli/`, the palette variants) were not committed.

Date: 19 Nov 2026. Two more standalone sites in the dark family of Receipts, Agents and Press, for owner approval before they are built. This file is written to be read after `HANDOVER.md` and `HANDOVER-landing.md` in `morse-sites-v4`; the identity, the Morse devices, the copy rules and the audit method are there and are not repeated.

| Site | File | Domain | Talks to | Headline | Primary action |
|---|---|---|---|---|---|
| Morse Agent Publisher | `agent-publisher.html` | agentpublisher.morsecms.xyz | Developers who run an AI agent and want it to publish | Agents publish. You keep the key. | Read the recipe |
| Morse Site Importer | `site-importer.html` | siteimporter.morsecms.xyz | People with a Hugo, Astro, Jekyll or plain Markdown site | One site in. One entry per post. | Read the recipe |

How the two differ from the other three, in one line. Receipts, Agents and Press are products. These two are recipes: a documented way to do a job with the Morse CLI and SDK that exist today. Neither page presents a hosted app, a package or an installer, because there is none. Each page says so in the hero, in a section of its own ("A recipe. Not a service.") and in its first question.

Why "Read the recipe" on both. The only thing a visitor can do today is open the docs page and follow it, so the button names that and points at it: `https://docs.morsecms.xyz/agent-publishes.html` and `https://docs.morsecms.xyz/import-a-site.html`. Both resolve (checked 19 Nov). "Get started", "Install" and "Launch" were rejected because each implies something to install or open. The secondary action keeps the visitor on the page at the part they came for: "Copy the CLAUDE.md snippet" (the landing card promises that snippet) and "See the script".

## What is in the folder

| File | What it is |
|---|---|
| `agent-publisher.html`, `site-importer.html` | The two sites. Single files, CSS and JS inline, in the same form as `press.html`. |
| `agent-publisher-v-brass.html`, `agent-publisher-v-orchid.html`, `agent-publisher-palettes.png` | Agent Publisher in the two palettes that were not chosen, and a side-by-side image. Not for build. |
| `site-importer-v-aqua.html`, `site-importer-v-tangerine.html`, `site-importer-palettes.png` | Site Importer in the two palettes that were not chosen, and a side-by-side image. Not for build. |
| `family-5.png` | The five heroes side by side: Press, Agents, Receipts, Agent Publisher, Site Importer. |
| `*-desktop.png`, `*-mobile.png`, `*-hero.png` | Renders at 1440 and 390, stitched from viewport captures, and the first viewport at 1440. |
| `work/` | The parts the files are assembled from and the tools: `base.css` (the real base), `ap.css`, `si.css`, `ap.body.html`, `si.body.html`, `site.js`, `build.py`, `shots.py` (stitched renders), `compose.py` (palette sheets, family image), `interact.py` (tabs, copy, FAQ, reduced motion), `audit-output.txt`, `imp/` (the import script as tested). |
| `src/` | The sources every fact was taken from: the docs pages as Markdown, both package READMEs, and `cli-help.txt` (the `--help` output of every command used). |
| `cli/` | A local install of `@arcadiasystems/morse-cli@0.14.0`, used only for `--help`. |

Links in the two files are absolute, because the sibling sites are live and there are no local copies to point at.

## Shared build notes

- Both files inline `src/styles/base.css` from `main` of arcadiasystems/morse-receipts, byte for byte, under the comment "shared base". Nothing in it was edited. Above it sits one `:root` line with the token contract (`--bg`, `--bg-rgb`, `--panel-rgb`, `--dim`, `--mute`, `--acc`, `--acc-rgb`, `--lift`, `--lift-rgb`, `--tint-rgb`, `--em`, `--on-acc`, `--ok`, `--warn`); below it sits the site block. In a repo these are `tokens.css`, `base.css` and `<site>.css`, in that order, with `src/base/` copied verbatim.
- No change to the base is needed. Two things a builder might take for one: each site block sets `.hero__grid{width:100%}` (the hero is a flex container, so a short headline would otherwise let the grid shrink to its content), and each adds `:focus-visible` with a 2px lift outline, because the base has no focus rule. If the owner wants the focus rule in the base, it is one line; raise it in morse-receipts and copy again.
- Each site writes its own `.two`, `.why`, `.fine`, `.glow` opacity, `.pill.dash`, the 860px `.band` rules and `.faq summary{font-size:20px}`, as BASE-NOTES lists.
- Status label: cells `DOCS RECIPE`, then `CLI OR SDK` (Agent Publisher) or `BASH + JQ` (Site Importer), then `ABOUT 15 MINUTES`, which hides at 860px. The tape spells PUBLISHER and IMPORTER. The lamp cell does not say LIVE: a recipe is not a running thing. `StatusLabel` takes all of this through its two props.
- Nav: the stacked lockup with the product's own mark from `logos/` (Trace raised, accent below), five section links, "Morse ↗", and "Read the recipe ↗". In `src/base` pass the mark through the `Mark` prop as Press does. The product word in the lockup has a space ("agent publisher", "site importer"); `Lockup` lower-cases the `product` prop and renders it as given, so pass the two words.
- Inline SVG marks carry literal hexes, as in the family: `#FF3EA5` on Agent Publisher, `#FFE62E` on Site Importer. The logo files in `logos/` use the ultramarine lift `#7D8BFF`; on its own site each mark takes the site's colour, as the Press mark takes vermilion.
- Sibling names carry their own colours: Agents lime `#C6F135`, Press vermilion `#FF5A36`, Uploader ultramarine lift `#7D8BFF`, and Agent Publisher magenta `#FF3EA5` where Site Importer names it.
- Breakpoints follow the family: 1080 hides the nav links and collapses the wide objects, 860 is the one-column layout. The two heroes add two scale steps of their own, at 1180 and 980, so the 3D object never reaches the text.
- Every animation stops under `prefers-reduced-motion`. `interact.py` reports zero running animations on both pages with reduced motion emulated, and each object rests in its complete state.
- Tabs: one tab stop, arrow keys move and select, Home and End jump, every panel stays in the markup. The inline script does exactly what `useTabs` does; in the build use `useTabs`.
- No text under 11px. No em dashes. "Plug and play", "one click", "immutable" and "cannot be taken down" are not used. The network is written "Walrus Mainnet" everywhere in page copy.
- One device is shared by the two recipe sites and only by them: the recipe card (`.rcard`), an index card with a coloured rule under its title and the recipe's own facts on ruled lines.

## Morse Site Importer (`site-importer.html`)

The idea the page is built on is the mark's: one site in, many entries out. The three segments under the Trace are the three things that travel across the hero, and the segment returns wherever a file becomes an entry.

Palette, Marker Yellow:

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0A0A06` | The field: a black with a trace of olive |
| `--text` | `#F4F2EC` | Bone, unchanged (17.7:1 on the field) |
| `--dim`, `--mute` | `#C3C1B2`, `#999684` | Greys for body and captions (10.9:1 and 6.7:1 on the field; mute is 6.4:1 on a panel) |
| `--acc` | `#FFE62E` | Yellow. The headline clause, the primary button, the folder tab, the segments, a lit entry, the publish step (15.7:1 on the field) |
| `--lift` | `#FFF09A` | `//` labels, the Morse tape, numbers, variable names (17.2:1) |
| `--acc-rgb`, `--lift-rgb`, `--tint-rgb` | `255,230,46` · `255,240,154` · `255,250,214` | Translucent accents |
| `--panel-rgb` | `17,16,9` | Solid panels |
| `--on-acc` | `#0A0A06` | Text on yellow is always dark (15.7:1; bone on yellow is 1.1:1 and is never used) |
| `--ok` | `#6FD3A6` | Only the status lamp |
| `--warn` | `#F0C96A` | Set, for the contract, and not used: see below |
| `--press`, `--uploader`, `--publisher` | `#FF5A36`, `#7D8BFF`, `#FF3EA5` | Only for the sibling names |

Why yellow. Two things on this page are yellow in everyone's head already. A folder is: the tab of a file folder is the first object on the page, and the "Why" section is a drawer of them. And a marker is: the format is called Markdown, and the page's job is to run a marker over the lines of a short script and say what each does. The audience is people who keep a site as text files, and yellow on black is the plainest "this is a tool, read the label" signal there is, which is also why the pitfalls carry a hazard stripe. On the wheel it takes the last open position on the warm side: hue 53, between Press at 11 and Agents at 74. That is the narrowest gap in the family, 21 degrees from lime, and it is the reason the yellow is a full, warm yellow with no green in it, where lime is visibly green; `family-5.png` is the test. It is assigned to this site and not to Agent Publisher because of the neighbours: this page links to Press and Uploader, never to Agents, so yellow never has to sit beside lime on a page. Yellow is the brightest colour in the family (15.7:1 on the field), so it is spent on small things and on one large one, a lit entry. Aqua (data flowing in) was rejected as too close to Uploader's blue, which is linked on this page, and as leaning toward Arcadia's teal. Tangerine (the orange of feeds and of Hugo) was rejected as the amber already ruled too close to Press, also linked here. `site-importer-v-aqua.html`, `site-importer-v-tangerine.html` and `site-importer-palettes.png` show the alternatives.

One rule introduced here, on the model of Agents' "one green, not two": on this site the amber of the family's sample label would read as a second yellow, so `.pill.sample` is overridden to a neutral dashed pill. Yellow then means one thing, the product, and "Example" is plain.

| # | Section (id) | Custom object |
|---|---|---|
| 1 | Hero (`#top`) | The loom (`.loom`, `.loom__in`, `.mach`, `.fold`, `.fold__tab`, `.rows`, `.fchip`, `.trk`, `.seg`, `.gate`, `.echip`, `.mapf`). Tilted in 3D: a folder with a yellow tab, `content/posts/`, holding three files; three dashed tracks that pass through a tall glowing frame labelled `import.sh`; and three raised tiles, entry 0, 1 and 2. On a 10-second loop a yellow segment, the segment from the mark, crosses each track in turn; its tile fills with yellow when it lands, and the matching row lights in the panel below (`.mapf`, `morse-map.json`, name and entry id). Marked "Example". |
| 2 | Why (`#why`) | A drawer of folders (`.folders`, `.tab`, `.front`, `.glob`): five file folders one behind the other, their tabs stepping to the right: Hugo, Astro, Jekyll, Obsidian, a plain repo. The front one has a yellow tab and is open: `content/posts/*.md`, and "A folder of Markdown files is all the recipe needs." Then "Morse stores bytes as they are. Front matter goes in untouched, and your renderer keeps working." |
| 3 | The script (`#script`) | The whole of `import.sh` (`.scr`, `.scr__code`, `.scr__bar`, `.rg`, `.notes`, `.runit`, `.copy`) with its three jobs marked in the margin by a yellow bar and a number, as a marker would: 01 skip what the map already has, 02 one file, one entry, 03 write the id back. The same numbers are explained beside it, above a second block with the dry run and the four commands that start it. Copy works. |
| 4 | Run it again (`#rerun`) | A run log with three working tabs (`.runlog`, `.runlog__bar`, `.runlog__tabs`, `.rtab`, `.runlog__ft`): first run (three lines of `add`), run again (three lines of `skip`), after an edit (the revision command). Beside it the map as an object (`.mapobj`, `.join`): each filename joined to its entry id by a yellow segment, with a "Commit this" pill. |
| 5 | On every push (`#ci`) | The pipeline strip (`.pipebox`, `.pipe`): one bar divided into five cells, trigger, set up, check, publish, commit, with the publish cell lit. Three segments run along a dashed track above it. Below 1080px it becomes a vertical list. Under it the four environment variables (`.envt`) and "Give CI a key of its own. Not yours." (`.cikey`), which names Morse Agent Publisher in magenta. |
| 6 | Pitfalls (`#pitfalls`) | Four labels (`.haz`), each with a yellow and black hazard stripe along its top edge, the pitfall in large type, and "What happens" and "What to do". |
| 7 | What this is (`#recipe`) | The recipe card (`.rcard`), tilted the other way, beside four numbered limits (`.limits`). |
| 8 | Family, Questions, Final | Two glass bands: Morse Press in vermilion and Morse Uploader in ultramarine lift, with "Uses" chips. Six questions as `<details>`. "Bring the folder. Keep the repo." with two glass tiles carrying the Site Importer mark. |

Build notes:

- The loom runs nine animations on one 10-second clock, three per row: `g1` to `g3` move the segment (from 8, 30 and 52 percent, 12 percent each), `e1` to `e3` fill the tile and `t1` to `t3` turn its text dark at the moment of landing, and `m1` to `m3` light the map rows. Everything holds until 95 percent. The distance a segment travels is the variable `--run` on `.trk`.
- A lit tile is yellow through a pseudo-element (`.echip::before`), so the audit, which reads backgrounds from elements, reports the label "ENTRY" at 1.04:1. On screen it is dark on yellow at 15.7:1.
- The hero column is 1.1fr to 0.9fr so the second line of the headline fits; the site block restates one column at 860, as the cascade note in the base requires.
- The loom is a fixed 500 by 560 box, scaled at 1180 and 980 like the cap. At 860 it is flat: folder, three rows of file, segment and entry, then the map. The frame is hidden and the segments are parked mid-track.
- The margin marks in the script are block spans (`.rg`) inside the `<pre>`, each ending with its own newline; keep the line breaks exactly where they are or a blank line appears.
- Below 860 the script wraps (`pre-wrap`), as the family's terminals do. The start block (`.runit`) is 40 characters or fewer and does not wrap.
- The folders are generated from one custom property, `--i`, on each item; the tab width is `--tw`. Below 860 they become five chips and one open card.
- The audit is clean at 1440, 1024 and 390, with overflow 0 at nine widths. Expected reports: closed FAQ answers, the lit tile described above, and the nav brand's tap height.

Status on this page. Two recipes exist and work today: importing a folder, and running the same script from GitHub Actions. The page presents CI as "a second recipe", links to it, and does not show the workflow file. It says plainly that the script publishes new files and does not notice edits, that images are not imported, that entry names are not unique on chain, and that a Testnet reset empties everything. Uploader is described as a separate tool with its own kind of record, not as a way to import a site's images.

Example content on this page, all generic and labelled: the files `hello-world.md`, `second-post.md` and `third-post.md` under `content/posts/`, the entry ids 0, 1 and 2, the publication `my-blog` and the collection `posts`. The two run logs are the real output of the script on those three files (see "Verified code"). There is no count, size, cost, date or site name on the page.

## Verified code

Checked on 19 Nov 2026 against `@arcadiasystems/morse-cli@0.14.0`, installed locally in `cli/`, using `morse <command> --help`. The full output is in `src/cli-help.txt`. No transaction was sent.

| On the page | Where | Checked against |
|---|---|---|
| `morse cap issue <holder>` | Agent Publisher `#run`, `#audit` | `cap issue --help`: `<holder>`, optional `-P` |
| `morse cap list [address]` | `#run` | `cap list --help`: lists revoked caps too |
| `morse cap revoke <publisherCapId>` | `#run`, `#audit` | `cap revoke --help` |
| `morse --json -q --yes status` | `#run`, and `--yes -q` on Site Importer `#ci` | Root help: `--json`, `-q`, `-y, --yes`; `status --help` |
| `morse --json -q --yes entry add <name> --file --epochs` | `#run`, `#kit`, the import script | `entry add --help`: `-f, --file`, `--epochs` (default 3) |
| `morse entry list`, `morse entry read <entryId>` | `#run`, `#kit` | `entry list --help`, `entry read --help` |
| `morse revision publish-direct <entryId> --file --epochs` | `#kit`, `#audit`, Site Importer `#rerun` | `revision publish-direct --help` |
| `morse use <publication> <collection>` | Site Importer `#script` | `use --help` |
| `account export` (named only, as forbidden) | `#kit` | `account --help` |
| `--network mainnet`, `MORSE_NETWORK` | Both FAQs | Root help |
| `MORSE_PRIVATE_KEY`, `MORSE_PUBLICATION`, `MORSE_COLLECTION` | `#kit`, `#ci` | The CLI README's variable table |

The CLAUDE.md snippet, the shell variables and the prompt are the text of `agent-publishes.html`, re-wrapped to 57 characters; no word was changed. One code span in the snippet now breaks across two lines, which Markdown allows.

The import script is the text of `import-a-site.html` with three long lines broken with a backslash. To prove the breaks change nothing, the wrapped script (`work/imp/import.sh`) was run twice over three files with a stand-in for `morse` that sends nothing and returns `{"entryId":"n"}`. It printed the two logs shown on the page and wrote the map the docs describe; the text the Copy button produces is identical to the tested file. That test proves the bash, not the CLI: it assumes `entry add --json` returns a field named `entryId`, as the docs say.

No code line on either page is longer than 57 characters. On Agent Publisher the lane commands, and on Site Importer the start block, are 40 or fewer.

Facts from the package READMEs that both pages respect: public content is supported on Testnet and Walrus Mainnet and encrypted commands need your own Seal key-server credentials on mainnet (CLI 0.14.0 README); mainnet is "usable but young" (SDK 0.12.0 README); Walrus storage is paid per epoch and expires unless renewed (both).

## Verify before publishing

1. Run each block once on Testnet with a funded wallet: the five lane commands on Agent Publisher, and `import.sh` twice on Site Importer. Confirm that `entry add --json` prints `entryId` and a digest, since two sentences on Agent Publisher say so ("JSON comes back for it to read, with the entry id and the transaction digest", "Returns · entry id, digest").
2. The docs say different things about edits. `publish-from-ci.html` opens with "CI publishes new files as entries and changed files as revisions", but its workflow runs `import.sh`, which only adds new files. The page follows the script ("The new post publishes", "As written, the job publishes new posts"). The landing card's "CI publishing on push" is true either way. Fix the docs sentence, or add the hash check to the script and then change the page.
3. "Each `entry add` signs two transactions" and "decrypt team content" come from the docs (`import-a-site`, `co-author`); confirm both still hold on CLI 0.14.
4. "A write attempted after revocation still pays for the upload, then fails" comes from `co-author.html`. It is the least flattering sentence on the site and worth keeping only while it is true.
5. Every link: the two recipe pages, `publish-from-ci.html`, `cookbooks.html` and `sdk-workflows.html` returned 200 on 19 Nov. `agentpublisher.morsecms.xyz` and `siteimporter.morsecms.xyz` do not exist yet and each page links to the other.
6. The Uploader lockup uses the plain Trace, as the live uploader.morsecms.xyz does. If Uploader has a mark of its own by then, use it.
7. The "Uses" chips name `morse-cli 0.14` and `morse-sdk 0.12`. Update them, and the "checked against" lines, when the versions move.
8. The recipe cards quote "About 15 minutes" and "about 20 for CI" from the docs pages. If the docs change them, change the cards and the status labels.
9. The landing cards for both recipes carry a "Live" chip. These pages avoid the word. Decide which wording wins and make the two agree.

## Open questions for the owner

1. Two recipes, two sites. A recipe is one docs page. Is a full site per recipe the right weight, or should these be one "Morse recipes" site with two pages? The designs work either way; the palettes assume two.
2. Yellow next to lime. Marker Yellow is 21 degrees of hue from Agents lime, the narrowest gap in the family. It was chosen because the wheel has no better warm position left and because the two never share a page. If it reads too close in `family-5.png`, the fallback is to swap: Site Importer takes magenta and Agent Publisher takes a neutral, which costs Agent Publisher its two-key colour story.
3. The headline "Agents publish. You keep the key." It is short and true (the owner key stays with you). "The agent publishes" would be more exact but does not fit on one line at the family's size. The landing's line, "Let any agent publish, under rights you can revoke", is the sub-headline's source.
4. The lamp says DOCS RECIPE, not LIVE. The other three sites open with LIVE or CHECK LIVE. Should a recipe site claim it?
5. Should the pages carry the SDK path as code? The docs show the CLI only and point to the SDK cookbooks, so the page does the same. An SDK tab would need its snippet type-checked against 0.12.0 first, as the landing's was.
6. Site Importer says nothing about cost in numbers, because the recipe gives none and the handover forbids invented ones. The landing has worked examples at the 17 Nov Walrus rate. Should this page link to `#cost` on the landing?
7. Should Site Importer ship the edit check the docs leave "as a ten-line exercise"? With it, "safe to re-run, with CI publishing on push" would cover edits too, and one caveat would leave the page.

## Measurement, before go-live

One primary event per site: clicks on "Read the recipe" (`data-cta="primary"`, `"nav"`, `"final"`). Also record the secondary button (`data-cta="secondary"`), uses of Copy (`data-copy`), tab changes, and clicks on the sibling bands (`data-link="agents"`, `"press"`, `"uploader"`, `"agent-publisher"`). Copy is the best signal on both pages: it is the moment a visitor takes the recipe with them.

## Prompt for Claude Code

```
Read HANDOVER.md and HANDOVER-landing.md in morse-sites-v4, then HANDOVER-v5.md, then agent-publisher.html and site-importer.html.

Build two standalone sites from those files: agentpublisher.morsecms.xyz and siteimporter.morsecms.xyz. Copy src/styles/base.css and src/base/ verbatim from arcadiasystems/morse-receipts and do not edit them; give each site its own tokens.css and its own stylesheet, taken from the block under "site block" in its file. Keep every class and object named in HANDOVER-v5.md, the animation timings, the scale steps at 1180 and 980, and the reduced-motion rules. Use useTabs for the tabs.

The files named -v-brass, -v-orchid, -v-aqua and -v-tangerine are comparisons, not for build.

Use the code blocks exactly as written; they were checked against morse-cli 0.14.0. Run each once on Testnet and report anything that fails or prints something different from what the page says, starting with the fields entry add returns in JSON.

Keep every Example label. Do not add digests, wallets, counts, costs or sample journals.

Rules for all copy: no em dashes; do not use "plug and play", "one click", "immutable" or "cannot be taken down"; write "Walrus Mainnet"; do not describe either recipe as an app, a service or an installer.

Before you finish, go through "Verify before publishing" and report what you found for each item, and run audit.py on both pages at 1440, 1024 and 390.
```
