export default function TagFilter({ tags, active, onChange, allLabel = 'All' }) {
  if (!tags || tags.length === 0) return null
  return (
    <div className="mb-8 flex flex-wrap gap-2">
      <Chip selected={!active} onClick={() => onChange(null)}>{allLabel}</Chip>
      {tags.map(tag => (
        <Chip
          key={tag}
          selected={active === tag}
          onClick={() => onChange(tag === active ? null : tag)}>
          {tag}
        </Chip>
      ))}
    </div>
  )
}

function Chip({ selected, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition ' +
        (selected
          ? 'border-accent-500 bg-accent-500/10 text-accent-700 dark:text-accent-200'
          : 'border-ink-200 dark:border-white/10 bg-ink-50 dark:bg-white/5 text-ink-700 dark:text-ink-200 hover:border-accent-300/70')
      }>
      {children}
    </button>
  )
}
