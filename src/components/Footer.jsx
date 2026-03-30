import '../styles/Footer.css'
import { Link } from 'react-router-dom'


function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3 className="footer-logo">SamDeLiving</h3>
                    <p className="footer-description">
                        Premium quality bags for every occasion. Stylish, durable, and affordable.
                    </p>
                </div>

                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul className="footer-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/shop">Shop</Link></li>
                        <li><Link to="/cart">Cart</Link></li>
                        <li><Link to="/admin">Admin</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Categories</h4>
                    <ul className="footer-links">
                        <li><a href="#">Clutch Bags</a></li>
                        <li><a href="#">Channel Bags</a></li>
                        <li><a href="#">Tote Bags</a></li>
                        <li><a href="#">Luxury Bags</a></li>
                        <li><a href="#">Hand Bags</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Contact Info</h4>
                    <ul className="footer-contact">
                        <li>📍 3 & 4 Kuddy Plaza New Mandilas, Trade Fair, Lagos, Nigeria</li>
                        <li>📞 +2348034730283, +2349168954697, +2348168954697</li>
                        <li>✉️ info@bagshop.com</li>
                        <li>🟢 Active Always</li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2026 SamDeLiving LTD. All rights reserved. | Designed with ❤️ for Bag lovers</p>
            </div>
        </footer>
    )
}

export default Footer