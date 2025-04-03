import { motion } from 'framer-motion'
import HeroSection from '../components/sections/HeroSection'
import ExploreSection from '../components/sections/ExploreSection'
import FeaturedTextSection from '../components/sections/FeaturedTextSection'
import BestSellerSection from '../components/sections/BestSellerSection'
import PackagesSection from '../components/sections/PackagesSection'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      
      {/* Featured Artists Banner */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative py-20 bg-gradient-to-br from-festival-purple to-festival-purple-dark"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('/YC (IMG)/gradient-halftone-music-festival-twitter-header_23-2149176908.jpg')"
          }}
        />
        
        <div className="container relative z-10">
          <div className="text-center text-white mb-12">
            <h2 className="text-4xl font-bold mb-4">Featured Artists</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Experience the magic of live performances from world-renowned artists
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Main Stage',
                image: '/YC (IMG)/cold.webp',
                description: 'Headline performances',
              },
              {
                name: 'Electronic Arena',
                image: '/YC (IMG)/593532f2da6dde2b77402dcc.webp',
                description: 'EDM and electronic music',
              },
              {
                name: 'Acoustic Garden',
                image: '/YC (IMG)/GettyImages-2149383523-3.webp',
                description: 'Intimate acoustic sessions',
              },
            ].map((stage) => (
              <motion.div
                key={stage.name}
                whileHover={{ scale: 1.05 }}
                className="relative rounded-lg overflow-hidden aspect-[4/3]"
              >
                <img
                  src={stage.image}
                  alt={stage.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{stage.name}</h3>
                  <p className="text-white/80">{stage.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      
      <ExploreSection />
      <FeaturedTextSection />
      <BestSellerSection />
      
      {/* Venue Map Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Venue Map</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Plan your festival experience with our detailed venue map
            </p>
          </div>
          
          <div className="relative rounded-lg overflow-hidden shadow-xl">
            <img
              src="/YC (IMG)/VSHA19_SeatingMap_ConcertEnd-jpg.webp"
              alt="Venue Map"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>
      
      <PackagesSection />
    </div>
  )
}