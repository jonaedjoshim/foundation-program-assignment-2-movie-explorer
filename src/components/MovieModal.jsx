import { useEffect, useState } from 'react'
import { getShowById } from '../lib/tvmaze.js'

export default function MovieModal({ movieId, onClose }) {
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    setLoading(true)
    setError(null)
    getShowById(movieId)
      .then((data) => {
        if (active) setMovie(data)
      })
      .catch(() => {
        if (active) setError('Could not load details for this title.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [movieId])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-sm border border-base-300 bg-base-200 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="btn btn-circle btn-sm absolute right-3 top-3 z-10 bg-base-100/80 hover:bg-error hover:text-white"
        >
          ✕
        </button>

        {loading && (
          <div className="flex h-96 items-center justify-center">
            <span className="loading loading-ring loading-lg text-primary" />
          </div>
        )}

        {error && (
          <div className="flex h-96 flex-col items-center justify-center gap-2 text-base-content/70">
            <span>{error}</span>
            <span className="text-sm text-base-content/40">Close this window and try again.</span>
          </div>
        )}

        {!loading && !error && movie && (
          <div className="overflow-y-auto">
            <div className="relative h-56 w-full bg-base-300 sm:h-72">
              {movie.poster ? (
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-5xl">🎬</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-base-200 via-transparent to-transparent" />
            </div>

            <div className="flex flex-col gap-4 p-6">
              <div>
                <h2 className="font-display text-3xl tracking-wide text-base-content sm:text-4xl">
                  {movie.title}
                </h2>
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-base-content/70">
                  {movie.rating && (
                    <span className="font-semibold text-primary">★ {movie.rating}</span>
                  )}
                  <span>{movie.premiered || 'Release date TBA'}</span>
                  {movie.runtime && <span>{movie.runtime} min</span>}
                  <span className="badge badge-outline badge-sm">{movie.status}</span>
                </div>
              </div>

              {movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((g) => (
                    <span
                      key={g}
                      className="rounded-sm bg-base-300 px-2 py-1 text-xs text-base-content/70"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              )}

              <div>
                <h3 className="mb-1 text-xs uppercase tracking-widest text-base-content/40">
                  Overview
                </h3>
                <p className="leading-relaxed text-base-content/80">{movie.summary}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm text-base-content/70 sm:grid-cols-3">
                <div>
                  <div className="text-xs uppercase tracking-widest text-base-content/40">Network</div>
                  <div>{movie.network}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-base-content/40">Language</div>
                  <div>{movie.language || 'Unknown'}</div>
                </div>
                {movie.officialSite && (
                  <div>
                    <div className="text-xs uppercase tracking-widest text-base-content/40">Official Site</div>
                    <a
                      href={movie.officialSite}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary hover:underline"
                    >
                      Visit
                    </a>
                  </div>
                )}
              </div>

              {movie.cast.length > 0 && (
                <div>
                  <h3 className="mb-2 text-xs uppercase tracking-widest text-base-content/40">
                    Cast
                  </h3>
                  <div className="reel-scroll flex gap-3 overflow-x-auto pb-2">
                    {movie.cast.map((c) => (
                      <div key={c.id} className="flex w-20 shrink-0 flex-col items-center text-center">
                        <div className="h-20 w-20 overflow-hidden rounded-full border border-base-300 bg-base-300">
                          {c.image ? (
                            <img src={c.image} alt={c.name} className="h-full w-full object-cover" />
                          ) : (
                            <div className="flex h-full items-center justify-center text-lg">🎭</div>
                          )}
                        </div>
                        <span className="mt-1 line-clamp-1 text-xs text-base-content/80">{c.name}</span>
                        <span className="line-clamp-1 text-[10px] text-base-content/40">{c.character}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={onClose}
                className="btn btn-outline btn-error btn-sm mt-2 self-start rounded-sm"
              >
                ✕ Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
