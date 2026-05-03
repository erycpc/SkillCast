const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

// Validating environment variables
if (!process.env.MONGO_URI) {
  console.error('Error: MONGO_URI is not defined')
  process.exit(1)
}
if (!process.env.PORT) {
  console.error('Error: PORT is not defined')
  process.exit(1)
}
if (!process.env.JWT_SECRET) {
  console.error('Error: JWT_SECRET is not defined')
  process.exit(1)
}

const app = express()

// Middleware
app.use(cors())
app.use(express.json())



// Routes
const authRouter = require('./routes/auth')
const listingsRouter = require('./routes/listings')
const reviewsRouter = require('./routes/reviews')

app.use('/api/auth', authRouter)
app.use('/api/listings', listingsRouter)
app.use('/api/reviews', reviewsRouter)

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'SkillCast API is running' })
})

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`)
    })
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err)
    process.exit(1)
  })