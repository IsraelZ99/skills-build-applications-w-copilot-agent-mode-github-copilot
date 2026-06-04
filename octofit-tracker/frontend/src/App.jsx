import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiBase = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="navbar">
          <h1>OctoFit Tracker</h1>
          <p className="subtitle">
            API base URL: <strong>{apiBase}</strong>
          </p>
          <nav>
            <NavLink to="/users">Users</NavLink>
            <NavLink to="/teams">Teams</NavLink>
            <NavLink to="/activities">Activities</NavLink>
            <NavLink to="/leaderboard">Leaderboard</NavLink>
            <NavLink to="/workouts">Workouts</NavLink>
          </nav>
        </header>

        <main>
          <section className="warning">
            <p>
              Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to enable Codespaces preview API URLs.
              When unset, the app falls back to <code>http://localhost:8000/api</code>.
            </p>
          </section>

          <Routes>
            <Route path="/users" element={<Users apiBase={apiBase} />} />
            <Route path="/teams" element={<Teams apiBase={apiBase} />} />
            <Route path="/activities" element={<Activities apiBase={apiBase} />} />
            <Route path="/leaderboard" element={<Leaderboard apiBase={apiBase} />} />
            <Route path="/workouts" element={<Workouts apiBase={apiBase} />} />
            <Route
              path="/"
              element={
                <div className="home-panel">
                  <h2>Welcome to OctoFit Tracker</h2>
                  <p>Use the navigation above to view users, teams, activities, leaderboard, and workouts.</p>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
