export default function Footer() {
  return (
    <footer className="border-t border-base-300/70 bg-base-200/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-5 py-8 text-sm text-base-content/60 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-sm border border-primary/60 text-xs text-primary">
            ▶
          </span>
          <span className="font-display text-lg text-base-content/80">
            MOVIE<span className="text-primary">EXPLORER</span>
          </span>
        </div>
        <span>&copy; 2026 MovieExplorer &mdash; data via TVMaze API</span>
      </div>
    </footer>
  )
}
