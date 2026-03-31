'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Navigation = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/menu', label: 'Our Menus' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/gift-vouchers', label: 'Gift Vouchers' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/faq', label: 'FAQ' },
    { href: '/careers', label: 'Careers' },
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
              <span className="text-lg font-medium">View Menu</span>
            </button>
          </div>

          {/* Center - Logo */}
          <Link href="/" className="text-white leading-none text-center">
            <div className="text-5xl font-bold">The Hawthorn</div>
            <div className="text-2xl font-light -mt-2 pl-1">bar and bistro</div>
          </Link>
          
          {/* Right side - Reservations Button */}
          <Link
            href="/reservations"
            className="bg-white text-orange-600 px-4 py-2 rounded-none font-normal hover:bg-gray-100 transition-colors text-sm md:text-base lg:text-lg"
          >
            Book a Table
          </Link>
        </div>
      </div>

      {/* Full Screen Menu Overlay */}
      {(isMenuOpen || isClosing) && (
        <div 
          className={`fixed inset-0 z-50 flex flex-col p-[100px] ${
            isClosing ? 'animate-fade-out' : 'animate-fade-in'
          }`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/homepage-slider/slide-01.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >          
          {/* Content */}
          <div className={`relative z-10 flex flex-col h-full ${
            isClosing ? 'animate-slide-down' : 'animate-slide-up'
          }`}>
            {/* Close Button */}
            <div className="flex justify-start">
              <button 
                className="text-white hover:text-orange-100 transition-colors flex items-center space-x-2"
                onClick={handleCloseMenu}
              >
                <svg className="h-8 w-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                <span className="text-[20px] font-light">Close Menu</span>
              </button>
            </div>
            
            {/* Menu Items */}
            <div className="flex-1 flex items-start justify-start mt-20">
              <div className="text-left space-y-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block text-[20px] font-light text-white hover:text-orange-100 transition-colors ${
                      pathname === item.href ? 'text-orange-100 font-semibold' : ''
                    }`}
                    onClick={handleCloseMenu}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Bottom - Logo */}
            <div className="text-left">
              <Link href="/" className="text-white leading-none" onClick={handleCloseMenu}>
                <div className="text-3xl md:text-4xl font-bold">The Hawthorn</div>
                <div className="text-lg md:text-xl font-light -mt-1">bar and bistro</div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
