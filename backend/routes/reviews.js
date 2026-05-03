const express = require('express')
const router = express.Router()
const Review = require('../models/Review')
const auth = require('../middleware/auth')

// GET /api/reviews/:listingId - get all reviews for a listing
router.get('/:listingId', async (req, res) => {
  try {
    const reviews = await Review.find({ listing: req.params.listingId })
      .populate('author', 'name avatar')
    res.json(reviews)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST /api/reviews/:listingId - add a review (protected)
router.post('/:listingId', auth, async (req, res) => {
  try {
    const review = new Review({
      listing: req.params.listingId,
      author: req.user.id,
      rating: req.body.rating,
      comment: req.body.comment
    })
    const saved = await review.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

module.exports = router