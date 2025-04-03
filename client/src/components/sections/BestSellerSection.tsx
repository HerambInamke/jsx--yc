import { useRef } from 'react'
import SectionHeading from '../common/SectionHeading'
import ArtistCard from '../common/ArtistCard'
import { Artist } from '../../types/Artist'

const artists: Artist[] = [
  {
    id: '1',
    name: 'Best Seller 1',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a',
    colorDot: 'yellow',
    isFavorite: true,
  },
  {
    id: '2',
    name: 'Best Seller 2',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f',
    colorDot: 'red',
    isFavorite: true,
  },
  {
    id: '3',
    name: 'Best Seller 3',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745',
    colorDot: 'blue',
    isFavorite: true,
  },
]

export default function BestSellerSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <section className="py-12">
      <div className="container">
        <SectionHeading title="BEST SELLER" />
        
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory"
        >
          {artists.map((artist) => (
            <div
              key={artist.id}
              className="min-w-[300px] sm:min-w-[350px] snap-start"
            >
              <ArtistCard {...artist} onFavoriteToggle={() => {}} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}