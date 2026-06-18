import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaBars, FaTimes, FaMountain } from 'react-icons/fa'
import { useBooking } from '../../context/BookingContext'

const NAV_LINKS = [
  { label: 'Home',       to: '/',           end: true },
  { label: 'About Us',   to: '/about',      end: false },
  { label: 'Destination',   to: '/destination',      end: false },
  { label: 'Services',   to: '/services',   end: false },
  { label: 'Rent a Car', to: '/rent-a-car', end: false },
  { label: 'Blogs',      to: '/blogs',      end: false },
  { label: 'Contact Us', to: '/contact',    end: false },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { openModal } = useBooking()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const desktopLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 relative after:absolute after:content-[''] after:bottom-0 after:left-0 after:h-0.5 after:bg-accent after:transition-all after:duration-200 ${
      isActive
        ? 'text-accent after:w-full'
        : 'text-gray-700 hover:text-accent after:w-0 hover:after:w-full'
    }`

  const mobileLinkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
      isActive ? 'bg-accent/10 text-accent' : 'text-gray-700 hover:bg-gray-50 hover:text-accent'
    }`

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? 'shadow-lg' : 'shadow-sm border-b border-gray-100'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-md">
            <FaMountain className="text-white text-base" />
          </div>
          <div className="leading-none">
            <p className="text-primary font-extrabold text-sm tracking-wide">RUKHSANA SKARDU</p>
            <p className="text-accent text-[10px] font-semibold tracking-widest uppercase">
              Travels &amp; Tours
            </p>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map(({ label, to, end }) => (
            <NavLink key={to} to={to} end={end} className={desktopLinkClass}>
              {label}
            </NavLink>
          ))}
        </div>

        {/* Desktop Book Now → opens modal */}
        <button
          onClick={() => openModal()}
          className="hidden lg:inline-block bg-accent hover:bg-accent-dark text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 shadow-md hover:shadow-lg"
        >
          Book Now
        </button>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle navigation menu"
          className="lg:hidden p-2 text-primary rounded-lg hover:bg-gray-100 transition-colors"
        >
          {menuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-t border-gray-100 ${
          menuOpen ? 'max-h-112 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
          {NAV_LINKS.map(({ label, to, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={mobileLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          <button
            onClick={() => { openModal(); setMenuOpen(false) }}
            className="mt-3 bg-accent hover:bg-accent-dark text-white text-center px-6 py-3 rounded-full text-sm font-semibold transition-colors duration-300"
          >
            Book Now
          </button>
        </div>
      </div>
    </header>
  )
}
