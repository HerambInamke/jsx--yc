import HeroSection from '../components/sections/HeroSection'
import ExploreSection from '../components/sections/ExploreSection'
import FeaturedTextSection from '../components/sections/FeaturedTextSection'
import BestSellerSection from '../components/sections/BestSellerSection'
import PackagesSection from '../components/sections/PackagesSection'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <ExploreSection />
      <FeaturedTextSection />
      <BestSellerSection />
      <PackagesSection />
    </div>
  )
}