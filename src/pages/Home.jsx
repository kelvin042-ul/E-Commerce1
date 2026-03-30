import Hero from '../components/Hero'
import HotPicks from '../components/HotPicks'
import BestBundle from '../components/BestBundle'
import OurCollections from '../components/OurCollections'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'
import FloatingCartButton from '../components/FloatingCartButton'
import '../styles/Home.css'

function Home({ addToCart, cartCount }) {
    return (
        <div className="home-page">
            <Hero />
            <HotPicks />
            <BestBundle />
            <OurCollections />
            <Testimonials />
            <Footer />
            <FloatingCartButton cartCount={cartCount} />
        </div>
    )
}

export default Home