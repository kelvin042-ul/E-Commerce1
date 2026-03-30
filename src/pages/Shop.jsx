import { useState, useEffect } from 'react'
import ProductList from '../components/ProductList'
import FloatingCartButton from '../components/FloatingCartButton'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import '../styles/Shop.css'

function Shop({ addToCart, cartCount }) {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([
        { id: 'all', name: 'All Bags', icon: '👜' },
        { id: 'Channel', name: 'Channel Bags', icon: '🎒' },
        { id: 'Clutch', name: 'Clutch Bags', icon: '💼' },
        { id: 'Totes', name: 'Tote Bags', icon: '🛍️' },
        { id: 'HandBag', name: 'HandBags', icon: '🧳' },
        { id: 'Coach', name: 'Coach Bags', icon: '👝' },
        { id: 'Casual', name: 'Casual Bags', icon: '🧳' }
    ])
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(true)

    // Fetch products from Firestore
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'))
                const querySnapshot = await getDocs(q)
                const productsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                // Sort products: New arrivals first
                const sortedProducts = productsData.sort((a, b) => {
                    // Check if product is new (within 7 days)
                    const isNewA = a.isNew && a.createdAt ? (new Date() - new Date(a.createdAt)) / (1000 * 60 * 60 * 24) <= 7 : false
                    const isNewB = b.isNew && b.createdAt ? (new Date() - new Date(b.createdAt)) / (1000 * 60 * 60 * 24) <= 7 : false

                    if (isNewA && !isNewB) return -1
                    if (!isNewA && isNewB) return 1
                    return new Date(b.createdAt) - new Date(a.createdAt)
                })

                setProducts(sortedProducts)
                setProducts(productsData)
            } catch (error) {
                console.error('Error fetching products:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    // Filter products
    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesCategory && matchesSearch
    })

    if (loading) {
        return <div className="loading">Loading products...</div>
    }

    return (
        <div className="shop-page">
            <div className="page-header">
                <h1>All Bags Collection</h1>
                <p>Discover our premium collection of {products.length}+ bags</p>
            </div>

            {/* Search Bar */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="🔍 Search bags by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            {/* Category Filter Buttons */}
            <div className="category-filters">
                {categories.map(category => (
                    <button
                        key={category.id}
                        className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(category.id)}
                    >
                        <span className="category-icon">{category.icon}</span>
                        <span className="category-name">{category.name}</span>
                    </button>
                ))}
            </div>

            {/* Results Info */}
            <div className="results-info">
                <span className="product-count">
                    {filteredProducts.length} products found
                </span>
            </div>

            {/* Product List */}
            <ProductList products={filteredProducts} addToCart={addToCart} />

            {/* No Results Message */}
            {filteredProducts.length === 0 && (
                <div className="no-results">
                    <p>No bags found matching your criteria</p>
                    <button
                        onClick={() => {
                            setSelectedCategory('all')
                            setSearchTerm('')
                        }}
                        className="clear-filters-btn"
                    >
                        Clear Filters
                    </button>
                </div>
            )}

            <FloatingCartButton cartCount={cartCount} />
        </div>
    )
}

export default Shop