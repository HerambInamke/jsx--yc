import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">YOUR CONCERT</h3>
            <p className="text-sm text-gray-600">
              Experience the best music festival of 2024
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Explore', 'Packages', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-sm text-gray-600 hover:text-festival-purple"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Email: info@yourconcert.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: 123 Music Ave, Concert City</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {/* Social media links would go here */}
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} YOUR CONCERT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}