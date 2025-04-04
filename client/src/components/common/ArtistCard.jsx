import { useState } from 'react'
import { motion } from 'framer-motion'
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import { MapIcon } from '@heroicons/react/24/outline'

export default function ArtistCard({
  image,
  name,
  colorDot,
  isFavorite: initialFavorite,
  onFavoriteToggle,
  showVenueMap,
}) {
  const [isFavorite, setIsFavorite] = useState(initialFavorite)
  const [isMapOpen, setIsMapOpen] = useState(false)

  const dotColors = {
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    yellow: 'bg-yellow-500',
  }

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite)
    onFavoriteToggle?.()
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative w-full rounded-xl overflow-hidden bg-white shadow-lg"
    >
      <div
        className="relative aspect-[16/10] bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute top-4 right-4 flex space-x-2">
          <div
            className={`w-3 h-3 rounded-full ${dotColors[colorDot]}`}
          />
        </div>
        
        {onFavoriteToggle && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleFavoriteClick}
            className="absolute top-4 left-4 text-white"
          >
            {isFavorite ? (
              <HeartSolid className="w-6 h-6 text-red-500" />
            ) : (
              <HeartOutline className="w-6 h-6" />
            )}
          </motion.button>
        )}

        {showVenueMap && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMapOpen(true)}
            className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full flex items-center space-x-2 hover:bg-white/30 transition-colors"
          >
            <MapIcon className="w-4 h-4" />
            <span className="text-sm">View Map</span>
          </motion.button>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
      </div>

      {isMapOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-3xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-semibold">Venue Map</h4>
              <button
                onClick={() => setIsMapOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>
            <img
              src="/YC (IMG)/VSHA19_SeatingMap_ConcertEnd-jpg.webp"
              alt="Venue Map"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      )}
    </motion.div>
  )
}