import { useEffect, useState } from 'react'

// Example Codespaces endpoint:
// https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts
function normalizeResponse(payload, key) {
  if (Array.isArray(payload)) return payload
  if (payload?.[key]) return payload[key]
  return Object.values(payload).find(Array.isArray) || []
}

function Workouts({ apiBase }) {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch(`${apiBase}/workouts/`)
      .then((res) => res.json())
      .then((payload) => {
        setWorkouts(normalizeResponse(payload, 'workouts'))
      })
      .catch((err) => setError(err.message || 'Failed to load workouts'))
      .finally(() => setLoading(false))
  }, [apiBase])

  return (
    <section>
      <h2>Workouts</h2>
      {loading && <p>Loading workouts...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Duration</th>
                <th>Level</th>
                <th>Focus</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout.id || workout._id}>
                  <td>{workout.id}</td>
                  <td>{workout.title}</td>
                  <td>{workout.durationMinutes} min</td>
                  <td>{workout.level}</td>
                  <td>{workout.focus}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {workouts.length === 0 && <p>No workouts found.</p>}
        </div>
      )}
    </section>
  )
}

export default Workouts
