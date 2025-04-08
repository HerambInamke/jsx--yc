import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaChevronDown, FaFilter, FaMapMarkerAlt, FaClock, FaCalendarAlt } from 'react-icons/fa'

// Import concert data from ConcertDetails to keep it consistent
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

// Dummy ticket data for different zones
const ticketData = [
  { id: 1, section: 'Section 1', row: 'A', price: 'INR 3000', available: true },
  { id: 2, section: 'Section 2', row: 'B', price: 'INR 3100', available: true },
  { id: 3, section: 'Section 3', row: 'C', price: 'INR 3200', available: true },
  { id: 4, section: 'Section 4', row: 'D', price: 'INR 3300', available: true },
  { id: 5, section: 'Section 5', row: 'E', price: 'INR 3400', available: true },
]

export default function TicketPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [concert, setConcert] = useState(null)
  const [filterOpen, setFilterOpen] = useState(false)
  const [ticketsOpen, setTicketsOpen] = useState(false)
  const [priceOpen, setPriceOpen] = useState(false)
  const [zonesOpen, setZonesOpen] = useState(false)
  const [selectedZone, setSelectedZone] = useState(null)
  const [selectedTicket, setSelectedTicket] = useState(null)
  
  useEffect(() => {
    // Find the concert from the data based on the ID
    const foundConcert = concertData.find(c => c.id === parseInt(id))
    if (foundConcert) {
      setConcert(foundConcert)
    } else {
      // If concert not found, navigate back to concerts page
      navigate('/explore')
    }
  }, [id, navigate])

  if (!concert) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-8 bg-white rounded-xl shadow-md">
          <div className="w-16 h-16 border-4 border-festival-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium text-center">Loading event details...</p>
        </div>
      </div>
    )
  }

  // Format the date
  const eventDate = new Date(concert.date)
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      {/* Artist Info Header */}
      <div className="bg-white border-b shadow-sm sticky top-16 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{concert.name}</h1>
              <div className="mt-2 flex flex-col sm:flex-row sm:items-center text-gray-600 space-y-1 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2 text-festival-primary" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center">
                  <FaClock className="mr-2 text-festival-primary" />
                  <span>{concert.time}</span>
                </div>
              </div>
              <div className="mt-2 flex items-center text-gray-600">
                <FaMapMarkerAlt className="mr-2 text-festival-primary" />
                <span>{concert.venue}, {concert.location}</span>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="inline-block px-4 py-2 bg-pink-100 text-pink-800 font-medium text-sm rounded-full">
                High Demand Event
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Row */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <button 
              onClick={() => setFilterOpen(!filterOpen)} 
              className="px-5 py-2.5 bg-white border border-gray-300 rounded-lg flex items-center space-x-2 hover:bg-gray-50 transition-colors shadow-sm"
            >
              <FaFilter className="h-4 w-4 text-gray-500" />
              <span className="font-medium text-gray-700">Filter</span>
              <FaChevronDown className={`h-3 w-3 text-gray-500 transition-transform ${filterOpen ? 'transform rotate-180' : ''}`} />
            </button>
            {filterOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 mt-2 w-56 bg-white shadow-xl rounded-lg p-2 z-10 border border-gray-100"
              >
                <div className="p-2.5 hover:bg-gray-50 rounded-md cursor-pointer transition-colors flex items-center">
                  <span className="ml-2">Price: Low to High</span>
                </div>
                <div className="p-2.5 hover:bg-gray-50 rounded-md cursor-pointer transition-colors flex items-center">
                  <span className="ml-2">Price: High to Low</span>
                </div>
                <div className="p-2.5 hover:bg-gray-50 rounded-md cursor-pointer transition-colors flex items-center">
                  <span className="ml-2">Best Available</span>
                </div>
              </motion.div>
            )}
          </div>

          <div className="relative">
            <button 
              onClick={() => setTicketsOpen(!ticketsOpen)} 
              className="px-5 py-2.5 bg-white border border-gray-300 rounded-lg flex items-center space-x-2 hover:bg-gray-50 transition-colors shadow-sm"
            >
              <span className="font-medium text-gray-700">Tickets</span>
              <FaChevronDown className={`h-3 w-3 text-gray-500 transition-transform ${ticketsOpen ? 'transform rotate-180' : ''}`} />
            </button>
            {ticketsOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 mt-2 w-56 bg-white shadow-xl rounded-lg p-2 z-10 border border-gray-100"
              >
                <div className="p-2.5 hover:bg-gray-50 rounded-md cursor-pointer transition-colors">1 Ticket</div>
                <div className="p-2.5 hover:bg-gray-50 rounded-md cursor-pointer transition-colors">2 Tickets</div>
                <div className="p-2.5 hover:bg-gray-50 rounded-md cursor-pointer transition-colors">3 Tickets</div>
                <div className="p-2.5 hover:bg-gray-50 rounded-md cursor-pointer transition-colors">4 Tickets</div>
              </motion.div>
            )}
          </div>

          <div className="relative">
            <button 
              onClick={() => setPriceOpen(!priceOpen)} 
              className="px-5 py-2.5 bg-white border border-gray-300 rounded-lg flex items-center space-x-2 hover:bg-gray-50 transition-colors shadow-sm"
            >
              <span className="font-medium text-gray-700">Price Range</span>
              <FaChevronDown className={`h-3 w-3 text-gray-500 transition-transform ${priceOpen ? 'transform rotate-180' : ''}`} />
            </button>
            {priceOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 mt-2 w-56 bg-white shadow-xl rounded-lg p-2 z-10 border border-gray-100"
              >
                <div className="p-2.5 hover:bg-gray-50 rounded-md cursor-pointer transition-colors">₹0 - ₹1,999</div>
                <div className="p-2.5 hover:bg-gray-50 rounded-md cursor-pointer transition-colors">₹2,000 - ₹3,999</div>
                <div className="p-2.5 hover:bg-gray-50 rounded-md cursor-pointer transition-colors">₹4,000 - ₹5,999</div>
                <div className="p-2.5 hover:bg-gray-50 rounded-md cursor-pointer transition-colors">₹6,000+</div>
              </motion.div>
            )}
          </div>

          <div className="relative">
            <button 
              onClick={() => setZonesOpen(!zonesOpen)} 
              className="px-5 py-2.5 bg-white border border-gray-300 rounded-lg flex items-center space-x-2 hover:bg-gray-50 transition-colors shadow-sm"
            >
              <span className="font-medium text-gray-700">Seating Zones</span>
              <FaChevronDown className={`h-3 w-3 text-gray-500 transition-transform ${zonesOpen ? 'transform rotate-180' : ''}`} />
            </button>
            {zonesOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 mt-2 w-56 bg-white shadow-xl rounded-lg p-2 z-10 border border-gray-100"
              >
                <div className="p-2.5 hover:bg-gray-50 rounded-md cursor-pointer transition-colors">All Zones</div>
                <div className="p-2.5 hover:bg-gray-50 rounded-md cursor-pointer transition-colors">VIP</div>
                <div className="p-2.5 hover:bg-gray-50 rounded-md cursor-pointer transition-colors">Premium</div>
                <div className="p-2.5 hover:bg-gray-50 rounded-md cursor-pointer transition-colors">General</div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Seating Map */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl p-6 shadow-md">
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
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Available</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Limited</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Sold Out</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Selected</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ticket Options */}
          <div className="lg:w-1/2">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Available Tickets</h2>
            <div className="space-y-5">
              {ticketData.map((ticket) => (
                <motion.div 
                  key={ticket.id}
                  whileHover={{ y: -2 }}
                  className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:border-festival-primary transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-2">
                      <h3 className="font-bold text-lg text-gray-800">{ticket.section}</h3>
                      <p className="text-gray-600">Row {ticket.row}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-xl text-festival-primary">{ticket.price}</div>
                      <div className="text-xs text-gray-500">per ticket</div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>Center stage view • Good visibility</p>
                    <p>Electronic tickets • Instant delivery</p>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button 
                      className="bg-festival-primary text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition-colors font-semibold shadow-md hover:shadow-lg"
                    >
                      SELECT TICKETS
                    </button>
                  </div>
                </motion.div>
              ))}
              
              {/* More tickets section */}
              <div className="bg-gray-100 rounded-xl p-6 border border-dashed border-gray-300 text-center">
                <h3 className="font-medium text-gray-700">Looking for more options?</h3>
                <p className="text-gray-600 mt-2 mb-4">Check back later or try different filters</p>
                <button className="text-festival-primary font-medium hover:underline">
                  Notify me when more tickets are available
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating action button */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-festival-primary text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-opacity-90 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
    </div>
  )
}