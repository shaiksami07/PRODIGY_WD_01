import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await login(form);
      loginUser(res.data.token, res.data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p className="auth-subtitle">Sign in to your account</p>

        {error && <div className="alert alert-error">⚠️ {error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="john@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>

        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          borderRadius: '8px',
          border: '1px dashed var(--primary-light)',
          background: '#f5f3ff',
          fontSize: '0.85rem',
          color: '#4338ca',
          textAlign: 'left'
        }}>
          <p style={{ fontWeight: 'bold', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '4px' }}>🛡️ Demo Admin Account:</p>
          <p style={{ margin: '0.2rem 0' }}><strong>Email:</strong> <code>admin@example.com</code></p>
          <p style={{ margin: '0.2rem 0' }}><strong>Password:</strong> <code>admin123</code></p>
          <button 
            type="button" 
            className="btn btn-outline btn-sm" 
            style={{ width: '100%', marginTop: '0.75rem', padding: '0.35rem 0.5rem', fontSize: '0.8rem' }}
            onClick={() => setForm({ email: 'admin@example.com', password: 'admin123' })}
          >
            Autofill Admin Credentials
          </button>
        </div>
      </div>
    </div>
  );
}
