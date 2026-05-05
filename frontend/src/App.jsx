import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import './styles/Home.css'
import './styles/ListingCard.css'
import Listing from './pages/Listing'
import './styles/Listing.css'
import './styles/Navbar.css'
import AddListing from './pages/AddListing'
import EditListing from './pages/EditListing'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import Sidebar from './components/Sidebar'
import './App.css'

function App() {
  const location = useLocation()
  const hideNavbar = ['/login', '/signup'].includes(location.pathname)

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listing/:id" element={<Listing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-listing" element={
          <ProtectedRoute>
            <Sidebar />
            <AddListing />
          </ProtectedRoute>
        } />
        <Route path="/profile/:id" element={
          <ProtectedRoute>
            <Sidebar />
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Sidebar />
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <Sidebar />
            <Settings />
          </ProtectedRoute>
        } />
        <Route path="/edit-listing/:id" element={
          <ProtectedRoute>
            <Sidebar />
            <EditListing />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

export default App