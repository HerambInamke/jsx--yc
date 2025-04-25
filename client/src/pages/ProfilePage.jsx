import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../firebase';
import { updateProfile, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';

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
  const { currentUser } = useAuth();
  
  // Profile states
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setDisplayName(currentUser.displayName || '');
      setEmail(currentUser.email || '');
      setPhone(currentUser.phoneNumber || '');
    }
  }, [currentUser]);

  const reauthenticate = async (currentPassword) => {
    try {
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        currentPassword
      );
      await reauthenticateWithCredential(auth.currentUser, credential);
      return true;
    } catch (error) {
      console.error("Error reauthenticating", error);
      setError("Current password is incorrect");
      return false;
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
    try {
      // A valid password is required to change email
      const updatesRequiringAuth = email !== currentUser.email;
      
      if (updatesRequiringAuth) {
        if (!currentPassword) {
          setError('Current password is required to update email');
          setLoading(false);
          return;
        }
        
        const reauthed = await reauthenticate(currentPassword);
        if (!reauthed) {
          setLoading(false);
          return;
        }
      }
      
      // Update display name
      if (displayName !== currentUser.displayName) {
        await updateProfile(auth.currentUser, {
          displayName: displayName
        });
      }
      
      // Update email if changed
      if (email !== currentUser.email) {
        await updateEmail(auth.currentUser, email);
      }
      
      // Update password if provided
      if (newPassword) {
        if (newPassword.length < 6) {
          setError('Password must be at least 6 characters');
          setLoading(false);
          return;
        }
        
        if (newPassword !== confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        
        if (!currentPassword) {
          setError('Current password is required to update password');
          setLoading(false);
          return;
        }
        
        const reauthed = await reauthenticate(currentPassword);
        if (reauthed) {
          await updatePassword(auth.currentUser, newPassword);
          setNewPassword('');
          setConfirmPassword('');
          setCurrentPassword('');
        } else {
          setLoading(false);
          return;
        }
      }
      
      setSuccess('Profile updated successfully');
      setCurrentPassword('');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Get initials for avatar
  const getInitials = () => {
    if (currentUser?.displayName) {
      return currentUser.displayName
        .split(' ')
        .map(name => name[0])
        .join('');
    } else if (currentUser?.email) {
      return currentUser.email.substring(0, 2).toUpperCase();
    } else {
      return 'U';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container py-12">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-festival-primary/10 rounded-full flex items-center justify-center">
                <span className="text-2xl font-semibold text-festival-primary">{getInitials()}</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">{currentUser?.displayName || 'User'}</h1>
                <p className="text-gray-600">{currentUser?.email}</p>
                <p className="text-gray-600">{currentUser?.phoneNumber || 'No phone number'}</p>
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
              {mockOrders.length > 0 ? (
                mockOrders.map((order) => (
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
                ))
              ) : (
                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                  <p className="text-gray-600">You don't have any orders yet.</p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
              
              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
                  {success}
                </div>
              )}
              
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-festival-primary focus:border-transparent"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-festival-primary focus:border-transparent"
                    disabled={loading}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Changing your email requires re-authentication.
                  </p>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-2">Change Password</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={isPasswordVisible ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-festival-primary focus:border-transparent"
                        disabled={loading}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-600"
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      >
                        {isPasswordVisible ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 mt-2">
                      Confirm New Password
                    </label>
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-festival-primary focus:border-transparent"
                      disabled={loading}
                    />
                  </div>
                </div>
                
                {(email !== currentUser?.email || newPassword) && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password (required for security)
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-festival-primary focus:border-transparent"
                      disabled={loading}
                      required={email !== currentUser?.email || !!newPassword}
                    />
                  </div>
                )}
                
                <button 
                  type="submit" 
                  className="mt-4 px-6 py-2 bg-festival-primary text-white rounded-lg hover:bg-festival-primary-dark transition-colors disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}