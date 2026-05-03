import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import '../styles/Auth.css'

function AddListing() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    skills: '',
    contact: {
      email: '',
      whatsapp: '',
      discord: ''
    }
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleContactChange = (e) => {
    setForm({
      ...form,
      contact: { ...form.contact, [e.target.name]: e.target.value }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const skills = form.skills.split(',').map((s) => s.trim())
      await api.post('/api/listings', { ...form, skills })
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <div className="auth">
      <span className="auth-badge">✦ Share a Skill</span>
      <h1>Add a Listing</h1>
      <p className="subtitle">Share a skill with your community</p>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="e.g. Guitar Lessons"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Describe what you teach..."
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="Music">Music</option>
            <option value="Tech">Tech</option>
            <option value="Cooking">Cooking</option>
            <option value="Fitness">Fitness</option>
            <option value="Art">Art</option>
            <option value="Language">Language</option>
          </select>
        </div>
        <div className="input-group">
          <label>Skills</label>
          <input
            type="text"
            name="skills"
            placeholder="e.g. Guitar, Music Theory"
            value={form.skills}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-divider">
          <span>Contact Info (optional)</span>
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            value={form.contact.email}
            onChange={handleContactChange}
          />
        </div>
        <div className="input-group">
          <label>WhatsApp number</label>
          <input
            type="text"
            name="whatsapp"
            placeholder="+254712345678"
            value={form.contact.whatsapp}
            onChange={handleContactChange}
          />
        </div>
        <div className="input-group">
          <label>Discord username</label>
          <input
            type="text"
            name="discord"
            placeholder="username#1234"
            value={form.contact.discord}
            onChange={handleContactChange}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Listing →'}
        </button>
      </form>
    </div>
  )
}

export default AddListing