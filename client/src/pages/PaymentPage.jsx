import { useState } from 'react';
import { motion } from 'framer-motion';

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
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>
              <div className="grid grid-cols-3 gap-4">
                {['card', 'upi', 'netbanking'].map((method) => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      paymentMethod === method
                        ? 'border-festival-primary bg-festival-primary/5'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="text-center">
                      <div className="font-medium capitalize">{method}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-festival-primary focus:border-transparent"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-festival-primary focus:border-transparent"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-festival-primary focus:border-transparent"
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    UPI ID
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-festival-primary focus:border-transparent"
                    placeholder="username@upi"
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'netbanking' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Bank
                  </label>
                  <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-festival-primary focus:border-transparent">
                    <option>Select your bank</option>
                    <option>State Bank of India</option>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                  </select>
                </div>
              </div>
            )}
          </div>

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
        </motion.div>
      </div>
    </div>
  );
}