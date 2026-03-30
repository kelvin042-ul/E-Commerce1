import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CartItem from '../components/CartItem'
import CheckoutForm from '../components/CheckoutForm'
import { v4 as uuidv4 } from 'uuid'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import '../styles/Cart.css'

function Cart({ cart, updateCartItem, removeFromCart, clearCart, showNotification }) {
    const [showCheckout, setShowCheckout] = useState(false)
    const navigate = useNavigate()
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const shipping = subtotal > 100 ? 0 : 10
    const total = subtotal + shipping

    const handleCheckout = async (customerData) => {
        const order = {
            orderId: uuidv4(),
            fullName: customerData.fullName,
            email: customerData.email,
            phone: customerData.phone,
            address: customerData.address,
            items: cart.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.image
            })),
            subtotal,
            shipping,
            total,
            status: 'Pending',
            date: new Date().toISOString(),
            timestamp: serverTimestamp()
        }

        try {
            // Save order to Firestore
            await addDoc(collection(db, 'orders'), order)
            console.log('Order saved to Firebase')

            // Send WhatsApp to Admin
            const whatsappMessage = formatWhatsAppOrder(order, customerData)
            window.location.href = `https://wa.me/${import.meta.env.VITE_ADMIN_PHONE}?text=${encodeURIComponent(whatsappMessage)}`

            showNotification('✓ Order placed! Admin will contact you.', 'success')
            clearCart()
            setShowCheckout(false)

            navigate('/receipt', { state: { orderId: order.orderId } })
        } catch (error) {
            console.error('Error saving order:', error)
            showNotification('❌ Failed to place order. Try again.', 'error')
        }
    }

    const formatWhatsAppOrder = (order, customer) => {
        const itemsList = order.items.map(item =>
            `• ${item.name} x${item.quantity} - ₦${(item.price * item.quantity).toFixed(2)}`
        ).join('\n')

        return `🛍️ *NEW ORDER - SAMDELIVING*
    
        *Customer:* ${customer.fullName}
        *Phone:* ${customer.phone}
        *Email:* ${customer.email}
        *Address:* ${customer.address}

        *Items:*
        ${itemsList}

        *Total:* ₦${order.total.toFixed(2)}

        *Order ID:* ${order.orderId.slice(0, 8)}`
    }

    if (cart.length === 0) {
        return (
            <div className="empty-cart">
                <h2>Your Cart is Empty</h2>
                <p>Looks like you haven't added any items to your cart yet.</p>
                <a href="/shop" className="shop-now-btn">Shop Now</a>
            </div>
        )
    }

    return (
        <div className="cart-page">
            <h1>Shopping Cart</h1>

            <div className="cart-container">
                <div className="cart-items">
                    {cart.map(item => (
                        <CartItem
                            key={item.id}
                            item={item}
                            updateQuantity={updateCartItem}
                            removeFromCart={removeFromCart}
                        />
                    ))}
                </div>

                <div className="cart-summary">
                    <h3>Order Summary</h3>
                    <div className="summary-item">
                        <span>Subtotal:</span>
                        <span>₦{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="summary-item">
                        <span>Shipping:</span>
                        <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="summary-item total">
                        <span>Total:</span>
                        <span>₦{total.toFixed(2)}</span>
                    </div>

                    {!showCheckout ? (
                        <button
                            className="checkout-btn"
                            onClick={() => setShowCheckout(true)}
                        >
                            Proceed to Checkout
                        </button>
                    ) : (
                        <CheckoutForm
                            onSubmit={handleCheckout}
                            onCancel={() => setShowCheckout(false)}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Cart