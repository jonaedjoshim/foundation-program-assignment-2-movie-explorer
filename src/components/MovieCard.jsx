export default function MovieCard({ movie, onSelect }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-sm border border-base-300 bg-base-200 transition-transform hover:-translate-y-1 hover:border-primary/60">
      <button
        onClick={() => onSelect(movie)}
        className="relative aspect-2/3 w-full overflow-hidden bg-base-300 text-left"
      >
        {movie.poster ? (
          <img
            src={movie.poster}
            alt={movie.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-base-content/40">
            <span className="text-3xl">🎬</span>
            <span className="px-3 text-center text-xs">No poster available</span>
          </div>
        )}
        {movie.rating && (
          <span className="absolute right-2 top-2 flex items-center gap-1 rounded-sm bg-base-100/90 px-2 py-1 text-xs font-semibold text-primary">
            ★ {movie.rating}
          </span>
        )}
      </button>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3 className="line-clamp-1 font-semibold text-base-content" title={movie.title}>
          {movie.title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-base-content/60">
          <span>{movie.year}</span>
          <span className="h-1 w-1 rounded-full bg-base-content/30" />
          <span className="line-clamp-1">{movie.network}</span>
        </div>
        <button
          onClick={() => onSelect(movie)}
          className="btn btn-outline btn-primary btn-xs mt-auto rounded-sm self-start"
        >
          See Details
        </button>
      </div>
    </div>
  )
}
