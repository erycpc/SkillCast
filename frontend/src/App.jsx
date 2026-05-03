import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import './styles/Home.css'
import './styles/ListingCard.css'
import Listing from './pages/Listing'
import './styles/Listing.css'
import './styles/Navbar.css'
import AddListing from './pages/AddListing'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listing/:id" element={<Listing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-listing" element={
          <ProtectedRoute>
            <AddListing />
          </ProtectedRoute>
        } />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

export default App