import { useParams } from 'react-router-dom'

export default function ArtistDetail() {
  const { id } = useParams()

  return (
    <div className="py-16">
      <div className="container">
        <h1 className="text-4xl font-bold mb-8">Artist Detail</h1>
        <p>Artist ID: {id}</p>
      </div>
    </div>
  )
}