import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-base-300/70 bg-base-200/60">
      <div className="mx-auto flex justify-between max-w-6xl gap-8 px-5 py-10 sm:grid-cols-3">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-sm border border-primary/60 text-xs text-primary">
              ▶
            </span>
            <span className="font-display text-lg text-base-content/80">
              MOVIE<span className="text-primary">EXPLORER</span>
            </span>
          </div>
          <p className="max-w-xs text-sm text-base-content/50">
            Browse, search, and dig into shows from around the world.
          </p>
        </div>

        <div className="flex items-center flex-col gap-2 text-sm">
          <span className="text-xs uppercase tracking-widest text-base-content/40">Explore</span>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link to="/" className="text-base-content/60 hover:text-primary">Home</Link>
            <Link to="/movies" className="text-base-content/60 hover:text-primary">Browse</Link>
            <Link to="/top-rated" className="text-base-content/60 hover:text-primary">Top Rated</Link>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-sm sm:items-end sm:text-right">
          <span className="text-xs uppercase tracking-widest text-base-content/40">About</span>
          <span className="text-base-content/60">&copy; 2026 MovieExplorer</span>
        </div>
      </div>
    </footer>
  )
}
