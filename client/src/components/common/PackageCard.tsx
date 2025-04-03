import { Package } from '../../types/Package'

interface PackageCardProps extends Package {
  onMoreInfoClick: () => void
}

export default function PackageCard({
  image,
  concertName,
  artistName,
  timeRange,
  locationDetails,
  hotelName,
  hotelDetails,
  onMoreInfoClick,
}: PackageCardProps) {
  return (
    <div className="w-[409px] h-[765px] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-festival-purple/20 hover:border-2">
      <div
        className="h-[272px] bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
        style={{ backgroundImage: `url(${image})` }}
      />
      
      <div className="p-6 space-y-6 flex flex-col h-[calc(765px-272px)]">
        <div>
          <h3 className="text-xl font-semibold mb-1">{concertName}</h3>
          <p className="text-festival-purple">{artistName}</p>
        </div>
        
        <div className="space-y-2 text-sm text-gray-600">
          <p className="font-medium">{timeRange}</p>
          <p>{locationDetails}</p>
        </div>
        
        <div className="pt-6 border-t">
          <h4 className="font-medium mb-2">{hotelName}</h4>
          <p className="text-sm text-gray-600">{hotelDetails}</p>
        </div>
        
        <button
          onClick={onMoreInfoClick}
          className="mt-auto w-full py-4 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors duration-300 hover:text-festival-purple font-medium"
        >
          MORE INFO
        </button>
      </div>
    </div>
  )
}