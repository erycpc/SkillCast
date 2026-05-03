import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ListingCard from '../components/ListingCard'
import api from '../services/api'


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
      .catch((err) => {
        setError('Failed to load listings')
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>
  if (listings.length === 0) {
    return (
      <div className="home">
        <h1>Find a Skill</h1>
        <p className="subtitle">Connect with people in your community</p>
        <p className="empty-state">No listings yet. Be the first to add one!</p>
      </div>
    )
  }

  return (
    <div className="home">
      <h1>Find a Skill</h1>
      <p className="subtitle">Connect with people in your community</p>
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
  )
}

export default Home