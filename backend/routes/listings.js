const express = require('express')
const router = express.Router()
const Listing = require('../models/Listing')
const auth = require('../middleware/auth')

// GET /api/listings - get all listings
router.get('/', async (req, res) => {
  try {
    const listings = await Listing.find().populate('owner', 'name avatar isPro')
    res.json(listings)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET /api/listings/:id - get one listing
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate('owner', 'name avatar isPro')
    if (!listing) return res.status(404).json({ message: 'Listing not found' })
    res.json(listing)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST /api/listings - create a listing (protected)
router.post('/', auth, async (req, res) => {
  try {
    const listing = new Listing({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      skills: req.body.skills,
      owner: req.user.id
    })
    const saved = await listing.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// PUT /api/listings/:id - update a listing (protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
    if (!listing) return res.status(404).json({ message: 'Listing not found' })

    if (listing.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' })
    }

    const updated = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    res.json(updated)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// DELETE /api/listings/:id - delete a listing (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
    if (!listing) return res.status(404).json({ message: 'Listing not found' })

    if (listing.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' })
    }

    await Listing.findByIdAndDelete(req.params.id)
    res.json({ message: 'Listing deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router