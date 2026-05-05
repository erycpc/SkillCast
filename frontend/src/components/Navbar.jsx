import { Link, useNavigate } from 'react-router-dom'
import '../styles/Navbar.css'
import { useAuth } from '../context/AuthContext'


function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo">Skill Cast</Link>
      <div className="nav-links">
        {user ? (
          <>
            <span className="nav-user">Hey, <span>{user?.name?.split(' ')[0]}</span></span>
            <Link to="/dashboard" className="dashboard">Dashboard</Link>
            <Link to="/add-listing" className="nav-btn">+ Add Listing</Link>
            <button className="nav-logout" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup" className="nav-btn">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar