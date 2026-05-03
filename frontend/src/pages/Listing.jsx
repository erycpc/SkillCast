import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MdEmail } from 'react-icons/md'
import { FaWhatsapp, FaDiscord } from 'react-icons/fa'
import api from '../services/api'
import '../styles/Listing.css'
import { useAuth } from '../context/AuthContext'

function Listing() {
  const { user } = useAuth()
  const { id } = useParams()
  const [listing, setListing] = useState(null)
  const [reviews, setReviews] = useState([])
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post(`/api/reviews/${id}`, { rating, comment })
      setReviews([...reviews, res.data])
      setComment('')
      setRating(5)
    } catch (err) {
      alert('Failed to submit review')
    }
  }

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

      <div className="contact-buttons">
        {listing.contact?.email && (
          <a href={`mailto:${listing.contact.email}`} className="contact-btn email">
            <MdEmail size={16} /> Email
          </a>
        )}
        {listing.contact?.whatsapp && (
          
           <a href={`https://wa.me/${listing.contact.whatsapp.replace(/\D/g, '')}`}
            target="_blank"
            rel="noreferrer"
            className="contact-btn whatsapp"
          >
            <FaWhatsapp size={16} /> WhatsApp
          </a>
        )}
        {listing.contact?.discord && (
          <div className="contact-btn discord">
            <FaDiscord size={16} /> Discord: {listing.contact.discord}
          </div>
        )}
      </div>

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
        {user && (
        <form onSubmit={handleReviewSubmit} className="review-form">
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          <option value={5}>★★★★★ — 5</option>
          <option value={4}>★★★★☆ — 4</option>
          <option value={3}>★★★☆☆ — 3</option>
          <option value={2}>★★☆☆☆ — 2</option>
          <option value={1}>★☆☆☆☆ — 1</option>
        </select>
        <textarea
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <button type="submit">Submit Review</button>
      </form>
      )}
      </div>
    </div>
  )
}

export default Listing