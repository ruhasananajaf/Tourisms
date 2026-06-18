import { Link } from 'react-router-dom'
import {
  FaMountain,
  FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaWhatsapp,
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaChevronRight,
} from 'react-icons/fa'

const EXPLORE = [
  { label: 'Home',       to: '/' },
  { label: 'About Us',   to: '/about' },
  { label: 'Destination',   to: '/Destination' },
  { label: 'Services',   to: '/services' },
  { label: 'Rent a Car', to: '/rent-a-car' },
  { label: 'Blogs',      to: '/blogs' },
  { label: 'Contact Us', to: '/contact' },
]

const OUR_SERVICES = [
  'Tour Packages',
  'Hotel Booking',
  'Car & Jeep Rental',
  'Mountain Trekking',
  'Cultural Tours',
  'Photography Tours',
]

const SOCIAL = [
  { Icon: FaFacebookF, href: '#', label: 'Facebook' },
  { Icon: FaInstagram, href: '#', label: 'Instagram' },
  { Icon: FaTwitter,   href: '#', label: 'Twitter' },
  { Icon: FaYoutube,   href: '#', label: 'YouTube' },
  { Icon: FaWhatsapp,  href: '#', label: 'WhatsApp' },
]

export default function Footer() {
  return (
    <footer className="bg-navy text-gray-400">
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <Link to="/" className="inline-flex items-center gap-2.5 mb-5">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow-md">
              <FaMountain className="text-white text-base" />
            </div>
            <div className="leading-none">
              <p className="text-white font-extrabold text-sm tracking-wide">Rukhsana SKARDU</p>
              <p className="text-accent text-[10px] font-semibold tracking-widest uppercase">
                Travels &amp; Tours
              </p>
            </div>
          </Link>
          <p className="text-sm leading-relaxed text-gray-500 mb-6">
            Your trusted partner for exploring the majestic beauty of Skardu,
            Gilgit-Baltistan. Creating unforgettable memories in the heart of
            the Karakoram.
          </p>
          <div className="flex gap-2">
            {SOCIAL.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-all duration-200 text-white/70 hover:text-white"
              >
                <Icon className="text-xs" />
              </a>
            ))}
          </div>
        </div>

        {/* Explore */}
        <div>
          <h4 className="text-white font-bold text-base mb-6 pb-3 border-b border-white/10 relative">
            Explore
            <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-accent" />
          </h4>
          <ul className="space-y-2.5">
            {EXPLORE.map(({ label, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="flex items-center gap-2 text-sm hover:text-accent transition-colors duration-200 group"
                >
                  <FaChevronRight className="text-[10px] text-accent/60 group-hover:text-accent transition-colors" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-bold text-base mb-6 pb-3 border-b border-white/10 relative">
            Our Services
            <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-accent" />
          </h4>
          <ul className="space-y-2.5">
            {OUR_SERVICES.map((s) => (
              <li key={s} className="flex items-center gap-2 text-sm">
                <FaChevronRight className="text-[10px] text-accent/60" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-bold text-base mb-6 pb-3 border-b border-white/10 relative">
            Contact Us
            <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-accent" />
          </h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-sm">
              <FaMapMarkerAlt className="text-accent mt-0.5 shrink-0 text-base" />
              <span>Main Bazaar, Skardu, Gilgit-Baltistan, Pakistan</span>
            </li>
            <li>
              <a
                href="tel:+923490897899"
                className="flex items-center gap-3 text-sm hover:text-accent transition-colors duration-200"
              >
                <FaPhone className="text-accent shrink-0" />
                +92-3490897899
              </a>
            </li>
            <li>
              <a
                href="mailto:info@rukhsanaskardutours.com"
                className="flex items-center gap-3 text-sm hover:text-accent transition-colors duration-200"
              >
                <FaEnvelope className="text-accent shrink-0" />
                info@rukhsanaskardutours.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} Rukhsana Skardu Travels &amp; Tours. All rights reserved.
          </p>
          <p>Designed by Rukhsana Batool</p>
        </div>
      </div>
    </footer>
  )
}
