import { Link } from 'react-router-dom'
import '../styles/Hero.css'

function Hero() {
    return (
        <section className="hero">
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <div className="hero-text">
                    <span className="hero-badge">Summer Collection 2026</span>
                    <h1>Style That Speaks<br />Volume</h1>
                    <p>Discover premium quality bags crafted for the modern lifestyle. Shop the latest trends at unbeatable prices.</p>
                    <Link to="/shop" className="hero-btn">Shop Now →</Link>
                </div>
            </div>
        </section>
    )
}

export default Hero