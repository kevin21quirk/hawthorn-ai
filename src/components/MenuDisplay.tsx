'use client';

import { X, Download } from 'lucide-react';
import { MenuData } from '@/types/menu';

interface MenuDisplayProps {
  isOpen: boolean;
  onClose: () => void;
  menuData: MenuData;
}

export default function MenuDisplay({ isOpen, onClose, menuData }: MenuDisplayProps) {
  if (!isOpen) return null;

  const handleDownloadPDF = () => {
    if (menuData.pdfUrl) {
      window.open(menuData.pdfUrl, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-6 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{menuData.title}</h2>
            <p className="text-gray-300 text-base md:text-lg">{menuData.description}</p>
          </div>
          <div className="flex items-center gap-3">
            {menuData.pdfUrl && (
              <button
                onClick={handleDownloadPDF}
                className="text-white hover:text-orange-500 transition-colors p-2 hover:bg-white/10 rounded-full"
                aria-label="Download PDF menu"
              >
                <Download className="w-7 h-7" />
              </button>
            )}
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

      {/* Menu Content */}
      <div className="w-full max-w-5xl mx-auto px-4 md:px-8 py-32">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {menuData.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="border-b border-gray-200 last:border-b-0">
              {/* Section Header */}
              <div className="bg-gradient-to-r from-orange-600 to-orange-500 px-8 py-6">
                <h3 className="text-2xl md:text-3xl font-bold text-white">{section.title}</h3>
                {section.description && (
                  <p className="text-orange-100 mt-2 text-sm md:text-base">{section.description}</p>
                )}
              </div>

              {/* Menu Items */}
              <div className="divide-y divide-gray-200">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="px-8 py-6 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg md:text-xl font-semibold text-gray-900">
                            {item.name}
                          </h4>
                          {item.dietary && item.dietary.length > 0 && (
                            <div className="flex gap-1">
                              {item.dietary.map((diet, dietIndex) => (
                                <span
                                  key={dietIndex}
                                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                                >
                                  {diet}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        {item.description && (
                          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                            {item.description}
                          </p>
                        )}
                        {item.allergens && item.allergens.length > 0 && (
                          <p className="text-xs text-gray-500 mt-2">
                            Allergens: {item.allergens.join(', ')}
                          </p>
                        )}
                      </div>
                      {item.price && (
                        <div className="text-lg md:text-xl font-bold text-orange-600 whitespace-nowrap">
                          {item.price}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Footer Note */}
          <div className="bg-gray-50 px-8 py-6 text-center">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Dietary Key:</span> V = Vegetarian, VE = Vegan, GF = Gluten-Free
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Please inform staff of any allergies or dietary requirements
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
