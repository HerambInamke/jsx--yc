import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaHeart, FaShare } from 'react-icons/fa'
import { Rating } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import hotelData from '../StaticData/hotelData'

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

const HotelDetails = () => {
  const [filters, setFilters] = useState({
    radius: '',
    rating: '',
    price: '',
  })
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(43)

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }))
  }

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Hotel Details',
        text: 'Check out these amazing hotels!',
        url: window.location.href,
      })
    } catch (error) {
      console.error('Error sharing:', error)
    }
  }

  const handleLike = () => {
    setLiked(prev => !prev)
    setLikeCount(prev => liked ? prev - 1 : prev + 1)
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className="min-h-screen bg-gray-50"
    >
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-gradient-to-r from-festival-primary to-festival-primary-dark overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/Backgrounds/hotel_bg.png')" }}
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
        </motion.div>

        <div className="relative container h-full flex flex-col justify-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Hotels in Pune</h1>
            <p className="text-lg text-white/80">Location near Concert Stadium</p>
          </motion.div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="container py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormControl fullWidth size="small">
              <InputLabel>Radius</InputLabel>
              <Select
                value={filters.radius}
                label="Radius"
                onChange={(e) => handleFilterChange('radius', e.target.value)}
              >
                {[1, 2, 3, 4, 5].map((km) => (
                  <MenuItem key={km} value={km}>{km} Km</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel>Rating</InputLabel>
              <Select
                value={filters.rating}
                label="Rating"
                onChange={(e) => handleFilterChange('rating', e.target.value)}
              >
                {[5, 4, 3, 2, 1].map((stars) => (
                  <MenuItem key={stars} value={stars}>{stars} Stars</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel>Price</InputLabel>
              <Select
                value={filters.price}
                label="Price"
                onChange={(e) => handleFilterChange('price', e.target.value)}
              >
                {[30000, 25000, 20000, 15000, 10000].map((price) => (
                  <MenuItem key={price} value={price}>Under ₹{price}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="flex justify-end items-center space-x-4 mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLike}
              className="flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-sm hover:shadow transition-all"
            >
              <span className="text-gray-700">{likeCount}</span>
              <FaHeart className={`w-5 h-5 ${liked ? 'text-red-500' : 'text-gray-400'}`} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="p-2 bg-white rounded-full shadow-sm hover:shadow transition-all"
            >
              <FaShare className="w-5 h-5 text-gray-600" />
            </motion.button>
          </div>
        </div>

        {/* Hotel Listings */}
        <div className="space-y-6">
          <AnimatePresence>
            {hotelData.map((hotel, index) => (
              <motion.div
                key={hotel.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <img
                      src={hotel.coverImg}
                      alt={hotel.name}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{hotel.name}</h3>
                        <p className="text-gray-600 text-sm mb-4">{hotel.location}</p>
                        <Rating
                          value={hotel.rating}
                          precision={0.5}
                          readOnly
                          size="small"
                        />
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Starting from</p>
                        <p className="text-2xl font-bold text-festival-primary">₹{hotel.price}</p>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        {hotel.inRadius}km from venue
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 bg-festival-primary text-white rounded-lg hover:bg-festival-primary-dark transition-colors"
                      >
                        View Details
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

export default HotelDetails