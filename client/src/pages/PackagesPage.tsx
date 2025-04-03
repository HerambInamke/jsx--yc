export default function PackagesPage() {
  const packages = [
    {
      name: 'Standard Pass',
      price: '₹1',
      features: ['1-Day Access', 'Standard Viewing Areas', 'Food Court Access'],
    },
    {
      name: 'VIP Pass',
      price: '₹2',
      features: ['2-Day Access', 'VIP Viewing Areas', 'Exclusive Lounge Access', 'Meet & Greet'],
    },
    {
      name: 'Premium Pass',
      price: '₹3',
      features: ['Full Festival Access', 'Backstage Tours', 'Luxury Amenities', 'Private Transport'],
    },
    {
      name: 'Ultimate Experience',
      price: '₹4',
      features: ['All Premium Features', 'Helicopter Transfer', 'Personal Concierge', 'Luxury Accommodation'],
    },
  ]

  return (
    <div className="py-16">
      <div className="container">
        <h1 className="text-4xl font-bold mb-12">Festival Packages</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="aspect-video bg-gray-200" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                <p className="text-2xl font-bold text-festival-purple mb-4">
                  {pkg.price}
                </p>
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="text-sm text-gray-600">
                      • {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-festival-purple text-white py-2 rounded-md hover:bg-festival-purple-dark transition-colors">
                  MORE INFO
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}