import { useState, useRef } from 'react'
import '../styles/HotPicks.css'

function HotPicks() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)

    // Determine how many items to show based on screen width
    const getItemsPerView = () => {
        if (window.innerWidth <= 768) return 2
        if (window.innerWidth <= 1024) return 3
        return 4
    }

    const [itemsPerView, setItemsPerView] = useState(getItemsPerView())

    // Update items per view on window resize
    useState(() => {
        const handleResize = () => {
            setItemsPerView(getItemsPerView())
            setCurrentIndex(0)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const hotPicks = [
        { id: 1, name: 'Classic Leather Tote', description: 'Genuine leather, spacious interior', price: '₦45,000', badge: 'HOT', image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400' },
        { id: 2, name: 'Designer Handbag', description: 'Elegant design for special occasions', price: '₦89,000', badge: 'SALE', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400' },
        { id: 3, name: 'Shoulder Bag', description: 'Perfect for daily commute', price: '₦35,000', badge: 'BEST', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400' },
        { id: 4, name: 'Luxury Clutch', description: 'Evening party essential', price: '₦55,000', badge: 'NEW', image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400' },
        { id: 5, name: 'Coach Style Bag', description: 'Premium quality finish', price: '₦120,000', badge: 'LUXURY', image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400' },
        { id: 6, name: 'Leather Backpack', description: 'Casual and stylish', price: '₦65,000', badge: 'HOT', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400' },
        { id: 7, name: 'Crossbody Bag', description: 'Hands-free convenience', price: '₦28,000', badge: 'SALE', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400' },
        { id: 8, name: 'Tote Bag', description: 'Eco-friendly material', price: '₦25,000', badge: 'ECO', image: 'https://images.unsplash.com/photo-1576759816174-12f8906ed2e7?w=400' },
        { id: 9, name: 'Evening Bag', description: 'Sparkle and shine', price: '₦48,000', badge: 'LIMITED', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400' },
        { id: 10, name: 'Leather Satchel', description: 'Professional look', price: '₦75,000', badge: 'PREMIUM', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400' }
    ]

    const maxIndex = hotPicks.length - itemsPerView

    const nextSlide = () => {
        if (currentIndex < maxIndex) {
            setCurrentIndex(currentIndex + 1)
        } else {
            setCurrentIndex(0) // Loop back to start
        }
    }

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
        } else {
            setCurrentIndex(maxIndex) // Loop to end
        }
    }

    // Touch events for mobile swipe
    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX)
    }

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX)
    }

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return
        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > 50
        const isRightSwipe = distance < -50

        if (isLeftSwipe) {
            nextSlide()
        }
        if (isRightSwipe) {
            prevSlide()
        }
        setTouchStart(null)
        setTouchEnd(null)
    }

    return (
        <section className="hot-picks">
            <div className="section-header">
                <h2>🔥 Hot Picks</h2>
                <p>Trending this week</p>
            </div>

            <div className="slider-container">
                <button className="slider-btn prev" onClick={prevSlide}>❮</button>
                <div
                    className="slider-track"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div
                        className="slider-items"
                        style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
                    >
                        {hotPicks.map(item => (
                            <div key={item.id} className="product-item">
                                <div className="product-badge">{item.badge}</div>
                                <img src={item.image} alt={item.name} />
                                <h4>{item.name}</h4>
                                <p>{item.description}</p>
                                <span className="price">{item.price}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <button className="slider-btn next" onClick={nextSlide}>❯</button>
            </div>
        </section>
    )
}

export default HotPicks