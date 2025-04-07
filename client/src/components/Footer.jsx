import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const footerLinks = {
  quickLinks: ['Home', 'Explore', 'Packages', 'Contact'],
  social: [
    { name: 'Facebook', href: '#' },
    { name: 'Twitter', href: '#' },
    { name: 'Instagram', href: '#' },
    { name: 'LinkedIn', href: '#' },
  ],
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function Footer() {
  return (
    <footer className="bg-[#C2C4C1] text-black">
      <div className="container py-12 md:py-16">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-12"
        >
          <motion.div variants={item}>
            <h3 className="text-xl font-bold mb-4">YOUR CONCERT</h3>
            <p className="text-gray-700">
              Experience the best music festival of 2024
            </p>
          </motion.div>

          <motion.div variants={item}>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link}>
                  <Link
                    to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                    className="text-gray-700 hover:text-black transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={item}>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-700">
              <li>Email: info@yourconcert.com</li>
              <li>Phone: +91 0123456789</li>
              <li>Address: MIT ADT</li>
            </ul>
          </motion.div>

          <motion.div variants={item}>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {footerLinks.social.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.href}
                  className="text-gray-700 hover:text-black transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {platform.name}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-[#6F7675] text-center text-gray-700"
        >
          <p>© {new Date().getFullYear()} YOUR CONCERT. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}