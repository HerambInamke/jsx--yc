import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaHeart, FaShare, FaMapMarkerAlt, FaClock } from 'react-icons/fa'
import { format } from 'date-fns'
import { useNavigate, useParams } from 'react-router-dom'

const concertData = [
  {
    id: 1,
    date: '2025-04-15',
    time: '19:00',
    name: 'Arijit Singh Live',
    location: 'Mumbai, Maharashtra',
    venue: 'Gateway of India Grounds',
    price: {
      standard: '₹1,999',
      vip: '₹4,999'
    },
    image: '/YC (IMG)/cold.webp',
    description: 'Experience the magical voice of Arijit Singh live in concert. An evening filled with soulful melodies and unforgettable moments.',
  },
  {
    id: 2,
    date: '2025-05-02',
    time: '18:30',
    name: 'DIVINE India Tour',
    location: 'Delhi',
    venue: 'Jawaharlal Nehru Stadium',
    price: {
      standard: '₹1,499',
      vip: '₹3,999'
    },
    image: '/YC (IMG)/593532f2da6dde2b77402dcc.webp',
    description: 'Witness the power of Indian hip-hop with DIVINE. Get ready for an electrifying performance that will leave you speechless.',
  }
]

export default function ConcertDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedVenue, setSelectedVenue] = useState('')
  const [isMapOpen, setIsMapOpen] = useState(false)
  const [favorites, setFavorites] = useState(new Set())

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(id)) {
        newFavorites.delete(id)
      } else {
        newFavorites.add(id)
      }
      return newFavorites
    })
  }

  const shareContent = async () => {
    try {
      await navigator.share({
        title: 'Concert Details',
        text: 'Check out this amazing concert!',
        url: window.location.href,
      })
    } catch (err) {
      console.log('Sharing failed:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[40vh] lg:h-[60vh] overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/YC (IMG)/cold.webp')" }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        </div>
        
        <div className="relative container h-full flex flex-col justify-end pb-12">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white"
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">
              Music Festival 2024
            </h1>
            <p className="text-lg lg:text-xl text-gray-200 max-w-2xl">
              Experience the biggest music festival of the year with amazing artists and unforgettable moments.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Filters Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="container py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-festival-primary focus:border-transparent"
            >
              <option value="">Select City</option>
              <option value="mumbai">Mumbai</option>
              <option value="delhi">Delhi</option>
              <option value="bangalore">Bangalore</option>
            </select>

            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-festival-primary focus:border-transparent"
            >
              <option value="">Select Date</option>
              <option value="2024-12-20">December 20, 2024</option>
              <option value="2024-12-21">December 21, 2024</option>
            </select>

            <select
              value={selectedVenue}
              onChange={(e) => setSelectedVenue(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-festival-primary focus:border-transparent"
            >
              <option value="">Select Venue</option>
              <option value="stadium">Main Stadium</option>
              <option value="arena">Concert Arena</option>
            </select>
          </div>
        </div>
      </div>

      {/* Concert Listings */}
      <div className="container py-12">
        <div className="space-y-8">
          {concertData.map((concert) => (
            <motion.div
              key={concert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 relative">
                  <img
                    src={concert.image}
                    alt={concert.name}
                    className="w-full h-48 md:h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                      onClick={() => toggleFavorite(concert.id)}
                      className="p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors"
                    >
                      <FaHeart
                        className={`w-5 h-5 ${
                          favorites.has(concert.id)
                            ? 'text-red-500'
                            : 'text-gray-600'
                        }`}
                      />
                    </button>
                    <button
                      onClick={shareContent}
                      className="p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors"
                    >
                      <FaShare className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                <div className="p-6 md:w-2/3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{concert.name}</h2>
                      <div className="flex items-center text-gray-600 mb-4">
                        <FaMapMarkerAlt className="w-4 h-4 mr-2" />
                        <span>{concert.venue}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Starting from</p>
                      <p className="text-2xl font-bold text-festival-primary">
                        {concert.price.standard}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">{concert.description}</p>

                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center text-gray-600">
                      <FaClock className="w-4 h-4 mr-2" />
                      <span>
                        {format(new Date(`${concert.date} ${concert.time}`), 'PPp')}
                      </span>
                    </div>

                    <button
                      onClick={() => setIsMapOpen(true)}
                      className="text-festival-primary hover:text-festival-primary-dark font-medium"
                    >
                      View Venue Map
                    </button>

                    <button 
                      onClick={() => navigate(`/concert-details/${concert.id}/tickets`)}
                      className="ml-auto bg-festival-primary text-white px-6 py-2 rounded-lg hover:bg-festival-primary-dark transition-colors"
                    >
                      Book Tickets
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Venue Map Modal */}
      {isMapOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-6 rounded-xl max-w-3xl w-full mx-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Venue Map</h3>
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
          </motion.div>
        </div>
      )}

      {/* Sticky Venue Map and Navigation Tabs for Coldplay */}
      {id === '1' && (
        <div className="container mt-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sticky Map */}
            <div className="lg:w-1/2">
              <div className="bg-white rounded-xl p-6 shadow-md sticky top-24 z-20">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Venue Map</h2>
                <div className="relative overflow-hidden rounded-lg">
                  <img 
                    src="/YC (IMG)/VSHA19_SeatingMap_ConcertEnd-jpg.webp"
                    alt="Venue Map" 
                    className="w-full h-auto transition-transform hover:scale-105 duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2 text-center">
                    Click to enlarge
                  </div>
                </div>
                {/* Ticker-style scrolling */}
                <div className="mt-6 overflow-x-auto whitespace-nowrap border-t pt-3 animate-marquee text-festival-primary font-semibold text-sm">
                  <span className="inline-block mr-8">VIP Section: Premium viewing • Dedicated entrance • Lounge access</span>
                  <span className="inline-block mr-8">General Admission: Standing area • First come, first served • Main facilities</span>
                  <span className="inline-block mr-8">Parking • Shuttle Service • Food & Beverage • Medical Services</span>
                </div>
              </div>
            </div>
            {/* Navigation Tabs */}
            <div className="lg:w-1/2 flex flex-col gap-6">
              <div className="flex space-x-4 mb-4 sticky top-8 z-30 bg-white py-2 rounded shadow">
                <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="px-4 py-2 rounded-lg font-semibold text-festival-primary hover:bg-festival-primary/10 transition">Data</button>
                <button onClick={() => window.location.hash = '#upcoming'} className="px-4 py-2 rounded-lg font-semibold text-festival-primary hover:bg-festival-primary/10 transition">Upcoming Shows</button>
                <button onClick={() => window.location.hash = '#past'} className="px-4 py-2 rounded-lg font-semibold text-festival-primary hover:bg-festival-primary/10 transition">Past Shows</button>
              </div>
              {/* Placeholder for tab content, can be replaced with real data */}
              <div id="upcoming" className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-bold mb-2">Upcoming Shows</h3>
                <ul className="list-disc pl-5 text-gray-700">
                  <li>April 15, 2025 – Mumbai</li>
                  <li>May 2, 2025 – Delhi</li>
                </ul>
              </div>
              <div id="past" className="bg-white rounded-xl shadow p-6 mt-4">
                <h3 className="text-lg font-bold mb-2">Past Shows</h3>
                <ul className="list-disc pl-5 text-gray-700">
                  <li>March 10, 2024 – Bangalore</li>
                  <li>February 5, 2024 – Hyderabad</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}