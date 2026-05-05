import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import ListingCard from '../components/ListingCard'
import '../styles/Profile.css'

function Profile() {
  const { id } = useParams()
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [listings, setListings] = useState([])
  const [reviews, setReviews] = useState([])
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
      .then((res) => {
        setListings(res.data)
        // fetch reviews for each listing
        res.data.forEach((listing) => {
          api.get(`/api/reviews/${listing._id}`)
            .then((r) => setReviews((prev) => [...prev, ...r.data]))
        })
      })
  }, [id])

  if (loading) return <p style={{ padding: '64px 24px', color: 'var(--text-muted)' }}>Loading...</p>
  if (error) return <p style={{ padding: '64px 24px', color: 'var(--error)' }}>{error}</p>

  // Calculate average rating
  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null

  // Format member since date
  const memberSince = new Date(profile.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  })

  const isOwnProfile = user?._id === id || user?.id === id

  return (
    <div className="profile">
      <Link to="/" className="back-link">← Back to listings</Link>

      <div className="profile-header">
        <div className="profile-big-avatar">
          {profile.name?.charAt(0).toUpperCase()}
        </div>
        <div className="profile-info">
          <div className="profile-name-row">
            <h1>{profile.name}</h1>
            {isOwnProfile && (
              <Link to="/settings" className="btn-edit-profile">
                Edit Profile
              </Link>
            )}
          </div>
          {profile.isPro && <span className="pro-badge">⭐ Pro Member</span>}
          <p className="profile-email">{profile.email}</p>
          <p className="profile-since">Member since {memberSince}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="profile-stats">
        <div className="profile-stat">
          <span className="profile-stat-number">{listings.length}</span>
          <span className="profile-stat-label">Listings</span>
        </div>
        <div className="profile-stat-divider" />
        <div className="profile-stat">
          <span className="profile-stat-number">{reviews.length}</span>
          <span className="profile-stat-label">Reviews</span>
        </div>
        <div className="profile-stat-divider" />
        <div className="profile-stat">
          <span className="profile-stat-number">
            {avgRating ? `⭐ ${avgRating}` : '—'}
          </span>
          <span className="profile-stat-label">Avg Rating</span>
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