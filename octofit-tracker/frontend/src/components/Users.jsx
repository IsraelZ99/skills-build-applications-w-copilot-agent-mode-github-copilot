import { useEffect, useState } from 'react'

// Example Codespaces endpoint:
// https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users
function normalizeResponse(payload, key) {
  if (Array.isArray(payload)) return payload
  if (payload?.[key]) return payload[key]
  return Object.values(payload).find(Array.isArray) || []
}

function Users({ apiBase }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch(`${apiBase}/users/`)
      .then((res) => res.json())
      .then((payload) => {
        setUsers(normalizeResponse(payload, 'users'))
      })
      .catch((err) => setError(err.message || 'Failed to load users'))
      .finally(() => setLoading(false))
  }, [apiBase])

  return (
    <section>
      <h2>Users</h2>
      {loading && <p>Loading users...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id || user._id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>{user.email}</td>
                  <td>{user.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && <p>No users found.</p>}
        </div>
      )}
    </section>
  )
}

export default Users
