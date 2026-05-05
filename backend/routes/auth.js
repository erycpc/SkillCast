const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const auth = require('../middleware/auth')

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body
    const existing = await User.findOne({ email })
    if (existing) return res.status(400).json({ message: 'Email already in use' })

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = new User({ name, email, password: hashedPassword })
    await user.save()
    res.status(201).json({ message: 'Account created successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Invalid credentials' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' })

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isPro: user.isPro,
        avatar: user.avatar
      }
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET /api/auth/me
router.get('/me', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    if (!token) return res.status(401).json({ message: 'No token' })

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id).select('-password')
    res.json(user)
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' })
  }
})

// GET /api/auth/user/:id - get public profile
router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password')
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// PUT /api/auth/update
router.put('/update', auth, async (req, res) => {
  try {
    const { name, email, password } = req.body
    const user = await User.findById(req.user.id)
    if (!user) return res.status(404).json({ message: 'User not found' })

    if (name) user.name = name
    if (email) user.email = email
    if (password) {
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
    }

    await user.save()
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isPro: user.isPro
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// DELETE /api/auth/delete
router.delete('/delete', auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id)
    res.json({ message: 'Account deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router