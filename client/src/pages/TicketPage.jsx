import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaChevronDown, FaFilter } from 'react-icons/fa'

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
  { id: 1, section: 'Section 1', row: 'A', price: 'INR 3456', available: true },
  { id: 2, section: 'Section 2', row: 'B', price: 'INR 3456', available: true },
  { id: 3, section: 'Section 3', row: 'C', price: 'INR 3456', available: true },
  { id: 4, section: 'Section 4', row: 'D', price: 'INR 3456', available: true },
  { id: 5, section: 'Section 5', row: 'E', price: 'INR 3456', available: true },
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
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Artist Info Header */}
      <div className="bg-white border-b">
        <div className="container py-4">
          <h1 className="text-2xl font-bold">{concert.name}</h1>
          <div className="text-gray-600">
            <p>{concert.date.replace(/-/g, '/')} - {concert.time}</p>
            <p>{concert.venue}</p>
          </div>
          <div className="mt-2 inline-block px-3 py-1 bg-gray-200 text-xs rounded">
            demand
          </div>
        </div>
      </div>

      {/* Filter Row */}
      <div className="container py-4">
        <div className="flex space-x-2">
          <div className="relative">
            <button 
              onClick={() => setFilterOpen(!filterOpen)} 
              className="px-4 py-2 bg-white border rounded flex items-center space-x-2"
            >
              <span>filter</span>
              <FaChevronDown className="h-3 w-3" />
            </button>
            {filterOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white shadow-lg rounded p-2 z-10">
                <div className="p-2 hover:bg-gray-100 cursor-pointer">Price: Low to High</div>
                <div className="p-2 hover:bg-gray-100 cursor-pointer">Price: High to Low</div>
                <div className="p-2 hover:bg-gray-100 cursor-pointer">Best Available</div>
              </div>
            )}
          </div>

          <div className="relative">
            <button 
              onClick={() => setTicketsOpen(!ticketsOpen)} 
              className="px-4 py-2 bg-white border rounded flex items-center space-x-2"
            >
              <span>tickets</span>
              <FaChevronDown className="h-3 w-3" />
            </button>
            {ticketsOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white shadow-lg rounded p-2 z-10">
                <div className="p-2 hover:bg-gray-100 cursor-pointer">1 Ticket</div>
                <div className="p-2 hover:bg-gray-100 cursor-pointer">2 Tickets</div>
                <div className="p-2 hover:bg-gray-100 cursor-pointer">3 Tickets</div>
                <div className="p-2 hover:bg-gray-100 cursor-pointer">4 Tickets</div>
              </div>
            )}
          </div>

          <div className="relative">
            <button 
              onClick={() => setPriceOpen(!priceOpen)} 
              className="px-4 py-2 bg-white border rounded flex items-center space-x-2"
            >
              <span>price</span>
              <FaChevronDown className="h-3 w-3" />
            </button>
            {priceOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white shadow-lg rounded p-2 z-10">
                <div className="p-2 hover:bg-gray-100 cursor-pointer">₹0 - ₹1,999</div>
                <div className="p-2 hover:bg-gray-100 cursor-pointer">₹2,000 - ₹3,999</div>
                <div className="p-2 hover:bg-gray-100 cursor-pointer">₹4,000 - ₹5,999</div>
                <div className="p-2 hover:bg-gray-100 cursor-pointer">₹6,000+</div>
              </div>
            )}
          </div>

          <div className="relative">
            <button 
              onClick={() => setZonesOpen(!zonesOpen)} 
              className="px-4 py-2 bg-white border rounded flex items-center space-x-2"
            >
              <span>zones</span>
              <FaChevronDown className="h-3 w-3" />
            </button>
            {zonesOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white shadow-lg rounded p-2 z-10">
                <div className="p-2 hover:bg-gray-100 cursor-pointer">All Zones</div>
                <div className="p-2 hover:bg-gray-100 cursor-pointer">VIP</div>
                <div className="p-2 hover:bg-gray-100 cursor-pointer">Premium</div>
                <div className="p-2 hover:bg-gray-100 cursor-pointer">General</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container py-4 flex flex-col lg:flex-row gap-6">
        {/* Seating Map */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <img 
              src="/YC (IMG)/VSHA19_SeatingMap_ConcertEnd-jpg.webp"
              alt="Venue Map" 
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Ticket Options */}
        <div className="lg:w-1/2">
          <div className="space-y-4">
            {ticketData.map((ticket) => (
              <div 
                key={ticket.id}
                className="bg-white rounded-lg p-4 shadow-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-1">
                    <div className="h-4 bg-gray-300 w-32 rounded"></div>
                    <div className="h-3 bg-gray-200 w-24 rounded"></div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{ticket.price}</div>
                    <div className="text-xs text-gray-500">each</div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="h-3 bg-gray-200 w-40 rounded"></div>
                  <div className="h-3 bg-gray-200 w-36 rounded"></div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button 
                    className="bg-festival-primary text-white px-6 py-2 rounded-full hover:bg-festival-primary-dark transition-colors"
                  >
                    NEXT
                  </button>
                </div>
              </div>
            ))}
            
            {/* More tickets section */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                  <div className="h-4 bg-gray-300 w-32 rounded"></div>
                  <div className="h-3 bg-gray-200 w-24 rounded"></div>
                </div>
                <div className="text-right">
                  <div className="font-bold">INR 3456</div>
                  <div className="text-xs text-gray-500">each</div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="h-3 bg-gray-200 w-40 rounded"></div>
                <div className="h-3 bg-gray-200 w-36 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 