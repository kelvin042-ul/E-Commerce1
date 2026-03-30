import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import '../styles/Navbar.css'

function Navbar({ cartCount }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { isAdmin, currentUser, logout } = useAuth()

    const handleLogout = async () => {
        await logout()
        setIsMenuOpen(false)
    }

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/" className="nav-logo">
                    Sam-De-Living
                </Link>

                <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                    <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                        Home
                    </Link>
                    <Link to="/shop" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                        Shop
                    </Link>
                    <Link to="/cart" className="nav-link cart-link" onClick={() => setIsMenuOpen(false)}>
                        Cart
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </Link>

                    {/* Show Admin Dashboard link ONLY if admin is logged in */}
                    {isAdmin && (
                        <Link to="/admin/dashboard" className="nav-link admin-link" onClick={() => setIsMenuOpen(false)}>
                            Admin Dashboard
                        </Link>
                    )}

                    {/* Show login/logout based on auth status */}
                    {currentUser ? (
                        <button onClick={handleLogout} className="nav-link logout-btn">
                            Logout
                        </button>
                    ) : (
                        <Link to="/login" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                            Login
                        </Link>
                    )}
                </div>

                <button
                    className={`hamburger ${isMenuOpen ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    )
}

export default Navbar