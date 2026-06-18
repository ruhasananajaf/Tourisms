import { FaHiking, FaHotel, FaBus, FaLandmark, FaCamera, FaMountain } from 'react-icons/fa'
import { offers } from '../../data/offers'
import SectionTitle from '../ui/SectionTitle'

const ICON_MAP = {
  trekking:    FaHiking,
  hotel:       FaHotel,
  transport:   FaBus,
  cultural:    FaLandmark,
  photography: FaCamera,
  adventure:   FaMountain,
}

export default function WhatWeOffer() {
  return (
    <section className="py-20 bg-soft">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle
          subtitle="What We Offer"
          title="Comprehensive Travel Services for Your Journey"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => {
            const Icon = ICON_MAP[offer.icon] ?? FaMountain
            return (
              <div
                key={offer.id}
                className="bg-white rounded-2xl p-7 flex gap-5 shadow-sm hover:shadow-lg transition-all duration-300 group border border-transparent hover:border-accent/20"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-300">
                    <Icon className="text-xl" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-primary text-lg mb-2">{offer.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{offer.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}