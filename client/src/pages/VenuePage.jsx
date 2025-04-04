import { motion } from 'framer-motion'

export default function VenuePage() {
  return (
    <div className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8">Venue Information</h1>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="relative aspect-[16/9]">
              <img
                src="/YC (IMG)/VSHA19_SeatingMap_ConcertEnd-jpg.webp"
                alt="Venue Map"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-8">
              <h2 className="text-2xl font-semibold mb-4">Seating Arrangement</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium mb-2">VIP Section</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Premium viewing experience</li>
                    <li>• Dedicated entrance</li>
                    <li>• Exclusive lounge access</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">General Admission</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Standing area</li>
                    <li>• First come, first served</li>
                    <li>• Access to main facilities</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Venue Facilities</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-festival-primary rounded-full mr-2"></span>
                  Food & Beverage Stations
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-festival-primary rounded-full mr-2"></span>
                  Medical Services
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-festival-primary rounded-full mr-2"></span>
                  Restrooms
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-festival-primary rounded-full mr-2"></span>
                  Information Desk
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Getting There</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-festival-primary rounded-full mr-2"></span>
                  Parking Available
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-festival-primary rounded-full mr-2"></span>
                  Shuttle Service
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-festival-primary rounded-full mr-2"></span>
                  Public Transport
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-festival-primary rounded-full mr-2"></span>
                  Taxi Drop-off Point
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}