'use client';

import { useState } from 'react';

export default function GiftVouchersPage() {
  const [formData, setFormData] = useState({
    voucherType: '',
    customAmount: '',
    recipientName: '',
    message: '',
    yourName: '',
    yourEmail: ''
  });

  const vouchers = [
    { id: 'tasting', title: 'Tasting Menu for Two', price: '£140', description: 'Complete tasting menu experience for two people including wine pairings' },
    { id: 'dinner', title: 'Dinner for Two', price: '£120', description: 'Three-course dinner for two from our à la carte menu' },
    { id: 'chef', title: 'Chef\'s Table Experience', price: '£240', description: 'Exclusive chef\'s table experience for two with personalized menu' },
    { id: 'wine', title: 'Wine Tasting & Dinner', price: '£175', description: 'Wine tasting session followed by dinner for two' },
    { id: 'custom', title: 'Custom Amount', price: '£40 - £400', description: 'Choose your own amount for flexible dining experiences' },
    { id: 'cooking', title: 'Cooking Class', price: '£95', description: 'Hands-on cooking class with one of our chefs' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Gift voucher pre-order submitted:', formData);
    // Handle pre-order submission - send confirmation email for collection
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Gift Vouchers</h1>
            <p className="text-xl">The perfect gift for any occasion</p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Give the Gift of Fine Dining</h2>
          <p className="text-lg text-gray-600">
            Treat someone special to an unforgettable culinary experience at Hawthorn. Our gift vouchers are perfect for birthdays, anniversaries, holidays, or just because.
          </p>
        </div>
      </section>

      {/* Order Form */}
      <section id="order-form" className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Order Your Gift Voucher</h2>
          <p className="text-center text-gray-600 mb-8">
            Fill out the form below to pre-order your gift voucher. Please visit us in person to collect and pay for your physical gift card.
          </p>
          <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg shadow-md p-8">
            <div className="mb-6">
              <label htmlFor="voucherType" className="block text-sm font-medium text-gray-700 mb-2">Voucher Type</label>
              <select
                id="voucherType"
                name="voucherType"
                value={formData.voucherType}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Select a voucher</option>
                {vouchers.map((voucher) => (
                  <option key={voucher.id} value={voucher.id}>
                    {voucher.title} - {voucher.price}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="customAmount" className="block text-sm font-medium text-gray-700 mb-2">Custom Amount (£)</label>
              <input
                type="number"
                id="customAmount"
                name="customAmount"
                value={formData.customAmount}
                onChange={handleChange}
                min="40"
                max="400"
                placeholder="Enter amount between £40-£400"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700 mb-2">Recipient Name</label>
                <input
                  type="text"
                  id="recipientName"
                  name="recipientName"
                  value={formData.recipientName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label htmlFor="recipientEmail" className="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
                <input
                  type="email"
                  id="yourEmail"
                  name="yourEmail"
                  value={formData.yourEmail}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Personal Message (Optional)</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                placeholder="Add a personal message to include with the gift card"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              ></textarea>
            </div>

            <div className="mb-6">
              <label htmlFor="yourName" className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
              <input
                type="text"
                id="yourName"
                name="yourName"
                value={formData.yourName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-orange-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div className="text-sm text-orange-800">
                  <p className="font-semibold mb-1">Important Collection Information:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Please visit us in person to collect and pay for your physical gift card</li>
                    <li>We do not offer online gift cards or digital delivery</li>
                    <li>Your order will be prepared and ready for collection within 24 hours</li>
                    <li>Bring this confirmation email when collecting your gift card</li>
                  </ul>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-3 px-6 rounded-md hover:bg-orange-700 transition-colors font-semibold"
            >
              Submit Pre-Order
            </button>
          </form>
        </div>
      </section>

      {/* Terms & Conditions */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Terms & Conditions</h2>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                Vouchers are valid for 12 months from date of purchase
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                Vouchers cannot be exchanged for cash
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                Reservations are required and subject to availability
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                Vouchers can be used for any menu items unless specified
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                Lost vouchers cannot be replaced
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                Vouchers are transferable
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
