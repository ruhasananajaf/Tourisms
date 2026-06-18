import { useState } from 'react'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaWhatsapp, FaCheckCircle } from 'react-icons/fa'

const CONTACT_INFO = [
  {
    icon: FaMapMarkerAlt,
    title: 'Our Office',
    lines: ['Main Bazaar, Skardu', 'Gilgit-Baltistan, Pakistan'],
  },
  {
    icon: FaPhone,
    title: 'Phone',
    lines: ['+92-3490897899', ],
    
  },
  {
    icon: FaEnvelope,
    title: 'Email',
    lines: ['ruhasananajaf@gmail.com'],
  },
  {
    icon: FaWhatsapp,
    title: 'WhatsApp',
    lines: ['Message us anytime', '+92-3490897899'],
    href: 'https://wa.me/923490897899',
  },
]

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', subject: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      {/* Banner */}
      <section
        className="relative h-64 md:h-80 bg-primary-dark bg-cover bg-center flex items-center"
        style={{
          backgroundImage:
            "url('https://picsum.photos/seed/contact-hero/1920/600')",
        }}
      >
        <div className="absolute inset-0 bg-primary-dark/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center w-full">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">Contact Us</h1>
          <p className="text-white/70 text-sm">
            Home &nbsp;/&nbsp; <span className="text-accent">Contact Us</span>
          </p>
        </div>
      </section>

      <section className="py-20 bg-soft">
        <div className="max-w-7xl mx-auto px-4">
          {/* Contact cards row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {CONTACT_INFO.map(({ icon: Icon, title, lines, href }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300 border border-transparent hover:border-accent/20 group"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300 mb-4">
                  <Icon className="text-xl" />
                </div>
                <h3 className="font-bold text-primary text-base mb-2">{title}</h3>
                {lines.map((line) =>
                  href ? (
                    <a
                      key={line}
                      href={href}
                      className="block text-sm text-gray-500 hover:text-accent transition-colors"
                    >
                      {line}
                    </a>
                  ) : (
                    <p key={line} className="text-sm text-gray-500">{line}</p>
                  )
                )}
              </div>
            ))}
          </div>

          {/* Form + map row */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Form */}
            <div className="lg:col-span-3 bg-white rounded-3xl p-8 md:p-10 shadow-sm">
              <h2 className="text-2xl font-bold text-primary mb-2">Send Us a Message</h2>
              <p className="text-gray-500 text-sm mb-8">
                Fill in the form below and we'll get back to you within 24 hours.
              </p>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FaCheckCircle className="text-green-500 text-5xl mb-4" />
                  <h3 className="text-xl font-bold text-primary mb-2">Message Sent!</h3>
                  <p className="text-gray-500 text-sm">
                    Thank you for contacting us. We'll reply to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                        Full Name <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                        Email Address <span className="text-accent">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+92 XXX XXXXXXX"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                        Subject
                      </label>
                      <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors bg-white text-gray-600"
                      >
                        <option value="">Select a subject</option>
                        <option>Tour Package Enquiry</option>
                        <option>Car Rental Booking</option>
                        <option>Hotel Booking</option>
                        <option>Trekking Information</option>
                        <option>Custom Package</option>
                        <option>General Enquiry</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      Message <span className="text-accent">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your travel plans, dates, group size, and any special requirements..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-accent hover:bg-accent-dark text-white py-4 rounded-xl font-semibold text-sm transition-colors duration-300 shadow-md hover:shadow-lg"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Map placeholder */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              <div className="bg-white rounded-3xl overflow-hidden shadow-sm flex-1 min-h-64">
                <div className="w-full h-full bg-gray-100 flex items-center justify-center min-h-64 relative">
                  <img
                    src="https://picsum.photos/seed/skardumap/600/500"
                    alt="Location map"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-primary-dark/40 flex items-center justify-center">
                    <div className="text-center text-white">
                      <FaMapMarkerAlt className="text-accent text-4xl mx-auto mb-2" />
                      <p className="font-bold text-lg">Skardu, GB</p>
                      <p className="text-sm text-white/80">Main Bazaar, Skardu</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary rounded-2xl p-6 text-white">
                <h4 className="font-bold text-base mb-3">Office Hours</h4>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex justify-between">
                    <span>Monday – Friday</span>
                    <span className="text-accent font-medium">8:00 AM – 8:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday</span>
                    <span className="text-accent font-medium">9:00 AM – 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-accent font-medium">10:00 AM – 4:00 PM</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
