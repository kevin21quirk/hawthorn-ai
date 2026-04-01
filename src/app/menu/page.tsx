'use client';

import { useState } from 'react';
import SmartMenuExperience from '@/components/SmartMenuExperience';

export default function MenuPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Menus</h1>
            <p className="text-xl mb-8">Discover our culinary offerings with AI-powered recommendations</p>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="bg-gradient-to-r from-slate-700 to-slate-600 text-white px-12 py-5 rounded-2xl hover:from-slate-800 hover:to-slate-700 transition-all font-bold text-xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02]"
            >
              Explore Menu with AI Assistant
            </button>
          </div>
        </div>
      </section>

      {/* Menu Highlights */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Menu Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🥗</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Seasonal Starters</h3>
              <p className="text-gray-600">Fresh, locally-sourced ingredients in every dish</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🥩</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Mains</h3>
              <p className="text-gray-600">Expertly prepared signature dishes</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🍰</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Artisan Desserts</h3>
              <p className="text-gray-600">Handcrafted sweet creations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Menu Popup */}
      {isMenuOpen && <SmartMenuExperience onClose={() => setIsMenuOpen(false)} />}
    </div>
  );
}
