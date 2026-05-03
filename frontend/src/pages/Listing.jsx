import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../services/api'
import '../styles/Listing.css'

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

  if (loading) return <p style={{ padding: '64px 24px', color: 'var(--text-muted)' }}>Loading...</p>
  if (error) return <p style={{ padding: '64px 24px', color: 'var(--error)' }}>{error}</p>

  const safeSkills = Array.isArray(listing?.skills) ? listing.skills : []

  const renderStars = (rating) => '★'.repeat(rating) + '☆'.repeat(5 - rating)

  return (
    <div className="listing">
      <Link to="/" className="back-link">← Back to listings</Link>

      <div className="listing-header">
        <span className="category">{listing.category}</span>
        <h1>{listing.title}</h1>
        <p className="description">{listing.description}</p>
      </div>

      {listing.owner && (
        <div className="listing-owner">
          <div className="listing-avatar">
            {listing.owner.name?.charAt(0).toUpperCase()}
          </div>
          <div className="listing-owner-info">
            <span className="listing-owner-name">{listing.owner.name}</span>
            <span className="listing-owner-label">Instructor</span>
          </div>
        </div>
      )}

      <div className="skills">
        {safeSkills.map((skill, index) => (
          <span className="skill-tag" key={`${skill}-${index}`}>{skill}</span>
        ))}
      </div>

      <div className="reviews">
        <div className="reviews-header">
          <h2>Reviews</h2>
          <span className="review-count">{reviews.length} review{reviews.length !== 1 ? 's' : ''}</span>
        </div>

        {reviews.length === 0 && (
          <div className="no-reviews">
            <p>No reviews yet — be the first!</p>
          </div>
        )}

        {reviews.map((review) => (
          <div key={review._id} className="review">
            <div className="review-top">
              <div className="review-author">
                <div className="review-avatar">
                  {review.author?.name?.charAt(0).toUpperCase()}
                </div>
                <span className="review-name">{review.author?.name}</span>
              </div>
              <span className="review-stars">{renderStars(review.rating)}</span>
            </div>
            <p className="review-comment">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Listing