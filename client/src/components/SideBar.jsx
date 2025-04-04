import { useState, useEffect } from 'react'
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

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && !e.target.closest('.sidebar')) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-festival-purple text-white md:hidden hover:bg-festival-purple-light transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <Bars3Icon className="w-6 h-6" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-30 md:hidden"
          />
        )}
      </AnimatePresence>

      <div
        className={cn(
          'sidebar fixed md:sticky top-0 left-0 h-screen w-72 z-40',
          'bg-festival-purple shadow-xl',
          'transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        <div className="flex flex-col h-full text-festival-text-light">
          <div className="p-8 border-b border-white/10">
            <Link
              to="/"
              className="text-2xl font-bold tracking-tight hover:text-white transition-colors"
            >
              YOUR CONCERT
            </Link>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.href}
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
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-6 border-t border-white/10">
            <div className="flex justify-center space-x-4 mb-4">
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
            </div>
            <p className="text-sm text-festival-text-gray text-center">
              © {new Date().getFullYear()} YOUR CONCERT
            </p>
          </div>
        </div>
      </div>
    </>
  )
}