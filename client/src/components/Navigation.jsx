import { useState, useEffect, useCallback } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { cn } from '../lib/utils'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Explore', href: '/explore' },
  { name: 'Packages', href: '/packages' },
  { name: 'Contact', href: '/contact' },
]

const socialLinks = [
  { name: 'Facebook', href: '#' },
  { name: 'Twitter', href: '#' },
  { name: 'Instagram', href: '#' },
]

const sidebarVariants = {
  open: {
    x: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  closed: {
    x: '-100%',
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
}

const overlayVariants = {
  open: { opacity: 1, transition: { duration: 0.3 } },
  closed: { opacity: 0, transition: { duration: 0.2 } },
}

const navItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
}

const mobileNavItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  const toggleSidebar = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  const closeSidebar = useCallback(() => {
    setIsOpen(false)
  }, [])

  useEffect(() => {
    closeSidebar()
  }, [location, closeSidebar])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        closeSidebar()
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleEscKey)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      window.removeEventListener('keydown', handleEscKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, closeSidebar])

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={cn(
          'hidden md:block fixed top-0 left-0 right-0 bg-festival-purple z-50 transition-all duration-300',
          isScrolled ? 'shadow-lg' : ''
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                to="/"
                className="text-2xl font-bold text-white hover:text-festival-text-light transition-colors"
              >
                YOUR CONCERT
              </Link>
            </motion.div>
            
            <div className="hidden md:flex space-x-8">
              {navigation.map((item, i) => (
                <motion.div
                  key={item.name}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={navItemVariants}
                >
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      cn(
                        'text-sm font-medium transition-all duration-300',
                        'hover:text-white hover:scale-110 transform',
                        isActive
                          ? 'text-white'
                          : 'text-festival-text-gray'
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                </motion.div>
              ))}
            </div>

            <div className="hidden md:flex space-x-4">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={navItemVariants}
                  href={link.href}
                  className="text-festival-text-gray hover:text-white transition-all duration-300 hover:scale-110 transform"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-festival-purple text-white hover:bg-festival-purple-light transition-colors"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="overlay"
              initial="closed"
              animate="open"
              exit="closed"
              variants={overlayVariants}
              onClick={closeSidebar}
              className="fixed inset-0 bg-black/50 z-30"
              aria-hidden="true"
            />
          )}
        </AnimatePresence>

        <motion.div
          id="mobile-menu"
          initial="closed"
          animate={isOpen ? 'open' : 'closed'}
          variants={sidebarVariants}
          className="fixed top-0 left-0 h-screen w-72 bg-festival-purple shadow-xl z-40"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col h-full text-festival-text-light">
            <div className="p-8 border-b border-white/10 flex justify-between items-center">
              <Link
                to="/"
                className="text-2xl font-bold tracking-tight hover:text-white transition-colors"
                onClick={closeSidebar}
              >
                YOUR CONCERT
              </Link>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeSidebar}
                className="p-2 hover:bg-festival-purple-light rounded-lg transition-colors"
                aria-label="Close menu"
              >
                <XMarkIcon className="w-6 h-6" />
              </motion.button>
            </div>

            <nav className="flex-1 p-4 overflow-y-auto">
              <ul className="space-y-1">
                {navigation.map((item, i) => (
                  <motion.li
                    key={item.name}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={mobileNavItemVariants}
                  >
                    <NavLink
                      to={item.href}
                      onClick={closeSidebar}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center px-6 py-3 rounded-lg transition-all duration-200',
                          'hover:bg-festival-purple-light hover:translate-x-1',
                          isActive
                            ? 'bg-festival-purple-light font-medium text-white'
                            : 'text-festival-text-gray hover:text-white'
                        )
                      }
                    >
                      {item.name}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="p-6 border-t border-white/10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex justify-center space-x-4 mb-4"
              >
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-festival-text-gray hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.name}
                  </a>
                ))}
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-sm text-festival-text-gray text-center"
              >
                © {new Date().getFullYear()} YOUR CONCERT
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Content Padding for Desktop Navigation */}
      <div className="hidden md:block h-16" />
    </>
  )
}