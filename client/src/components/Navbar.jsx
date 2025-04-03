import { Link, NavLink } from 'react-router-dom'
import { cn } from '../lib/utils'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Explore', href: '/explore' },
  { name: 'Packages', href: '/packages' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-festival-purple">
            YOUR CONCERT
          </Link>
          
          <div className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    'text-sm font-medium transition-colors hover:text-festival-purple',
                    isActive ? 'text-festival-purple' : 'text-gray-700'
                  )
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}