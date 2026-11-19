import { Faq, type FaqItem } from '../base/Faq'
import { SectionHead } from '../base/SectionHead'

const QUESTIONS: FaqItem[] = [
  {
    question: 'Is Site Importer a tool I install?',
    answer:
      'No. It is a short bash script from the Morse docs that calls the Morse CLI and jq. You copy it into your repo, read it, and run it. Nothing is hosted for you.',
  },
  {
    question: 'Which site generators does it work with?',
    answer:
      'Any that keeps posts as Markdown files: Hugo, Astro, Jekyll, Obsidian or a plain repo. Morse stores the bytes as they are, so front matter goes in untouched and your existing renderer keeps working.',
  },
  {
    question: 'Does it change my existing site?',
    answer:
      'No. It reads your folder and writes one new file, the map. Your posts, your generator and your hosting stay as they are.',
  },
  {
    question: 'What about images?',
    answer:
      'They are not imported with the post. A Markdown file only carries text, so publish each asset as its own entry or keep assets on a plain host for now.',
  },
  {
    question: 'What does an import cost?',
    answer:
      'On Testnet, faucet tokens. On Walrus Mainnet, real SUI for gas and WAL for storage: Walrus charges per blob per epoch, so the total size and the epoch count are what matter. The recipe starts with a dry run that counts both before you spend anything.',
  },
  {
    question: 'How long does an imported post stay readable?',
    answer: (
      <>
        As long as its storage is paid for. The lease is counted in epochs and set by <code>EPOCHS</code> when you run
        the script. When a lease ends the content can go offline; the record of what was published and when remains on
        Sui.
      </>
    ),
  },
]

/** Six questions, the first of which says this is a script and not a tool to install. */
export function Questions() {
  return (
    <section className="sec flush" id="faq">
      <div className="wrap">
        <SectionHead
          label="Questions"
          title={
            <>
              Before you <em>run it.</em>
            </>
          }
        />
        <Faq items={QUESTIONS} />
      </div>
    </section>
  )
}
