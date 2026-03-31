'use client';

import { useState } from 'react';

export default function ReservationsPage() {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '',
    occasion: '',
    name: '',
    email: '',
    phone: '',
    requests: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Reservation submitted:', formData);
    // Handle reservation submission
    alert('Booking request submitted! We will contact you with a confirmation.');
  };

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Booking With The Hawthorn</h1>
            <p className="text-xl text-white">General Booking</p>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-8 bg-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-2xl font-bold mb-2">FOR SAME DAY BOOKINGS PLEASE CALL US ON 801268</p>
        </div>
      </section>

      {/* Reservation Form - Contacts Page Style */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Reserve Your Table</h2>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-8">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-orange-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div className="text-sm text-orange-800">
                <p className="font-semibold mb-1">Important Booking Information:</p>
                <p className="mb-2">WE WILL CONTACT YOU WITH A CONFIRMATION. Our site is not monitored 24/7 – an immediate response is not always possible.</p>
                <p>Please call 801268 during opening hours for immediate confirmation.</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
            <div className="mb-6">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">What Date?</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
              <p className="text-xs text-orange-600 mt-1">FOR TODAY PLEASE CALL US ON 801268</p>
            </div>

            <div className="mb-6">
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">Preferred Sitting Time?</label>
              <select
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Select a time</option>
                <option value="17:00">5:00 PM</option>
                <option value="17:30">5:30 PM</option>
                <option value="18:00">6:00 PM</option>
                <option value="18:30">6:30 PM</option>
                <option value="19:00">7:00 PM</option>
                <option value="19:30">7:30 PM</option>
                <option value="20:00">8:00 PM</option>
                <option value="20:30">8:30 PM</option>
                <option value="21:00">9:00 PM</option>
              </select>
            </div>
            
            <div className="mb-6">
              <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-2">How Many People? (11 or more please call)</label>
              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Select guests</option>
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5">5 Guests</option>
                <option value="6">6 Guests</option>
                <option value="7">7 Guests</option>
                <option value="8">8 Guests</option>
                <option value="9">9 Guests</option>
                <option value="10">10 Guests</option>
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="occasion" className="block text-sm font-medium text-gray-700 mb-2">Is this a flexible booking? (If preferred time is unavailable)</label>
              <select
                id="occasion"
                name="occasion"
                value={formData.occasion}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="earlier">Earlier</option>
                <option value="later">Later</option>
                <option value="not-flexible">Not flexible</option>
              </select>
            </div>
            
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name For The Table?</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Joe Smith"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Whats Your Email?</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="joesmith@gmail.com"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Whats Your Number?</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="07624 300000"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="requests" className="block text-sm font-medium text-gray-700 mb-2">Extra Details?</label>
              <textarea
                id="requests"
                name="requests"
                value={formData.requests}
                onChange={handleChange}
                rows={3}
                placeholder="Let us know if you require any high chairs, have any disabilities or have any special dietary requirements."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-3 px-6 rounded-md hover:bg-orange-700 transition-colors font-semibold"
            >
              Submit Booking Request
            </button>
          </form>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-orange-50 rounded-lg p-8">
            <h3 className="text-2xl font-semibold mb-4 text-orange-800">Important Booking Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
              <div>
                <h4 className="font-semibold mb-2">Opening Hours</h4>
                <p className="text-sm mb-2">Tuesday - Saturday: 12:00 - 22:00</p>
                <p className="text-sm mb-2">Sunday: 12:00 - 21:00</p>
                <p className="text-sm">Monday: Closed</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Contact Information</h4>
                <p className="text-sm mb-2">Phone: 801268</p>
                <p className="text-sm mb-2">Email: bookings@hawthorn.com</p>
                <p className="text-sm">Address: 123 Restaurant Street, City</p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-orange-200">
              <p className="text-black text-sm">
                <strong>Cancellation Policy:</strong> Please provide at least 24 hours notice for cancellations. 
                Late cancellations or no-shows may incur a charge.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
