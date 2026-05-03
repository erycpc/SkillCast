import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../services/api'
import ListingCard from '../components/ListingCard'
import '../styles/Profile.css'

function Profile() {
  const { id } = useParams()
  const [profile, setProfile] = useState(null)
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    api.get(`/api/auth/user/${id}`)
      .then((res) => {
        setProfile(res.data)
        setLoading(false)
      })
      .catch(() => {
        setError('User not found')
        setLoading(false)
      })

    api.get(`/api/listings?owner=${id}`)
      .then((res) => setListings(res.data))
  }, [id])

  if (loading) return <p style={{ padding: '64px 24px', color: 'var(--text-muted)' }}>Loading...</p>
  if (error) return <p style={{ padding: '64px 24px', color: 'var(--error)' }}>{error}</p>

  return (
    <div className="profile">
      <Link to="/" className="back-link">← Back to listings</Link>

      <div className="profile-header">
        <div className="profile-big-avatar">
          {profile.name?.charAt(0).toUpperCase()}
        </div>
        <div className="profile-info">
          <h1>{profile.name}</h1>
          {profile.isPro && <span className="pro-badge">⭐ Pro Member</span>}
          <p className="profile-email">{profile.email}</p>
        </div>
      </div>

      <div className="profile-listings">
        <h2>Listings by {profile.name.split(' ')[0]}</h2>
        {listings.length === 0 && (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No listings yet</p>
        )}
        <div className="card-grid">
          {listings.map((listing) => (
            <Link key={listing._id} to={`/listing/${listing._id}`}>
              <ListingCard
                id={listing._id}
                title={listing.title}
                description={listing.description}
                category={listing.category}
                skills={listing.skills}
                owner={listing.owner}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile