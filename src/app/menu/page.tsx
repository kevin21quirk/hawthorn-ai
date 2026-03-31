import Link from 'next/link';

export default function MenuPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Our Menus</h1>
            <p className="text-xl text-white">Seasonal dishes crafted with passion</p>
          </div>
        </div>
      </section>

      {/* Menu Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Discover Our Culinary Creations</h2>
          <p className="text-lg text-black">
            Our menus change seasonally to showcase the finest local ingredients and innovative culinary techniques.
            Browse our complete menu collection below or download PDF versions for offline viewing.
          </p>
        </div>
      </section>

      {/* Menu Cards Section - Same as Homepage */}
      <section className="py-20 bg-gray-50">
        <div className="px-4 sm:px-6 lg:px-8 text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete Menu Collection</h2>
          <p className="text-xl text-black">Explore all our dining options</p>
        </div>
        <div className="px-4 sm:px-6 lg:px-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Main Menu */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
              <div className="h-96 overflow-hidden bg-gray-100">
                <img src="/menus/images/06.02.0206-Main-Menu_page-0001.jpg" alt="Main Menu" className="w-full h-full object-contain" loading="eager" />
              </div>
              <div className="border-t border-gray-200 p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2 text-black text-center">Main Menu</h3>
                <p className="text-base text-black text-center mb-4">Signature dishes and chef's specialties</p>
                <div className="text-black text-center mb-6">
                  <p className="mb-2">• Appetizers & Starters</p>
                  <p className="mb-2">• Main Courses</p>
                  <p className="mb-2">• Chef's Specialties</p>
                  <p>• Seasonal Highlights</p>
                </div>
                <div className="mt-auto">
                  <Link 
                    href="/menus/06.02.0206-Main-Menu.pdf"
                    className="w-full bg-orange-600 text-white px-4 py-3 rounded-none font-normal hover:bg-orange-700 transition-colors text-center inline-block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View PDF Menu
                  </Link>
                </div>
              </div>
            </div>

            {/* Daytime Menu */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
              <div className="h-96 overflow-hidden bg-gray-100">
                <img src="/menus/images/06.02.0206-Daytime-Menu_page-0001.jpg" alt="Daytime Menu" className="w-full h-full object-contain" loading="eager" />
              </div>
              <div className="border-t border-gray-200 p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2 text-black text-center">Daytime Menu</h3>
                <p className="text-base text-black text-center mb-4">Light options perfect for lunch and early dining</p>
                <div className="text-black text-center mb-6">
                  <p className="mb-2">• Lunch Specials</p>
                  <p className="mb-2">• Light Bites</p>
                  <p className="mb-2">• Soups & Salads</p>
                  <p>• Afternoon Options</p>
                </div>
                <div className="mt-auto">
                  <Link 
                    href="/menus/06.02.0206-Daytime-Menu.pdf"
                    className="w-full bg-orange-600 text-white px-4 py-3 rounded-none font-normal hover:bg-orange-700 transition-colors text-center inline-block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View PDF Menu
                  </Link>
                </div>
              </div>
            </div>

            {/* Children's Menu */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
              <div className="h-96 overflow-hidden bg-gray-100">
                <img src="/menus/images/06.02.0206-Children-Menu_page-0001.jpg" alt="Children's Menu" className="w-full h-full object-contain" loading="eager" />
              </div>
              <div className="border-t border-gray-200 p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2 text-black text-center">Children's Menu</h3>
                <p className="text-base text-black text-center mb-4">Kid-friendly meals with healthy options</p>
                <div className="text-black text-center mb-6">
                  <p className="mb-2">• Kids' Favorites</p>
                  <p className="mb-2">• Healthy Options</p>
                  <p className="mb-2">• Fun Desserts</p>
                  <p>• Small Portions</p>
                </div>
                <div className="mt-auto">
                  <Link 
                    href="/menus/06.02.0206-Children-Menu.pdf"
                    className="w-full bg-orange-600 text-white px-4 py-3 rounded-none font-normal hover:bg-orange-700 transition-colors text-center inline-block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View PDF Menu
                  </Link>
                </div>
              </div>
            </div>

            {/* Sunday Specials */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
              <div className="h-96 overflow-hidden bg-gray-100">
                <img src="/menus/images/SUNDAY-spcls-dated-22-July2025_page-0001.jpg" alt="Sunday Specials" className="w-full h-full object-contain" loading="eager" />
              </div>
              <div className="border-t border-gray-200 p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2 text-black text-center">Sunday Specials</h3>
                <p className="text-base text-black text-center mb-4">Weekend favorites and family-style dining</p>
                <div className="text-black text-center mb-6">
                  <p className="mb-2">• Sunday Roast</p>
                  <p className="mb-2">• Family Deals</p>
                  <p className="mb-2">• Weekend Specials</p>
                  <p>• Brunch Options</p>
                </div>
                <div className="mt-auto">
                  <Link 
                    href="/menus/SUNDAY-spcls-dated-22-July2025.pdf"
                    className="w-full bg-orange-600 text-white px-4 py-3 rounded-none font-normal hover:bg-orange-700 transition-colors text-center inline-block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View PDF Menu
                  </Link>
                </div>
              </div>
            </div>

            {/* Dessert Menu */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
              <div className="h-96 overflow-hidden bg-gray-100">
                <img src="/menus/images/31.08.2025-Dessert-Menu-2025_page-0001.jpg" alt="Dessert Menu" className="w-full h-full object-contain" loading="eager" />
              </div>
              <div className="border-t border-gray-200 p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2 text-black text-center">Dessert Menu</h3>
                <p className="text-base text-black text-center mb-4">Sweet endings and seasonal treats</p>
                <div className="text-black text-center mb-6">
                  <p className="mb-2">• Classic Desserts</p>
                  <p className="mb-2">• Seasonal Specials</p>
                  <p className="mb-2">• Cheese Board</p>
                  <p>• Sweet Wines</p>
                </div>
                <div className="mt-auto">
                  <Link 
                    href="/menus/31.08.2025-Dessert-Menu-2025.pdf"
                    className="w-full bg-orange-600 text-white px-4 py-3 rounded-none font-normal hover:bg-orange-700 transition-colors text-center inline-block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View PDF Menu
                  </Link>
                </div>
              </div>
            </div>

            {/* Wine Menu */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
              <div className="h-96 overflow-hidden bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🍷</div>
                  <h3 className="text-xl font-semibold text-black">Wine Selection</h3>
                </div>
              </div>
              <div className="border-t border-gray-200 p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2 text-black text-center">Wine Menu</h3>
                <p className="text-base text-black text-center mb-4">Extensive wine list featuring local and international selections</p>
                <div className="text-black text-center mb-6">
                  <p className="mb-2">• Red Wines</p>
                  <p className="mb-2">• White Wines</p>
                  <p className="mb-2">• Sparkling & Champagne</p>
                  <p>• Sommelier Selections</p>
                </div>
                <div className="mt-auto">
                  <button className="w-full bg-orange-600 text-white px-4 py-3 rounded-none font-normal hover:bg-orange-700 transition-colors text-center inline-block">
                    Available at Restaurant
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-orange-50 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-semibold mb-4 text-orange-800">Dietary Requirements & Allergies</h3>
            <p className="text-black mb-6">
              Please inform your server of any dietary restrictions, allergies, or special requirements. 
              Our chefs are happy to accommodate modifications where possible and provide detailed ingredient information.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-black">
              <div>
                <h4 className="font-semibold mb-2">Vegetarian Options</h4>
                <p className="text-sm">Extensive vegetarian choices available</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Gluten-Free</h4>
                <p className="text-sm">Gluten-free alternatives offered</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Allergen Information</h4>
                <p className="text-sm">Detailed allergen guides provided</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Dine With Us?</h2>
          <p className="text-xl mb-8">
            Experience our culinary creations in the warm atmosphere of The Hawthorn.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/reservations"
              className="bg-white text-orange-600 px-8 py-3 rounded-none font-normal hover:bg-gray-100 transition-colors inline-block"
            >
              Make a Reservation
            </Link>
            <Link 
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-none font-normal hover:bg-white hover:text-orange-600 transition-colors inline-block"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
