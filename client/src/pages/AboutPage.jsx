import { motion } from 'framer-motion'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container py-12">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8">About Your Concert</h1>
          
          <div className="prose prose-lg">
            <p className="text-xl text-gray-600 mb-8">
              Your Concert is India's premier music festival platform, bringing together the best artists and unforgettable experiences since 2024.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                <p className="text-gray-600">
                  To create extraordinary musical experiences that bring people together and celebrate the diversity of Indian and international music.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
                <p className="text-gray-600">
                  To become the most trusted and innovative platform for live music experiences in India.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-6">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  title: 'Curated Experiences',
                  description: 'Carefully selected venues and artists for the best experience',
                },
                {
                  title: 'Premium Service',
                  description: 'End-to-end support for a seamless concert experience',
                },
                {
                  title: 'Exclusive Access',
                  description: 'Special packages and VIP experiences for our customers',
                },
              ].map((item) => (
                <div key={item.title} className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold mb-6">Our Team</h2>
            <p className="text-gray-600 mb-8">
              We're a passionate team of music lovers, event organizers, and technology experts working together to bring you the best concert experiences.
            </p>

            <div className="bg-festival-primary/5 p-8 rounded-xl mb-12">
              <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
              <p className="text-gray-600">
                Have questions or want to learn more about Your Concert? We'd love to hear from you!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 px-6 py-2 bg-festival-primary text-white rounded-lg hover:bg-festival-primary-dark transition-colors"
              >
                Contact Us
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}