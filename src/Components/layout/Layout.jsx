import { Outlet } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'
import TopBar from './TopBar'
import Navbar from './Navbar'
import Footer from './Footer'
import BookingModal from '../ui/BookingModal'

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />

      {/* Sticky WhatsApp button
      <a
        href="https://wa.me/923490897899"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110"
      >
        <FaWhatsapp className="text-2xl" />
      </a> */}

      {/* Global booking modal */}
      <BookingModal />
    </div>
  )
}
