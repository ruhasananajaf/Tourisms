import { useState, useEffect } from 'react'
import {
  FaTimes, FaCheckCircle, FaMountain,
  FaCalendarAlt, FaUsers, FaEnvelope, FaPhone, FaUser,
} from 'react-icons/fa'
import { packages } from '../../data/packages'
import { useBooking } from '../../context/BookingContext'

const EMPTY_FORM = {
  packageId: '',
  name: '',
  email: '',
  phone: '',
  date: '',
  adults: 1,
  children: 0,
  message: '',
}

const TODAY = new Date().toISOString().split('T')[0]

export default function BookingModal() {
  const { isOpen, closeModal, selectedPackage } = useBooking()
  const [form, setForm] = useState(EMPTY_FORM)
  const [submitted, setSubmitted] = useState(false)

  // Pre-fill + reset whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setForm({ ...EMPTY_FORM, packageId: selectedPackage?.id ?? '' })
      setSubmitted(false)
    }
  }, [isOpen, selectedPackage])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') closeModal() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [closeModal])

  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const activePkg = packages.find((p) => p.id === Number(form.packageId))
  const estimatedTotal = activePkg
    ? activePkg.price * Math.max(1, Number(form.adults))
    : null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" />

      {/* Modal card */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto flex flex-col">

        {/* Header */}
        <div className="sticky top-0 bg-primary text-white px-7 py-5 flex items-center justify-between rounded-t-3xl z-10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
              <FaMountain className="text-accent text-base" />
            </div>
            <div>
              <h2 className="font-bold text-lg leading-tight">Book Your Tour</h2>
              <p className="text-white/65 text-xs">We'll confirm your booking within 24 hours</p>
            </div>
          </div>
          <button
            onClick={closeModal}
            aria-label="Close"
            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        {/* Body */}
        <div className="p-7 flex-1">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-5">
                <FaCheckCircle className="text-green-500 text-4xl" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-2">Booking Request Sent!</h3>
              <p className="text-gray-500 text-sm max-w-sm mb-6 leading-relaxed">
                Thank you! Our team will review your request and contact you within
                24 hours to confirm your booking and arrange payment.
              </p>
              {activePkg && (
                <div className="bg-accent/10 border border-accent/20 rounded-2xl p-4 mb-6 text-left w-full max-w-xs">
                  <p className="text-xs text-gray-400 mb-1">Selected Package</p>
                  <p className="font-bold text-primary">{activePkg.title}</p>
                  <p className="text-accent font-semibold text-sm">
                    PKR {activePkg.price.toLocaleString()} / person
                  </p>
                </div>
              )}
              <button
                onClick={closeModal}
                className="bg-accent hover:bg-accent-dark text-white px-10 py-3 rounded-full font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Package selection */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Tour Package <span className="text-accent">*</span>
                </label>
                <select
                  name="packageId"
                  required
                  value={form.packageId}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors bg-white text-gray-700"
                >
                  <option value="">— Choose a tour package —</option>
                  {packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.title} — PKR {pkg.price.toLocaleString()} / person
                    </option>
                  ))}
                </select>
              </div>

              {/* Selected package mini-preview */}
              {activePkg && (
                <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 flex items-center gap-4">
                  <img
                    src={activePkg.image}
                    alt={activePkg.title}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div>
                    <p className="font-bold text-primary text-sm">{activePkg.title}</p>
                    <p className="text-xs text-gray-500">{activePkg.duration}</p>
                    <p className="text-accent font-semibold text-sm">
                      PKR {activePkg.price.toLocaleString()} / person
                    </p>
                  </div>
                </div>
              )}

              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    Full Name <span className="text-accent">*</span>
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    Email <span className="text-accent">*</span>
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="ruhasananajaf@gmail.com"
                      className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Phone + Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    Phone <span className="text-accent">*</span>
                  </label>
                  <div className="relative">
                    <FaPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+92 XXX XXXXXXX"
                      className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    Travel Date <span className="text-accent">*</span>
                  </label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
                    <input
                      type="date"
                      name="date"
                      required
                      min={TODAY}
                      value={form.date}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Adults + Children */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    Adults <span className="text-accent">*</span>
                  </label>
                  <div className="relative">
                    <FaUsers className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
                    <input
                      type="number"
                      name="adults"
                      required
                      min={1}
                      max={20}
                      value={form.adults}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    Children
                  </label>
                  <div className="relative">
                    <FaUsers className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
                    <input
                      type="number"
                      name="children"
                      min={0}
                      max={20}
                      value={form.children}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Special requests */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Special Requests
                </label>
                <textarea
                  name="message"
                  rows={3}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Dietary requirements, accessibility needs, or any special requests..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors resize-none"
                />
              </div>

              {/* Price estimate */}
              {estimatedTotal && (
                <div className="bg-primary/5 border border-primary/10 rounded-xl px-5 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Estimated Total</p>
                    <p className="text-xs text-gray-400">
                      {form.adults} adult{Number(form.adults) !== 1 ? 's' : ''}
                      {Number(form.children) > 0
                        ? ` + ${form.children} child${Number(form.children) !== 1 ? 'ren' : ''}`
                        : ''}
                    </p>
                  </div>
                  <p className="text-2xl font-extrabold text-primary">
                    PKR {estimatedTotal.toLocaleString()}
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-accent hover:bg-accent-dark text-white py-4 rounded-xl font-bold text-sm transition-all duration-300 shadow-lg shadow-accent/25 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]"
              >
                Confirm Booking Request
              </button>

              <p className="text-center text-xs text-gray-400">
                By submitting, you agree to be contacted by our team to finalize your booking.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
