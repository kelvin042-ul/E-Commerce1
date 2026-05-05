import { useState, useEffect } from 'react'
import ProductList from '../components/ProductList'
import FloatingCartButton from '../components/FloatingCartButton'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import '../styles/Shop.css'

function Shop({ addToCart, cartCount }) {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [categories, setCategories] = useState([
        { id: 'all', name: 'All Bags', icon: '👜' },
        { id: 'Channel Bags', name: 'Channel Bags', icon: '🎒' },
        { id: 'Clutch Bags', name: 'Clutch Bags', icon: '💼' },
        { id: 'Tote Bags', name: 'Tote Bags', icon: '🛍️' },
        { id: 'Hand Bags', name: 'Hand Bags', icon: '🧳' },
        { id: 'Luxury Bags', name: 'Luxury Bags', icon: '👝' },
        { id: 'Coach Bags', name: 'Coach Bags', icon: '👛' }
    ])
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'))
                const querySnapshot = await getDocs(q)
                const productsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setProducts(productsData)
                setFilteredProducts(productsData)
            } catch (error) {
                console.error('Error fetching products:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    // Filter products
    useEffect(() => {
        let filtered = products

        if (selectedCategory !== 'all') {
            filtered = filtered.filter(product => product.category === selectedCategory)
        }

        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
            )
        }

        setFilteredProducts(filtered)
    }, [selectedCategory, searchTerm, products])

    if (loading) {
        return <div className="loading">Loading products...</div>
    }

    return (
        <div className="shop-page">
            <div className="shop-header">
                <h1>All Bags</h1>
                <p>Discover our complete collection</p>

                {/* Search Bar centered on shop page */}
                <div className="shop-search-container">
                    <input
                        type="text"
                        placeholder="Search bags..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="shop-search-input"
                    />
                </div>
            </div>

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

            <div className="results-info">
                <span className="product-count">
                    {filteredProducts.length} products found
                </span>
            </div>

            <ProductList products={filteredProducts} addToCart={addToCart} />

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