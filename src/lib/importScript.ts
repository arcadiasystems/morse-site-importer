import source from '../recipe/import.sh?raw'

/** import.sh as committed in src/recipe: the text the Copy button gives, and the file the recipe's checks run. */
export const IMPORT_SCRIPT = source

/** A run of lines of the script. A job is one of the three things the script does, marked in the margin. */
export interface ScriptPart {
  /** The lines, each ending with its newline, except the last line of the script. */
  text: string
  /** "01" to "03" for a marked job; absent for the lines around them. */
  job?: string
}

/* The first line of each marked job, and the line that follows the last one. */
const JOB_STARTS = [
  { job: '01', startsWith: '  if jq -e ' },
  { job: '02', startsWith: '  echo "add ' },
  { job: '03', startsWith: '  id=$(' },
]
const AFTER_JOBS = 'done'

function lineIndex(lines: string[], startsWith: string): number {
  const index = lines.findIndex(line => line.startsWith(startsWith))
  if (index === -1) throw new Error(`import.sh: no line starts with "${startsWith}"; the margin marks need updating`)
  return index
}

/** The script cut into the lines before the jobs, the three jobs, and the lines after them. */
export function scriptParts(): ScriptPart[] {
  const lines = IMPORT_SCRIPT.replace(/\n$/, '').split('\n')
  const starts = JOB_STARTS.map(({ startsWith }) => lineIndex(lines, startsWith))
  const end = lineIndex(lines, AFTER_JOBS)
  const block = (from: number, to: number) => lines.slice(from, to).map(line => `${line}\n`).join('')

  return [
    { text: block(0, starts[0]) },
    ...JOB_STARTS.map(({ job }, index) => ({ job, text: block(starts[index], starts[index + 1] ?? end) })),
    { text: lines.slice(end).join('\n') },
  ]
}
