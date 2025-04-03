import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import SectionHeading from '../common/SectionHeading'
import PackageCard from '../common/PackageCard'
import { Package } from '../../types/Package'

const packages: Package[] = [
  {
    id: '1',
    image: 'client/public/YC (IMG)/cold.webp',
    concertName: 'Persona',
    artistName: 'Various Artists',
    timeRange: '1 PM - 6:30 PM',
    locationDetails: '123 Festival Ave, Music City, MC 12345',
    hotelName: 'Grand Hotel',
    hotelDetails: 'Luxury accommodation with festival shuttle service',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f',
    concertName: 'Rock Night',
    artistName: 'Rock Band',
    timeRange: '7 PM - 11:30 PM',
    locationDetails: '456 Rock St, Music City, MC 12345',
    hotelName: 'Rock Hotel',
    hotelDetails: 'Theme rooms with sound systems',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745',
    concertName: 'Jazz Evening',
    artistName: 'Jazz Ensemble',
    timeRange: '6 PM - 10:00 PM',
    locationDetails: '789 Jazz Ave, Music City, MC 12345',
    hotelName: 'Jazz Hotel',
    hotelDetails: 'Boutique hotel with live music',
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3',
    concertName: 'Classical Night',
    artistName: 'Symphony Orchestra',
    timeRange: '8 PM - 11:00 PM',
    locationDetails: '321 Classical Rd, Music City, MC 12345',
    hotelName: 'Classic Hotel',
    hotelDetails: 'Historic hotel near concert hall',
  },
]

export default function PackagesSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  return (
    <section className="py-12 bg-gray-50">
      <div className="container">
        <SectionHeading title="PACKAGES" />
        
        <div
          ref={scrollRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
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