import { useState } from 'react'
import '../styles/ProductCard.css'

function ProductCard({ product, addToCart }) {
    const [imageLoaded, setImageLoaded] = useState(false)
    const [showDescription, setShowDescription] = useState(false)

    // Check if product is new (within 7 days)
    const isNewProduct = () => {
        if (!product.isNew) return false
        if (!product.createdAt) return false

        const daysOld = (new Date() - new Date(product.createdAt)) / (1000 * 60 * 60 * 24)
        return daysOld <= 7
    }

    return (
        <div className="product-card">
            <div className="product-image-container">
                {/* NEW BADGE */}
                {isNewProduct() && (
                    <div className="new-badge">NEW</div>
                )}

                {/* Loader */}
                {!imageLoaded && <div className="image-loader"></div>}

                {/* Image - removed inView */}
                <img
                    src={product.image}
                    alt={product.name}
                    className={`product-image ${imageLoaded ? 'loaded' : ''}`}
                    onLoad={() => setImageLoaded(true)}
                    onClick={() => setShowDescription(!showDescription)}
                />
                {product.stock && product.stock < 10 && (
                    <div className="stock-warning">🔥 Only {product.stock} left!</div>
                )}
                {/* Description Popup */}
                {showDescription && (
                    <div className="product-description-popup">
                        <p>{product.description}</p>
                    </div>
                )}
            </div>

            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">₦{product.price}</p>
                <button
                    className="add-to-cart-btn"
                    onClick={() => addToCart(product)}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    )
}

export default ProductCard