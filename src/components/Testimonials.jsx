import '../styles/Testimonials.css'

function Testimonials() {
    const testimonials = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Fashion Blogger",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
            text: "The quality of bags from SamDeLiving store is outstanding! I've bought three bags already and each one is perfect. Fast shipping and great customer service!",
            rating: 5
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Business Executive",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            text: "My go-to place for premium bags. The leather backpack I purchased is both stylish and durable. Highly recommended!",
            rating: 5
        },
        {
            id: 3,
            name: "Emily Rodriguez",
            role: "Travel Enthusiast",
            image: "https://randomuser.me/api/portraits/women/68.jpg",
            text: "The travel duffel bag is a game-changer! So spacious yet comfortable to carry. Best investment for my trips.",
            rating: 5
        },
        {
            id: 4,
            name: "David Kim",
            role: "Fashion Designer",
            image: "https://randomuser.me/api/portraits/men/75.jpg",
            text: "Exceptional quality and design. The attention to detail is remarkable. BagShop has become my favorite brand.",
            rating: 5
        }
    ]

    return (
        <section className="testimonials">
            <h2 className="testimonials-title">What Our Customers Say</h2>
            <p className="testimonials-subtitle">Join thousands of happy customers.</p>

            <div className="testimonials-grid">
                {testimonials.map(testimonial => (
                    <div key={testimonial.id} className="testimonial-card">
                        <div className="testimonial-rating">
                            {[...Array(testimonial.rating)].map((_, i) => (
                                <span key={i} className="star">★</span>
                            ))}
                        </div>
                        <p className="testimonial-text">"{testimonial.text}"</p>
                        <div className="testimonial-author">
                            <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="author-image"
                            />
                            <div className="author-info">
                                <h4>{testimonial.name}</h4>
                                <p>{testimonial.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Testimonials 