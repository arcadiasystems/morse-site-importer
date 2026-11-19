import { useId, useRef, useState, type KeyboardEvent } from 'react'

interface TabProps {
  role: 'tab'
  id: string
  'aria-selected': boolean
  'aria-controls': string
  tabIndex: 0 | -1
  onClick: () => void
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void
  ref: (node: HTMLElement | null) => void
}

interface PanelProps {
  role: 'tabpanel'
  id: string
  'aria-labelledby': string
  hidden: boolean
}

interface Tabs {
  selected: number
  tabProps: (index: number) => TabProps
  panelProps: (index: number) => PanelProps
}

/**
 * State and ARIA wiring for a set of tabs: one tab stop, arrow keys move and
 * select, Home and End jump to the ends. Every panel stays in the markup and
 * the unselected ones are hidden, so the prerendered page holds all of them.
 */
export function useTabs(count: number): Tabs {
  const [selected, setSelected] = useState(0)
  const baseId = useId()
  const tabs = useRef<(HTMLElement | null)[]>([])

  const select = (index: number) => {
    setSelected(index)
    tabs.current[index]?.focus()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const target: Record<string, number> = {
      ArrowRight: (selected + 1) % count,
      ArrowDown: (selected + 1) % count,
      ArrowLeft: (selected - 1 + count) % count,
      ArrowUp: (selected - 1 + count) % count,
      Home: 0,
      End: count - 1,
    }
    const next = target[event.key]
    if (next === undefined) return
    event.preventDefault()
    select(next)
  }

  return {
    selected,
    tabProps: index => ({
      role: 'tab',
      id: `${baseId}-tab-${index}`,
      'aria-selected': index === selected,
      'aria-controls': `${baseId}-panel-${index}`,
      tabIndex: index === selected ? 0 : -1,
      onClick: () => setSelected(index),
      onKeyDown,
      ref: node => {
        tabs.current[index] = node
      },
    }),
    panelProps: index => ({
      role: 'tabpanel',
      id: `${baseId}-panel-${index}`,
      'aria-labelledby': `${baseId}-tab-${index}`,
      hidden: index !== selected,
    }),
  }
}
