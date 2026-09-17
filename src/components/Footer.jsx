export default function Footer() {
  return (
    <footer className="border-t border-base-300/70 bg-base-200/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-base-content/60 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-sm border border-primary/60 text-xs text-primary">
            ▶
          </span>
          <span className="font-display text-lg text-base-content/80">
            MOVIE<span className="text-primary">EXPLORER</span>
          </span>
          <span>&copy; 2026 MovieExplorer</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Data via TVMaze API</span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
