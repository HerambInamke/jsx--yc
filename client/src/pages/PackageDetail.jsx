import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'

const packageDetails = {
  '1': {
    title: 'Persona Concert Package',
    image: '/YC (IMG)/cold.webp',
    price: '₹1,999',
    date: 'December 20, 2024',
    time: '1 PM - 6:30 PM',
    location: '123 Festival Ave, Music City',
    description: 'Experience the ultimate concert package with premium seating and exclusive amenities.',
    features: [
      'VIP seating in premium section',
      'Exclusive meet & greet opportunity',
      'Commemorative concert merchandise',
      'Priority entrance and parking',
      'Access to VIP lounge',
    ],
    hotel: {
      name: 'Grand Hotel Luxury',
      image: '/YC (IMG)/Arena-End-Stage-Concert-7b19ab95da.jpg',
      amenities: [
        'Luxury accommodation',
        'Complimentary breakfast',
        'Festival shuttle service',
        'Spa access',
      ],
    },
  },
}

export default function PackageDetail() {
  const { id } = useParams()
  const details = packageDetails[id]

  if (!details) {
    return (
      <div className="py-16">
        <div className="container">
          <h1 className="text-4xl font-bold">Package not found</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="py-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <img
                  src={details.image}
                  alt={details.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Hotel Details</h2>
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                  <img
                    src={details.hotel.image}
                    alt={details.hotel.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-medium mb-2">{details.hotel.name}</h3>
                <ul className="space-y-2">
                  {details.hotel.amenities.map((amenity) => (
                    <li key={amenity} className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h1 className="text-4xl font-bold mb-4">{details.title}</h1>
              <div className="text-3xl font-bold text-festival-purple mb-6">
                {details.price}
              </div>
              
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Event Details</h2>
                  <div className="space-y-2 text-gray-600">
                    <p>
                      <span className="font-medium">Date:</span> {details.date}
                    </p>
                    <p>
                      <span className="font-medium">Time:</span> {details.time}
                    </p>
                    <p>
                      <span className="font-medium">Location:</span> {details.location}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-2">Description</h2>
                  <p className="text-gray-600">{details.description}</p>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-2">Package Features</h2>
                  <ul className="space-y-2">
                    {details.features.map((feature) => (
                      <li key={feature} className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 text-festival-purple mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button className="w-full bg-festival-purple text-white py-4 rounded-lg hover:bg-festival-purple-dark transition-colors font-medium">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}