'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import AnimatedBookingFlow from './AnimatedBookingFlow';

const Navigation = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isBookingFlowOpen, setIsBookingFlowOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/menu', label: 'Our Menus' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/gift-vouchers', label: 'Gift Vouchers' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/faq', label: 'FAQ' },
    { href: '/careers', label: 'Careers' },
    { href: '/reservations', label: 'Book a Table' },
  ];

  const handleCloseMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsMenuOpen(false);
      setIsClosing(false);
    }, 300);
  };

  return (
    <nav className="bg-orange-600 shadow-lg sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Left side - Hamburger Menu */}
          <div className="flex items-center space-x-2">
            <button 
              className="text-white hover:text-orange-100 transition-colors flex items-center space-x-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
              <span className="text-lg lg:text-[18px] md:text-[16px] font-medium">View Menu</span>
            </button>
          </div>

          {/* Center - Logo */}
          <Link href="/" className="text-white leading-none text-center">
            <div className="text-5xl font-bold">The Hawthorn</div>
            <div className="text-2xl font-light -mt-2 pl-1">bar and bistro</div>
          </Link>
          
          {/* Right side - Reservations Button */}
          <button
            onClick={() => setIsBookingFlowOpen(true)}
            className="bg-white text-orange-600 px-4 py-2 rounded-none font-normal hover:bg-gray-100 transition-colors text-lg lg:text-[18px] md:text-[16px]"
          >
            Book a Table
          </button>
        </div>
      </div>

      {/* Full Screen Menu Overlay */}
      {(isMenuOpen || isClosing) && (
        <div 
          className={`fixed inset-0 z-50 flex flex-col px-8 py-12 md:px-16 md:py-16 lg:px-20 lg:py-20 ${
            isClosing ? 'animate-fade-out' : 'animate-fade-in'
          }`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url('/homepage-slider/slide-01.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >          
          {/* Content */}
          <div className={`relative z-10 flex flex-col h-full overflow-y-auto ${
            isClosing ? 'animate-slide-down' : 'animate-slide-up'
          }`}>
            {/* Close Button */}
            <div className="flex justify-start mb-8">
              <button 
                className="text-white hover:text-orange-400 transition-all duration-300 flex items-center space-x-3 group"
                onClick={handleCloseMenu}
              >
                <svg className="h-7 w-7 group-hover:rotate-90 transition-transform duration-300" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                <span className="text-lg font-light tracking-wide">Close Menu</span>
              </button>
            </div>
            
            {/* Menu Items */}
            <div className="flex-1 flex items-start justify-start">
              <div className="text-left space-y-4">
                {navItems.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block text-3xl md:text-4xl font-light text-white hover:text-orange-400 transition-all duration-300 hover:translate-x-2 group relative ${
                      pathname === item.href ? 'text-orange-400' : ''
                    }`}
                    style={{
                      animation: isClosing ? 'none' : `slideInLeft 0.5s ease-out ${index * 0.1}s both`
                    }}
                    onClick={handleCloseMenu}
                  >
                    <span className="relative">
                      {item.label}
                      <span className={`absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-0.5 bg-orange-400 transition-all duration-300 ${
                        pathname === item.href ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}></span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Bottom - Logo */}
            <div className="text-left mt-8 pt-8 border-t border-white/20">
              <Link href="/" className="text-white leading-none hover:text-orange-400 transition-colors duration-300" onClick={handleCloseMenu}>
                <div className="text-2xl md:text-3xl font-bold">The Hawthorn</div>
                <div className="text-base md:text-lg font-light -mt-1">bar and bistro</div>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Booking Flow Popup */}
      <AnimatedBookingFlow isOpen={isBookingFlowOpen} onClose={() => setIsBookingFlowOpen(false)} />
    </nav>
  );
};

export default Navigation;
