import '../styles/OurCollections.css'

function OurCollections() {
    const collections = [
        { id: 1, name: 'Clutch Bags', image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600', count: '12 styles' },
        { id: 2, name: 'Tote Bags', image: 'https://images.unsplash.com/photo-1576759816174-12f8906ed2e7?w=600', count: '15 styles' },
        { id: 3, name: 'Hand Bags', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600', count: '20 styles' },
        { id: 4, name: 'Shoulder Bags', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600', count: '18 styles' },
        { id: 5, name: 'Coach Inspired', image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=600', count: '8 styles' },
        { id: 6, name: 'Luxury Leather', image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600', count: '10 styles' }
    ]

    return (
        <section className="our-collections">
            <div className="section-header">
                <h2>🛍️ Our Collections</h2>
                <p>Shop by category</p>
            </div>

            <div className="collections-grid">
                {collections.map(item => (
                    <div key={item.id} className="collection-card">
                        <img src={item.image} alt={item.name} />
                        <div className="collection-overlay">
                            <h3>{item.name}</h3>
                            <span>{item.count}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default OurCollections