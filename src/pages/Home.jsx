import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { getShows } from '../lib/tvmaze.js'

export default function Home() {
  const [trending, setTrending] = useState([])

  useEffect(() => {
    getShows(0)
      .then((shows) => {
        const sorted = [...shows]
          .filter((s) => s.rating)
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 10)
        setTrending(sorted)
      })
      .catch(() => setTrending([]))
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-base-100 text-base-content">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-base-300/70">
        <div className="pointer-events-none absolute inset-0 sprocket-rail opacity-[0.06]" />
        <div className="pointer-events-none absolute -right-24 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-24 sm:py-32">
          <span className="rounded-sm border border-primary/40 px-3 py-1 text-xs tracking-widest text-primary">
            NOW SHOWING · WORLDWIDE
          </span>
          <h1 className="font-display marquee-glow text-6xl leading-[0.95] text-base-content sm:text-8xl">
            DISCOVER
            <br />
            <span className="text-primary">MOVIES</span>
          </h1>
          <p className="max-w-md text-base leading-relaxed text-base-content/70">
            Explore and discover your favorite movies and shows from around
            the world — search by title, browse ratings, and dig into the
            details before you press play.
          </p>
          <Link
            to="/movies"
            className="btn btn-primary rounded-sm px-8 font-semibold tracking-wide"
          >
            Explore Now
          </Link>
        </div>
      </section>

      {/* Trending strip */}
      <section className="mx-auto w-full max-w-6xl px-5 py-14">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="font-display text-3xl tracking-wide">TOP RATED THIS WEEK</h2>
          <Link to="/movies" className="text-sm text-primary hover:underline">
            See all &rarr;
          </Link>
        </div>

        {trending.length === 0 ? (
          <div className="flex gap-4 overflow-x-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 w-40 shrink-0 animate-pulse rounded-sm bg-base-200" />
            ))}
          </div>
        ) : (
          <div className="reel-scroll flex gap-4 overflow-x-auto pb-4">
            {trending.map((m) => (
              <Link
                key={m.id}
                to="/movies"
                className="group w-40 shrink-0 overflow-hidden rounded-sm border border-base-300 bg-base-200 transition-transform hover:-translate-y-1 hover:border-primary/60"
              >
                <div className="relative aspect-[2/3] w-full overflow-hidden bg-base-300">
                  {m.poster ? (
                    <img
                      src={m.poster}
                      alt={m.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-2xl">🎬</div>
                  )}
                  <span className="absolute right-1.5 top-1.5 rounded-sm bg-base-100/90 px-1.5 py-0.5 text-[11px] font-semibold text-primary">
                    ★ {m.rating}
                  </span>
                </div>
                <div className="p-2">
                  <p className="line-clamp-1 text-sm font-medium">{m.title}</p>
                  <p className="text-xs text-base-content/50">{m.year}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Feature strip */}
      <section className="border-y border-base-300/70 bg-base-200/40">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 py-14 sm:grid-cols-3">
          <Feature
            icon="🔍"
            title="Search by title"
            text="Type a name and the grid updates instantly, powered by the TVMaze catalogue."
          />
          <Feature
            icon="⭐"
            title="Ratings at a glance"
            text="Every card shows a rating and release year so you can decide fast."
          />
          <Feature
            icon="🎬"
            title="Full details"
            text="Open a title to see its overview, genres, network, and cast in one view."
          />
        </div>
      </section>

      <Footer />
    </div>
  )
}

function Feature({ icon, title, text }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-2xl">{icon}</span>
      <h3 className="font-semibold text-base-content">{title}</h3>
      <p className="text-sm leading-relaxed text-base-content/60">{text}</p>
    </div>
  )
}
