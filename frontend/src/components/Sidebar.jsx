import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  MdDashboard,
  MdAddCircleOutline,
  MdPerson,
  MdSettings,
  MdLogout,
  MdMenu,
  MdClose
} from 'react-icons/md'
import '../styles/Sidebar.css'

function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const navItems = [
    { to: '/dashboard', icon: <MdDashboard size={20} />, label: 'My Listings' },
    { to: '/add-listing', icon: <MdAddCircleOutline size={20} />, label: 'Add Listing' },
    { to: `/profile/${user?.id || user?.id}`, icon: <MdPerson size={20} />, label: 'My Profile' },
    { to: '/settings', icon: <MdSettings size={20} />, label: 'Settings' },
  ]

  return (
    <>
      {/* Toggle button */}
      <button
        className="sidebar-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <MdClose size={22} /> : <MdMenu size={22} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>

        {/* User info */}
        <div className="sidebar-user">
          <div className="sidebar-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="sidebar-user-info">
            <span className="sidebar-name">{user?.name}</span>
            <span className="sidebar-email">{user?.email}</span>
          </div>
        </div>

        {/* Nav links */}
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`sidebar-link ${location.pathname === item.to ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <button className="sidebar-logout" onClick={handleLogout}>
          <MdLogout size={20} />
          <span>Logout</span>
        </button>

      </aside>
    </>
  )
}

export default Sidebar