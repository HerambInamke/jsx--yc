import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '../layouts/RootLayout'
import HomePage from '../pages/HomePage'
import ArtistDetail from '../pages/ArtistDetail'
import PackageDetail from '../pages/PackageDetail'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'artists/:id', element: <ArtistDetail /> },
      { path: 'packages/:id', element: <PackageDetail /> },
    ],
  },
])