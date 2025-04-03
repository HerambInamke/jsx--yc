import { useRef } from 'react'
import SectionHeading from '../common/SectionHeading'
import ArtistCard from '../common/ArtistCard'
import { Artist } from '../../types/Artist'

const artists: Artist[] = [
  {
    id: '1',
    name: 'Artist Name 1',
    image: 'client/public/YC (IMG)/593532f2da6dde2b77402dcc.webp',
    colorDot: 'red',
    isFavorite: false,
  },
  {
    id: '2',
    name: 'Artist Namw 2',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f',
    colorDot: 'blue',
    isFavorite: true,
  },
  {
    id: '3',
    name: 'Artist Name 3',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745',
    colorDot: 'yellow',
    isFavorite: false,
  },
]

export default function ExploreSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <section className="py-12">
      <div className="container">
        <SectionHeading title="EXPLORE" />
        
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