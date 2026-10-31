import { useState, useEffect } from 'react'
import { fetchCoaches } from './api'
import CoachCard from './components/CoachCard'
import CoachModal from './components/CoachModal'
import './App.css'

export default function App() {
  const [coaches, setCoaches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [selectedCoach, setSelectedCoach] = useState(null)
  const [breakUrl, setBreakUrl] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const q = params.get('q')
    const sort = params.get('sort')
    if (q) {
      setSearch(q)
      setDebouncedSearch(q)
    }
    if (sort) {
      setSortBy(sort)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  useEffect(() => {
    const params = new URLSearchParams()
    if (debouncedSearch) {
      params.set('q', debouncedSearch)
    }
    if (sortBy !== 'name') {
      params.set('sort', sortBy)
    }
    const queryString = params.toString() ? '?' + params.toString() : window.location.pathname
    window.history.replaceState(null, '', queryString)
  }, [debouncedSearch, sortBy])

  function loadCoaches() {
    setLoading(true)
    setError(null)

    fetchCoaches(breakUrl)
      .then((data) => {
        setCoaches(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }

  useEffect(() => {
    loadCoaches()
  }, [breakUrl])

  const filtered = coaches.filter((coach) =>
    coach.name.toLowerCase().includes(debouncedSearch.toLowerCase().trim())
  )

  const sortedCoaches = [...filtered].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    if (sortBy === 'city') return a.address.city.localeCompare(b.address.city)
    return 0
  })

  return (
    <div className="container">
      <div className="header">
        <div>
          <h1>Coach Directory</h1>
          <p>Find and connect with personal coaches</p>
        </div>
        <button
          className={`break-btn ${breakUrl ? 'broken' : ''}`}
          onClick={() => setBreakUrl(!breakUrl)}
        >
          {breakUrl ? 'Fix API URL' : 'Break URL (Test Error)'}
        </button>
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="name">Sort by Name</option>
          <option value="city">Sort by City</option>
        </select>
      </div>

      {loading && <p className="status-text">Loading coaches...</p>}

      {!loading && error && (
        <div className="error-box">
          <p>Error: {error}</p>
          <button onClick={loadCoaches}>Try Again</button>
        </div>
      )}

      {!loading && !error && sortedCoaches.length === 0 && (
        <p className="status-text">No coaches found matching "{debouncedSearch}"</p>
      )}

      {!loading && !error && sortedCoaches.length > 0 && (
        <div className="coach-grid">
          {sortedCoaches.map((coach) => (
            <CoachCard key={coach.id} coach={coach} onSelect={setSelectedCoach} />
          ))}
        </div>
      )}

      {selectedCoach && (
        <CoachModal coach={selectedCoach} onClose={() => setSelectedCoach(null)} />
      )}
    </div>
  )
}
