import { useEffect, useState } from 'react'

// Example Codespaces endpoint:
// https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams
function normalizeResponse(payload, key) {
  if (Array.isArray(payload)) return payload
  if (payload?.[key]) return payload[key]
  return Object.values(payload).find(Array.isArray) || []
}

function Teams({ apiBase }) {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch(`${apiBase}/teams/`)
      .then((res) => res.json())
      .then((payload) => {
        setTeams(normalizeResponse(payload, 'teams'))
      })
      .catch((err) => setError(err.message || 'Failed to load teams'))
      .finally(() => setLoading(false))
  }, [apiBase])

  return (
    <section>
      <h2>Teams</h2>
      {loading && <p>Loading teams...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Members</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team.id || team._id}>
                  <td>{team.id}</td>
                  <td>{team.name}</td>
                  <td>{team.members}</td>
                  <td>{team.createdAt || team.created}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {teams.length === 0 && <p>No teams found.</p>}
        </div>
      )}
    </section>
  )
}

export default Teams
