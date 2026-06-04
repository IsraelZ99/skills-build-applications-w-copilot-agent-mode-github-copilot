import { useEffect, useState } from 'react'

// Example Codespaces endpoint:
// https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities
function normalizeResponse(payload, key) {
  if (Array.isArray(payload)) return payload
  if (payload?.[key]) return payload[key]
  return Object.values(payload).find(Array.isArray) || []
}

function Activities({ apiBase }) {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch(`${apiBase}/activities/`)
      .then((res) => res.json())
      .then((payload) => {
        setActivities(normalizeResponse(payload, 'activities'))
      })
      .catch((err) => setError(err.message || 'Failed to load activities'))
      .finally(() => setLoading(false))
  }, [apiBase])

  return (
    <section>
      <h2>Activities</h2>
      {loading && <p>Loading activities...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Calories</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity.id || activity._id}>
                  <td>{activity.id}</td>
                  <td>{activity.userName || activity.user}</td>
                  <td>{activity.type}</td>
                  <td>{activity.duration} min</td>
                  <td>{activity.calories}</td>
                  <td>{activity.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {activities.length === 0 && <p>No activities found.</p>}
        </div>
      )}
    </section>
  )
}

export default Activities
