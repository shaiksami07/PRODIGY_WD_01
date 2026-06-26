import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user, logoutUser } = useAuth();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>👋 Welcome, {user?.name}!</h1>
        <span className={`role-badge role-${user?.role}`}>{user?.role?.toUpperCase()}</span>
      </div>

      <div className="cards-grid">
        <div className="card">
          <div className="card-icon">👤</div>
          <h3>Profile Info</h3>
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Role:</strong> {user?.role}</p>
          <p>
            <strong>Joined:</strong>{' '}
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
              : '—'}
          </p>
        </div>

        <div className="card">
          <div className="card-icon">🔒</div>
          <h3>Security</h3>
          <p>Your password is securely hashed using <strong>bcrypt</strong> with 12 salt rounds.</p>
          <p>Authentication uses <strong>JWT tokens</strong> with a 14-day expiry.</p>
        </div>

        <div className="card">
          <div className="card-icon">🛡️</div>
          <h3>Access Level</h3>
          <p>You have <strong>{user?.role}</strong> level access.</p>
          {user?.role === 'admin' ? (
            <Link to="/admin" className="btn btn-primary" style={{ marginTop: 10, display: 'inline-block' }}>
              Go to Admin Panel →
            </Link>
          ) : (
            <p>Contact an admin to upgrade your role.</p>
          )}
        </div>

        <div className="card">
          <div className="card-icon">📊</div>
          <h3>Session Info</h3>
          <p>You are currently <strong>logged in</strong>.</p>
          <p>Your JWT token is stored securely in localStorage.</p>
          <button onClick={logoutUser} className="btn btn-danger" style={{ marginTop: 10 }}>
            Logout Securely
          </button>
        </div>
      </div>
    </div>
  );
}
