import { useState } from 'react';
import { motion } from 'framer-motion';
import Checkout from '../payment/Checkout';

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState('card');

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-8">Payment Details</h1>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹12,199</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>₹500</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹12,699</span>
                </div>
              </div>
            </div>
          </div>

          <button className="w-full bg-festival-primary text-white py-3 rounded-lg hover:bg-festival-primary-dark transition-colors">
            Pay Now
          </button>

          <Checkout/>
        </motion.div>
      </div>
    </div>
  );
}