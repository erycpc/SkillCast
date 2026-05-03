import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'


function AddListing() {
    const [form, setForm] = useState({
        title: '',
        description: '',
        category: '',
        skills: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
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
            <h1>Add a Listing</h1>
            <p className="subtitle">Share a skill with your community</p>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
        <input
            type="text"
            name="title"
            placeholder="Title e.g. Guitar Lessons"
            value={form.title}
            onChange={handleChange}
            required
        />
        <textarea
            name="description"
            placeholder="Describe what you teach..."
            value={form.description}
            onChange={handleChange}
            required
        />
        <select name="category" value={form.category} onChange={handleChange} required>
            <option value="">Select a category</option>
            <option value="Music">Music</option>
            <option value="Tech">Tech</option>
            <option value="Cooking">Cooking</option>
            <option value="Fitness">Fitness</option>
            <option value="Art">Art</option>
            <option value="Language">Language</option>
        </select>
        <input
            type="text"
            name="skills"
            placeholder="Skills e.g. Guitar, Music Theory"
            value={form.skills}
            onChange={handleChange}
            required
        />
        <button type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Listing'}
        </button>
        </form>
    </div>
    )
    }

    export default AddListing