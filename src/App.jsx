import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Movies from './pages/Movies.jsx'
import TopRated from './pages/TopRated.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/top-rated" element={<TopRated />} />
    </Routes>
  )
}
