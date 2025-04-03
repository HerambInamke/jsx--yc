export default function ExplorePage() {
  return (
    <div className="py-16">
      <div className="container">
        <h1 className="text-4xl font-bold mb-12">Explore Artists</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="group relative aspect-square overflow-hidden rounded-lg bg-gray-200"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-white text-xl font-semibold">Artist Name</h3>
                <p className="text-white/80">Genre</p>
                <p className="text-white/60 text-sm mt-2">20 August 2024</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}