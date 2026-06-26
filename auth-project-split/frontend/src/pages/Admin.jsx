import { useEffect, useState } from 'react';
import { getAdminData, createUser, updateUserRole, deleteUser } from '../api';
import { useAuth } from '../context/AuthContext';

export default function Admin() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Search & Filter State
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  // Create User Form State
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  // Fetch users function
  const fetchUsers = () => {
    setLoading(true);
    getAdminData()
      .then((res) => {
        setUsers(res.data.users);
        setError('');
      })
      .catch((err) => {
        setError(err.response?.data?.message || 'Failed to load users.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleToggle = async (userToUpdate) => {
    const newRole = userToUpdate.role === 'admin' ? 'user' : 'admin';
    
    // Safety check in frontend
    if (userToUpdate._id === currentUser?._id) {
      setError('You cannot demote yourself.');
      return;
    }

    if (!window.confirm(`Are you sure you want to change ${userToUpdate.name}'s role to ${newRole.toUpperCase()}?`)) {
      return;
    }

    try {
      await updateUserRole(userToUpdate._id, newRole);
      setSuccess(`Successfully updated ${userToUpdate.name}'s role to ${newRole.toUpperCase()}.`);
      // Update local state
      setUsers(users.map(u => u._id === userToUpdate._id ? { ...u, role: newRole } : u));
      setTimeout(() => setSuccess(''), 4000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update user role.');
      setTimeout(() => setError(''), 4000);
    }
  };

  const handleDeleteUser = async (userToDelete) => {
    // Safety check in frontend
    if (userToDelete._id === currentUser?._id) {
      setError('You cannot delete your own account.');
      return;
    }

    if (!window.confirm(`⚠️ WARNING: Are you sure you want to permanently delete the user "${userToDelete.name}" (${userToDelete.email})?`)) {
      return;
    }

    try {
      await deleteUser(userToDelete._id);
      setSuccess(`User "${userToDelete.name}" has been deleted.`);
      setUsers(users.filter(u => u._id !== userToDelete._id));
      setTimeout(() => setSuccess(''), 4000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete user.');
      setTimeout(() => setError(''), 4000);
    }
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateUserSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);

    try {
      const res = await createUser(form);
      setSuccess(`User "${res.data.user.name}" created successfully.`);
      // Add the new user to list
      setUsers([res.data.user, ...users]);
      // Reset form and close
      setForm({ name: '', email: '', password: '', role: 'user' });
      setShowCreateForm(false);
      setTimeout(() => setSuccess(''), 4000);
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to create user.');
    } finally {
      setFormLoading(false);
    }
  };

  // Filter & Search Logic
  const filteredUsers = users.filter((u) => {
    const nameMatch = u.name ? u.name.toLowerCase().includes(search.toLowerCase()) : false;
    const emailMatch = u.email ? u.email.toLowerCase().includes(search.toLowerCase()) : false;
    const matchesSearch = nameMatch || emailMatch;
    
    const matchesRole = roleFilter === 'all' ? true : u.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  const adminsCount = users.filter((u) => u.role === 'admin').length;
  const regularUsersCount = users.length - adminsCount;

  return (
    <div className="dashboard">
      <div className="admin-header-row">
        <div className="dashboard-header" style={{ marginBottom: 0 }}>
          <h1>🛡️ Admin Dashboard</h1>
          <span className="role-badge role-admin">SYSTEM CONTROLLER</span>
        </div>
        <button 
          onClick={() => setShowCreateForm(!showCreateForm)} 
          className={`btn ${showCreateForm ? 'btn-danger' : 'btn-primary'}`}
        >
          {showCreateForm ? 'Cancel Creation' : '➕ Create New User'}
        </button>
      </div>

      {/* Global Alerts */}
      {success && <div className="alert alert-success">✅ {success}</div>}
      {error && <div className="alert alert-error">⚠️ {error}</div>}

      {/* Expandable Creation Form */}
      {showCreateForm && (
        <div className="card create-form-card">
          <h3>👤 Create User Account</h3>
          <p className="auth-subtitle">Add a new user directly to the system</p>
          
          {formError && <div className="alert alert-error" style={{ padding: '0.6rem 1rem' }}>⚠️ {formError}</div>}
          
          <form onSubmit={handleCreateUserSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="form-name">Full Name</label>
                <input 
                  type="text" 
                  id="form-name" 
                  name="name" 
                  placeholder="e.g. Jane Smith" 
                  value={form.name} 
                  onChange={handleFormChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="form-email">Email Address</label>
                <input 
                  type="email" 
                  id="form-email" 
                  name="email" 
                  placeholder="jane@example.com" 
                  value={form.email} 
                  onChange={handleFormChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="form-password">Password</label>
                <input 
                  type="password" 
                  id="form-password" 
                  name="password" 
                  placeholder="Min 6 characters" 
                  value={form.password} 
                  onChange={handleFormChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="form-role">Account Role</label>
                <select 
                  id="form-role" 
                  name="role" 
                  value={form.role} 
                  onChange={handleFormChange}
                >
                  <option value="user">User (Standard)</option>
                  <option value="admin">Admin (Full Access)</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', justifyContent: 'flex-end' }}>
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => setShowCreateForm(false)}
                disabled={formLoading}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={formLoading}
              >
                {formLoading ? 'Creating User...' : 'Add Account'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Admin Stats cards */}
      <div className="admin-stats">
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #312e81 100%)' }}>
          <h2>{users.length}</h2>
          <p>Total Registered Users</p>
        </div>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0c4a6e 100%)' }}>
          <h2>{adminsCount}</h2>
          <p>Administrators</p>
        </div>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #10b981 0%, #064e3b 100%)' }}>
          <h2>{regularUsersCount}</h2>
          <p>Standard Accounts</p>
        </div>
      </div>

      {/* Users List & Controls */}
      <div className="card" style={{ marginTop: '2rem' }}>
        <div className="admin-header-row" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
          <h3 style={{ margin: 0 }}>📋 User Management Index</h3>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Showing {filteredUsers.length} of {users.length} entries
          </span>
        </div>

        {/* Filters and Search Bar */}
        <div className="admin-controls">
          <div className="control-group" style={{ flex: 2 }}>
            <label htmlFor="search-user">🔍 Search name or email</label>
            <input 
              type="text" 
              id="search-user" 
              placeholder="Search user profile..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
            />
          </div>
          <div className="control-group">
            <label htmlFor="filter-role">Filter Role</label>
            <select 
              id="filter-role" 
              value={roleFilter} 
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="admin">Admins Only</option>
              <option value="user">Standard Users Only</option>
            </select>
          </div>
        </div>

        {loading && <p className="loading">Fetching profiles from security server...</p>}
        {!loading && (
          <div className="table-wrapper">
            {filteredUsers.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">🔍</div>
                <h4>No users found</h4>
                <p>Try adjusting your search query or role filter.</p>
              </div>
            ) : (
              <table className="users-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email Address</th>
                    <th>Role</th>
                    <th>Registration Date</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u, i) => {
                    const isSelf = u._id === currentUser?._id;
                    return (
                      <tr key={u._id} style={isSelf ? { backgroundColor: '#f5f3ff' } : {}}>
                        <td>{i + 1}</td>
                        <td>
                          <strong>{u.name}</strong> {isSelf && <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontStyle: 'italic' }}>(You)</span>}
                        </td>
                        <td>{u.email}</td>
                        <td>
                          <span className={`role-badge role-${u.role}`}>{u.role}</span>
                        </td>
                        <td>
                          {u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                        </td>
                        <td>
                          <div className="table-actions" style={{ justifyContent: 'flex-end' }}>
                            <button
                              onClick={() => handleRoleToggle(u)}
                              className="table-btn table-btn-secondary"
                              disabled={isSelf}
                              title={isSelf ? "You cannot modify your own role" : `Change role to ${u.role === 'admin' ? 'user' : 'admin'}`}
                            >
                              🔄 {u.role === 'admin' ? 'Demote' : 'Promote'}
                            </button>
                            <button
                              onClick={() => handleDeleteUser(u)}
                              className="table-btn table-btn-danger"
                              disabled={isSelf}
                              title={isSelf ? "You cannot delete your own account" : "Delete user account"}
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
