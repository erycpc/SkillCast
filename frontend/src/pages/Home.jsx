import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ListingCard from '../components/ListingCard'
import api from '../services/api'
import '../styles/Home.css'

function Home() {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    api.get('/api/listings')
      .then((res) => {
        setListings(res.data)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load listings')
        setLoading(false)
      })
  }, [])

  return (
    <div className="home">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-tag">🌍 Community Skills Exchange</div>
        <h1>Learn anything.<br /><span className="accent">Teach everything.</span></h1>
        <p className="hero-subtitle">
          Connect with skilled people in your community. Share what you know,
          learn what you don't.
        </p>
        <div className="hero-actions">
          <Link to="/add-listing" className="btn-primary">Share a Skill →</Link>
          <Link to="/signup" className="btn-secondary">Join for free</Link>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">{listings.length}+</span>
            <span className="stat-label">Skills listed</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-number">100%</span>
            <span className="stat-label">Community driven</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-number">Free</span>
            <span className="stat-label">To get started</span>
          </div>
        </div>
      </section>

      {/* Listings Section */}
      <section className="listings-section">
        <div className="section-header">
          <h2>Browse Skills</h2>
          <Link to="/add-listing" className="btn-outline">+ Add yours</Link>
        </div>

        {loading && (
          <div className="loading-grid">
            {[1,2,3].map((n) => <div key={n} className="skeleton-card" />)}
          </div>
        )}

        {error && <p className="error-state">{error}</p>}

        {!loading && listings.length === 0 && (
          <div className="empty-state">
            <p className="empty-icon">🎯</p>
            <h3>No listings yet</h3>
            <p>Be the first to share a skill with the community!</p>
            <Link to="/add-listing" className="btn-primary">Add a listing</Link>
          </div>
        )}

        {!loading && listings.length > 0 && (
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
        )}
      </section>

    </div>
  )
}

export default Home