'use client';

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';

interface FlipbookMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menuTitle: string;
  menuDescription: string;
  images: string[];
}

export default function FlipbookMenu({ isOpen, onClose, menuTitle, menuDescription, images }: FlipbookMenuProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'left' | 'right'>('right');

  if (!isOpen) return null;

  const handleNextPage = () => {
    if (currentPage < images.length - 1 && !isFlipping) {
      setIsFlipping(true);
      setFlipDirection('right');
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsFlipping(false);
      }, 600);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true);
      setFlipDirection('left');
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsFlipping(false);
      }, 600);
    }
  };

  const handleDownload = () => {
    images.forEach((image, index) => {
      const link = document.createElement('a');
      link.href = image;
      link.download = `${menuTitle.replace(/[^a-z0-9]/gi, '_')}_page_${index + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-fadeIn">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-6 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">{menuTitle}</h2>
            <p className="text-gray-300 text-sm md:text-base">{menuDescription}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="text-white hover:text-orange-500 transition-colors p-2 hover:bg-white/10 rounded-full"
              aria-label="Download menu"
            >
              <Download className="w-7 h-7" />
            </button>
            <button
              onClick={onClose}
              className="text-white hover:text-orange-500 transition-colors p-2 hover:bg-white/10 rounded-full"
              aria-label="Close menu"
            >
              <X className="w-8 h-8" />
            </button>
          </div>
        </div>
      </div>

      {/* Flipbook Container */}
      <div className="relative w-full h-full flex items-center justify-center px-4 md:px-20 py-24">
        <div className="relative max-w-5xl w-full" style={{ perspective: '2000px' }}>
          {/* Current Page */}
          <div
            className={`relative transition-all duration-600 ease-in-out ${
              isFlipping
                ? flipDirection === 'right'
                  ? 'animate-flip-right'
                  : 'animate-flip-left'
                : ''
            }`}
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            <img
              src={images[currentPage]}
              alt={`${menuTitle} - Page ${currentPage + 1}`}
              className="w-full h-auto object-contain rounded-lg shadow-2xl ring-4 ring-orange-600"
              style={{ maxHeight: '80vh' }}
            />
          </div>

          {/* Navigation Arrows */}
          {currentPage > 0 && (
            <button
              onClick={handlePrevPage}
              disabled={isFlipping}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 md:p-4 rounded-full transition-all hover:scale-110 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          )}

          {currentPage < images.length - 1 && (
            <button
              onClick={handleNextPage}
              disabled={isFlipping}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 md:p-4 rounded-full transition-all hover:scale-110 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          )}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-white text-sm md:text-base">
            Page {currentPage + 1} of {images.length}
          </div>

          {/* Page Indicators */}
          <div className="flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (index !== currentPage && !isFlipping) {
                    setIsFlipping(true);
                    setFlipDirection(index > currentPage ? 'right' : 'left');
                    setTimeout(() => {
                      setCurrentPage(index);
                      setIsFlipping(false);
                    }, 600);
                  }
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentPage
                    ? 'bg-orange-500 w-8'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>

          {/* Keyboard Hints */}
          <div className="hidden md:flex items-center gap-4 text-gray-400 text-sm">
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-white/10 rounded text-xs">←</kbd>
              <kbd className="px-2 py-1 bg-white/10 rounded text-xs">→</kbd>
              Navigate
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
