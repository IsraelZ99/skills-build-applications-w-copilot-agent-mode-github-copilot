import { useEffect, useState } from 'react'

// Example Codespaces endpoint:
// https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard
function normalizeResponse(payload, key) {
  if (Array.isArray(payload)) return payload
  if (payload?.[key]) return payload[key]
  return Object.values(payload).find(Array.isArray) || []
}

function Leaderboard({ apiBase }) {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch(`${apiBase}/leaderboard/`)
      .then((res) => res.json())
      .then((payload) => {
        setEntries(normalizeResponse(payload, 'leaderboard'))
      })
      .catch((err) => setError(err.message || 'Failed to load leaderboard'))
      .finally(() => setLoading(false))
  }, [apiBase])

  return (
    <section>
      <h2>Leaderboard</h2>
      {loading && <p>Loading leaderboard...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Score</th>
                <th>Total Activities</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.userId || entry._id || entry.rank}>
                  <td>{entry.rank}</td>
                  <td>{entry.userName}</td>
                  <td>{entry.score}</td>
                  <td>{entry.totalActivities}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {entries.length === 0 && <p>No leaderboard entries found.</p>}
        </div>
      )}
    </section>
  )
}

export default Leaderboard
