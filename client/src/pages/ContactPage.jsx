export default function ContactPage() {
  return (
    <div className="py-16">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-12">Contact Us</h1>
          
          <form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-festival-purple focus:border-transparent"
              />
            </div>
            
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-festival-purple focus:border-transparent"
              />
            </div>
            
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-festival-purple focus:border-transparent"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-festival-purple text-white py-3 rounded-md hover:bg-festival-purple-dark transition-colors"
            >
              Send Message
            </button>
          </form>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Email: info@yourconcert.com</li>
                <li>Phone: (555) 123-4567</li>
                <li>Address: 123 Music Ave, Concert City</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Business Hours</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
                <li>Saturday: 10:00 AM - 4:00 PM</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}