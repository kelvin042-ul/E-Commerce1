import '../styles/BestBundle.css'

function BestBundle() {
    const bundles = [
        { id: 1, name: 'Work & Travel Combo', description: 'Laptop bag + Duffel bag', price: '₦85,000', originalPrice: '₦110,000', badge: '-23%', image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400' },
        { id: 2, name: 'Office Essentials', description: 'Messenger + Card holder', price: '₦45,000', originalPrice: '₦60,000', badge: '-25%', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400' },
        { id: 3, name: 'Weekend Getaway', description: 'Travel bag + Toiletry kit', price: '₦65,000', originalPrice: '₦85,000', badge: '-24%', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400' },
        { id: 4, name: 'Style Set', description: 'Clutch + Crossbody + Tote', price: '₦95,000', originalPrice: '₦130,000', badge: '-27%', image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400' },
        { id: 5, name: 'Leather Duo', description: 'Backpack + Wallet', price: '₦75,000', originalPrice: '₦100,000', badge: '-25%', image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400' },
        { id: 6, name: 'School Bundle', description: 'Backpack + Lunch bag', price: '₦55,000', originalPrice: '₦70,000', badge: '-21%', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400' }
    ]

    return (
        <section className="best-bundle">
            <div className="section-header">
                <h2>📦 Best Bundle</h2>
                <p>Save more with our bundles</p>
            </div>

            <div className="bundle-grid">
                {bundles.map(item => (
                    <div key={item.id} className="bundle-card">
                        <div className="bundle-badge">{item.badge}</div>
                        <img src={item.image} alt={item.name} />
                        <div className="bundle-info">
                            <h4>{item.name}</h4>
                            <p>{item.description}</p>
                            <div className="bundle-price">
                                <span className="current-price">{item.price}</span>
                                <span className="original-price">{item.originalPrice}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default BestBundle