import { useState, useEffect } from 'react'
import { collection, addDoc, deleteDoc, updateDoc, doc, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import '../styles/ProductManager.css'

function ProductManager() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [showAddForm, setShowAddForm] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        description: '',
        image: '',
        category: 'backpack',
        isNew: false
    })
    const [deleteConfirm, setDeleteConfirm] = useState(null)

    // Categories for dropdown
    const categories = [
        { id: 'Channel', name: 'Channel Bags' },
        { id: 'Clutch', name: 'Clutch Bags' },
        { id: 'Tote', name: 'Tote' },
        { id: 'Hand/Shoulder', name: 'Hand Bags' },
        { id: 'Luxury', name: 'Luxury Bags' },
        { id: 'Coach', name: 'Coach Bags' },
        { id: 'Casual', name: 'Casual Bags' }
    ]

    // Fetch products from Firestore
    const fetchProducts = async () => {
        try {
            const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'))
            const querySnapshot = await getDocs(q)
            const productsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                isNew: doc.data().isNew || false
            }))
            setProducts(productsData)
        } catch (error) {
            console.error('Error fetching products:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const handleAddProduct = async (e) => {
        e.preventDefault()
        try {
            await addDoc(collection(db, 'products'), {
                ...newProduct,
                price: parseFloat(newProduct.price),
                createdAt: newProduct.isNew ? new Date().toISOString() : null  // ← CHANGE TO THIS
            })
            setShowAddForm(false)
            setNewProduct({ name: '', price: '', description: '', image: '', category: 'backpack', isNew: false })
            fetchProducts()
            alert('✅ Product added successfully!')
        } catch (error) {
            console.error('Error adding product:', error)
            alert('❌ Failed to add product.')
        }
    }
    // EDIT PRODUCT - NEW FUNCTION
    const handleEditProduct = async (e) => {
        e.preventDefault()
        try {
            const productRef = doc(db, 'products', editingProduct.id)
            await updateDoc(productRef, {
                name: editingProduct.name,
                price: parseFloat(editingProduct.price),
                description: editingProduct.description,
                image: editingProduct.image,
                category: editingProduct.category,
                isNew: editingProduct.isNew || false
            })
            setShowEditForm(false)
            setEditingProduct(null)
            fetchProducts()
            alert('✅ Product updated successfully!')
        } catch (error) {
            console.error('Error updating product:', error)
            alert('❌ Failed to update product.')
        }
    }

    // Delete product
    const handleDeleteProduct = async (productId) => {
        try {
            await deleteDoc(doc(db, 'products', productId))
            setDeleteConfirm(null)
            fetchProducts()
            alert('✅ Product deleted successfully!')
        } catch (error) {
            console.error('Error deleting product:', error)
            alert('❌ Failed to delete product.')
        }
    }

    // Open edit form with product data
    const openEditForm = (product) => {
        setEditingProduct({
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
            image: product.image,
            category: product.category,
            isNew: product.isNew || false
        })
        setShowEditForm(true)
    }

    if (loading) {
        return <div className="loading">Loading products...</div>
    }

    return (
        <div className="product-manager">
            <div className="product-manager-header">
                <h2>Product Management</h2>
                <button onClick={() => setShowAddForm(true)} className="add-product-btn">
                    + Add New Product
                </button>
            </div>

            {/* Add Product Form Modal */}
            {showAddForm && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Add New Product</h3>
                        <form onSubmit={handleAddProduct}>
                            <div className="form-group">
                                <label>Product Name *</label>
                                <input
                                    type="text"
                                    value={newProduct.name}
                                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Price ($) *</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={newProduct.price}
                                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Description *</label>
                                <textarea
                                    value={newProduct.description}
                                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                    rows="3"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Image URL *</label>
                                <input
                                    type="text"
                                    value={newProduct.image}
                                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                                    placeholder="https://res.cloudinary.com/... or /images/bag1.jpg"
                                    required
                                />
                                <small>Paste Cloudinary URL or local image path</small>
                            </div>
                            <div className="form-group">
                                <label>Category *</label>
                                <select
                                    value={newProduct.category}
                                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                >
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <input
                                        type="checkbox"
                                        checked={newProduct.isNew}
                                        onChange={(e) => setNewProduct({ ...newProduct, isNew: e.target.checked })}
                                    />
                                    Mark as New Arrival
                                </label>
                            </div>
                            <div className="modal-actions">
                                <button type="submit" className="save-btn">Save Product</button>
                                <button type="button" onClick={() => setShowAddForm(false)} className="cancel-btn">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Product Form Modal - NEW */}
            {showEditForm && editingProduct && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Edit Product</h3>
                        <form onSubmit={handleEditProduct}>
                            <div className="form-group">
                                <label>Product Name *</label>
                                <input
                                    type="text"
                                    value={editingProduct.name}
                                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Price ($) *</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={editingProduct.price}
                                    onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Description *</label>
                                <textarea
                                    value={editingProduct.description}
                                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                                    rows="3"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Image URL *</label>
                                <input
                                    type="text"
                                    value={editingProduct.image}
                                    onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                                    placeholder="https://res.cloudinary.com/... or /images/bag1.jpg"
                                    required
                                />
                                <small>Paste Cloudinary URL or local image path</small>
                            </div>
                            <div className="form-group">
                                <label>Category *</label>
                                <select
                                    value={editingProduct.category}
                                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                                >
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <input
                                        type="checkbox"
                                        checked={editingProduct.isNew || false}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, isNew: e.target.checked })}
                                    />
                                    Mark as New Arrival
                                </label>
                            </div>
                            <div className="modal-actions">
                                <button type="submit" className="save-btn">Update Product</button>
                                <button type="button" onClick={() => setShowEditForm(false)} className="cancel-btn">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Products List */}
            {products.length === 0 ? (
                <div className="no-products">
                    <p>No products yet. Click "Add New Product" to get started.</p>
                </div>
            ) : (
                <div className="products-table-container">
                    <table className="products-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id}>
                                    <td><img src={product.image} alt={product.name} className="product-thumb" /></td>
                                    <td>{product.name}</td>
                                    <td>₦{product.price}</td>
                                    <td><span className="category-badge">{product.category}</span></td>
                                    <td className="desc-cell">{product.description.substring(0, 50)}...</td>
                                    <td>{product.isNew ? '🆕' : ''}</td>
                                    <td className="actions-cell">
                                        {/* EDIT BUTTON - NEW */}
                                        <button
                                            onClick={() => openEditForm(product)}
                                            className="edit-product-btn"
                                            title="Edit product"
                                        >
                                            ✏️
                                        </button>

                                        {/* DELETE BUTTON */}
                                        {deleteConfirm === product.id ? (
                                            <div className="delete-confirm">
                                                <span>Sure?</span>
                                                <button onClick={() => handleDeleteProduct(product.id)} className="confirm-yes">✓</button>
                                                <button onClick={() => setDeleteConfirm(null)} className="confirm-no">✗</button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => setDeleteConfirm(product.id)}
                                                className="delete-product-btn"
                                                title="Delete product"
                                            >
                                                🗑️
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default ProductManager