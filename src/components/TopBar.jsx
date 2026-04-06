import '../styles/TopBar.css'

export default function TopBar({ user, onLogout }) {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <h1 className="brand">⚜ Smokey Barbers</h1>
        <span className="subtitle">Owner Brain</span>
      </div>

      <div className="topbar-right">
        <span className="user-label">Owner</span>
        <button onClick={onLogout} className="logout-btn">Logout</button>
      </div>
    </div>
  )
}
