import { FaClock, FaUsers, FaCheck } from 'react-icons/fa'
import { useBooking } from '../../context/BookingContext'

export default function PackageCard({ pkg }) {
  const { openModal } = useBooking()
  const priceFormatted = pkg.price.toLocaleString('en-PK')

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group border border-gray-100 flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden">
        {pkg.popular && (
          <div className="absolute top-3 right-3 z-10 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full shadow">
            Most Popular
          </div>
        )}
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-primary-dark/60 to-transparent" />
        <div className="absolute bottom-3 left-4">
          <h3 className="text-white text-lg font-bold drop-shadow">{pkg.title}</h3>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <FaClock className="text-accent" />
            {pkg.duration}
          </span>
          <span className="flex items-center gap-1">
            <FaUsers className="text-accent" />
            {pkg.groupSize}
          </span>
        </div>

        <ul className="space-y-1.5 mb-4 flex-1">
          {pkg.highlights.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
              <FaCheck className="text-accent mt-0.5 shrink-0 text-xs" />
              {item}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1 mb-4">
          {pkg.included.map((item) => (
            <span
              key={item}
              className="bg-gray-100 text-gray-500 text-xs px-2.5 py-0.5 rounded-full"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-4 flex items-end justify-between gap-2">
          <div>
            <p className="text-[11px] text-gray-400 leading-none mb-0.5">Starting from</p>
            <p className="text-xl font-bold text-primary leading-none">
              PKR {priceFormatted}
            </p>
            <p className="text-xs text-gray-400 leading-none mt-0.5">per person</p>
          </div>
          <button
            onClick={() => openModal(pkg)}
            className="bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-full text-xs font-semibold transition-colors duration-300 whitespace-nowrap hover:shadow-lg hover:shadow-accent/30"
          >
            visit detail
          </button>
        </div>
      </div>
    </div>
  )
}
