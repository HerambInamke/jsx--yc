import { useState } from 'react';
import { motion } from 'framer-motion';

const mockOrders = [
  {
    id: '1',
    date: '2024-03-15',
    items: [
      {
        type: 'concert',
        name: 'Coldplay Concert',
        details: 'VIP Pass',
        price: '₹4,999',
      },
      {
        type: 'hotel',
        name: 'Taj Lands End',
        details: '1 Night Stay · Deluxe Room',
        price: '₹7,200',
      },
    ],
    total: '₹12,199',
    status: 'completed',
  },
  {
    id: '2',
    date: '2024-02-28',
    items: [
      {
        type: 'concert',
        name: 'Ed Sheeran Concert',
        details: 'General Admission',
        price: '₹3,500',
      },
    ],
    total: '₹3,500',
    status: 'completed',
  },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container py-12">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-festival-primary/10 rounded-full flex items-center justify-center">
                <span className="text-2xl font-semibold text-festival-primary">JD</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">John Doe</h1>
                <p className="text-gray-600">john.doe@example.com</p>
                <p className="text-gray-600">+91 98765 43210</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-2 rounded-lg transition-colors ${
                activeTab === 'orders'
                  ? 'bg-festival-primary text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-2 rounded-lg transition-colors ${
                activeTab === 'settings'
                  ? 'bg-festival-primary text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Settings
            </button>
          </div>

          {/* Content */}
          {activeTab === 'orders' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {mockOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Order #{order.id}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(order.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          {order.status}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-4 border-t"
                        >
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-600">{item.details}</p>
                          </div>
                          <p className="font-medium">{item.price}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t mt-4">
                      <span className="font-medium">Total</span>
                      <span className="font-bold text-lg">{order.total}</span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-festival-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue="john.doe@example.com"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-festival-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    defaultValue="+91 98765 43210"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-festival-primary focus:border-transparent"
                  />
                </div>
                <button className="mt-4 px-6 py-2 bg-festival-primary text-white rounded-lg hover:bg-festival-primary-dark transition-colors">
                  Save Changes
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}