import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../services/api'

function Listing() {
  const { id } = useParams()
  const [listing, setListing] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    api.get(`/api/listings/${id}`)
      .then((res) => {
        setListing(res.data)
        setLoading(false)
      })
      .catch(() => {
        setError('Listing not found')
        setLoading(false)
      })

    api.get(`/api/reviews/${id}`)
      .then((res) => setReviews(res.data))
  }, [id])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  const safeSkills = Array.isArray(listing?.skills) ? listing.skills : []

  return (
    <div className="listing">
      <Link to="/" className="back-link">← Back to listings</Link>
      <span className="category">{listing.category}</span>
      <h1>{listing.title}</h1>
      <p className="description">{listing.description}</p>
      <p className="owner">By {listing.owner?.name}</p>

      <div className="skills">
        {safeSkills.map((skill, index) => (
          <span className="skill-tag" key={`${skill}-${index}`}>{skill}</span>
        ))}
      </div>

      <div className="reviews">
        <h2>Reviews</h2>
        {reviews.length === 0 && <p className="no-reviews">No reviews yet</p>}
        {reviews.map((review) => (
          <div key={review._id} className="review">
            <p><strong>{review.author?.name}</strong> — {review.rating}/5</p>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Listing