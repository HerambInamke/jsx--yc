import { useRef } from 'react'
import SectionHeading from '../common/SectionHeading'
import ArtistCard from '../common/ArtistCard'

const artists = [
  {
    id: '1',
    name: 'Electronic Night',
    image: '/YC (IMG)/593532f2da6dde2b77402dcc.webp',
    colorDot: 'red',
    isFavorite: false,
  },
  {
    id: '2',
    name: 'Rock Festival',
    image: '/YC (IMG)/cold.webp',
    colorDot: 'blue',
    isFavorite: true,
  },
  {
    id: '3',
    name: 'Summer Concert',
    image: '/YC (IMG)/GettyImages-2149383523-3.webp',
    colorDot: 'yellow',
    isFavorite: false,
  },
]

export default function ExploreSection() {
  const scrollRef = useRef(null)

  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <SectionHeading title="EXPLORE EVENTS" />
        
        <div
          ref={scrollRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {artists.map((artist) => (
            <div key={artist.id}>
              <ArtistCard {...artist} onFavoriteToggle={() => {}} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}