import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import ListingCard from '../components/ListingCard'

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

  if (loading) return <p>Loading...</p>

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>My Dashboard</h1>
        <Link to="/add-listing" className="nav-btn">+ Add Listing</Link>
      </div>

      {listings.length === 0 && (
        <p>You have no listings yet. <Link to="/add-listing">Add one!</Link></p>
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