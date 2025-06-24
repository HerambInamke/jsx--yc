import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import SectionHeading from '../common/SectionHeading'
import PackageCard from '../common/PackageCard'

const packages = [
  {
    id: '1',
    image: '/YC (IMG)/cold.webp',
    concertName: 'Persona',
    artistName: 'Various Artists',
    timeRange: '1 PM - 6:30 PM',
    locationDetails: '123 Festival Ave, Music City, MC 12345',
    hotelName: 'Grand Hotel',
    hotelDetails: 'Luxury accommodation with festival shuttle service',
    date: '2025-04-15',
  },
  {
    id: '2',
    image: '/YC (IMG)/593532f2da6dde2b77402dcc.webp',
    concertName: 'Electronic Dreams',
    artistName: 'EDM Artists',
    timeRange: '7 PM - 11:30 PM',
    locationDetails: '456 Rock St, Music City, MC 12345',
    hotelName: 'Rhythm Hotel',
    hotelDetails: 'Theme rooms with sound systems, rooftop bar, late checkout',
    date: '2025-05-02',
    description: 'Experience the best of EDM with top DJs and a vibrant crowd. Includes exclusive after-party access and complimentary drinks.'
  },
  {
    id: '3',
    image: '/YC (IMG)/GettyImages-2149383523-3.webp',
    concertName: 'Summer Vibes',
    artistName: 'Pop Artists',
    timeRange: '6 PM - 10:00 PM',
    locationDetails: '789 Jazz Ave, Music City, MC 12345',
    hotelName: 'Melody Hotel',
    hotelDetails: 'Boutique hotel with live music, pool access, and free breakfast',
    date: '2025-06-10',
    description: 'Enjoy a summer night with chart-topping pop artists. Package includes VIP seating and a welcome gift.'
  },
]

export default function PackagesSection() {
  const scrollRef = useRef(null)
  const navigate = useNavigate()

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <SectionHeading title="FEATURED PACKAGES" />
        
        <div
          ref={scrollRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {packages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              {...pkg}
              onMoreInfoClick={() => navigate(`/packages/${pkg.id}`)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}