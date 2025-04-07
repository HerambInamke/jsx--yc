import { motion } from 'framer-motion'

const services = [
  {
    title: 'Concert Tickets',
    description: 'Book tickets for your favorite artists with exclusive early access and VIP options.',
    icon: '🎫',
  },
  {
    title: 'Hotel Bookings',
    description: 'Find and book accommodation near concert venues with special discounts.',
    icon: '🏨',
  },
  {
    title: 'Travel Packages',
    description: 'Complete travel packages including tickets, stay, and transportation.',
    icon: '✈️',
  },
  {
    title: 'VIP Experiences',
    description: 'Exclusive meet & greet opportunities and backstage access.',
    icon: '⭐',
  },
  {
    title: 'Group Bookings',
    description: 'Special rates and arrangements for group concert experiences.',
    icon: '👥',
  }
]

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container py-12">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8">Our Services</h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl">
            Discover our comprehensive range of services designed to make your concert experience unforgettable from start to finish.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-16 bg-festival-primary/5 p-8 rounded-xl text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Need Custom Services?</h2>
            <p className="text-gray-600 mb-6">
              We offer tailored solutions for special requirements. Get in touch with our team to discuss your needs.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-festival-primary text-white rounded-lg hover:bg-festival-primary-dark transition-colors"
            >
              Contact Us
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}