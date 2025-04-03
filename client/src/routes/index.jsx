import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '../layouts/RootLayout'
import HomePage from '../pages/HomePage'
import ArtistDetail from '../pages/ArtistDetail'
import PackageDetail from '../pages/PackageDetail'
import ExplorePage from '../pages/ExplorePage'
import PackagesPage from '../pages/PackagesPage'
import ContactPage from '../pages/ContactPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'explore', element: <ExplorePage /> },
      { path: 'packages', element: <PackagesPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'artists/:id', element: <ArtistDetail /> },
      { path: 'packages/:id', element: <PackageDetail /> },
    ],
  },
])