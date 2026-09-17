const BASE = 'https://api.tvmaze.com'

/** Search shows by title. Returns an array of normalized show objects. */
export async function searchShows(query) {
  const res = await fetch(`${BASE}/search/shows?q=${encodeURIComponent(query)}`)
  if (!res.ok) throw new Error('Search request failed')
  const data = await res.json()
  return data.map((entry) => normalizeShow(entry.show))
}

/** Fetch a page of all shows (~250 per page). Page defaults to 0. */
export async function getShows(page = 0) {
  const res = await fetch(`${BASE}/shows?page=${page}`)
  if (!res.ok) throw new Error('Failed to load shows')
  const data = await res.json()
  return data.map(normalizeShow)
}

/** Fetch a single show with cast info. */
export async function getShowById(id) {
  const res = await fetch(`${BASE}/shows/${id}?embed=cast`)
  if (!res.ok) throw new Error('Failed to load show details')
  const data = await res.json()
  return normalizeShow(data, true)
}

function normalizeShow(show, withCast = false) {
  if (!show) return null
  return {
    id: show.id,
    title: show.name,
    poster: show.image?.original || show.image?.medium || null,
    year: show.premiered ? show.premiered.slice(0, 4) : 'TBA',
    premiered: show.premiered,
    rating: show.rating?.average ?? null,
    genres: show.genres || [],
    summary: stripHtml(show.summary),
    network: show.network?.name || show.webChannel?.name || 'Unknown',
    runtime: show.runtime || show.averageRuntime || null,
    status: show.status,
    language: show.language,
    officialSite: show.officialSite,
    cast: withCast
      ? (show._embedded?.cast || []).slice(0, 8).map((c) => ({
        id: c.person.id,
        name: c.person.name,
        character: c.character.name,
        image: c.person.image?.medium || null,
      }))
      : [],
  }
}

function stripHtml(html) {
  if (!html) return 'No overview available for this title yet.'
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

/** Fetch multiple pages and return the top-rated shows, sorted by rating desc. */
export async function getTopRatedShows(limit = 24, pages = 2) {
  const pageNumbers = Array.from({ length: pages }, (_, i) => i)
  const results = await Promise.all(pageNumbers.map((p) => getShows(p).catch(() => [])))
  const merged = results.flat()
  return merged
    .filter((show) => show.rating !== null)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit)
}