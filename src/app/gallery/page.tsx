export default function GalleryPage() {
  const categories = [
    {
      title: "Restaurant Ambiance",
      items: [
        { title: "Main Dining Room", description: "Elegant main dining area with warm lighting" },
        { title: "Private Dining", description: "Intimate private dining room for special occasions" },
        { title: "Bar Area", description: "Sophisticated bar with extensive wine selection" },
        { title: "Outdoor Terrace", description: "Beautiful outdoor seating with garden views" },
      ]
    },
    {
      title: "Culinary Creations",
      items: [
        { title: "Signature Dish", description: "Our famous wagyu ribeye with seasonal accompaniments" },
        { title: "Seafood Special", description: "Fresh lobster thermidor prepared tableside" },
        { title: "Dessert Art", description: "Chocolate soufflé with vanilla ice cream" },
        { title: "Appetizer Platter", description: "Seasonal appetizer selection with house specialties" },
      ]
    },
    {
      title: "Events & Celebrations",
      items: [
        { title: "Wedding Reception", description: "Beautiful wedding celebration in our grand hall" },
        { title: "Corporate Event", description: "Professional corporate dinner event" },
        { title: "Birthday Party", description: "Memorable birthday celebration with custom menu" },
        { title: "Anniversary Dinner", description: "Romantic anniversary dinner setup" },
      ]
    },
    {
      title: "Behind the Scenes",
      items: [
        { title: "Chef at Work", description: "Our executive chef creating culinary masterpieces" },
        { title: "Kitchen Team", description: "Our talented kitchen staff in action" },
        { title: "Sommelier Selection", description: "Wine pairing process with our sommelier" },
        { title: "Fresh Ingredients", description: "Local farm-fresh ingredients delivery" },
      ]
    }
  ];

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h1>
            <p className="text-xl lg:text-[18px] md:text-[16px]">Experience Hawthorn through images</p>
          </div>
        </div>
      </section>

      {/* Gallery Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">A Visual Journey</h2>
          <p className="text-lg text-gray-600 lg:text-[18px] md:text-[16px]">
            Take a look at our beautiful restaurant, exquisite dishes, and memorable moments.
          </p>
        </div>
      </section>

      {/* Gallery Categories */}
      {categories.map((category, categoryIndex) => (
        <section key={categoryIndex} className={`py-16 ${categoryIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{category.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg shadow-md mb-4">
                    <div className="bg-gray-200 h-64 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <span className="text-gray-500 text-lg">{item.title}</span>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600 lg:text-[18px] md:text-[16px]">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Call to Action */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Experience It Yourself</h2>
          <p className="text-xl mb-8 lg:text-[18px] md:text-[16px]">
            The photos are beautiful, but the real experience is even better. Visit us to taste, see, and feel the Hawthorn difference.
          </p>
          <div className="space-x-4">
            <a
              href="/reservations"
              className="inline-block bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Make a Reservation
            </a>
            <a
              href="/menu"
              className="inline-block border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-orange-600 transition-colors"
            >
              View Our Menu
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
