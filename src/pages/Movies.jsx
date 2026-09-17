import { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import MovieCard from '../components/MovieCard.jsx'
import MovieModal from '../components/MovieModal.jsx'
import { getShows, searchShows } from '../lib/tvmaze.js'

export default function Movies() {
  const [allShows, setAllShows] = useState([])
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(null) 
  const [loading, setLoading] = useState(true)
  const [searching, setSearching] = useState(false)
  const [error, setError] = useState(null)
  const [selectedId, setSelectedId] = useState(null)

  useEffect(() => {
    setLoading(true)
    getShows(0)
      .then((shows) => setAllShows(shows))
      .catch(() => setError('Could not load shows right now. Please try again later.'))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const trimmed = query.trim()
    if (!trimmed) {
      setResults(null)
      setSearching(false)
      return
    }
    setSearching(true)
    const handle = setTimeout(() => {
      searchShows(trimmed)
        .then((shows) => setResults(shows))
        .catch(() => setError('Search failed. Please try again.'))
        .finally(() => setSearching(false))
    }, 350)
    return () => clearTimeout(handle)
  }, [query])

  const movies = useMemo(() => (results !== null ? results : allShows), [results, allShows])

  return (
    <div className="flex min-h-screen flex-col bg-base-100 text-base-content">
      <Navbar />

      <section className="border-b border-base-300/70 bg-base-200/40">
        <div className="mx-auto max-w-6xl px-5 py-10">
          <h1 className="font-display text-4xl tracking-wide sm:text-5xl">BROWSE THE CATALOGUE</h1>
          <p className="mt-2 max-w-xl text-base-content/60">
            Search for a specific title or scroll the full listing pulled live from TVMaze.
          </p>

          <div className="relative mt-6 max-w-xl">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40">
              🔍
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a movie..."
              className="input input-bordered w-full rounded-sm bg-base-100 pl-11 focus:border-primary focus:outline-none"
            />
            {searching && (
              <span className="loading loading-spinner loading-xs absolute right-4 top-1/2 -translate-y-1/2 text-primary" />
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl flex-1 px-5 py-10">
        {error && (
          <div className="rounded-sm border border-error/40 bg-error/10 p-4 text-error">
            {error}
          </div>
        )}

        {!error && loading && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="aspect-2/3 animate-pulse rounded-sm bg-base-200" />
            ))}
          </div>
        )}

        {!error && !loading && movies.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-20 text-center text-base-content/60">
            <span className="text-3xl">🎞️</span>
            <p>No titles found for &ldquo;{query}&rdquo;.</p>
            <p className="text-sm text-base-content/40">Try a different title or check the spelling.</p>
          </div>
        )}

        {!error && !loading && movies.length > 0 && (
          <>
            <p className="mb-4 text-sm text-base-content/50">
              {results !== null
                ? `${movies.length} result${movies.length === 1 ? '' : 's'} for "${query}"`
                : `Showing ${movies.length} titles`}
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onSelect={(m) => setSelectedId(m.id)} />
              ))}
            </div>
          </>
        )}
      </section>

      <Footer />

      {selectedId && (
        <MovieModal movieId={selectedId} onClose={() => setSelectedId(null)} />
      )}
    </div>
  )
}
