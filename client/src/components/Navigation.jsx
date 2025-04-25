import { useState, useEffect, useCallback } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Bars3Icon, XMarkIcon, ShoppingCartIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { cn } from '../lib/utils'
import { useAuth } from '../contexts/AuthContext'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Explore', href: '/explore' },
  { name: 'Hotels', href: '/hotels' },
  { name: 'Packages', href: '/packages' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

const socialLinks = [
  { name: 'Facebook', href: '#' },
  { name: 'Twitter', href: '#' },
  { name: 'Instagram', href: '#' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { currentUser, isAuthenticated } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  const toggleProfileMenu = useCallback(() => {
    setIsProfileMenuOpen(prev => !prev)
  }, [])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}
    >
      <nav className="container mx-auto">
        <div className="flex items-center justify-between h-20">
          <Link
            to="/"
            className="text-2xl font-light tracking-wider hover:text-festival-primary transition-colors"
          >
            YOUR CONCERT
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    'text-sm tracking-wide transition-colors',
                    isActive ? 'text-festival-primary' : 'text-gray-600 hover:text-festival-primary'
                  )
                }
              >
                {item.name}
              </NavLink>
            ))}
            
            {isAuthenticated ? (
              <>
                <Link to="/cart" className="p-2 text-gray-600 hover:text-festival-primary transition-colors">
                  <ShoppingCartIcon className="h-6 w-6" />
                </Link>
                <div className="relative">
                  <button
                    onClick={toggleProfileMenu}
                    className="p-2 text-gray-600 hover:text-festival-primary transition-colors flex items-center"
                  >
                    <UserCircleIcon className="h-6 w-6 mr-1" />
                    <span className="text-sm truncate max-w-[100px]">
                      {currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Profile'}
                    </span>
                  </button>
                  
                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        Your Profile
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsProfileMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-md bg-festival-primary text-white hover:bg-festival-secondary transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-600 hover:text-festival-primary transition-colors"
          >
            {isOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="container py-4">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'block py-2 text-sm transition-colors',
                      isActive ? 'text-festival-primary' : 'text-gray-600 hover:text-festival-primary'
                    )
                  }
                >
                  {item.name}
                </NavLink>
              ))}
              <div className="mt-4 pt-4 border-t">
                <Link
                  to="/terms"
                  className="block py-2 text-sm text-gray-600 hover:text-festival-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Terms & Conditions
                </Link>
                
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      className="block py-2 text-sm text-gray-600 hover:text-festival-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/cart"
                      className="block py-2 text-sm text-gray-600 hover:text-festival-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      Cart
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="block w-full text-left py-2 text-sm text-gray-600 hover:text-festival-primary"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block py-2 text-sm text-gray-600 hover:text-festival-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="block py-2 text-sm text-gray-600 hover:text-festival-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}