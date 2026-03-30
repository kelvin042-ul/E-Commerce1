import '../styles/ImageGallery.css'

function ImageGallery() {
    // First 12 images from public/images/
    const images = [
        '/images/bag1.JPG', '/images/bag2.JPG', '/images/bag3.JPG',
        '/images/bag4.JPG', '/images/bag5.JPG', '/images/bag6.JPG',
        '/images/bag7.JPG', '/images/bag8.JPG', '/images/bag9.JPG',
        '/images/bag10.JPG', '/images/bag11.JPG', '/images/bag12.JPG'
    ]

    return (
        <section className="image-gallery">
            <h2 className="section-title">Our Collection</h2>
            <div className="gallery-grid">
                {images.map((img, index) => (
                    <div key={index} className="gallery-item">
                        <img src={img} alt={`Bag ${index + 1}`} />
                        <div className="gallery-overlay">
                            <span>View</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default ImageGallery