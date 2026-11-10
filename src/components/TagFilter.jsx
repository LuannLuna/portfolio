export default function TagFilter({
  tags,
  active,
  onChange,
  allLabel = 'All',
  counts = {},
  label = 'Filter',
}) {
  if (!tags || tags.length === 0) return null

  return (
    <div className="mb-10 flex flex-wrap items-baseline gap-x-6 gap-y-3 border-b border-rule pb-3">
      <span className="meta">{label}</span>

      <FilterButton selected={!active} onClick={() => onChange(null)}>
        {allLabel}
        {counts.all != null && <sup className="ml-1 align-super text-[8px]">{counts.all}</sup>}
      </FilterButton>

      {tags.map((tag) => (
        <FilterButton
          key={tag}
          selected={active === tag}
          onClick={() => onChange(tag === active ? null : tag)}>
          {tag}
          {counts[tag] != null && <sup className="ml-1 align-super text-[8px]">{counts[tag]}</sup>}
        </FilterButton>
      ))}
    </div>
  )
}

function FilterButton({ selected, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={
        'inline-flex min-h-[44px] items-center font-mono text-[10px] uppercase tracking-[0.16em] transition-colors duration-200 ' +
        (selected ? 'text-signal' : 'text-muted hover:text-ink')
      }>
      {children}
    </button>
  )
}
