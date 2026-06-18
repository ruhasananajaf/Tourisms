import {
  FaEnvelope, FaPhone,
  FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaWhatsapp,
} from 'react-icons/fa'

const EMAIL = 'ruhasananajaf@gmail.com'
const PHONE = '+92-3490897899'

const SOCIAL = [
  { Icon: FaFacebookF, href: '#', label: 'Facebook' },
  { Icon: FaInstagram, href: '#', label: 'Instagram' },
  { Icon: FaTwitter,   href: '#', label: 'Twitter' },
  { Icon: FaYoutube,   href: '#', label: 'YouTube' },
  { Icon: FaWhatsapp,  href: '#', label: 'WhatsApp' },
]

export default function TopBar() {
  return (
    <div className="bg-[#060f1a] text-white/75 text-xs py-2.5">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Contact info */}
        <div className="flex flex-wrap items-center gap-5">
          <a
            href={`mailto:${EMAIL}`}
            className="flex items-center gap-1.5 hover:text-accent transition-colors duration-200"
          >
            <FaEnvelope className="text-accent" />
            {EMAIL}
          </a>
          <a
            href={`tel:${PHONE.replace(/-/g, '')}`}
            className="flex items-center gap-1.5 hover:text-accent transition-colors duration-200"
          >
            <FaPhone className="text-accent" />
            {PHONE}
          </a>
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-2">
          {SOCIAL.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-all duration-200"
            >
              <Icon className="text-[10px]" />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
