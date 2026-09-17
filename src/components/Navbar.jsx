import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const { pathname } = useLocation()

  const linkClass = (path) =>
    `text-sm tracking-wide transition-colors hover:text-primary ${pathname === path ? 'text-primary' : 'text-base-content/70'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-base-300/70 bg-base-100/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-sm border-2 border-primary text-primary">
            ▶
          </span>
          <span className="font-display text-2xl leading-none text-base-content">
            MOVIE<span className="text-primary">EXPLORER</span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 sm:flex">
          <Link to="/" className={linkClass('/')}>Home</Link>
          <Link to="/movies" className={linkClass('/movies')}>Browse</Link>
          <Link to="/top-rated" className={linkClass('/top-rated')}>Top Rated</Link>
        </div>

        <Link
          to="/movies"
          className="btn btn-primary btn-sm rounded-sm font-semibold tracking-wide"
        >
          Explore Now
        </Link>
      </nav>
    </header>
  )
}
