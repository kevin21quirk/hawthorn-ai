'use client';

import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuTitle: string;
  menuDescription: string;
  images: string[];
}

export default function MenuModal({ isOpen, onClose, menuTitle, menuDescription, images }: MenuModalProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [zoom, setZoom] = useState(1.5);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentPage(0);
      setZoom(1.5);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevPage();
      if (e.key === 'ArrowRight') handleNextPage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentPage, images.length]);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setZoom(1.5);
    }
  };

  const handleNextPage = () => {
    if (currentPage < images.length - 1) {
      setCurrentPage(currentPage + 1);
      setZoom(1.5);
    }
  };

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 0.25, 4));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 0.25, 0.75));
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    setZoom(1.5);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-fadeIn">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-6 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">{menuTitle}</h2>
            <p className="text-gray-300 text-sm md:text-base">{menuDescription}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-orange-500 transition-colors p-2 hover:bg-white/10 rounded-full"
            aria-label="Close menu"
          >
            <X className="w-8 h-8" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative w-full h-full flex items-center justify-center px-4 md:px-20 py-24">
        {/* Menu Image */}
        <div className="relative max-w-5xl w-full h-full flex items-center justify-center">
          <div 
            className="relative transition-all duration-300 ease-out"
            style={{ 
              transform: `scale(${zoom})`,
              maxHeight: isFullscreen ? '100vh' : '85vh',
              maxWidth: '100%'
            }}
          >
            <img
              src={images[currentPage]}
              alt={`${menuTitle} - Page ${currentPage + 1}`}
              className="w-full h-full object-contain rounded-lg shadow-2xl"
              style={{ maxHeight: isFullscreen ? '100vh' : '85vh' }}
            />
          </div>
        </div>

        {/* Navigation Arrows */}
        {currentPage > 0 && (
          <button
            onClick={handlePrevPage}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 md:p-4 rounded-full transition-all hover:scale-110 shadow-lg"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        )}
        
        {currentPage < images.length - 1 && (
          <button
            onClick={handleNextPage}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 md:p-4 rounded-full transition-all hover:scale-110 shadow-lg"
            aria-label="Next page"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 z-10">
        <div className="max-w-7xl mx-auto">
          {/* Page Thumbnails */}
          <div className="flex justify-center gap-2 mb-4 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentPage(index);
                  setZoom(1.5);
                }}
                className={`flex-shrink-0 transition-all ${
                  index === currentPage
                    ? 'ring-2 ring-orange-500 scale-110'
                    : 'opacity-50 hover:opacity-100'
                }`}
              >
                <img
                  src={image}
                  alt={`Page ${index + 1}`}
                  className="w-16 h-20 object-cover rounded shadow-lg"
                />
              </button>
            ))}
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-between">
            <div className="text-white text-sm md:text-base">
              Page {currentPage + 1} of {images.length}
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full p-2">
              <button
                onClick={handleZoomOut}
                disabled={zoom <= 0.75}
                className="text-white hover:text-orange-500 disabled:opacity-30 disabled:cursor-not-allowed p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Zoom out"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              
              <span className="text-white text-sm min-w-[4rem] text-center">
                {Math.round(zoom * 100)}%
              </span>
              
              <button
                onClick={handleZoomIn}
                disabled={zoom >= 4}
                className="text-white hover:text-orange-500 disabled:opacity-30 disabled:cursor-not-allowed p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Zoom in"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              
              <div className="w-px h-6 bg-white/20 mx-1" />
              
              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-orange-500 p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Toggle fullscreen"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
            </div>

            {/* Keyboard Hints */}
            <div className="hidden md:flex items-center gap-4 text-gray-400 text-sm">
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-white/10 rounded text-xs">←</kbd>
                <kbd className="px-2 py-1 bg-white/10 rounded text-xs">→</kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-white/10 rounded text-xs">ESC</kbd>
                Close
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
