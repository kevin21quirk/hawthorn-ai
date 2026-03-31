'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentReview, setCurrentReview] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slides = [
    {
      title: "Welcome to The Hawthorn",
      subtitle: "Experience fine dining at its best",
      buttonText: "Make a Reservation",
      image: "/homepage-slider/slide-01.jpg"
    },
    {
      title: "Exceptional Cuisine",
      subtitle: "Crafted by our award-winning chefs",
      buttonText: "Make a Reservation",
      image: "/homepage-slider/slide-02.jpg"
    },
    {
      title: "Elegant Atmosphere",
      subtitle: "Perfect for any occasion",
      buttonText: "Make a Reservation",
      image: "/homepage-slider/slide-03.jpg"
    }
  ];

  const reviews = [
    {
      name: "Colin Ring",
      rating: 5,
      occasion: "Family Meal",
      text: "Had a superb family meal at Hawthorn Bar & Bistro this evening. Excellent food, excellent service and excellent atmosphere. They even sang Happy Birthday too me! Excellent night, thank you all very much and will be back soon."
    },
    {
      name: "Amanda Foster",
      rating: 5,
      occasion: "Anniversary",
      text: "Celebrated our anniversary here tonight. Absolutely perfect from start to finish. Food was exceptional, service was impeccable. Will be back for many more celebrations!"
    },
    {
      name: "Michael Brown",
      rating: 5,
      occasion: "Valentine's Day",
      text: "Perfect Valentine's dinner! Romantic atmosphere, exceptional food, and wonderful service. Made our special day even more memorable."
    },
    {
      name: "Emma Wilson",
      rating: 5,
      occasion: "Date Night",
      text: "Amazing atmosphere and the food was incredible! Will definitely be coming back. The staff were so friendly and attentive."
    },
    {
      name: "James Mitchell",
      rating: 5,
      occasion: "Business Lunch",
      text: "Perfect spot for business meetings. Great food, excellent service, and professional atmosphere. Highly recommend!"
    },
    {
      name: "Sophie Turner",
      rating: 5,
      occasion: "Girls Night",
      text: "Lovely evening with friends! The cocktails were amazing and the food was delicious. Great vibe and beautiful decor."
    }
  ];

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    const reviewTimer = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        
        setTimeout(() => {
          setCurrentReview((prevReview) => (prevReview + 1) % reviews.length);
          setIsTransitioning(false);
        }, 800); // Ultra-slow fade for maximum smoothness
      }
    }, 4000); // Change review every 4 seconds

    return () => {
      clearInterval(slideTimer);
      clearInterval(reviewTimer);
    };
  }, [slides.length, reviews.length, isTransitioning]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToReview = (index: number) => {
    if (index === currentReview || isTransitioning) return;
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentReview(index);
      setIsTransitioning(false);
    }, 800); // Ultra-slow fade for maximum smoothness
  };

  return (
    <div className="min-h-screen">
      {/* Hero Slider Section - Full Width */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div className="relative h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-50"
                style={{
                  backgroundImage: `url(${slide.image})`
                }}
              />
              <div className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center text-white max-w-4xl">
                  <h1 className="text-3xl md:text-5xl font-bold mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl mb-6">
                    {slide.subtitle}
                  </p>
                  <Link 
                    href="/reservations"
                    className="bg-orange-600 text-white px-8 py-3 rounded-none font-normal hover:bg-orange-700 transition-colors inline-block text-sm md:text-base lg:text-lg"
                  >
                    {slide.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slider Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Arrow Navigation */}
        <button
          onClick={() => goToSlide((currentSlide - 1 + slides.length) % slides.length)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-orange-200 transition-colors"
          aria-label="Previous slide"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => goToSlide((currentSlide + 1) % slides.length)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-orange-200 transition-colors"
          aria-label="Next slide"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </section>

      {/* About Section - Split Layout */}
      <section className="py-20 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center px-4 sm:px-6 lg:px-8">
          <div className="order-1 lg:order-1">
            <div className="bg-gray-200 rounded-lg h-96 overflow-hidden">
              <img 
                src="/the-restaurant.jpeg" 
                alt="The Hawthorn Restaurant Interior" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="order-2 lg:order-2 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">About The Hawthorn</h2>
            <p className="text-lg text-black mb-4">
              Founded in 2010, The Hawthorn has been serving exceptional cuisine for over a decade. What started as a small family restaurant has grown into one of the most beloved dining destinations in the region.
            </p>
            <p className="text-lg text-black mb-6">
              Our commitment to quality, innovation, and hospitality has earned us numerous awards and a loyal following of discerning diners.
            </p>
            <Link 
              href="/about"
              className="inline-block bg-orange-600 text-white px-8 py-3 rounded-none font-normal hover:bg-orange-700 transition-colors"
            >
              Discover Our Story
            </Link>
          </div>
          <div className="order-3 lg:order-3">
            <div className="bg-gray-200 rounded-lg h-96 overflow-hidden">
              <img 
                src="/the-bar.jpeg" 
                alt="The Hawthorn Bar Area" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section - Feature Cards */}
      <section className="py-20 bg-gray-50">
        <div className="px-4 sm:px-6 lg:px-8 text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Menus</h2>
          <p className="text-xl text-black">Seasonal dishes crafted with passion</p>
        </div>
        <div className="px-4 sm:px-6 lg:px-8 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
              <div className="h-96 overflow-hidden bg-gray-100">
                <img src="/menus/images/06.02.0206-Main-Menu_page-0001.jpg" alt="Main Menu" className="w-full h-full object-contain" loading="eager" />
              </div>
              <div className="border-t border-gray-200 p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold mb-1 text-black text-center">Main</h3>
                <p className="text-sm text-black text-center mb-3">Signature dishes and chef's specialties</p>
                <div className="mt-auto">
                  <Link 
                    href="/menus/06.02.0206-Main-Menu.pdf"
                    className="w-full bg-orange-600 text-white px-4 py-2 rounded-none font-normal hover:bg-orange-700 transition-colors text-center inline-block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View PDF Menu
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
              <div className="h-96 overflow-hidden bg-gray-100">
                <img src="/menus/images/06.02.0206-Daytime-Menu_page-0001.jpg" alt="Daytime Menu" className="w-full h-full object-contain" loading="eager" />
              </div>
              <div className="border-t border-gray-200 p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold mb-1 text-black text-center">Daytime</h3>
                <p className="text-sm text-black text-center mb-3">Light options perfect for lunch and early dining</p>
                <div className="mt-auto">
                  <Link 
                    href="/menus/06.02.0206-Daytime-Menu.pdf"
                    className="w-full bg-orange-600 text-white px-4 py-2 rounded-none font-normal hover:bg-orange-700 transition-colors text-center inline-block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View PDF Menu
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
              <div className="h-96 overflow-hidden bg-gray-100">
                <img src="/menus/images/06.02.0206-Children-Menu_page-0001.jpg" alt="Children's Menu" className="w-full h-full object-contain" loading="eager" />
              </div>
              <div className="border-t border-gray-200 p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold mb-1 text-black text-center">Children's</h3>
                <p className="text-sm text-black text-center mb-3">Kid-friendly meals with healthy options</p>
                <div className="mt-auto">
                  <Link 
                    href="/menus/06.02.0206-Children-Menu.pdf"
                    className="w-full bg-orange-600 text-white px-4 py-2 rounded-none font-normal hover:bg-orange-700 transition-colors text-center inline-block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View PDF Menu
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
              <div className="h-96 overflow-hidden bg-gray-100">
                <img src="/menus/images/SUNDAY-spcls-dated-22-July2025_page-0001.jpg" alt="Sunday Specials" className="w-full h-full object-contain" loading="eager" />
              </div>
              <div className="border-t border-gray-200 p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold mb-1 text-black text-center">Sunday Specials</h3>
                <p className="text-sm text-black text-center mb-3">Weekend favorites and family-style dining</p>
                <div className="mt-auto">
                  <Link 
                    href="/menus/SUNDAY-spcls-dated-22-July2025.pdf"
                    className="w-full bg-orange-600 text-white px-4 py-2 rounded-none font-normal hover:bg-orange-700 transition-colors text-center inline-block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View PDF Menu
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
              <div className="h-96 overflow-hidden bg-gray-100">
                <img src="/menus/images/31.08.2025-Dessert-Menu-2025_page-0001.jpg" alt="Dessert Menu" className="w-full h-full object-contain" loading="eager" />
              </div>
              <div className="border-t border-gray-200 p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold mb-1 text-black text-center">Dessert</h3>
                <p className="text-sm text-black text-center mb-3">Sweet endings and seasonal treats</p>
                <div className="mt-auto">
                  <Link 
                    href="/menus/31.08.2025-Dessert-Menu-2025.pdf"
                    className="w-full bg-orange-600 text-white px-4 py-2 rounded-none font-normal hover:bg-orange-700 transition-colors text-center inline-block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View PDF Menu
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center px-4 sm:px-6 lg:px-8">
          <Link 
            href="/menu"
            className="inline-block bg-orange-600 text-white px-8 py-3 rounded-none font-normal hover:bg-orange-700 transition-colors"
          >
            View Full Menu
          </Link>
        </div>
      </section>

      {/* Gallery Section - Image Grid */}
      <section className="py-20 bg-white">
        <div className="px-4 sm:px-6 lg:px-8 text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Gallery</h2>
          <p className="text-xl text-black">Experience The Hawthorn through our lens</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 px-4 sm:px-6 lg:px-8">
          <div className="col-span-2 row-span-2">
            <div className="bg-gray-200 rounded-lg h-full min-h-[300px] overflow-hidden">
              <img src="/home-gallery/gallery-img-01.jpeg" alt="Featured Dish" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="bg-gray-200 rounded-lg h-full min-h-[300px] overflow-hidden">
            <img src="/home-gallery/gallery-img-02.jpeg" alt="Wine" className="w-full h-full object-cover" />
          </div>
          <div className="bg-gray-200 rounded-lg h-full min-h-[300px] overflow-hidden">
            <img src="/home-gallery/gallery-img-03.jpeg" alt="Dessert" className="w-full h-full object-cover" />
          </div>
          <div className="bg-gray-200 rounded-lg h-full min-h-[300px] overflow-hidden">
            <img src="/home-gallery/gallery-img-04.jpeg" alt="Ambiance" className="w-full h-full object-cover" />
          </div>
          <div className="bg-gray-200 rounded-lg h-full min-h-[300px] overflow-hidden">
            <img src="/home-gallery/gallery-img-05.jpeg" alt="Chef" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="text-center px-4 sm:px-6 lg:px-8">
          <Link 
            href="/gallery"
            className="inline-block bg-orange-600 text-white px-8 py-3 rounded-none font-normal hover:bg-orange-700 transition-colors"
          >
            Explore Gallery
          </Link>
        </div>
      </section>

      {/* Reviews Section - Testimonial Style */}
      <section className="py-20 bg-white">
        <div className="px-4 sm:px-6 lg:px-8 text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Guests Say</h2>
          <p className="text-xl text-black">Real experiences from our valued customers</p>
        </div>
        <div className="relative w-full mb-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {/* Previous Review */}
            <div className="bg-gray-50 rounded-lg p-6 text-center transition-opacity duration-1600 ease-in-out flex flex-col justify-between" style={{ opacity: isTransitioning ? 0.1 : 0.5, minHeight: '280px' }}>
              <div>
                <div className="flex justify-center mb-4">
                  {[...Array(reviews[(currentReview - 1 + reviews.length) % reviews.length].rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic leading-relaxed flex-grow">"{reviews[(currentReview - 1 + reviews.length) % reviews.length].text}"</p>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <p className="font-semibold text-black mb-1">{reviews[(currentReview - 1 + reviews.length) % reviews.length].name}</p>
                <p className="text-gray-600 text-sm">{reviews[(currentReview - 1 + reviews.length) % reviews.length].occasion}</p>
              </div>
            </div>

            {/* Current Review */}
            <div className="bg-gray-50 rounded-lg p-6 text-center transition-opacity duration-1600 ease-in-out flex flex-col justify-between" style={{ opacity: isTransitioning ? 0 : 1, minHeight: '280px' }}>
              <div>
                <div className="flex justify-center mb-4">
                  {[...Array(reviews[currentReview].rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic leading-relaxed flex-grow">"{reviews[currentReview].text}"</p>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <p className="font-semibold text-black mb-1">{reviews[currentReview].name}</p>
                <p className="text-gray-600 text-sm">{reviews[currentReview].occasion}</p>
              </div>
            </div>

            {/* Next Review */}
            <div className="bg-gray-50 rounded-lg p-6 text-center transition-opacity duration-1600 ease-in-out flex flex-col justify-between" style={{ opacity: isTransitioning ? 0.1 : 0.75, minHeight: '280px' }}>
              <div>
                <div className="flex justify-center mb-4">
                  {[...Array(reviews[(currentReview + 1) % reviews.length].rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic leading-relaxed flex-grow">"{reviews[(currentReview + 1) % reviews.length].text}"</p>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <p className="font-semibold text-black mb-1">{reviews[(currentReview + 1) % reviews.length].name}</p>
                <p className="text-gray-600 text-sm">{reviews[(currentReview + 1) % reviews.length].occasion}</p>
              </div>
            </div>
          </div>
          
          {/* Carousel Navigation */}
          <div className="flex justify-center items-center mt-8 space-x-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToReview(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentReview ? 'bg-orange-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Carousel Controls */}
          <button
            onClick={() => goToReview((currentReview - 1 + reviews.length) % reviews.length)}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-600 transition-colors bg-white rounded-full p-2 shadow-md"
            aria-label="Previous review"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => goToReview((currentReview + 1) % reviews.length)}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-600 transition-colors bg-white rounded-full p-2 shadow-md"
            aria-label="Next review"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="text-center px-4 sm:px-6 lg:px-8">
          <Link 
            href="/reviews"
            className="inline-block bg-orange-600 text-white px-8 py-3 rounded-none font-normal hover:bg-orange-700 transition-colors"
          >
            Read All Reviews
          </Link>
        </div>
      </section>

      {/* Careers Section - Stats Style */}
      <section className="py-20 bg-white">
        <div className="px-4 sm:px-6 lg:px-8 text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Join Our Team</h2>
          <p className="text-xl text-black">Become part of our culinary family</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">12+</div>
            <p className="text-black">Years of Excellence</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">25+</div>
            <p className="text-black">Team Members</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">4</div>
            <p className="text-black">Award Categories</p>
          </div>
        </div>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-semibold mb-4 text-black">Why Work With Us?</h3>
            <p className="text-black mb-6 max-w-2xl mx-auto">
              We offer competitive compensation, professional development opportunities, and a supportive team environment where your passion for hospitality can flourish.
            </p>
            <Link 
              href="/careers"
              className="inline-block bg-orange-600 text-white px-8 py-3 rounded-none font-normal hover:bg-orange-700 transition-colors"
            >
              View Open Positions
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section - Accordion Style */}
      <section className="py-20 bg-gray-50">
        <div className="px-4 sm:px-6 lg:px-8 text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-black">Quick answers to common questions</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 px-4 sm:px-6 lg:px-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">How far in advance should I make a reservation?</h3>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
              <p className="text-black mt-2">We recommend 1-2 weeks for weekends, 3-4 days for weekdays.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Do you accommodate dietary restrictions?</h3>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
              <p className="text-black mt-2">Yes! We can accommodate most dietary restrictions with advance notice.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">What is the average price per person?</h3>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
              <p className="text-black mt-2">Average £48-64 for a three-course dinner, excluding beverages.</p>
            </div>
          </div>
          <div className="bg-orange-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-orange-800">Have More Questions?</h3>
            <p className="text-black mb-6">Can't find the answer you're looking for? Our team is here to help!</p>
            <Link 
              href="/contact"
              className="inline-block bg-orange-600 text-white px-6 py-2 rounded-none font-normal hover:bg-orange-700 transition-colors w-full text-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
        <div className="text-center px-4 sm:px-6 lg:px-8">
          <Link 
            href="/faq"
            className="inline-block bg-orange-600 text-white px-8 py-3 rounded-none font-normal hover:bg-orange-700 transition-colors"
          >
            View All FAQs
          </Link>
        </div>
      </section>
    </div>
  );
}
