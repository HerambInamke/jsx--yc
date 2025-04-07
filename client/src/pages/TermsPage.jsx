import { motion } from 'framer-motion'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container py-12">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
          
          <div className="prose prose-lg">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">1. General Terms</h2>
              <p className="text-gray-600 mb-6">
                By accessing and using Your Concert's services, you agree to be bound by these terms and conditions, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
              </p>

              <h2 className="text-2xl font-semibold mb-6">2. Ticket Purchases</h2>
              <ul className="list-disc list-inside text-gray-600 mb-6">
                <li className="mb-2">All ticket sales are final and non-refundable</li>
                <li className="mb-2">Tickets are non-transferable without prior authorization</li>
                <li className="mb-2">Valid ID may be required for entry</li>
                <li className="mb-2">Price and availability are subject to change</li>
              </ul>

              <h2 className="text-2xl font-semibold mb-6">3. Event Policies</h2>
              <ul className="list-disc list-inside text-gray-600 mb-6">
                <li className="mb-2">Entry requirements must be strictly followed</li>
                <li className="mb-2">Management reserves the right to refuse entry</li>
                <li className="mb-2">Recording policies vary by event</li>
                <li className="mb-2">Age restrictions may apply</li>
              </ul>

              <h2 className="text-2xl font-semibold mb-6">4. Privacy Policy</h2>
              <p className="text-gray-600 mb-6">
                We respect your privacy and are committed to protecting your personal data. Our complete privacy policy details how we collect, use, and protect your information.
              </p>

              <h2 className="text-2xl font-semibold mb-6">5. Cancellation Policy</h2>
              <p className="text-gray-600 mb-6">
                In case of event cancellation, ticket holders will be notified and refunded according to our refund policy. Terms may vary based on the specific event.
              </p>
            </div>

            <div className="mt-8 bg-festival-primary/5 p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">Questions?</h2>
              <p className="text-gray-600">
                If you have any questions about our terms and conditions, please contact our support team.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 px-6 py-2 bg-festival-primary text-white rounded-lg hover:bg-festival-primary-dark transition-colors"
              >
                Contact Support
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}