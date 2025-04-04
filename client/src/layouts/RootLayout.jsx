import { Outlet } from 'react-router-dom'
import Sidebar from '../components/SideBar.jsx'
import Footer from '../components/Footer.jsx'

export default function RootLayout() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}