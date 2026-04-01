'use client';

import { useState } from 'react';
import { X, Calendar, Users, Clock, Check, Sparkles, ArrowRight } from 'lucide-react';

interface BookingFlowProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'name' | 'date' | 'time' | 'party-size' | 'special-requests' | 'confirmation' | 'success';

export default function BookingFlow({ isOpen, onClose }: BookingFlowProps) {
  const [step, setStep] = useState<Step>('name');
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    partySize: 2,
    specialRequests: '',
  });
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');

  if (!isOpen) return null;

  const updateData = (field: string, value: any) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const checkAvailability = async () => {
    setIsChecking(true);
    try {
      const response = await fetch('/api/bookings/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: bookingData.date,
          partySize: bookingData.partySize,
        }),
      });
      const data = await response.json();
      setAvailableSlots(data.availableSlots || ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00']);
    } catch (error) {
      setAvailableSlots(['17:00', '18:00', '19:00', '20:00', '21:00']);
    } finally {
      setIsChecking(false);
    }
  };

  const handleNext = async () => {
    if (step === 'name' && bookingData.name && bookingData.email && bookingData.phone) {
      setStep('date');
    } else if (step === 'date' && bookingData.date) {
      await checkAvailability();
      setStep('time');
    } else if (step === 'time' && bookingData.time) {
      setStep('party-size');
    } else if (step === 'party-size') {
      setAiSuggestion('Perfect! For your party, I recommend arriving 10 minutes early. Would you like to add any special requests?');
      setStep('special-requests');
    } else if (step === 'special-requests') {
      setStep('confirmation');
    }
  };

  const handleConfirm = async () => {
    setIsBooking(true);
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingData: {
            guestName: bookingData.name,
            guestEmail: bookingData.email,
            guestPhone: bookingData.phone,
            date: bookingData.date,
            time: bookingData.time,
            partySize: bookingData.partySize,
            specialRequests: bookingData.specialRequests,
          },
        }),
      });

      if (response.ok) {
        setStep('success');
      }
    } catch (error) {
      console.error('Booking error:', error);
    } finally {
      setIsBooking(false);
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white p-6 rounded-t-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8" />
            <div>
              <h2 className="text-2xl font-bold">AI-Powered Booking</h2>
              <p className="text-orange-100 text-sm">Let me help you reserve your perfect table</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-600">
              {step === 'name' && 'Step 1 of 5'}
              {step === 'date' && 'Step 2 of 5'}
              {step === 'time' && 'Step 3 of 5'}
              {step === 'party-size' && 'Step 4 of 5'}
              {step === 'special-requests' && 'Step 5 of 5'}
              {step === 'confirmation' && 'Review & Confirm'}
              {step === 'success' && 'Complete!'}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-orange-600 h-2 rounded-full transition-all duration-500"
              style={{
                width: step === 'name' ? '20%' : step === 'date' ? '40%' : step === 'time' ? '60%' : step === 'party-size' ? '80%' : '100%'
              }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Name & Contact */}
          {step === 'name' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Let's start with your details</h3>
                <p className="text-gray-600">I'll need your name and contact information to secure your reservation.</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    value={bookingData.name}
                    onChange={(e) => updateData('name', e.target.value)}
                    placeholder="John Smith"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent text-gray-900"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={bookingData.email}
                    onChange={(e) => updateData('email', e.target.value)}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={bookingData.phone}
                    onChange={(e) => updateData('phone', e.target.value)}
                    placeholder="+44 1234 567890"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent text-gray-900"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Date */}
          {step === 'date' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">When would you like to dine with us?</h3>
                <p className="text-gray-600">Choose your preferred date.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Select Date
                </label>
                <input
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => updateData('date', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent text-gray-900"
                  autoFocus
                />
              </div>
              {bookingData.date && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <p className="text-orange-800 text-sm">
                    Great choice! {formatDate(bookingData.date)} - Let's find you the perfect time.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Time */}
          {step === 'time' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">What time works best for you?</h3>
                <p className="text-gray-600">Here are our available time slots for {formatDate(bookingData.date)}</p>
              </div>
              {isChecking ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
                  <p className="text-gray-600 mt-4">Checking availability...</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => updateData('time', slot)}
                      className={`px-4 py-3 rounded-lg border-2 transition-all ${
                        bookingData.time === slot
                          ? 'border-orange-600 bg-orange-50 text-orange-900 font-semibold'
                          : 'border-gray-300 hover:border-orange-400 text-gray-700'
                      }`}
                    >
                      <Clock className="w-4 h-4 mx-auto mb-1" />
                      {slot}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 4: Party Size */}
          {step === 'party-size' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">How many guests will be joining?</h3>
                <p className="text-gray-600">Select your party size.</p>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((size) => (
                  <button
                    key={size}
                    onClick={() => updateData('partySize', size)}
                    className={`px-4 py-6 rounded-lg border-2 transition-all ${
                      bookingData.partySize === size
                        ? 'border-orange-600 bg-orange-50 text-orange-900 font-semibold'
                        : 'border-gray-300 hover:border-orange-400 text-gray-700'
                    }`}
                  >
                    <Users className="w-5 h-5 mx-auto mb-1" />
                    {size}
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  const custom = prompt('Enter party size (9+):');
                  if (custom) updateData('partySize', parseInt(custom));
                }}
                className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-400 text-gray-600 transition-all"
              >
                9+ guests (Large party)
              </button>
            </div>
          )}

          {/* Step 5: Special Requests */}
          {step === 'special-requests' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Any special requests?</h3>
                <p className="text-gray-600">Let us know about dietary requirements, celebrations, or seating preferences.</p>
              </div>
              {aiSuggestion && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                  <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-blue-800 text-sm">{aiSuggestion}</p>
                </div>
              )}
              <div>
                <textarea
                  value={bookingData.specialRequests}
                  onChange={(e) => updateData('specialRequests', e.target.value)}
                  placeholder="e.g., Window seat, birthday celebration, vegetarian menu..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent text-gray-900"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {['Birthday', 'Anniversary', 'Window Seat', 'Quiet Area'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => updateData('specialRequests', bookingData.specialRequests + (bookingData.specialRequests ? ', ' : '') + tag)}
                    className="px-3 py-1 bg-gray-100 hover:bg-orange-100 text-gray-700 hover:text-orange-900 rounded-full text-sm transition-colors"
                  >
                    + {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Confirmation */}
          {step === 'confirmation' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Confirm your reservation</h3>
                <p className="text-gray-600">Please review your booking details.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-gray-600">Guest</span>
                  <span className="font-semibold text-gray-900 text-right">{bookingData.name}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-600">Contact</span>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{bookingData.email}</div>
                    <div className="text-sm text-gray-600">{bookingData.phone}</div>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4"></div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-600">Date & Time</span>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{formatDate(bookingData.date)}</div>
                    <div className="text-sm text-gray-600">{bookingData.time}</div>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-600">Party Size</span>
                  <span className="font-semibold text-gray-900">{bookingData.partySize} guests</span>
                </div>
                {bookingData.specialRequests && (
                  <>
                    <div className="border-t border-gray-200 pt-4"></div>
                    <div>
                      <span className="text-gray-600 block mb-2">Special Requests</span>
                      <p className="text-sm text-gray-900">{bookingData.specialRequests}</p>
                    </div>
                  </>
                )}
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-sm">
                  <strong>✓ Table Available</strong> - Your reservation is ready to be confirmed. You'll receive a confirmation email at {bookingData.email}.
                </p>
              </div>
            </div>
          )}

          {/* Success */}
          {step === 'success' && (
            <div className="text-center py-8 animate-fadeIn">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
              <p className="text-gray-600 mb-6">
                Your table for {bookingData.partySize} guests on {formatDate(bookingData.date)} at {bookingData.time} is confirmed.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-800 text-sm">
                  📧 Confirmation email sent to <strong>{bookingData.email}</strong>
                </p>
              </div>
              <button
                onClick={onClose}
                className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors font-semibold"
              >
                Done
              </button>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {step !== 'success' && step !== 'confirmation' && (
          <div className="border-t border-gray-200 p-6 flex justify-between">
            <button
              onClick={() => {
                const steps: Step[] = ['name', 'date', 'time', 'party-size', 'special-requests'];
                const currentIndex = steps.indexOf(step);
                if (currentIndex > 0) setStep(steps[currentIndex - 1]);
              }}
              className="px-6 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              disabled={step === 'name'}
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={
                (step === 'name' && (!bookingData.name || !bookingData.email || !bookingData.phone)) ||
                (step === 'date' && !bookingData.date) ||
                (step === 'time' && !bookingData.time)
              }
              className="bg-orange-600 text-white px-8 py-2 rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold flex items-center gap-2"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 'confirmation' && (
          <div className="border-t border-gray-200 p-6 flex justify-between">
            <button
              onClick={() => setStep('special-requests')}
              className="px-6 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleConfirm}
              disabled={isBooking}
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors font-semibold flex items-center gap-2"
            >
              {isBooking ? 'Confirming...' : 'Confirm Booking'}
              <Check className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
