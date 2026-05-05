import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import '../styles/Settings.css'

function Settings() {
  const { user, login, logout } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
  })
  const [password, setPassword] = useState({
    newPassword: '',
    confirmPassword: ''
  })
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value })
  }

  // Update name and email
  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      const res = await api.put('/api/auth/update', form)
      console.log('Updated user:', res.data)
      login(res.data, localStorage.getItem('access_token'))
      setSuccess('Profile updated successfully')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  // Update password
  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    if (password.newPassword !== password.confirmPassword) {
      return setError('Passwords do not match')
    }
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      await api.put('/api/auth/update', { password: password.newPassword })
      setSuccess('Password updated successfully')
      setPassword({ newPassword: '', confirmPassword: '' })
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  // Delete account
  const handleDelete = async () => {
    if (!window.confirm('Are you sure? This cannot be undone.')) return
    try {
      await api.delete('/api/auth/delete')
      logout()
      navigate('/')
    } catch (err) {
      setError('Failed to delete account')
    }
  }

  return (
    <div className="settings">
      <h1>Settings</h1>
      <p className="settings-subtitle">Manage your account</p>

      {error && <p className="settings-error">{error}</p>}
      {success && <p className="settings-success">{success}</p>}

      {/* Profile Section */}
      <div className="settings-section">
        <h2>Profile</h2>
        <p className="settings-section-desc">Update your name and email</p>
        <form onSubmit={handleProfileSubmit}>
          <div className="input-group">
            <label>Full name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>

      {/* Password Section */}
      <div className="settings-section">
        <h2>Password</h2>
        <p className="settings-section-desc">Change your password</p>
        <form onSubmit={handlePasswordSubmit}>
          <div className="input-group">
            <label>New password</label>
            <input
              type="password"
              name="newPassword"
              placeholder="Min. 8 characters"
              value={password.newPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Confirm password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Repeat new password"
              value={password.confirmPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>

      {/* Danger Zone */}
      <div className="settings-section danger">
        <h2>Danger Zone</h2>
        <p className="settings-section-desc">
          Permanently delete your account and all your listings.
          This cannot be undone.
        </p>
        <button className="btn-danger" onClick={handleDelete}>
          Delete Account
        </button>
      </div>
    </div>
  )
}

export default Settings