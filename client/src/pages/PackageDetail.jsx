import { useParams } from 'react-router-dom'

export default function PackageDetail() {
  const { id } = useParams()

  return (
    <div className="py-16">
      <div className="container">
        <h1 className="text-4xl font-bold mb-8">Package Detail</h1>
        <p>Package ID: {id}</p>
      </div>
    </div>
  )
}