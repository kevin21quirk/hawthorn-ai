'use client';

import { useState } from 'react';
import GiftVoucherFlow from '@/components/GiftVoucherFlow';

export default function GiftVouchersPage() {
  const [isVoucherFlowOpen, setIsVoucherFlowOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative text-white py-20">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-50"
          style={{
            backgroundImage: `url(/homepage-slider/slide-01.jpg)`
          }}
        />
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Gift Vouchers</h1>
            <p className="text-xl">The perfect gift for any occasion</p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Give the Gift of Fine Dining</h2>
          <p className="text-lg text-gray-600 mb-8">
            Treat someone special to an unforgettable culinary experience at Hawthorn. Our gift vouchers are perfect for birthdays, anniversaries, holidays, or just because.
          </p>
          <button
            onClick={() => setIsVoucherFlowOpen(true)}
            className="bg-gradient-to-r from-slate-700 to-slate-600 text-white px-12 py-5 rounded-2xl hover:from-slate-800 hover:to-slate-700 transition-all font-bold text-xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02]"
          >
            Purchase Gift Voucher
          </button>
        </div>
      </section>

      {/* Voucher Options */}
      <section id="voucher-options" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Popular Voucher Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">💝</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">£25 - £50</h3>
              <p className="text-gray-600">Perfect for a special lunch or casual dining experience</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🎁</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">£75 - £100</h3>
              <p className="text-gray-600">Ideal for dinner for two with wine</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">£150 - £200</h3>
              <p className="text-gray-600">Ultimate fine dining experience with premium selections</p>
            </div>
          </div>
        </div>
      </section>

      {/* Terms & Conditions */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Terms & Conditions</h2>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                Vouchers are valid for 12 months from date of purchase
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                Vouchers cannot be exchanged for cash
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                Reservations are required and subject to availability
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                Vouchers can be used for any menu items unless specified
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                Lost vouchers cannot be replaced
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                Vouchers are transferable
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Gift Voucher Flow Popup */}
      <GiftVoucherFlow isOpen={isVoucherFlowOpen} onClose={() => setIsVoucherFlowOpen(false)} />
    </div>
  );
}
