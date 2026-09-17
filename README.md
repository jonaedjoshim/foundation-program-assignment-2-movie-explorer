# 🎬 MovieExplorer

A responsive movie/show explorer built with **React**, **Tailwind CSS**, and **daisyUI**, powered by the free [TVMaze API](https://www.tvmaze.com/api) (no API key required).

Live demo: _add your Vercel/Netlify link here_

## Features

- **Home page** — navbar, cinematic hero banner with a CTA, "Top rated this week" strip, feature highlights, and footer.
- **Browse page** — live search-as-you-type (debounced) against TVMaze's `/search/shows` endpoint, falling back to the full `/shows` catalogue when the search box is empty.
- **Movie cards** — poster, title, release year, rating badge, network, and a "See Details" button.
- **Details modal** — backdrop image, title, rating, release date, genres, overview, network/language, and cast, closable via the ✕ button, `Esc`, or clicking outside.
- Fully responsive: single column on mobile, 3–5 column grid on larger screens.

## Tech stack

- React 19 + Vite
- React Router
- Tailwind CSS v4 + daisyUI v5 (custom "cinema" theme)
- TVMaze REST API

## Getting started

```bash
npm install
npm run dev       # start local dev server
npm run build      # production build to /dist
npm run preview    # preview the production build
```

## API endpoints used

| Purpose            | Endpoint                                  |
| ------------------ | ------------------------------------------ |
| Search by title     | `GET https://api.tvmaze.com/search/shows?q=:query` |
| Full catalogue      | `GET https://api.tvmaze.com/shows?page=:page`       |
| Single show details | `GET https://api.tvmaze.com/shows/:id?embed=cast`   |

## Project structure

```
src/
  components/   Navbar, Footer, MovieCard, MovieModal
  pages/        Home, Movies
  lib/          tvmaze.js — API + data-normalization helpers
  index.css     Tailwind + daisyUI theme tokens
```

## Deployment

This is a standard Vite app — deploy the `dist/` folder (after `npm run build`) to **Vercel**, **Netlify**, or **GitHub Pages**. On Vercel/Netlify, set the build command to `npm run build` and the output directory to `dist`.
