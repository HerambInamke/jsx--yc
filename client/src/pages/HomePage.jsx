import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from "react-slick";
import ExploreSection from '../components/sections/ExploreSection'
import BestSellerSection from '../components/sections/BestSellerSection'
import PackagesSection from '../components/sections/PackagesSection'

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
}

const bgImages = [
    '/Backgrounds/coldpay_bg.png',
    '/Backgrounds/hotel_bg.png',
    '/Backgrounds/concertImg_bg.png',
];

export default function HomePage() {
    const navigate = useNavigate()

    const handleFeaturedArtistClick = (id) => {
        navigate(`/concert-details/${id}`)
    }

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative h-[30rem] text-white overflow-hidden">
                {/* Carousel renders background images absolutely */}
                <Slider
                    autoplay
                    infinite
                    speed={1500}
                    autoplaySpeed={5000}
                    arrows={false}
                    dots={false}
                    swipe={true}
                    pauseOnHover={false}
                    slidesToShow={1}
                    slidesToScroll={1}
                >
                    {bgImages.map((img, i) => (
                        <div key={i}>
                            <div
                                className="h-[35rem] w-full bg-cover bg-center"
                                style={{ backgroundImage: `url(${img})` }}
                            >
                                <div className="absolute inset-0 bg-black/10" />
                            </div>
                        </div>
                    ))}
                </Slider>

                {/* Static content over the carousel */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-10">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        Your Ultimate Concert Experience
                    </h1>
                    <p className="text-lg md:text-xl mb-8 max-w-2xl">
                        Discover exclusive concerts, personalized packages, and unforgettable moments.
                    </p>
                    <div className="flex gap-4">
                        <button
                            onClick={() => navigate('/explore')}
                            className="px-6 py-3 bg-festival-primary text-white rounded-lg hover:bg-festival-primary-dark transition-colors"
                        >
                            Explore Events
                        </button>
                        <button
                            onClick={() => navigate('/packages')}
                            className="px-6 py-3 bg-white text-festival-primary rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            View Packages
                        </button>
                    </div>
                </div>
            </section>

            {/* Featured Events */}
            <motion.section
                variants={fadeInUp}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="py-20 bg-white"
            >
                <div className="container">
                    <div className="text-center mb-12">
                        <motion.h2
                            variants={fadeInUp}
                            className="text-4xl font-bold mb-4"
                        >
                            Featured Events
                        </motion.h2>
                        <motion.p
                            variants={fadeInUp}
                            className="text-gray-600 max-w-2xl mx-auto"
                        >
                            Discover the most anticipated concerts and performances of the season
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Rock Festival',
                                date: 'October 26, 2024',
                                image: '/YC (IMG)/cold.webp',
                                category: 'Rock',
                            },
                            {
                                title: 'Electronic Night',
                                date: 'November 9, 2024',
                                image: '/YC (IMG)/593532f2da6dde2b77402dcc.webp',
                                category: 'Electronic',
                            },
                            {
                                title: 'Jazz Evening',
                                date: 'November 23, 2024',
                                image: '/YC (IMG)/GettyImages-2149383523-3.webp',
                                category: 'Jazz',
                            },
                        ].map((event, index) => (
                            <motion.a
                                key={event.title}
                                variants={fadeInUp}
                                transition={{ delay: index * 0.1 }}
                                className="group cursor-pointer"
                                onClick={() => handleFeaturedArtistClick(index + 1)}
                            >
                                <div className="relative overflow-hidden rounded-xl aspect-[4/3]">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    <div className="absolute bottom-0 left-0 p-6">
                                        <span className="inline-block px-3 py-1 bg-festival-primary text-white text-sm rounded-full mb-2">
                                            {event.category}
                                        </span>
                                        <h3 className="text-xl font-bold text-white mb-1">{event.title}</h3>
                                        <p className="text-white/80">{event.date}</p>
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </motion.section>

            <BestSellerSection />
            <PackagesSection />

            <section className="py-20 bg-black relative overflow-hidden">
                <div className="container relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <h2 className="text-4xl font-bold text-white mb-6">
                            Stay Updated
                        </h2>
                        <p className="text-gray-400 mb-8">
                            Subscribe to our newsletter for exclusive updates and early access to tickets
                        </p>
                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex flex-col sm:flex-row gap-4"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-6 py-4 rounded-full bg-white/10 text-white border border-white/20 focus:outline-none focus:border-festival-secondary"
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-festival-primary text-white rounded-full font-medium hover:bg-festival-primary-dark transition-colors"
                            >
                                Subscribe
                            </motion.button>
                        </motion.form>
                    </motion.div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-festival-primary-dark/20 to-transparent" />
            </section>
            <ExploreSection />

            {/* Call to Action */}
            <motion.section
                variants={fadeInUp}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="py-24 bg-gray-100 rounded-3xl"
            >

                <div className="container">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.h2
                            variants={fadeInUp}
                            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
                        >
                            Ready for the Show?
                        </motion.h2>
                        <motion.p
                            variants={fadeInUp}
                            className="text-gray-600 text-lg mb-8"
                        >
                            Explore upcoming events and book your tickets for an unforgettable experience.
                        </motion.p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/explore')}
                            className="px-8 py-3 bg-festival-primary text-white rounded-lg hover:bg-festival-primary-dark transition-colors"
                        >
                            Explore Events
                        </motion.button>
                    </div>
                </div>
            </motion.section>
        </div>
    )
}