import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import ListingCard from '../components/ListingCard'
import '../styles/Dashboard.css'

function Dashboard() {
  const { user } = useAuth()
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/api/listings?owner=${user.id}`)
      .then((res) => {
        setListings(res.data)
        setLoading(false)
      })
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this listing?')) return
    try {
      await api.delete(`/api/listings/${id}`)
      setListings(listings.filter((l) => l._id !== id))
    } catch (err) {
      alert('Failed to delete listing')
    }
  }

  if (loading) return <p style={{ padding: '64px 24px', color: 'var(--text-muted)' }}>Loading...</p>

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>My Dashboard</h1>
      </div>
      <p className="dashboard-subtitle">
        {listings.length} listing{listings.length !== 1 ? 's' : ''} published
      </p>

      {listings.length === 0 && (
        <div className="dashboard-empty">
          <p>You haven't added any listings yet.</p>
          <Link to="/add-listing" className="btn-primary">Add your first listing</Link>
        </div>
      )}

      <div className="card-grid">
        {listings.map((listing) => (
          <div key={listing._id} className="dashboard-card">
            <Link to={`/listing/${listing._id}`}>
              <ListingCard
                id={listing._id}
                title={listing.title}
                description={listing.description}
                category={listing.category}
                skills={listing.skills}
                owner={listing.owner}
              />
            </Link>
            <div className="dashboard-actions">
              <Link to={`/edit-listing/${listing._id}`} className="btn-edit">
                Edit
              </Link>
              <button
                className="btn-delete"
                onClick={() => handleDelete(listing._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard