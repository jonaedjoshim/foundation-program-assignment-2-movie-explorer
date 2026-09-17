import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import MovieCard from '../components/MovieCard.jsx'
import MovieModal from '../components/MovieModal.jsx'
import { getTopRatedShows } from '../lib/tvmaze.js'

export default function TopRated() {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedId, setSelectedId] = useState(null)

    useEffect(() => {
        setLoading(true)
        getTopRatedShows(30, 2)
            .then((shows) => setMovies(shows))
            .catch(() => setError('Could not load top rated shows right now.'))
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className="flex min-h-screen flex-col bg-base-100 text-base-content">
            <Navbar />

            <section className="border-b border-base-300/70 bg-base-200/40">
                <div className="mx-auto max-w-6xl px-5 py-10">
                    <span className="rounded-sm border border-primary/40 px-3 py-1 text-xs tracking-widest text-primary">
                        RANKED BY RATING
                    </span>
                    <h1 className="mt-3 font-display text-4xl tracking-wide sm:text-5xl">TOP RATED</h1>
                    <p className="mt-2 max-w-xl text-base-content/60">
                        The highest-rated titles currently in the TVMaze catalogue, ranked highest first.
                    </p>
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

                {!error && !loading && (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {movies.map((movie, index) => (
                            <div key={movie.id} className="relative">
                                <span className="absolute -left-1 -top-1 z-10 flex h-7 w-7 items-center justify-center rounded-sm bg-primary font-display text-sm text-primary-content">
                                    {index + 1}
                                </span>
                                <MovieCard movie={movie} onSelect={(m) => setSelectedId(m.id)} />
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <Footer />

            {selectedId && (
                <MovieModal movieId={selectedId} onClose={() => setSelectedId(null)} />
            )}
        </div>
    )
}