import { useRef } from 'react'
import SectionHeading from '../common/SectionHeading'
import ArtistCard from '../common/ArtistCard'
import { Artist } from '../../types/Artist'

const artists: Artist[] = [
  {
    id: '1',
    name: 'Featured Artist 1',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a',
    colorDot: 'blue',
  },
  {
    id: '2',
    name: 'Featured Artist 2',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f',
    colorDot: 'red',
  },
  {
    id: '3',
    name: 'Featured Artist 3',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745',
    colorDot: 'yellow',
  },
  {
    id: '4',
    name: 'Featured Artist 4',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3',
    colorDot: 'red',
  },
]

export default function FeaturedTextSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <section className="py-12 bg-gray-50">
      <div className="container">
        <SectionHeading title="SOME TEXT I HAVE TO THINK OF" />
        
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory"
        >
          {artists.map((artist) => (
            <div
              key={artist.id}
              className="min-w-[300px] sm:min-w-[350px] snap-start"
            >
              <ArtistCard {...artist} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}