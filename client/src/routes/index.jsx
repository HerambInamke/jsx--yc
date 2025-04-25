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
import PreCartPage from "../pages/preCartPage"
import LoginPage from "../pages/Auth/LoginPage"
import SignupPage from "../pages/Auth/SignupPage"
import HotelRoom from "../pages/HotelRoom"
import PaymentPage from '../pages/PaymentPage'
import ProfilePage from '../pages/ProfilePage'
import ProtectedRoute from '../components/ProtectedRoute'

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
      { path: 'hotel-rooms', element: <HotelRoom /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'terms', element: <TermsPage /> },
      { 
        path: 'cart', 
        element: <ProtectedRoute><CartPage /></ProtectedRoute> 
      },
      { 
        path: 'precart', 
        element: <ProtectedRoute><PreCartPage /></ProtectedRoute> 
      },
      { 
        path: 'payment', 
        element: <ProtectedRoute><PaymentPage /></ProtectedRoute> 
      },
      { 
        path: 'profile', 
        element: <ProtectedRoute><ProfilePage /></ProtectedRoute> 
      },
    ],
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignupPage /> },
])