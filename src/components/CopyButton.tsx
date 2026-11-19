import { useEffect, useRef, useState } from 'react'

const COPIED_FOR_MS = 1600

type Label = 'Copy' | 'Copied' | 'Select and copy'

interface CopyButtonProps {
  /** What goes on the clipboard. */
  text: string
}

/** Puts a code block on the clipboard and says so. Where the browser refuses, it asks the visitor to select the text. */
export function CopyButton({ text }: CopyButtonProps) {
  const [label, setLabel] = useState<Label>('Copy')
  const reset = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(reset.current), [])

  const copy = async () => {
    /* The clipboard exists only in a secure context. */
    if (!navigator.clipboard) {
      setLabel('Select and copy')
      return
    }
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      /* Permission denied: the block is still on the page to select by hand. */
      setLabel('Select and copy')
      return
    }
    setLabel('Copied')
    window.clearTimeout(reset.current)
    reset.current = window.setTimeout(() => setLabel('Copy'), COPIED_FOR_MS)
  }

  return (
    <button className="copy" type="button" data-copy="" aria-live="polite" onClick={copy}>
      {label}
    </button>
  )
}
