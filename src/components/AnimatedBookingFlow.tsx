'use client';

import { useState } from 'react';
import { X, Sparkles, Check, ArrowRight } from 'lucide-react';
import InlineChatAssistant from './InlineChatAssistant';

interface AnimatedBookingFlowProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'welcome' | 'name' | 'email' | 'phone' | 'date' | 'time' | 'party-size' | 'special-requests' | 'success';

export default function AnimatedBookingFlow({ isOpen, onClose }: AnimatedBookingFlowProps) {
  const [step, setStep] = useState<Step>('welcome');
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    partySize: 2,
    specialRequests: '',
  });
  const [isAnimating, setIsAnimating] = useState(false);

  if (!isOpen) return null;

  const updateData = (field: string, value: any) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const steps: Step[] = ['welcome', 'name', 'email', 'phone', 'date', 'time', 'party-size', 'special-requests', 'success'];
      const currentIndex = steps.indexOf(step);
      if (currentIndex < steps.length - 1) {
        setStep(steps[currentIndex + 1]);
      }
      setIsAnimating(false);
    }, 300);
  };

  const handleSubmit = async () => {
    // Show success immediately for better UX
    nextStep();
    
    // Submit booking in background
    try {
      await fetch('/api/bookings', {
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
    } catch (error) {
      console.error('Booking error:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-3 transition-all z-50"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Individual Question Cards */}
      <div className="relative w-full max-w-6xl flex gap-6 items-start justify-center">
        {/* Question Card Container */}
        <div className="w-full max-w-lg">
        {/* Welcome */}
        {step === 'welcome' && (
          <div className="animate-swooshFromRight">
            <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] transform transition-all border border-gray-100 overflow-hidden max-h-[85vh] flex flex-col">
              {/* Chef Image Section */}
              <div className="relative bg-gradient-to-br from-slate-50 to-gray-100 p-6 border-b border-gray-200 flex-shrink-0">
                <div className="flex items-start gap-4">
                  {/* Chef Image Placeholder */}
                  <div className="w-24 h-24 bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 border-4 border-white">
                    <div className="text-center">
                      <div className="text-4xl mb-1">👨‍🍳</div>
                      <div className="text-xs text-slate-600 font-medium">Chef</div>
                    </div>
                  </div>
                  
                  {/* Welcome Text */}
                  <div className="flex-1 pt-1">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-1">Welcome!</h2>
                    <p className="text-slate-600 text-base leading-relaxed">
                      Before we can make a reservation for you, we just need a bit of information first.
                    </p>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 overflow-y-auto flex-1">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                  <p className="text-blue-900 text-sm leading-relaxed">
                    <span className="font-bold">Hi, I'm Chef Jonny!</span> I'm delighted to assist you with your reservation today. 
                    I'll guide you through a few simple questions to ensure we have everything we need for your perfect dining experience.
                  </p>
                  <p className="text-blue-800 text-xs mt-2">
                    As we go through each step, feel free to ask me any questions using the chat assistant that will appear alongside. 
                    I'm here to help make your booking process as smooth as possible!
                  </p>
                </div>

                <p className="text-slate-700 mb-3 font-medium text-base">
                  I'll need to collect:
                </p>

                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-3 bg-slate-50 rounded-xl p-3 border border-slate-200">
                    <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                    <span className="text-slate-700 text-sm">Your name and contact details</span>
                  </li>
                  <li className="flex items-center gap-3 bg-slate-50 rounded-xl p-3 border border-slate-200">
                    <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                    <span className="text-slate-700 text-sm">When you'd like to dine with us</span>
                  </li>
                  <li className="flex items-center gap-3 bg-slate-50 rounded-xl p-3 border border-slate-200">
                    <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                    <span className="text-slate-700 text-sm">How many guests will be joining you</span>
                  </li>
                </ul>

                <button
                  onClick={nextStep}
                  className="w-full bg-gradient-to-r from-slate-700 to-slate-600 text-white px-6 py-4 rounded-2xl hover:from-slate-800 hover:to-slate-700 hover:shadow-2xl transition-all font-bold text-lg shadow-xl transform hover:scale-[1.02]"
                >
                  Let's Get Started
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Name */}
        {step === 'name' && (
          <div className="animate-swooshFromRight">
            <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-10 transform transition-all border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-slate-600 to-slate-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Let's get started!</h2>
                  <p className="text-gray-600 text-sm">What's your name?</p>
                </div>
              </div>
              
              <input
                type="text"
                value={bookingData.name}
                onChange={(e) => updateData('name', e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-6 py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-slate-100 focus:border-slate-500 text-gray-900 text-xl transition-all shadow-sm hover:border-gray-300 bg-gray-50 focus:bg-white"
                autoFocus
                onKeyPress={(e) => e.key === 'Enter' && bookingData.name && nextStep()}
              />

              <button
                onClick={nextStep}
                disabled={!bookingData.name}
                className="w-full mt-8 bg-gradient-to-r from-slate-700 to-slate-600 text-white px-8 py-5 rounded-2xl hover:from-slate-800 hover:to-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-xl flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-[1.02]"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Email */}
        {step === 'email' && (
          <div className="animate-swooshFromRight">
            <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-10 transform transition-all border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-slate-600 to-slate-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Lovely to meet you, {bookingData.name}!</h2>
                  <p className="text-gray-600 text-sm">What's the best email to send your confirmation to?</p>
                </div>
              </div>
              
              <input
                type="email"
                value={bookingData.email}
                onChange={(e) => updateData('email', e.target.value)}
                placeholder="your.email@example.com"
                className="w-full px-6 py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-slate-100 focus:border-slate-500 text-gray-900 text-xl transition-all shadow-sm hover:border-gray-300 bg-gray-50 focus:bg-white"
                autoFocus
                onKeyPress={(e) => e.key === 'Enter' && bookingData.email && nextStep()}
              />

              <button
                onClick={nextStep}
                disabled={!bookingData.email}
                className="w-full mt-8 bg-gradient-to-r from-slate-700 to-slate-600 text-white px-8 py-5 rounded-2xl hover:from-slate-800 hover:to-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-xl flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-[1.02]"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Phone */}
        {step === 'phone' && (
          <div className="animate-swooshFromRight">
            <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-10 transform transition-all border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-slate-600 to-slate-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Perfect!</h2>
                  <p className="text-gray-600 text-sm">And just in case we need to reach you, what's your phone number?</p>
                </div>
              </div>
              
              <input
                type="tel"
                value={bookingData.phone}
                onChange={(e) => updateData('phone', e.target.value)}
                placeholder="+44 1234 567890"
                className="w-full px-6 py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-slate-100 focus:border-slate-500 text-gray-900 text-xl transition-all shadow-sm hover:border-gray-300 bg-gray-50 focus:bg-white"
                autoFocus
                onKeyPress={(e) => e.key === 'Enter' && bookingData.phone && nextStep()}
              />

              <button
                onClick={nextStep}
                disabled={!bookingData.phone}
                className="w-full mt-8 bg-gradient-to-r from-slate-700 to-slate-600 text-white px-8 py-5 rounded-2xl hover:from-slate-800 hover:to-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-xl flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-[1.02]"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Date */}
        {step === 'date' && (
          <div className="animate-swooshFromRight">
            <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-10 transform transition-all border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-slate-600 to-slate-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Wonderful!</h2>
                  <p className="text-gray-600 text-sm">Now, when would you like to dine with us?</p>
                </div>
              </div>
              
              <input
                type="date"
                value={bookingData.date}
                onChange={(e) => updateData('date', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-6 py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-slate-100 focus:border-slate-500 text-gray-900 text-xl transition-all shadow-sm hover:border-gray-300 bg-gray-50 focus:bg-white"
                autoFocus
              />

              <button
                onClick={nextStep}
                disabled={!bookingData.date}
                className="w-full mt-8 bg-gradient-to-r from-slate-700 to-slate-600 text-white px-8 py-5 rounded-2xl hover:from-slate-800 hover:to-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-xl flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-[1.02]"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Time */}
        {step === 'time' && (
          <div className="animate-swooshFromRight">
            <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-10 transform transition-all border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-slate-600 to-slate-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Great choice!</h2>
                  <p className="text-gray-600 text-sm">What time works best for you?</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3 mb-4">
                {['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'].map((time) => (
                  <button
                    key={time}
                    onClick={() => updateData('time', time)}
                    className={`px-4 py-4 rounded-2xl border-2 transition-all font-bold text-lg shadow-sm hover:shadow-md ${
                      bookingData.time === time
                        ? 'border-slate-600 bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900 shadow-lg'
                        : 'border-gray-200 hover:border-slate-400 text-gray-700 bg-gray-50 hover:bg-white'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>

              <button
                onClick={nextStep}
                disabled={!bookingData.time}
                className="w-full mt-8 bg-gradient-to-r from-slate-700 to-slate-600 text-white px-8 py-5 rounded-2xl hover:from-slate-800 hover:to-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-xl flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-[1.02]"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Party Size */}
        {step === 'party-size' && (
          <div className="animate-swooshFromRight">
            <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-10 transform transition-all border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-slate-600 to-slate-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Almost there!</h2>
                  <p className="text-gray-600 text-sm">How many guests will be joining you?</p>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-3 mb-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((size) => (
                  <button
                    key={size}
                    onClick={() => updateData('partySize', size)}
                    className={`px-4 py-7 rounded-2xl border-2 transition-all font-bold text-2xl shadow-sm hover:shadow-md ${
                      bookingData.partySize === size
                        ? 'border-slate-600 bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900 shadow-lg'
                        : 'border-gray-200 hover:border-slate-400 text-gray-700 bg-gray-50 hover:bg-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              <button
                onClick={nextStep}
                className="w-full mt-6 bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-4 rounded-xl hover:from-orange-700 hover:to-orange-600 transition-all font-semibold text-lg flex items-center justify-center gap-2 shadow-lg"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Special Requests */}
        {step === 'special-requests' && (
          <div className="animate-swooshFromRight">
            <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-10 transform transition-all border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-slate-600 to-slate-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 tracking-tight">One last thing...</h2>
                  <p className="text-gray-600 text-sm">Is there anything special we should know? (Dietary needs, celebrations, seating preferences...)</p>
                </div>
              </div>
              
              <textarea
                value={bookingData.specialRequests}
                onChange={(e) => updateData('specialRequests', e.target.value)}
                placeholder="e.g., Window seat, birthday celebration, vegetarian menu..."
                rows={4}
                className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-600 text-gray-900 text-lg transition-all resize-none"
                autoFocus
              />

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-500 text-white px-8 py-5 rounded-2xl hover:from-green-700 hover:to-green-600 transition-all font-bold text-xl flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-[1.02]"
                >
                  <Check className="w-5 h-5" />
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success */}
        {step === 'success' && (
          <div className="animate-swooshFromRight w-full max-w-lg mx-auto">
            <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] transform transition-all border border-gray-100 overflow-hidden max-h-[85vh] flex flex-col">
              {/* Thank You Image Section */}
              <div className="relative bg-gradient-to-br from-emerald-50 to-teal-50 p-6 border-b border-emerald-100 flex-shrink-0">
                <div className="flex flex-col items-center">
                  {/* Thank You Hands Image */}
                  <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center shadow-xl mb-4 border-4 border-emerald-100 overflow-hidden">
                    <div className="text-center p-3">
                      <div className="text-5xl mb-1">🙏</div>
                      <div className="text-xs text-emerald-700 font-semibold uppercase tracking-wide">Thank You</div>
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Thank You!</h2>
                  <p className="text-emerald-700 text-base font-medium">Your table has been reserved</p>
                  <p className="text-emerald-600 text-sm mt-2">A confirmation email has been sent to you</p>
                </div>
              </div>

              {/* Booking Details Section */}
              <div className="p-6 text-center overflow-y-auto flex-1">
                <div className="bg-slate-50 rounded-2xl p-5 mb-5 border border-slate-200">
                  <h3 className="text-base font-bold text-gray-900 mb-3">Reservation Details</h3>
                  <div className="space-y-2 text-left">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 text-sm">Guest:</span>
                      <span className="font-semibold text-gray-900 text-sm">{bookingData.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 text-sm">Date:</span>
                      <span className="font-semibold text-gray-900 text-sm">
                        {new Date(bookingData.date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 text-sm">Time:</span>
                      <span className="font-semibold text-gray-900 text-sm">{bookingData.time}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 text-sm">Party Size:</span>
                      <span className="font-semibold text-gray-900 text-sm">{bookingData.partySize} {bookingData.partySize === 1 ? 'guest' : 'guests'}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4">
                  <p className="text-blue-800 text-xs">
                    📧 Confirmation email sent to <strong>{bookingData.email}</strong>
                  </p>
                </div>

                <p className="text-slate-600 text-xs mb-4">
                  We look forward to welcoming you to The Hawthorn!
                </p>

                <button
                  onClick={onClose}
                  className="w-full bg-gradient-to-r from-slate-700 to-slate-600 text-white px-6 py-3 rounded-2xl hover:from-slate-800 hover:to-slate-700 transition-all font-bold text-base shadow-xl hover:shadow-2xl transform hover:scale-[1.02]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes swooshFromRight {
            0% {
              opacity: 0;
              transform: translateX(100vw) scale(0.6);
            }
            60% {
              opacity: 1;
              transform: translateX(-20px) scale(1.1);
            }
            100% {
              opacity: 1;
              transform: translateX(0) scale(1);
            }
          }

          .animate-swooshFromRight {
            animation: swooshFromRight 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          }
        `}</style>
        </div>

        {/* Inline Chat Assistant - only show when not on welcome or success */}
        {step !== 'welcome' && step !== 'success' && (
          <div className="w-80 flex-shrink-0">
            <InlineChatAssistant step={step} context="booking" />
          </div>
        )}
      </div>
    </div>
  );
}
