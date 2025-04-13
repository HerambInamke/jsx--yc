import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '../layouts/RootLayout'
import HomePage from '../pages/HomePage'
import ArtistDetail from '../pages/ArtistDetail'
import PackageDetail from '../pages/PackageDetail'
import ExplorePage from '../pages/ExplorePage'
import PackagesPage from '../pages/PackagesPage'
import ContactPage from '../pages/ContactPage'
import VenuePage from '../pages/VenuePage'
import ConcertDetails from '../pages/ConcertDetails'
import HotelDetails from '../pages/HotelDetails'
import AboutPage from '../pages/AboutPage'
import ServicesPage from '../pages/ServicesPage'
import TermsPage from '../pages/TermsPage'
import TicketPage from '../pages/TicketPage'
import CartPage from '../pages/CartPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'explore', element: <ExplorePage /> },
      { path: 'packages', element: <PackagesPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'venue', element: <VenuePage /> },
      { path: 'artists/:id', element: <ArtistDetail /> },
      { path: 'packages/:id', element: <PackageDetail /> },
      { path: 'concert-details/:id', element: <ConcertDetails /> },
      { path: 'concert-details/:id/tickets', element: <TicketPage /> },
      { path: 'hotels', element: <HotelDetails /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'terms', element: <TermsPage /> },
      { path: 'cart', element: < CartPage/> },
    ],
  },
])